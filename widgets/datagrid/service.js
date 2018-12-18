'use strict';

const path = require('path');
const _ = require('lodash');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');
const {locks} = require('xcraft-core-utils');

// Define initial logic values
const logicState = {
  list: {},
};

// Define logic handlers according rc.json
const logicHandlers = require('./logicHandlers.js');

class Datagrid {
  static *executeSearch(quest, value, sort) {
    const elastic = quest.getStorage('elastic');

    quest.goblin.setX('value', value);
    quest.goblin.setX('sort', sort);

    const hinter = quest.goblin.getX('hinter');

    const range = quest.goblin.getX('range');
    const from = range[0];
    const size = range[1] - range[0] + 1;

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
    });

    let values = [];
    if (results) {
      quest.goblin.setX('count', results.hits.total);

      results.hits.hits.map(hit => {
        if (!hit.highlight) {
          return hit._source.info;
        }

        let phonetic = false;
        let autocomplete = false;

        if (hit.highlight.searchPhonetic) {
          phonetic = true;
        }
        if (hit.highlight.searchAutocomplete) {
          autocomplete = true;
        }

        if (!phonetic && !autocomplete) {
          return hit._source.info;
        }

        // Prefer phonetic result if possible, but use autocomplete result
        // if there are more tags.
        if (phonetic && autocomplete) {
          const countPhonetic = (
            hit.highlight.searchPhonetic[0].match(/<em>/g) || []
          ).length;
          const countAutocomplete = (
            hit.highlight.searchAutocomplete[0].match(/<em>/g) || []
          ).length;
          if (countAutocomplete > countPhonetic) {
            phonetic = false;
          }
        }

        return phonetic
          ? hit.highlight.searchPhonetic[0].replace(/<\/?em>/g, '`')
          : hit.highlight.searchAutocomplete[0].replace(/<\/?em>/g, '`');
      });

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
        if (!values.includes(value)) {
          values.push(value);
        }
      });
    }

    quest.goblin.setX('ids', values);
    return values;
  }
}

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function*(quest, desktopId, hinter) {
  const mutex = new locks.Mutex();
  quest.goblin.setX('mutex', mutex);

  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('hinter', hinter);
  quest.goblin.setX('range', [0, 1]);

  const id = quest.goblin.id;
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
  const ids = yield* Datagrid.executeSearch(quest, filter, sort);
  const count = quest.goblin.getX('count');
  quest.do({ids, count});
});

Goblin.registerQuest(goblinName, 'fetch', function*(quest, range) {
  yield quest.goblin.getX('mutex').lock();
  quest.defer(() => quest.goblin.getX('mutex').unlock());

  if (range) {
    quest.goblin.setX('range', range);
  } else {
    range = quest.goblin.getX('range', []);
  }

  if (range.length > 0) {
    if (range[0] > 0) {
      range[0]--;
    }
    range[1]++;
  } else {
    range = [0, 1];
  }

  const value = quest.goblin.getX('value');
  const sort = quest.goblin.getX('sort');

  const ids = yield* Datagrid.executeSearch(quest, value, sort);
  const count = quest.goblin.getX('count');
  quest.do({ids, count});
});

Goblin.registerQuest(goblinName, 'init-list', function*(quest) {
  const value = quest.goblin.getX('value');
  const sort = quest.goblin.getX('sort');

  const ids = yield* Datagrid.executeSearch(quest, value, sort);
  const count = quest.goblin.getX('count');
  quest.do({ids, count});
});

Goblin.registerQuest(goblinName, 'delete', function(quest) {
  quest.evt('disposed');
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
