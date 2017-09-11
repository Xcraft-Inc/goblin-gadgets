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
      notes: {},
    };
    return state.set ('', initialState);
  },
  add: (state, action) => {
    const noteId = action.get ('noteId');
    const order = getGlyphOrder (state.get ('notes'), null); // FIXME factorize with glyphs.dialog !
    return state
      .set (`notes.${noteId}`, {
        id: noteId,
        order: order,
      })
      .set ('extendedId', noteId); // extend added panel
  },
  remove: (state, action) => {
    const noteId = action.get ('noteId');
    return state.del (`notes.${noteId}`).set ('extendedId', null); // compact all panels
  },
  extend: (state, action) => {
    const noteId = action.get ('noteId');
    const currentId = state.get ('extendedId');
    if (noteId === currentId) {
      return state.set ('extendedId', null); // compact panel
    } else {
      return state.set ('extendedId', noteId); // extend panel
    }
  },
  'compact-all': (state, action) => {
    return state.set ('extendedId', null); // compact all panels
  },
  drag: (state, action) => {
    const fromId = action.get ('fromId');
    const toId = action.get ('toId');
    const glyph = state.get (`notes.${fromId}`).toJS ();
    glyph.order = getGlyphOrder (state.get ('notes'), toId); // FIXME factorize with glyphs.dialog !
    return state.set (`notes.${fromId}`, glyph);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, desktopId, notes) {
  quest.goblin.setX ('desktopId', desktopId);
  quest.do ({id: quest.goblin.id});
  for (const r in notes) {
    quest.cmd ('notes.add', {
      id: quest.goblin.id,
      desktopId,
      note: notes[r],
    });
  }
  quest.cmd ('notes.compact-all', {
    id: quest.goblin.id,
    desktopId,
  });
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function (quest, note) {
  const desktopId = quest.goblin.getX ('desktopId');
  const noteId = note ? note.id : uuidV4 ();
  const id = `note@${noteId}`;
  quest.create (id, {
    id,
    desktopId,
    note,
  });
  quest.do ({noteId: id});
});

Goblin.registerQuest (goblinName, 'remove', function (quest, noteId) {
  quest.do ({noteId});
});

Goblin.registerQuest (goblinName, 'extend', function (quest, noteId) {
  quest.do ({noteId});
});

Goblin.registerQuest (goblinName, 'compact-all', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'drag', function (quest, fromId, toId) {
  quest.do ({fromId, toId});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
