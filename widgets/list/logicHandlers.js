module.exports = {
  create: (state, action) => {
    return state.set('id', action.get('id')).set('count', action.get('count'));
  },
  'change-status': (state, action) => {
    const status = action.get('status');
    if (status !== state.get('status')) {
      state = state.set('status', status).set('list', {});
    }
    return state.set('count', action.get('count'));
  },
  fetch: (state, action) => {
    const rows = action.get('rows');
    for (const row in rows) {
      const item = `${rows[row]}-item`;
      state = state
        .set(`list.${item}`, row)
        .set(`private.rowById.${row}`, item);
    }
    return state;
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
