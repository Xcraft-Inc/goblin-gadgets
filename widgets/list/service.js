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
    return state.set ('list', action.get ('rows'));
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
  table,
  pageSize,
  orderBy
) {
  const i = quest.openInventory ();
  const r = i.use ('rethink@main');
  let count = 0;
  quest.goblin.setX ('table', table);
  if (!pageSize) {
    pageSize = 100;
    quest.goblin.setX ('pageSize', 100);
  } else {
    quest.goblin.setX ('pageSize', pageSize);
  }

  count = yield r.count ({table});
  const listIds = yield r.getBaseList ({table, orderBy});
  quest.goblin.setX ('listIds', listIds);
  quest.me.initList ();
  quest.do ({count, pageSize});
  return quest.goblin.id;
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
  const r = i.use ('rethink@main');
  const table = quest.goblin.getX ('table');
  const listIds = quest.goblin.getX ('listIds');
  const documents = listIds.slice (newFrom, newTo);
  const docs = yield r.getAll ({table, documents});
  const rows = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    from++;
  }
  quest.do ({rows});
});

Goblin.registerQuest (goblinName, 'init-list', function* (quest) {
  const pageSize = quest.goblin.getX ('pageSize');
  const table = quest.goblin.getX ('table');
  let from = 0;
  const to = pageSize;
  const listIds = quest.goblin.getX ('listIds');
  const documents = listIds.slice (from, to);
  const i = quest.openInventory ();
  const r = i.use ('rethink@main');
  const docs = yield r.getAll ({table, documents});
  const rows = {};
  for (const doc of docs) {
    rows[`${from}-item`] = doc;
    from++;
  }
  quest.dispatch ('load-range', {rows});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
