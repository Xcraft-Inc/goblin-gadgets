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

class List {
  static _init(quest, contentIndex) {
    const r = quest.getStorage('rethink');
    const table = quest.goblin.getX('table');
    contentIndex = contentIndex
      ? contentIndex
      : quest.goblin
          .getState()
          .get('contentIndex')
          .toJS();
    return {r, table, contentIndex};
  }

  static *_ids(quest, index, range) {
    const {r, table, contentIndex} = this._init(quest, index);
    return yield r.getIds({
      table,
      contentIndex,
      range,
    });
  }

  static *count(quest, index) {
    const {r, table, contentIndex} = this._init(quest, index);
    return yield r.count({
      table,
      contentIndex,
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
    const {r, table, contentIndex} = this._init(quest);
    yield r.stopOnChanges({
      goblinId: quest.goblin.id,
    });
    yield r.startQuestOnChanges({
      table,
      onChangeQuest: `${goblinName}.handle-changes`,
      goblinId: quest.goblin.id,
      contentIndex,
    });
  }

  static *executeSearch(quest, value, sort) {
    const elastic = quest.getStorage('elastic');

    quest.goblin.setX('value', value);
    quest.goblin.setX('sort', sort);

    const hinter = quest.goblin.getX('hinter');

    const range = quest.goblin.getX('range');
    const from = range ? range[0] : undefined;
    const size = range ? range[1] - range[0] + 1 : undefined;

    let type = hinter.type;
    const subTypes = hinter.subTypes;
    if (subTypes) {
      subTypes.forEach(subType => {
        type = `${type},${subType}`;
      });
    }

    const results = yield elastic.search({
      type,
      value,
      sort,
      from,
      size,
      mustExist: true,
    });

    let currentValues = quest.goblin.getX('ids', []);
    let checkValues = Array.from(currentValues.values);
    let values = [];

    let total = 0;
    let double = 0;
    if (results) {
      total = results.hits.total;
      var index = from;

      results.hits.hits.forEach(hit => {
        let value = hit._id;
        if (hinter.subJoins) {
          hinter.subJoins.forEach(subJoin => {
            const join = hit._source[subJoin];
            if (join) {
              value = join;
            }
          });
        }

        var currentValue = currentValues[index];
        if (currentValue && currentValue === value) {
          values[index] = value;
          index++;
        } else if (!currentValue) {
          if (!checkValues.includes(value)) {
            values[index] = value;
            checkValues.push(value);
            index++;
          } else {
            double++;
          }
        }
      });
    }

    quest.goblin.setX('count', total - double);
    quest.goblin.setX('ids', values);

    return values;
  }
}

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  status,
  contentIndex,
  hinter,
  sort,
  afterFetch
) {
  /* This mutex prevent races when indices are fetching and the content-index
   * is changing. It must not be possible to run a fetch while a
   * change-content-index is running, otherwise the indices are lost.
   */
  const mutex = new locks.Mutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('table', table);

  quest.goblin.setX('isElastic', hinter ? true : false);
  quest.goblin.setX('hinter', hinter);
  quest.goblin.setX('sort', sort);
  quest.goblin.setX('afterFetch', afterFetch);

  const id = quest.goblin.id;

  if (!hinter) {
    const count = yield* List.count(quest, contentIndex);

    quest.do({
      id,
      count,
      contentIndex,
    });

    yield quest.me.initList();
    return id;
  }

  quest.do({id});

  yield quest.me.initList();
  return id;
});

Goblin.registerQuest(goblinName, 'get-list-ids', function(quest) {
  return quest.goblin.getX('ids');
});

Goblin.registerQuest(goblinName, 'customize-visualization', function*(
  quest,
  filter,
  sort
) {
  quest.goblin.setX('ids', []);
  const ids = yield* List.executeSearch(quest, filter, sort);
  const count = quest.goblin.getX('count');
  quest.do({ids, count});
});

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

  const isElastic = quest.goblin.getX('isElastic');
  if (isElastic) {
    const value = quest.goblin.getX('value');
    const sort = quest.goblin.getX('sort');

    const ids = yield* List.executeSearch(quest, value, sort);
    const count = quest.goblin.getX('count');

    quest.dispatch('elastic-fetch', {ids, count});
    yield quest.me.afterFetch();

    return;
  }

  const ids = yield* List.refresh(quest, range);

  let _do = false;
  const rows = {};
  for (const index in ids) {
    rows[ids[index]] = index;
    _do = true;
  }

  if (_do) {
    quest.dispatch('rethink-fetch', {rows, ids});
    yield quest.me.afterFetch();
  }
});

Goblin.registerQuest(goblinName, 'after-fetch', function*(quest) {
  const afterFetch = quest.goblin.getX('afterFetch');
  if (afterFetch) {
    const childId = quest.me.id
      .split('@')
      .slice(1)
      .join('@');
    const childApi = quest.getAPI(childId);
    yield childApi.afterFetch({listId: quest.me.id});
  }
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  const isElastic = quest.goblin.getX('isElastic');

  if (!isElastic) {
    yield* List.changes(quest);
    return;
  }

  const value = quest.goblin.getX('value');
  const sort = quest.goblin.getX('sort');

  const ids = yield* List.executeSearch(quest, value, sort);
  const count = quest.goblin.getX('count');
  quest.do({ids, count});
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
