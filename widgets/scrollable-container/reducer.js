import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  id: null,
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SET') {
    return state.set(action.field, action.value);
  }
  return state;
};
