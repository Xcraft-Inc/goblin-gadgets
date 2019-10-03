'use strict';
//T:2019-02-27

const Goblin = require('xcraft-core-goblin');

module.exports = {
  'create': (state, action) => {
    return state
      .set('id', action.get('id'))
      .set('status', action.get('status'))
      .set('count', action.get('count'))
      .set('options', action.get('options'));
  },
  'set-count': (state, action) => {
    return state.set('count', action.get('count'));
  },
  'change-options': (state, action) => {
    return state
      .set('options', action.get('options'))
      .set('count', action.get('count'));
  },
  'customize-visualization': (state, action) => {
    const sort = action.get('sort');
    const filter = action.get('filter');
    if (sort) {
      state = state.set('options.sort', sort);
    }
    if (filter) {
      state = state.set('options.filter', filter);
    }
    return state;
  },
  'change-content-index': (state, action) => {
    let value = action.get('value');
    if (!Array.isArray(value)) {
      value = [value];
    }
    return state
      .set('options.contentIndex.name', action.get('name'))
      .set('options.contentIndex.value', value)
      .set('list', {})
      .set('count', action.get('count'));
  },
  'fetch': Goblin.Shredder.mutableReducer((state, action) => {
    const ids = action.get('ids');

    const highlights = action.get('highlights');
    if (highlights) {
      state = state.set('highlights', highlights);
    }
    const offset = action.get('offset');
    const items = ids.reduce((list, id, index) => {
      list[`${offset + index}-item`] = id;
      return list;
    }, {});

    state = state.set(`list`, items);
    state = state.set('count', action.get('count'));
    return state;
  }),
  'handle-changes': state => {
    return state.set('count', 0).set('list', {});
  },
  'remove': state => {
    const newCount = Number(state.get('count')) - 1;
    return state.set('count', newCount).set('list', {});
  },
  'add': state => {
    const newCount = Number(state.get('count')) + 1;
    return state.set('count', newCount).set('list', {});
  },
};
