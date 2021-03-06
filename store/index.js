import Vuex from 'vuex';

import user from './modules/user';
import list from './modules/list';
import position from './modules/position';
import item from './modules/item';

export default () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      user,
      list,
      position,
      item,
    },
  });
};
