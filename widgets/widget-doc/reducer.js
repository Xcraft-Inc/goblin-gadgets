import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  selectedWidget: null,
  props: {},
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SET') {
    return state.set(action.path, action.value);
  }
  return state;
};
