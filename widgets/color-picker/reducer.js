import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  mode: 'rgb',
  lastColors: [],
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET-MODE': {
      return state.set('mode', action.mode);
    }
    case 'PUSH-COLOR': {
      return state.push('lastColors', action.color);
    }
  }
  return state;
};
