import { TOKEN_KEY } from '~/assets/js/const/cookies';
import * as Cookies from 'js-cookie';
import { parse } from 'cookie';

export default ({store, req}) => {
  let token = store.state.user.token;

  if (!token) {
    token = process.client ? Cookies.getJSON(TOKEN_KEY) : parse(req.headers.cookie||'')[TOKEN_KEY];
  }

  if (!token) {
    return;
  }

  return store.dispatch('user/setToken', {token});
};
