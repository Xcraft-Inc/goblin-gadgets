'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Returns the order to insert an element before the one given the id.
// If id is undefined, returns the order to insert at the end.
function getGlyphOrder(list, id) {
  const glyphs = list
    .sort((a, b) => a.get('order', 0) - b.get('order', 0))
    .valueSeq()
    .toArray();
  if (id) {
    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      if (glyph.get('id') === id) {
        if (i === 0) {
          return glyph.get('order', 0) - 0.5; // insert before the first element
        } else {
          const prevGlyph = glyphs[i - 1];
          return (prevGlyph.get('order', 0) + glyph.get('order', 0)) / 2; // insert between two elements
        }
      }
    }
  }
  if (glyphs.length === 0) {
    return 0; // first order if list is empty
  } else {
    const lastGlyph = glyphs[glyphs.length - 1];
    return lastGlyph.get('order', 0) + 0.5; // insert after the last element
  }
}

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get('id'),
      allGlyphs: action.get('allGlyphs'),
      selectedGlyphs: {},
    };
    return state.set('', initialState);
  },
  toggleGlyphs: (state, action) => {
    const id = action.get('glyphId');
    const selectedGlyphs = state.get(`selectedGlyphs.${id}`, null);
    if (selectedGlyphs) {
      return state.del(`selectedGlyphs.${id}`);
    } else {
      const glyph = state.get(`allGlyphs.${id}`).toJS();
      glyph.order = getGlyphOrder(state.get('selectedGlyphs'), null);
      return state.set(`selectedGlyphs.${id}`, glyph);
    }
  },
  dragGlyphs: (state, action) => {
    const fromId = action.get('fromId');
    const toId = action.get('toId');
    const glyph = state.get(`selectedGlyphs.${fromId}`).toJS();
    glyph.order = getGlyphOrder(state.get('selectedGlyphs'), toId);
    return state.set(`selectedGlyphs.${fromId}`, glyph);
  },
  clearGlyphs: (state) => {
    return state.set('selectedGlyphs', {});
  },
};

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function (quest, allGlyphs) {
  quest.do({id: quest.goblin.id, allGlyphs});
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'toggleGlyphs', function (quest, glyphId) {
  quest.do({glyphId});
});

Goblin.registerQuest(goblinName, 'dragGlyphs', function (quest, fromId, toId) {
  quest.do({fromId, toId});
});

Goblin.registerQuest(goblinName, 'clearGlyphs', function (quest) {
  quest.do();
});

Goblin.registerQuest(goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
