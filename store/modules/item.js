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
      if (!IRI) {
        throw new Error('"IRI" is required');
      }

      let item = state.items.find(i => i['@id'] === IRI);
      if (item) {
        return item;
      }

      item = await this.$axios.$get(IRI);
      commit('pushItem_items', item);

      return item;
    },
    async saveItem (context, {id = null, data}) {
      return await (id ? this.$axios.$put(buildIRI(id), data) : this.$axios.$post(buildIRI(), data));
    },
  },
};
