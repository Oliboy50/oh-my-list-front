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
    async getLists ({dispatch}) {
      return await Promise.all(
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
    async saveList (context, {id = null, data}) {
      return await (id ? this.$axios.$put(buildIRI(id), data) : this.$axios.$post(buildIRI(), data));
    },
  },
};
