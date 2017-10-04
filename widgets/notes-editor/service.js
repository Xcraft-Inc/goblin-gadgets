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
      forEntity: action.get ('forEntity'),
      noteIds: action.get ('noteIds'),
    };
    return state.set ('', initialState);
  },
  add: (state, action) => {
    const noteId = action.get ('noteId');
    return state.set ('extendedId', noteId).push ('noteIds', noteId); // extend added panel
  },
  remove: (state, action) => {
    const noteId = action.get ('noteId');
    return state.set ('extendedId', null).unpush ('noteIds', noteId); // compact all panels
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
    return state.move ('noteIds', fromId, toId);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function* (
  quest,
  desktopId,
  forEntity,
  noteIds
) {
  quest.goblin.setX ('desktopId', desktopId);
  quest.goblin.setX ('forEntity', forEntity);
  quest.do ({id: quest.goblin.id, forEntity, noteIds});

  const i = quest.openInventory ();
  const r = i.use ('rethink@main');
  const allGlyphs = yield r.getAll ({table: 'glyphs'});
  const allGlyphIds = [];
  for (const glyph of allGlyphs) {
    quest.create (glyph.id, {id: glyph.id, entity: glyph});
    allGlyphIds.push (glyph.id);
  }
  quest.goblin.setX ('allGlyphIds', allGlyphIds);
  for (const noteId of noteIds) {
    const noteEditorId = `note-editor@${noteId}`;
    quest.create (noteEditorId, {
      id: noteEditorId,
      desktopId,
      noteId,
      allGlyphIds,
    });
  }

  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function* (quest) {
  const entityId = quest.goblin.getX ('forEntity');
  const desktopId = quest.goblin.getX ('desktopId');
  const allGlyphIds = quest.goblin.getX ('allGlyphIds');
  const note = yield quest.createNew ('note', {forEntity: entityId});
  const noteEditorId = `note-editor@${note.id}`;
  quest.create (noteEditorId, {
    id: noteEditorId,
    desktopId,
    noteId: note.id,
    allGlyphIds,
  });

  const i = quest.openInventory ();
  const entity = i.use (entityId);
  entity.addNote ({entityId: note.id});
  quest.do ({noteId: note.id});
});

Goblin.registerQuest (goblinName, 'remove', function (quest, noteId) {
  const i = quest.openInventory ();
  const note = i.use (noteId);
  note.delete ({hard: true});
  quest.do ({noteId});
  const entityId = quest.goblin.getX ('forEntity');
  const entity = i.use (entityId);
  entity.removeNote ({entityId: noteId});
  const noteEditorId = `note-editor@${noteId}`;
  quest.use (noteEditorId).delete ();
});

Goblin.registerQuest (goblinName, 'extend', function (quest, noteId) {
  quest.do ({noteId});
});

Goblin.registerQuest (goblinName, 'compact-all', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'drag', function (quest, fromId, toId) {
  quest.do ({fromId, toId});
  const entityId = quest.goblin.getX ('forEntity');
  const i = quest.openInventory ();
  const entity = i.use (entityId);
  entity.moveNote ({entityId: fromId, afterEntityId: toId});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
