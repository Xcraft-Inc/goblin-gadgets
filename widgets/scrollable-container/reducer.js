import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  id: null,
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
  if (action.type === 'SET') {
    return state.set(action.field, action.value);
  }
  return state;
});
