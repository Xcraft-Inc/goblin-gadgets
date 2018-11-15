'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');
const {locks} = require('xcraft-core-utils');

// Define initial logic values
const logicState = {
  count: 0,
  list: {},
  contentIndex: {},
};

// Define logic handlers according rc.json
const logicHandlers = require('./logicHandlers.js');

function* getList(quest, contentIndex) {
  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');

  if (!contentIndex) {
    contentIndex = quest.goblin
      .getState()
      .get('contentIndex')
      .toJS();
  }

  const listIds = yield r.getBaseList({table, contentIndex});
  quest.goblin.setX('listIds', listIds);
  return listIds.length;
}

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  contentIndex
) {
  /* This mutex prevent races when indices are fetching and the content-index
   * is changing. It must not be possible to run a fetch while a
   * change-content-index is running, otherwise the indices are lost.
   */
  const mutex = new locks.RecursiveMutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('table', table);

  const count = yield* getList(quest, contentIndex);
  quest.do({count, contentIndex});

  yield quest.me.initList();
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'change-content-index', function*(
  quest,
  name,
  value
) {
  const uuid = quest.uuidV4();
  yield quest.goblin.getX('mutex').lock(uuid);
  quest.defer(() => quest.goblin.getX('mutex').unlock(uuid));

  const contentIndex = {name, value};
  quest.evt('content-index-changed', contentIndex);

  const count = yield* getList(quest, contentIndex);
  yield quest.me.initList();

  quest.goblin.setX('fetching', {});
  quest.do({count});
});

Goblin.registerQuest(goblinName, 'handle-changes', function*(quest, change) {
  const uuid = quest.uuidV4();
  yield quest.goblin.getX('mutex').lock(uuid);
  quest.defer(() => quest.goblin.getX('mutex').unlock(uuid));

  switch (change.type) {
    case 'add': {
      const count = yield* getList(quest);
      quest.dispatch('add', {count});
      break;
    }

    case 'change': {
      yield* getList(quest);
      quest.do();
      break;
    }

    case 'remove': {
      const listIds = quest.goblin.getX('listIds');
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
    contentIndex: quest.goblin
      .getState()
      .get('contentIndex')
      .toJS(),
  });
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
