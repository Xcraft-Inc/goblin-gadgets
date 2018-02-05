'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {count: 0, list: {}};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    return state
      .set ('id', action.get ('id'))
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
  'handle-changes': (state, action) => {
    return state.set (`list.${action.get ('row')}`, action.get ('document'));
  },
  remove: (state, action) => {
    const id = action.get ('id');
    const row = state.get (`private.rowById.${id}`);
    const newCount = Number (state.get ('count')) - 1;
    return state
      .del (`list.${row}`)
      .del (`private.rowById.${id}`)
      .set ('count', newCount);
  },
  updateRange: (state, action) => {
    const pageSize = state.get ('pageSize');
    const count = state.get ('count');

    let from = action.get ('from');
    if (from >= pageSize) {
      from = from - pageSize;
    } else {
      from = 0;
    }
    let to = action.get ('to');
    if (to <= count - pageSize) {
      to = to + pageSize;
    }
    return state.set ('from', from).set ('to', to);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function* (
  quest,
  desktopId,
  table,
  pageSize,
  orderBy
) {
  quest.goblin.setX ('desktopId', desktopId);
  const i = quest.openInventory ();
  const r = i.getAPI (`rethink@${desktopId}`);
  let count = 0;
  quest.goblin.setX ('table', table);
  if (!pageSize) {
    pageSize = 100;
    quest.goblin.setX ('pageSize', 100);
  } else {
    quest.goblin.setX ('pageSize', pageSize);
  }

  count = yield r.count ({table, status: ['published']});
  const listIds = yield r.getBaseList ({table, orderBy});
  quest.goblin.setX ('listIds', listIds);
  quest.me.initList ();
  quest.do ({count, pageSize});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'handle-changes', function (quest, change) {
  if (change.type === 'change') {
    const row = quest.goblin
      .getState ()
      .get (`private.rowById.${change.new_val.id}`);
    quest.do ({row, document: change.new_val});
  }
  if (change.type === 'remove') {
    quest.dispatch ('remove', {id: change.old_val.id});
  }
});

Goblin.registerQuest (goblinName, 'load-range', function* (quest, from, to) {
  const cFrom = quest.goblin.getState ().get ('from');
  const cTo = quest.goblin.getState ().get ('to');
  if (from >= cFrom && to <= cTo) {
    return;
  }

  quest.dispatch ('updateRange', {from, to});

  const newFrom = quest.goblin.getState ().get ('from');
  const newTo = quest.goblin.getState ().get ('to');

  const i = quest.openInventory ();
  const desktopId = quest.goblin.getX ('desktopId');
  const r = i.getAPI (`rethink@${desktopId}`);
  const table = quest.goblin.getX ('table');
  const listIds = quest.goblin.getX ('listIds');
  const documents = listIds.slice (newFrom, newTo);
  const docs = yield r.getAll ({table, documents});
  yield r.stopOnChanges ({
    goblinId: quest.goblin.id,
  });
  r.startQuestOnChanges ({
    table,
    onChangeQuest: `${goblinName}.handle-changes`,
    goblinId: quest.goblin.id,
    documents,
  });
  const rows = {};
  const rowById = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    rowById[doc.id] = `${from}-item`;
    from++;
  }
  quest.do ({rows, rowById});
});

Goblin.registerQuest (goblinName, 'init-list', function* (quest) {
  const pageSize = quest.goblin.getX ('pageSize');
  const table = quest.goblin.getX ('table');
  let from = 0;
  const to = pageSize;
  const listIds = quest.goblin.getX ('listIds');
  const documents = listIds.slice (from, to);
  const i = quest.openInventory ();
  const desktopId = quest.goblin.getX ('desktopId');
  const r = i.getAPI (`rethink@${desktopId}`);
  const docs = yield r.getAll ({table, documents});
  yield r.stopOnChanges ({
    goblinId: quest.goblin.id,
  });
  r.startQuestOnChanges ({
    table,
    onChangeQuest: `${goblinName}.handle-changes`,
    goblinId: quest.goblin.id,
    documents,
  });
  const rows = {};
  const rowById = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    rowById[doc.id] = `${from}-item`;
    from++;
  }
  quest.dispatch ('load-range', {rows, rowById});
});

Goblin.registerQuest (goblinName, 'delete', function (quest) {
  quest.evt ('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
