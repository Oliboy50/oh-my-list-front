// variableMutations
export const SET = 'set_';

// objectMutations
export const ASSIGN = 'assign_';
export const SET_PROPS = 'setProps_';

// arrayMutations
export const PUSH_ITEM = 'pushItem_';
export const INSERT_ITEM = 'insertItem_';
export const UPDATE_ITEM = 'updateItem_';
export const MOVE_ITEM = 'moveItem_';
export const REMOVE_ITEM = 'removeItem_';

export const variableMutations = (key) => ({
  [SET + key] (state, value) {
    state[key] = value;
  },
});

export const objectMutations = (key) => ({
  ...variableMutations(key),
  [ASSIGN + key] (state, obj) {
    state[key] = {
      ...state[key],
      ...obj,
    };
  },
  [SET_PROPS + key] (state, obj) {
    Object.keys(obj).forEach((objKey) => {
      state[key][objKey] = obj[objKey];
    });
  },
});

export const arrayMutations = (key) => ({
  ...variableMutations(key),
  [PUSH_ITEM + key] (state, item) {
    state[key].push(item);
  },
  [INSERT_ITEM + key] (state, { index, item }) {
    state[key].splice(index, 0, item);
  },
  [UPDATE_ITEM + key] (state, { index, item }) {
    state[key].splice(index, 1, item);
  },
  [MOVE_ITEM + key] (state, { index, newIndex }) {
    state[key].splice(newIndex, 0, state[key].splice(index, 1)[0]);
  },
  [REMOVE_ITEM + key] (state, { index }) {
    state[key].splice(index, 1);
  },
});

// Helpers
export const pushOrUpdateItem = (commit, state, stateKey, item, itemUniqKey = 'id') => {
  const existingItemIndex = state[stateKey].findIndex(l => l[itemUniqKey] === item[itemUniqKey]);
  if (existingItemIndex) {
    commit(`${UPDATE_ITEM}${stateKey}`, {item, index: existingItemIndex});
  } else {
    commit(`${PUSH_ITEM}${stateKey}`, item);
  }
};
