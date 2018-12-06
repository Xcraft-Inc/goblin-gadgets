module.exports = {
  create: (state, action) => {
    return state
      .set ('id', action.get ('id'))
      .set ('status', action.get ('status'))
      .set ('count', action.get ('count'))
      .set ('pageSize', action.get ('pageSize'))
      .set ('type', action.get ('type'))
      .set ('from', 0)
      .set ('to', action.get ('pageSize'))
      .set ('contentIndex', action.get ('contentIndex'));
  },
  'change-content-index': (state, action) => {
    let value = action.get ('value');
    if (!Array.isArray (value)) {
      value = [value];
    }
    return state
      .set ('contentIndex.name', action.get ('name'))
      .set ('contentIndex.value', value)
      .set ('list', {})
      .set ('count', action.get ('count'));
  },
  'change-visualization': (state, action) => {
    return state
      .set ('count', action.get ('count'))
      .set ('pageSize', action.get ('pageSize'))
      .set ('from', 0)
      .set ('to', action.get ('pageSize'));
  },
  'customize-visualization': (state, action) => {
    return state
      .set ('count', action.get ('count'))
      .set ('pageSize', action.get ('pageSize'))
      .set ('from', 0)
      .set ('to', action.get ('pageSize'));
  },
  'load-range': (state, action) => {
    return state
      .set ('list', action.get ('rows'))
      .set ('private.rowById', action.get ('rowById'));
  },
  fetch: (state, action) => {
    const rows = action.get ('rows');
    const ids = action.get ('ids');

    state = state.set (
      'list',
      state.get ('list').filter ((_, row) => {
        const index = Number (row.replace (/-item/, ''));
        return !!ids[index];
      })
    );

    for (const id in rows) {
      const row = `${rows[id]}-item`;
      state = state.set (`list.${row}`, id);
    }

    return state;
  },
  'handle-changes': state => {
    return state.set ('list', {});
  },
  remove: state => {
    const newCount = Number (state.get ('count')) - 1;
    return state.set ('count', newCount).set ('list', {});
  },
  add: state => {
    const newCount = Number (state.get ('count')) + 1;
    return state.set ('count', newCount).set ('list', {});
  },
};
