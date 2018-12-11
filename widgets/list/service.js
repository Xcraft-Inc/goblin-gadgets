'use strict';

const path = require('path');
const _ = require('lodash');

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

const getIdAndInfo = doc => {
  return {id: doc.id, value: doc.meta.summaries.description};
};

class List {
  static _init(quest, contentIndex) {
    const r = quest.getStorage('rethink');
    const table = quest.goblin.getX('table');
    const filter = quest.goblin.getX('filter');
    const orderBy = quest.goblin.getX('orderBy');
    contentIndex = contentIndex
      ? contentIndex
      : quest.goblin
          .getState()
          .get('contentIndex')
          .toJS();
    return {r, table, contentIndex, filter, orderBy};
  }

  static *_ids(quest, index, range) {
    const {r, table, contentIndex, filter, orderBy} = this._init(quest, index);
    return yield r.getIds({
      table,
      contentIndex,
      range,
      filter,
      orderBy,
    });
  }

  static *count(quest, index) {
    const {r, table, contentIndex, filter, orderBy} = this._init(quest, index);
    return yield r.count({
      table,
      contentIndex,
      filter,
      orderBy,
    });
  }

  /**
   * Fetch the document IDs accordingly a range.
   *
   * @param {*} quest - Quest context
   * @param {Object} range - Range in the list
   * @returns {Object} the IDs
   */
  static *refresh(quest, range) {
    /* The result is an array, we must correct the keys according to the
     * offset (first index).
     */
    const ids = _.mapKeys(
      Object.assign(
        {},
        yield* this._ids(quest, null, {
          start: range[0],
          length: range[1] - range[0] + 1,
        })
      ),
      (_, k) => Number(k) + range[0]
    );
    quest.goblin.setX('ids', ids);
    return ids;
  }

  static *changes(quest) {
    const {r, table, contentIndex, filter, orderBy} = this._init(quest);
    yield r.stopOnChanges({
      goblinId: quest.goblin.id,
    });
    yield r.startQuestOnChanges({
      table,
      onChangeQuest: `${goblinName}.handle-changes`,
      goblinId: quest.goblin.id,
      contentIndex,
      filter,
      orderBy,
    });
  }
}

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  status,
  contentIndex,
  filter,
  type,
  orderBy
) {
  /* This mutex prevent races when indices are fetching and the content-index
   * is changing. It must not be possible to run a fetch while a
   * change-content-index is running, otherwise the indices are lost.
   */
  const mutex = new locks.Mutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('table', table);
  quest.goblin.setX('orderBy', orderBy);
  quest.goblin.setX('filter', filter);

  const count = yield* List.count(quest, contentIndex);

  quest.do({
    count,
    contentIndex,
  });

  yield quest.me.initList();
  const range = [0, count + 1];
  quest.goblin.setX('range', range);
  yield quest.me.fetch(quest);

  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'get-list-ids', function(quest) {
  return quest.goblin.getX('ids');
});

Goblin.registerQuest(goblinName, 'change-status', function*(quest, status) {
  if (status.length === 0) {
    return;
  }
  quest.evt('status-changed', {status});

  const count = yield* List.count(quest);
  quest.me.initList();
  quest.me.fetch(quest);
  quest.do({status, count});
});

Goblin.registerQuest(goblinName, 'change-visualization', function*(
  quest,
  orderBy,
  filter
) {
  const r = quest.getStorage('rethink');
  const table = quest.goblin.getX('table');
  const status = quest.goblin
    .getState()
    .get('status')
    .toArray();
  quest.goblin.setX('orderBy', orderBy);
  quest.goblin.setX('filter', filter);

  const listIds = yield r.getBaseList({table, filter, orderBy, status});
  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({count: listIds.length});
});

Goblin.registerQuest(goblinName, 'customize-visualization', function*(
  quest,
  listIdsGetter
) {
  const listIds = yield listIdsGetter();
  quest.goblin.setX('listIds', listIds);
  quest.me.initList();
  quest.do({count: listIds.length});
});

// NABU : old crete -- STOP

Goblin.registerQuest(goblinName, 'change-content-index', function*(
  quest,
  name,
  value
) {
  const contentIndex = {name, value};
  quest.evt('content-index-changed', contentIndex);

  const count = yield* List.count(quest, contentIndex);
  quest.do({count});
  yield quest.me.initList();
  yield quest.me.fetch(quest);
});

Goblin.registerQuest(goblinName, 'handle-changes', function*(quest, change) {
  switch (change.type) {
    case 'add': {
      quest.dispatch('add');
      yield quest.me.fetch(quest);
      break;
    }

    case 'change': {
      quest.do();
      yield quest.me.fetch(quest);
      break;
    }

    case 'remove': {
      quest.dispatch('remove');
      yield quest.me.fetch(quest);
      break;
    }
  }
});

Goblin.registerQuest(goblinName, 'fetch', function*(quest, range) {
  yield quest.goblin.getX('mutex').lock();
  quest.defer(() => quest.goblin.getX('mutex').unlock());

  if (range) {
    quest.goblin.setX('range', range);
  } else {
    range = quest.goblin.getX('range', []);
  }

  /* Ensure at least one item before and after the requested range.
   * It handles the case where the whole list is shorter that the view and
   * a new item is just added (and notified by the changes event).
   */
  if (range.length > 0) {
    if (range[0] > 0) {
      range[0]--;
    }
    range[1]++;
  } else {
    range = [0, 1];
  }

  const ids = yield* List.refresh(quest, range);

  let _do = false;
  const rows = {};
  for (const index in ids) {
    rows[ids[index]] = index;
    _do = true;
  }

  if (_do) {
    quest.do({rows, ids});
  }
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  const r = quest.getStorage('rethink');

  const table = quest.goblin.getX('table');
  let from = 0;
  const to = 200; //was pageSize

  const hasStatus = quest.goblin.getState().get('status');
  const status = hasStatus ? hasStatus.toArray() : ['draft', 'published'];

  let listIds = quest.goblin.getX('ids');
  if (!(listIds instanceof Array)) {
    yield* List.changes(quest);
    return;
  }

  const slice = listIds.slice(from, to);
  const docs = _.keyBy(yield r.getAll({table, slice}), doc => doc.id);

  yield r.stopOnChanges({
    goblinId: quest.goblin.id,
  });
  r.startQuestOnChanges({
    table,
    onChangeQuest: `${goblinName}.handle-changes`,
    goblinId: quest.goblin.id,
    status, // ?? or ['published']? (was written before)
  });
  const rows = {};
  const rowById = {};

  for (const item of slice) {
    const doc = docs[item];
    rows[`${from}-item`] = getIdAndInfo(doc);
    rowById[doc.id] = `${from}-item`;
    from++;
  }
  quest.dispatch('load-range', {rows, rowById});

  // ToDo : should use only this
  //yield* List.changes (quest);
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
