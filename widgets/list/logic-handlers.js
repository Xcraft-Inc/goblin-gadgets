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
  'init-list': Goblin.Shredder.mutableReducer((state, action) => {
    const ids = action.get('ids');
    const count = action.get('count');
    const highlights = action.get('highlights');

    const items = ids.reduce((list, id, index) => {
      list[`${index}-item`] = id;
      return list;
    }, {});

    state = state.set(`list`, items);

    state = state.set('count', count);
    state = state.set('highlights', highlights);
    return state;
  }),
  'rethink-fetch': Goblin.Shredder.mutableReducer((state, action) => {
    const rows = action.get('rows');
    const ids = action.get('ids');

    state = state.set(
      'list',
      state.get('list').filter((_, row) => {
        const index = Number(row.replace(/-item/, ''));
        return !!ids[index];
      })
    );

    for (const id in rows) {
      const row = `${rows[id]}-item`;
      state = state.set(`list.${row}`, id);
    }

    return state;
  }),
  'handle-changes': state => {
    return state.set('list', {});
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
