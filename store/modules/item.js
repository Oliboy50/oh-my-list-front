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
    async getItem ({state, commit}, {IRI, id}) {
      if (!IRI && !id) {
        throw new Error('"IRI" or "id" are required');
      }

      let item = state.items.find(i => IRI ? i['@id'] === IRI : i.id === id);
      if (item) {
        return item;
      }

      item = await this.$axios.$get(IRI || buildIRI(id));
      commit('pushItem_items', item);

      return item;
    },
    async saveItem (context, {id = null, data}) {
      return await (id ? this.$axios.$put(buildIRI(id), data) : this.$axios.$post(buildIRI(), data));
    },
  },
};
