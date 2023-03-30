import Shredder from 'xcraft-core-shredder';

const initialState = new Shredder({
  editedPrefilterId: null,
  editedPrefilterName: '',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'START-EDITION': {
      return state
        .set('editedPrefilterId', action.id)
        .set('editedPrefilterName', action.name);
    }
    case 'FINISH-EDITION': {
      return state
        .set('editedPrefilterId', null)
        .set('editedPrefilterName', '');
    }
  }
  return state;
};
