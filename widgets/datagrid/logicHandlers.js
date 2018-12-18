module.exports = {
  create: (state, action) => {
    return state.set('id', action.get('id'));
  },
  'customize-visualization': (state, action) => {
    const ids = action.get('ids');
    const count = action.get('count');
    return state.set('list', ids).set('count', count);
  },
  'init-list': (state, action) => {
    const ids = action.get('ids');
    const count = action.get('count');
    return state.set('list', ids).set('count', count);
  },
  fetch: (state, action) => {
    const ids = action.get('ids');
    const count = action.get('count');
    return state.set('list', ids).set('count', count);
  },
};
