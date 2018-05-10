import { arrayMutations } from '~/assets/js/common/base-mutations';

const buildIRI = (id) => id ? `/api/items/${id}` : '/api/items';

export default {
  namespaced: true,
  state() {
    return {
      items: [],
    };
  },
  mutations: {
    ...arrayMutations('items'),
  },
  actions: {
    async getItem ({state, commit}, {IRI}) {
      let item = state.items.find(item => item['@id'] === IRI);
      if (item) {
        return item;
      }

      item = await this.$axios.$get(IRI);
      commit('pushItem_items', item);

      return item;
    },
  },
};
