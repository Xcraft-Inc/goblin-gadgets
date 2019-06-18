import {fromJS} from 'immutable';
const initialState = fromJS({});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_VALUE': {
      return state.set(action.field, action.value);
    }
  }
  return state;
};
