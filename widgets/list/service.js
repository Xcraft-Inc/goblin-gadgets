'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');

// Define initial logic values
const logicState = {
  count: 0,
  list: {},
  status: ['published'],
};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    return state
      .set('id', action.get('id'))
      .set('count', action.get('count'))
      .set('pageSize', action.get('pageSize'))
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

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  filter,
  pageSize,
  orderBy
) {
  quest.goblin.setX('desktopId', desktopId);
  const r = quest.getStorage('rethink');
  quest.goblin.setX('table', table);
  quest.goblin.setX('orderBy', orderBy);
  quest.goblin.setX('filter', filter);

  if (!pageSize) {
    pageSize = 100;
    quest.goblin.setX('pageSize', 100);
  } else {
    quest.goblin.setX('pageSize', pageSize);
  }

  const status = quest.goblin
    .getState()
    .get('status')
    .toArray();
  const listIds = yield r.getBaseList({table, filter, orderBy, status});

  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({count: listIds.length, pageSize});
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'change-status', function*(quest, status) {
  if (status.length === 0) {
    return;
  }
  quest.evt('status-changed', {status});
  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const pageSize = quest.goblin.getX('pageSize');
  const orderBy = quest.goblin.getX('orderBy');
  const filter = quest.goblin.getX('filter');

  const listIds = yield r.getBaseList({table, filter, orderBy, status});
  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({status, count: listIds.length, pageSize});
});

Goblin.registerQuest(goblinName, 'handle-changes', function(quest, change) {
  const listIds = quest.goblin.getX('listIds');

  if (change.type === 'add') {
    listIds.push(change.new_val.id);
    quest.goblin.setX('listIds', listIds);
    quest.dispatch('add', {entity: change.new_val});
  }

  if (change.type === 'change') {
    const row = quest.goblin
      .getState()
      .get(`private.rowById.${change.new_val.id}`);
    quest.do({row, document: change.new_val});
  }

  if (change.type === 'remove') {
    const inListIndex = listIds.indexOf(change.old_val.id);
    if (inListIndex !== -1) {
      listIds.splice(inListIndex, 1);
      quest.goblin.setX('listIds', listIds);
      const from = quest.goblin.getState().get('from');
      const to = quest.goblin.getState().get('to');
      quest.me.loadRange({from, to, force: true});
    }
    quest.dispatch('remove');
  }
});

Goblin.registerQuest(goblinName, 'load-range', function*(
  quest,
  from,
  to,
  force
) {
  const cFrom = quest.goblin.getState().get('from');
  const cTo = quest.goblin.getState().get('to');
  if (from >= cFrom && to <= cTo && !force) {
    return;
  }

  quest.dispatch('updateRange', {from, to});

  const newFrom = quest.goblin.getState().get('from');
  const newTo = quest.goblin.getState().get('to');

  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const listIds = quest.goblin.getX('listIds');
  const documents = listIds.slice(newFrom, newTo);
  const docs = yield r.getAll({table, documents});
  const rows = {};
  const rowById = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    rowById[doc.id] = `${from}-item`;
    from++;
  }
  quest.do({rows, rowById});
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  const pageSize = quest.goblin.getX('pageSize');
  const table = quest.goblin.getX('table');
  let from = 0;
  const to = pageSize;
  const listIds = quest.goblin.getX('listIds');
  const documents = listIds.slice(from, to);
  const r = quest.getStorage('rethink');
  const docs = yield r.getAll({table, documents});
  yield r.stopOnChanges({
    goblinId: quest.goblin.id,
  });
  r.startQuestOnChanges({
    table,
    onChangeQuest: `${goblinName}.handle-changes`,
    goblinId: quest.goblin.id,
    status: ['published'],
  });
  const rows = {};
  const rowById = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    rowById[doc.id] = `${from}-item`;
    from++;
  }
  quest.dispatch('load-range', {rows, rowById});
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
