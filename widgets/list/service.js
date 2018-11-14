'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');
const {locks} = require('xcraft-core-utils');

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
  filter,
  orderBy
) {
  /* This mutex prevent races when indices are fetching and the status is
   * changing. It must not be possible to run a fetch while a change-status
   * is running, otherwise the indices are lost.
   */
  const mutex = new locks.RecursiveMutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  const r = quest.getStorage('rethink');
  quest.goblin.setX('table', table);
  quest.goblin.setX('orderBy', orderBy);
  quest.goblin.setX('filter', filter);

  const status = quest.goblin
    .getState()
    .get('status')
    .toArray();
  const listIds = yield r.getBaseList({table, filter, orderBy, status});

  quest.goblin.setX('listIds', listIds);
  quest.do({count: listIds.length});
  yield quest.me.initList();
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'change-status', function*(quest, status) {
  if (status.length === 0) {
    return;
  }

  const uuid = quest.uuidV4();
  yield quest.goblin.getX('mutex').lock(uuid);
  quest.defer(() => quest.goblin.getX('mutex').unlock(uuid));

  quest.evt('status-changed', {status});
  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const orderBy = quest.goblin.getX('orderBy');
  const filter = quest.goblin.getX('filter');

  const listIds = yield r.getBaseList({table, filter, orderBy, status});
  quest.goblin.setX('listIds', listIds);
  yield quest.me.initList();

  quest.goblin.setX('fetching', {});
  quest.do({status, count: listIds.length});
});

Goblin.registerQuest(goblinName, 'handle-changes', function*(quest, change) {
  const uuid = quest.uuidV4();
  yield quest.goblin.getX('mutex').lock(uuid);
  quest.defer(() => quest.goblin.getX('mutex').unlock(uuid));

  const listIds = quest.goblin.getX('listIds');

  switch (change.type) {
    case 'add': {
      listIds.push(change.new_val.id);
      quest.goblin.setX('listIds', listIds);
      quest.dispatch('add', {entity: getIdAndInfo(change.new_val)});
      break;
    }

    case 'change': {
      const row = quest.goblin
        .getState()
        .get(`private.rowById.${change.new_val.id}`);
      quest.do({row, document: getIdAndInfo(change.new_val)});
      break;
    }

    case 'remove': {
      const inListIndex = listIds.indexOf(change.old_val.id);
      if (inListIndex !== -1) {
        listIds.splice(inListIndex, 1);
        quest.goblin.setX('listIds', listIds);
      }
      quest.dispatch('remove');
      break;
    }
  }
});

Goblin.registerQuest(goblinName, 'fetch', function*(quest, indices, next) {
  /* Allow recursive call on fetch (but keep safe with other quests) */
  yield quest.goblin.getX('mutex').lock(quest.goblin.id);
  quest.defer(() => quest.goblin.getX('mutex').unlock(quest.goblin.id));

  const state = quest.goblin.getState();
  const fetching = quest.goblin.getX('fetching', {});

  /* ignore indices already available on in fetching */
  indices = indices.filter(
    index => !state.has(`list.${index}-item`) && !fetching[index]
  );
  if (!indices.length) {
    return;
  }

  indices.forEach(index => {
    fetching[index] = true;
  });
  quest.defer(() => {
    indices.forEach(index => {
      delete fetching[index];
    });
  });

  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const listIds = quest.goblin.getX('listIds');

  /* generate an object of all fetched documents */
  const ids = Object.assign(
    {},
    ...indices.map(index => ({
      [listIds[index]]: index,
    }))
  );
  const docs = yield r.getAll({table, documents: Object.keys(ids)});

  const rows = {};
  for (const doc of docs) {
    rows[doc.id] = ids[doc.id];
    quest.create(
      doc.id,
      {
        id: doc.id,
        desktopId: quest.getDesktop(),
        mustExist: true,
        entity: doc,
      },
      next.parallel()
    );
  }
  quest.do({rows});
  yield next.sync();
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  const table = quest.goblin.getX('table');
  const r = quest.getStorage('rethink');
  yield r.stopOnChanges({
    goblinId: quest.goblin.id,
  });
  yield r.startQuestOnChanges({
    table,
    onChangeQuest: `${goblinName}.handle-changes`,
    goblinId: quest.goblin.id,
    status: ['published'],
  });
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
