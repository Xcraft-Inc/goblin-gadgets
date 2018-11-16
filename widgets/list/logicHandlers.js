module.exports = {
  create: (state, action) => {
    return state
      .set('id', action.get('id'))
      .set('status', action.get('status'))
      .set('count', action.get('count'))
      .set('pageSize', action.get('pageSize'))
      .set('type', action.get('type'))
      .set('from', 0)
      .set('to', action.get('pageSize'));
  },
  'change-status': (state, action) => {
    return state
      .set('status', action.get('status'))
      .set('count', action.get('count'))
      .set('pageSize', action.get('pageSize'))
      .set('from', 0)
      .set('to', action.get('pageSize'));
  },
  'change-visualization': (state, action) => {
    return state
      .set('count', action.get('count'))
      .set('pageSize', action.get('pageSize'))
      .set('from', 0)
      .set('to', action.get('pageSize'));
  },
  'customize-visualization': (state, action) => {
    return state
      .set('count', action.get('count'))
      .set('pageSize', action.get('pageSize'))
      .set('from', 0)
      .set('to', action.get('pageSize'));
  },
  'load-range': (state, action) => {
    return state
      .set('list', action.get('rows'))
      .set('private.rowById', action.get('rowById'));
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
  updateRange: (state, action) => {
    const pageSize = state.get('pageSize');
    const count = state.get('count');

    let from = action.get('from');
    if (from >= pageSize) {
      from = from - pageSize;
    } else {
      from = 0;
    }
    let to = action.get('to');
    if (to <= count - pageSize) {
      to = to + pageSize;
    }
    return state.set('from', from).set('to', to);
  },
};
