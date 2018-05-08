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
    async getItem ({state, commit}, {id}) {
      let item = state.items.find(item => item.id === id);
      if (item) {
        return item;
      }

      item = await this.$axios.$get(buildIRI(id));
      commit('pushItem_items', item);

      return item;
    },
    addItem (item) {
    },
    updateItem (id, item) {
    },
  },
};
