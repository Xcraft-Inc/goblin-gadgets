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
