module.exports = {
  create: (state, action) => {
    return state
      .set('id', action.get('id'))
      .set('count', action.get('count'))
      .set('contentIndex', action.get('contentIndex'));
  },
  'change-content-index': (state, action) => {
    let value = action.get('value');
    if (!Array.isArray(value)) {
      value = [value];
    }
    return state
      .set('contentIndex.name', action.get('name'))
      .set('contentIndex.value', value)
      .set('list', {})
      .set('count', action.get('count'));
  },
  fetch: (state, action) => {
    const rows = action.get('rows');
    for (const id in rows) {
      const row = `${rows[id]}-item`;
      state = state.set(`list.${row}`, id);
    }
    return state;
  },
  'handle-changes': state => {
    return state.set('list', {});
  },
  remove: state => {
    const newCount = Number(state.get('count')) - 1;
    return state.set('count', newCount).set('list', {});
  },
  add: (state, action) => {
    const count = action.get('count');
    return state.set('count', count).set('list', {});
  },
};
