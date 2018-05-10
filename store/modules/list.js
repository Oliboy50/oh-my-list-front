import { arrayMutations, pushOrUpdateItem } from '~/assets/js/common/base-mutations';

const buildIRI = (id) => id ? `/api/listitems/${id}` : '/api/listitems';

export default {
  namespaced: true,
  state() {
    return {
      lists: [],
    };
  },
  mutations: {
    ...arrayMutations('lists'),
  },
  actions: {
    async getLists ({state, commit, dispatch}) {
      const lists = await Promise.all(
        (await this.$axios.$get(buildIRI()))['hydra:member']
          // Add details of the first lists item
          .map(async list => {
            const cloned = {...list};
            const firstPosition = cloned.positions.shift();
            if (!firstPosition) {
              return list;
            }

            cloned.positions = [
              await dispatch('position/getPosition', {IRI: firstPosition}, { root: true }),
              ...list.positions,
            ];
            return cloned;
          })
      );
      lists.forEach(list => pushOrUpdateItem(commit, state, 'lists', list));

      return lists;
    },
    async getList ({state, commit}, {id}) {
      let list = state.lists.find(l => l.id === id);
      if (list) {
        return list;
      }

      list = await this.$axios.$get(buildIRI(id));
      commit('pushItem_lists', list);

      return list;
    },
    async saveList ({state, commit}, {id = null, data}) {
      const list = await (id ? this.$axios.$put(buildIRI(id), data) : this.$axios.$post(buildIRI(), data));
      pushOrUpdateItem(commit, state, 'lists', list);

      return list;
    },
  },
};
