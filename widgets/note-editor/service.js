'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

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
      noteId: action.get ('noteId'),
      glyphIds: action.get ('glyphIds'),
      allGlyphIds: action.get ('allGlyphIds'),
      showCombo: false,
    };
    return state.set ('', initialState);
  },
  'show-combo': (state, action) => {
    return state.set ('showCombo', action.get ('value'));
  },
  add: (state, action) => {
    return state.push ('glyphIds', action.get ('glyphId'));
  },
  remove: (state, action) => {
    return state.unpush ('glyphIds', action.get ('glyphId'));
  },
  drag: (state, action) => {
    const fromId = action.get ('fromId');
    const toId = action.get ('toId');
    return state.move (`glyphIds`, fromId, toId);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function* (
  quest,
  desktopId,
  noteId,
  allGlyphIds
) {
  quest.goblin.setX ('noteId', noteId);
  const w = quest.warehouse;
  const glyphIds = yield w.get ({path: `${noteId}.glyphIds`});
  quest.do ({glyphIds});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function (quest, glyphId) {
  const i = quest.openInventory ();
  quest.do ();
  const note = i.use (quest.goblin.getX ('noteId'));
  note.addGlyph ({entityId: glyphId});
});

Goblin.registerQuest (goblinName, 'show-combo', function (quest, value) {
  quest.do ({value});
});

Goblin.registerQuest (goblinName, 'drag', function (quest, fromId, toId) {
  const i = quest.openInventory ();
  const note = i.use (quest.goblin.getX ('noteId'));
  if (!toId) {
    quest.dispatch ('remove', {glyphId: fromId});
    note.removeGlyph ({entityId: fromId});
  } else {
    quest.do ({fromId, toId});
    note.moveGlyph ({entityId: fromId, afterEntityId: toId});
  }
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
