import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE': {
      return state.set(action.path, action.newValue);
    }
    case 'FOCUS': {
      return state.set('active', true);
    }
    case 'BLUR': {
      return state.set('active', false);
    }
  }
  return state;
};
