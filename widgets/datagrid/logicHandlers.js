module.exports = {
  create: (state, action) => {
    return state.set('id', action.get('id'));
  },
  'customize-visualization': (state, action) => {
    const ids = action.get('ids');
    return state.set('list', ids);
  },
  'load-range': (state, action) => {
    const ids = action.get('ids');
    return state.set('list', ids);
  },
  'init-list': (state, action) => {
    const ids = action.get('ids');
    return state.set('list', ids);
  },
  //NABU : old functions -- STOP
  fetch: (state, action) => {
    const ids = action.get('ids');
    return state.set('list', ids);
  },
};
