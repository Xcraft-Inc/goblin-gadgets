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
    const recurrenceId = action.get ('recurrenceId');
    return state.set (`recurrences.${recurrenceId}`, {id: recurrenceId});
  },
  remove: (state, action) => {
    const recurrenceId = action.get ('recurrenceId');
    return state.del (`recurrences.${recurrenceId}`);
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
Goblin.registerQuest (goblinName, 'create', function (
  quest,
  desktopId,
  recurrences
) {
  quest.do ({id: quest.goblin.id});
  for (const r in recurrences) {
    quest.cmd ('recurrences.add', {
      id: quest.goblin.id,
      desktopId,
      recurrence: recurrences[r],
    });
  }
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function (
  quest,
  desktopId,
  recurrence
) {
  const recurrenceId = recurrence ? recurrence.id : uuidV4 ();
  const id = `recurrence@${recurrenceId}`;
  quest.create (id, {
    id,
    desktopId,
    recurrence,
  });
  quest.do ({recurrenceId: id});
});

Goblin.registerQuest (goblinName, 'remove', function (quest, recurrenceId) {
  quest.do ({recurrenceId});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
