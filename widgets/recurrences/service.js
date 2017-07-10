'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const uuidV4 = require ('uuid/v4');

// Returns the order to insert an element before the one given the id.
// If id is undefined, returns the order to insert at the end.
function getGlyphOrder (list, id) {
  const glyphs = list.linq.orderBy (glyph => glyph.get ('order', 0)).toList ();
  if (id) {
    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      if (glyph.get ('id') === id) {
        if (i === 0) {
          return glyph.get ('order', 0) - 0.5; // insert before the first element
        } else {
          const prevGlyph = glyphs[i - 1];
          return (prevGlyph.get ('order', 0) + glyph.get ('order', 0)) / 2; // insert between two elements
        }
      }
    }
  }
  if (glyphs.length == 0) {
    return 0; // first order if list is empty
  } else {
    const lastGlyph = glyphs[glyphs.length - 1];
    return lastGlyph.get ('order', 0) + 0.5; // insert after the last element
  }
}

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      recurrences: {},
    };
    return state.set ('', initialState);
  },
  add: (state, action) => {
    const recurrence = action.get ('recurrence', {
      id: uuidV4 (),
      startDate: '2017-01-01',
      endDate: '2017-12-31',
      days: '',
      months: '1-12',
      deleteList: [],
      addList: [],
    });
    const list = state.get ('recurrences', {});
    const newList = list.unpush (recurrence);
    return state.set ('recurrences', newList);
  },
  remove: (state, action) => {
    const recurrence = action.get ('recurrence');
    const list = state.get ('recurrences', {});
    const newList = list.unpush (recurrence);
    return state.set ('recurrences', newList);
  },
  drag: (state, action) => {
    const fromId = action.get ('fromId');
    const toId = action.get ('toId');
    const glyph = state.get (`recurrences.${fromId}`).toJS ();
    glyph.order = getGlyphOrder (state.get ('recurrences'), toId); // FIXME factorize with glyphs.dialog !
    return state.set (`recurrences.${fromId}`, glyph);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest) {
  quest.do ({id: quest.goblin.id});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function (quest, recurrence) {
  quest.do ({recurrence});
});

Goblin.registerQuest (goblinName, 'remove', function (quest, recurrence) {
  quest.do ({recurrence});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
