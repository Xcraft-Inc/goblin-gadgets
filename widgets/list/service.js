'use strict';
//T:2019-02-27

const path = require('path');
const _ = require('lodash');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');
const {locks} = require('xcraft-core-utils');

// Define initial logic values
const logicState = {
  count: 0,
  list: {},
  options: {contentIndex: {}},
  highlights: [],
};

// Define logic handlers according rc.json
const logicHandlers = require('./logic-handlers.js');

class List {
  static resolveMode(quest, options) {
    if (!options) {
      quest.goblin.setX('mode', 'index');
    } else {
      if (options.contentIndex) {
        quest.goblin.setX('mode', 'index');
      } else if (options.entityId && options.path) {
        if (options.orderBy && options.pathType) {
          quest.goblin.setX('mode', 'entity-ordered');
        } else {
          quest.goblin.setX('mode', 'entity');
        }
      } else if (options.query) {
        quest.goblin.setX('mode', 'query');
      } else if (options.field) {
        quest.goblin.setX('mode', 'search');
      } else {
        throw new Error('List create, bad options provided');
      }
    }
  }

  static _init(quest, options) {
    const r = quest.getStorage('rethink');
    const table = quest.goblin.getX('table');
    const mode = quest.goblin.getX('mode');
    if (!options) {
      options = quest.goblin
        .getState()
        .get('options')
        .toJS();
    }

    return {r, table, mode, options};
  }

  static *_ids(quest, range) {
    const {r, table, mode, options} = this._init(quest);
    switch (mode) {
      case 'search': {
        const value = quest.goblin.getX('value');

        return yield* List.executeSearch(
          quest,
          value,
          options.sort,
          options.filter,
          range
        );
      }
      case 'index': {
        return yield r.getIds({
          table,
          contentIndex: options.contentIndex,
          range,
        });
      }
      case 'entity': {
        const collection = yield r.getIn({
          table,
          documentId: options.entityId,
          path: [options.path],
        });
        return collection.slice(range.start, range.start + range.length);
      }
      case 'entity-ordered': {
        return yield r.getOrderedCollectionIds({
          table,
          documentId: options.entityId,
          collectionTable: options.pathType,
          collection: options.path,
          orderBy: options.orderBy,
          range,
        });
      }
      case 'query': {
        return yield r.queryIds({
          query: options.query.toString(),
          args: options.queryArgs || [],
        });
      }
    }
  }

  static *count(quest, initOptions) {
    const {r, table, mode, options} = this._init(quest, initOptions);
    switch (mode) {
      case 'search': {
        const value = quest.goblin.getX('value');
        //TODO: execute a real count aggregation
        yield* List.executeSearch(quest, value, options.sort, options.filter);
        return quest.goblin.getX('count');
      }
      case 'index': {
        const count = yield r.count({
          table,
          contentIndex: options.contentIndex,
        });
        quest.goblin.setX('count', count);
        return count;
      }
      case 'entity': {
        const collection = yield r.getIn({
          table,
          documentId: options.entityId,
          path: [options.path],
        });
        const count = collection.length;
        quest.goblin.setX('count', count);
        return count;
      }
      case 'entity-ordered': {
        const count = yield r.getOrderedCollectionCount({
          table,
          documentId: options.entityId,
          collectionTable: options.pathType,
          collection: options.path,
          orderBy: options.orderBy,
        });
        quest.goblin.setX('count', count);
        return count;
      }
      case 'query': {
        const count = yield r.queryCount({
          query: options.query,
          args: options.queryArgs || [],
        });
        quest.goblin.setX('count', count);
        return count;
      }
    }
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

    const ids = Object.values(
      _.mapKeys(
        Object.assign(
          {},
          yield* this._ids(quest, {
            start: range[0],
            length: range[1] - range[0] + 1,
          })
        ),
        (_, k) => Number(k) + range[0]
      )
    );
    quest.goblin.setX('ids', ids);
    return ids;
  }

  static *changes(quest) {
    const {r, table, options} = this._init(quest);
    const goblinId = quest.goblin.id;
    yield r.stopOnChanges({
      goblinId,
    });

    let changeSub = quest.goblin.getX('changeSub');
    if (!changeSub) {
      changeSub = quest.sub(
        `*::${quest.getStorage('rethink').id}.${goblinId}-cursor.changed`,
        function*(err, {msg, resp}) {
          yield resp.cmd(`${goblinName}.handle-changes`, {
            id: goblinId,
            change: msg.data,
          });
        }
      );
      quest.goblin.setX('changeSub', changeSub);
    }

    yield r.startQuestOnChanges({
      table,
      goblinId,
      options: options,
    });
  }

  static *executeSearch(quest, value, sort, filter, range) {
    const elastic = quest.getStorage('elastic');

    quest.goblin.setX('value', value);
    quest.goblin.setX('highlights', []);

    const options = quest.goblin
      .getState()
      .get('options')
      .toJS();

    let from;
    let size = 10;

    if (!range) {
      range = quest.goblin.getX('range');

      from = range ? range[0] : undefined;
      size = range ? range[1] - range[0] + 1 : undefined;
    } else {
      from = range.start;
      size = range.length;
    }

    let type = options.type;
    const subTypes = options.subTypes;
    if (subTypes) {
      subTypes.forEach(subType => {
        type = `${type},${subType}`;
      });
    }

    let values = [];
    let searchAfter = null;
    if (from + size > 9999) {
      searchAfter = [quest.goblin.getX('searchAfter')];
    }

    let results = yield elastic.search({
      type,
      value,
      sort,
      filter,
      from: searchAfter ? -1 : from,
      size,
      searchAfter,
      mustExist: true,
      source: false,
    });

    values = results.hits.hits.map(h => h._id);

    if (results.hits.hits.length > 0) {
      const sortField = options.sort.key.replace('.keyword', '');
      quest.goblin.setX(
        'searchAfter',
        results.hits.hits[results.hits.hits.length - 1]._source[sortField]
      );
    }

    /*const currentValues = quest.goblin.getX('ids', []);
    const checkValues = [];
    const values = [];
    const highlights = {};

    let total = 0;
    let double = 0;
    let notHigh = 0;
    if (results) {
      total = results.hits.total;
      var index = Number.isInteger(from) ? from : 0;

      results.hits.hits.forEach(hit => {
        let valueId = hit._id;
        let hitId = hit._id;
        if (options.subJoins) {
          options.subJoins.forEach(subJoin => {
            const join = hit._source[subJoin];
            if (join) {
              valueId = join;
            }
          });
        }

        let hasHigh = true;
        if (hit.highlight) {
          const phonetic =
            hit.highlight.searchPhonetic &&
            hit.highlight.searchPhonetic[0].includes('<em>')
              ? hit.highlight.searchPhonetic[0].replace(/<\/?em>/g, '`')
              : undefined;
          const auto =
            hit.highlight.searchAutocomplete &&
            hit.highlight.searchAutocomplete[0].includes('<em>')
              ? hit.highlight.searchAutocomplete[0].replace(/<\/?em>/g, '`')
              : undefined;

          const valueHighlight = phonetic ? phonetic : auto;
          if (valueHighlight) {
            highlights[hitId] = valueHighlight;
          } else {
            hasHigh = false;
            notHigh++;
          }
        }

        if (hasHigh) {
          var currentValue = currentValues[index];
          if (currentValue) {
            values[index] = valueId;
            index++;
          } else {
            if (!checkValues.includes(valueId)) {
              values[index] = valueId;
              checkValues.push(valueId);
              index++;
            } else {
              double++;
            }
          }
        }
      });
    }*/
    quest.goblin.setX('count', results.hits.total);
    quest.goblin.setX('ids', values);
    quest.goblin.setX('highlights', {});

    return values;
  }
}

//contentIndex => options
//  classic on index case:
//  {contentIndex: {name:'',value:''}}
//  collection case:
//  {entityId: type@guid, path: '.collection'}
//  search case:
//  {
//   field: 'id',
//   fields: ['info'],
//   type: 'document',
//   subTypes: [''],
//   subJoins: [''],
//   sort: {dir: 'asc', key: 'value.keyword'},
//   filter: {}
// }
// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(
  quest,
  desktopId,
  table,
  status,
  options
) {
  /* This mutex prevent races when indices are fetching and the content-index
   * is changing. It must not be possible to run a fetch while a
   * change-content-index is running, otherwise the indices are lost.
   */
  const mutex = new locks.Mutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('table', table);

  List.resolveMode(quest, options);
  quest.do();
  const id = quest.goblin.id;
  const count = yield* List.count(quest, options);

  quest.dispatch('set-count', {count});

  yield quest.me.initList();
  return id;
});

Goblin.registerQuest(goblinName, 'change-options', function*(quest, options) {
  List.resolveMode(quest, options);

  const count = yield* List.count(quest, options);

  quest.do({
    count,
    options,
  });

  yield quest.me.initList();
  yield quest.me.fetch();
});

Goblin.registerQuest(goblinName, 'get-list-ids', function(quest) {
  return quest.goblin.getX('ids');
});

Goblin.registerQuest(goblinName, 'customize-visualization', function*(
  quest,
  value,
  filter,
  sort
) {
  quest.goblin.setX('value', value || '');
  quest.do();
  const count = yield* List.count(quest);
  quest.dispatch('set-count', {count});
  yield quest.me.initList();
  yield quest.me.fetch();
});

Goblin.registerQuest(goblinName, 'change-content-index', function*(
  quest,
  name,
  value
) {
  const contentIndex = {name, value};
  quest.evt('content-index-changed', contentIndex);

  const count = yield* List.count(quest, {contentIndex});
  quest.do({count});
  yield quest.me.initList();
  yield quest.me.fetch();
});

Goblin.registerQuest(goblinName, 'handle-changes', function*(quest, change) {
  const mode = quest.goblin.getX('mode');
  switch (mode) {
    case 'search':
    case 'query':
    case 'index': {
      switch (change.type) {
        case 'add': {
          quest.dispatch('add');
          yield quest.me.fetch();
          break;
        }

        case 'change': {
          quest.do();
          yield quest.me.fetch();
          break;
        }

        case 'remove': {
          quest.dispatch('remove');
          yield quest.me.fetch();
          break;
        }
      }
      break;
    }
    case 'entity-ordered':
    case 'entity': {
      if (change.type === 'change') {
        const path = quest.goblin.getState().get('options.path');

        if (change.new_val[path].length > change.old_val[path].length) {
          quest.dispatch('add');
        }
        if (change.new_val[path].length < change.old_val[path].length) {
          quest.dispatch('remove');
        }
        if (change.new_val[path].length === change.old_val[path].length) {
          quest.do();
        }

        yield quest.me.fetch();
      }

      break;
    }
  }
});

const fetchLock = locks.getMutex;
Goblin.registerQuest(goblinName, 'fetch', function*(quest, range) {
  const locky = quest.goblin.id;
  yield fetchLock.lock(locky);
  quest.defer(() => fetchLock.unlock(locky));

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
  const count = quest.goblin.getX('count');
  if (ids.length > 0) {
    quest.do({count, ids, offset: range[0]});
  }
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  yield* List.changes(quest);
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
