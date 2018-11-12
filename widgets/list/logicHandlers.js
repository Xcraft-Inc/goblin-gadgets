module.exports = {
  create: (state, action) => {
    return state.set('id', action.get('id')).set('count', action.get('count'));
  },
  'change-status': (state, action) => {
    return state
      .set('status', action.get('status'))
      .set('count', action.get('count'));
  },
  'handle-changes': (state, action) => {
    return state.set(`list.${action.get('row')}`, action.get('document'));
  },
  remove: state => {
    const newCount = Number(state.get('count')) - 1;
    return state.set('count', newCount);
  },
  add: (state, action) => {
    const entity = action.get('entity');
    const newCount = Number(state.get('count')) + 1;
    const newRow = `${newCount - 1}-item`;
    return state
      .set(`list.${newRow}`, entity)
      .set(`private.rowById.${entity.id}`, newRow)
      .set('count', newCount);
  },
};
