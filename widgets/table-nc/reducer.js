//T:2019-02-27
import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  id: null,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_VALUE': {
      return state.set(action.field, action.value);
    }
  }
  return state;
};
