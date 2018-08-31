import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  id: null,
  top: 0,
});

const buildReducer = (initalState, reducer) => (
  state = initialState,
  action = {}
) => {
  state = new Shredder(state);
  const nState = reducer(state, action);
  return nState.state;
};

export default buildReducer(initialState, (state, action) => {
  switch (action.type) {
    case 'INIT_SCROLLABLE':
      state = state.set('id', action.id);
      return state;
    case 'SCROLL_TOP':
      state = state.set('top', action.value);
      return state;
  }
  return state;
});
