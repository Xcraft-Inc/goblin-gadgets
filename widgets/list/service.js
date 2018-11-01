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
const logicHandlers = require('./logicHandlers.js');

const getIdAndInfo = doc => {
  return {id: doc.id, value: doc.meta.summaries.description};
};
// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  status,
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

  const initialStatus =
    status ||
    quest.goblin
      .getState()
      .get('status')
      .toArray();
  const listIds = yield r.getBaseList({
    table,
    filter,
    orderBy,
    status: initialStatus,
  });

  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({count: listIds.length, pageSize, status: initialStatus});
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'get-list-ids', function(quest) {
  return quest.goblin.getX('listIds');
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

Goblin.registerQuest(goblinName, 'change-visualization', function*(
  quest,
  orderBy,
  filter
) {
  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const pageSize = quest.goblin.getX('pageSize');
  const status = quest.goblin
    .getState()
    .get('status')
    .toArray();
  quest.goblin.setX('orderBy', orderBy);
  quest.goblin.setX('filter', filter);

  const listIds = yield r.getBaseList({table, filter, orderBy, status});
  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({count: listIds.length, pageSize});
});

Goblin.registerQuest(goblinName, 'handle-changes', function(quest, change) {
  const listIds = quest.goblin.getX('listIds');

  if (change.type === 'add') {
    listIds.push(change.new_val.id);
    quest.goblin.setX('listIds', listIds);
    quest.dispatch('add', {entity: getIdAndInfo(change.new_val)});
  }

  if (change.type === 'change') {
    const row = quest.goblin
      .getState()
      .get(`private.rowById.${change.new_val.id}`);
    quest.do({row, document: getIdAndInfo(change.new_val)});
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
    rows[`${from}-item`] = getIdAndInfo(doc);
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
    rows[`${from}-item`] = getIdAndInfo(doc);
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
