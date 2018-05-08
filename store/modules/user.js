import { variableMutations, objectMutations } from '~/assets/js/common/base-mutations';
import { TOKEN_KEY } from '~/assets/js/const/cookies';
import * as Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import * as ROLES from '~/assets/js/const/roles';

const buildIRI = (id) => id ? `/api/users/${id}` : '/api/users';

const getDefaultToken = () => '';
const getDefaultUser = () => ({
  '@id': '',
  email: '',
  isAdmin: false,
  isUser: false,
});

export default {
  namespaced: true,
  state() {
    return {
      user: getDefaultUser(),
      token: getDefaultToken(),
    };
  },
  mutations: {
    ...objectMutations('user'),
    ...variableMutations('token'),
  },
  actions: {
    async setToken({ commit }, { token } = { token: null }) {
      if (!token) {
        // Remove token from axios
        this.$axios.setToken(false);

        // Remove token from cookie
        Cookies.remove(TOKEN_KEY);

        // Reset user in state
        commit('set_user', getDefaultUser());

        // Reset token in state
        commit('set_token', getDefaultToken());

        return;
      }

      // Setup token in axios
      this.$axios.setToken(token, 'Bearer');

      // Setup token in cookie
      Cookies.set(TOKEN_KEY, token, { expires: 30/* days */, secure: process.env.HTTPS_ENABLED });

      // Setup user in state from token payload
      const { id, email, roles } = jwtDecode(token);
      commit('set_user', {
        '@id': buildIRI(id),
        email,
        isAdmin: roles.includes(ROLES.ADMIN),
        isUser: roles.includes(ROLES.ADMIN) || roles.includes(ROLES.USER),
      });

      // Setup token in state
      commit('set_token', token);
    },
    async login({ dispatch }, { email, password }) {
      try {
        const { token } = await this.$axios.$post('/api/login', { email, password });
        return dispatch('setToken', {token});
      } catch (error) {
        throw error;
      }
    },
    async logout({ dispatch }) {
      return dispatch('setToken');
    },
  },
};
