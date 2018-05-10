import { arrayMutations } from '~/assets/js/common/base-mutations';

const buildIRI = (id) => id ? `/api/positions/${id}` : '/api/positions';

export default {
  namespaced: true,
  state() {
    return {
      positions: [],
    };
  },
  mutations: {
    ...arrayMutations('positions'),
  },
  actions: {
    async getPosition ({state, commit}, {IRI}) {
      let position = state.positions.find(position => position['@id'] === IRI);
      if (position) {
        return position;
      }

      position = await this.$axios.$get(IRI);
      commit('pushItem_positions', position);

      return position;
    },
  },
};
