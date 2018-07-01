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
      const apiResults = await this.$axios.$get(buildIRI());
      if (!apiResults || !apiResults['hydra:member']) {
        return [];
      }

      const lists = apiResults['hydra:member']
        // Add details of the first lists item
        .map(async list => {
          const positions = [...list.positions];
          const firstPosition = positions.shift();
          if (!firstPosition) {
            return list;
          }

          positions.unshift(await dispatch('position/getPosition', {IRI: firstPosition}, { root: true }));
          return {
            ...list,
            positions,
          };
        });

      return await Promise.all(lists);
    },
    async getList ({state, commit}, {IRI, id}) {
      if (!IRI && !id) {
        throw new Error('"IRI" or "id" are required');
      }

      let list = state.lists.find(l => IRI ? l['@id'] === IRI : l.id === id);
      if (list) {
        return list;
      }

      list = await this.$axios.$get(IRI || buildIRI(id));
      commit('pushItem_lists', list);

      return list;
    },
    async saveList (context, {id = null, data}) {
      return await (id ? this.$axios.$put(buildIRI(id), data) : this.$axios.$post(buildIRI(), data));
    },
  },
};
