import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  selectedWidget: null,
  props: {},
  settings: {
    scale: 1,
    color: 'pane',
    items: 1,
    layout: 'row',
    frame: false,
  },
});

export default (state = initialState, action = {}) => {
  if (action.type === 'SET') {
    return state.set(action.path, action.value);
  }
  if (action.type === 'DEL') {
    return state.del(action.path);
  }
  return state;
};
