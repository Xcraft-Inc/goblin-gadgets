import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  id: null,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INIT_SCROLLABLE':
      state = state.set('id', action.id);
      state = state.set(action.name, 0);
      return state;
    case 'SCROLL_TOP':
      state = state.set(action.name, action.value);
      return state;
  }
  return state;
};
