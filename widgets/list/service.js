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
      .set ('pageSize', action.get ('pageSize'));
  },
  'load-index': (state, action) => {
    return state.set ('list', action.get ('rows'));
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

Goblin.registerQuest (goblinName, 'load-index', function* (quest, index) {
  const pageSize = quest.goblin.getX ('pageSize');
  const count = quest.goblin.getState ().get ('count');
  const i = quest.openInventory ();
  const r = i.use ('rethink@main');
  const table = quest.goblin.getX ('table');
  const listIds = quest.goblin.getX ('listIds');

  let from = index;
  let to = index + pageSize;
  if (index > pageSize) {
    from = index - pageSize;
  } else {
    from = 0;
  }

  if (index >= count) {
    to = count;
  }

  const documents = listIds.slice (from, to);
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
  quest.dispatch ('load-index', {rows});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
