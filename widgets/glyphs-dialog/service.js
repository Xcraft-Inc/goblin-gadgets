'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const allGlyphs = {
  g1: {
    id: 'g1',
    order: 0,
    name: 'Pick',
    glyph: 'bookmark-primary',
    description: 'Marque pour pick',
  },
  g2: {
    id: 'g2',
    order: 1,
    name: 'Drop',
    glyph: 'bookmark-secondary',
    description: 'Marque pour drop',
  },
  g3: {
    id: 'g3',
    order: 2,
    name: 'Attention',
    glyph: 'warning',
    description: 'Triangle attention',
  },
  g3b: {
    id: 'g3b',
    order: 3,
    name: 'Alerte',
    glyph: 'warning-primary',
    description: 'Alerte niveau 5',
  },
  g6: {
    id: 'g6',
    order: 4,
    name: 'Validation',
    glyph: 'check-#ad00ff',
    description: '',
  },
  g4: {
    id: 'g4',
    order: 5,
    name: 'Vélo',
    glyph: 'bicycle',
    description: 'Petit vélo comme moyen de transport\nSuite...',
  },
  g5: {
    id: 'g5',
    order: 6,
    name: 'Bus',
    glyph: 'bus',
    description: 'Autocar comme moyen de transport',
  },
  g7: {
    id: 'g7',
    order: 7,
    name: 'Train',
    glyph: 'train',
    description: 'Train comme moyen de transport',
  },
  g7b: {
    id: 'g7b',
    order: 8,
    name: 'Voiture',
    glyph: 'car',
    description: 'Voiture comme moyen de transport',
  },
  g8: {
    id: 'g8',
    order: 9,
    name: 'Fusée',
    glyph: 'rocket',
    description: 'Fusée interplanétaire',
  },
  g10: {
    id: 'g10',
    order: 10,
    name: 'Pick',
    glyph: 'plus-square-pick',
    description: 'Prendre un colis',
  },
  g11: {
    id: 'g11',
    order: 11,
    name: 'Drop',
    glyph: 'minus-square-drop',
    description: 'Déposer un colis',
  },
  g12: {
    id: 'g12',
    order: 12,
    name: 'Task',
    glyph: 'square-base',
    description: 'Tâche',
  },
};

// Returns the order to insert an element before the one given the id.
// If id is undefined, returns the order to insert at the end.
function getGlyphOrder (list, id) {
  const glyphs = list.linq.orderBy (glyph => glyph.get ('order')).toList ();
  if (id) {
    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      if (glyph.get ('id') === id) {
        if (i === 0) {
          return glyph.get ('order') - 0.5; // insert before the first element
        } else {
          const prevGlyph = glyphs[i - 1];
          return (prevGlyph.get ('order') + glyph.get ('order')) / 2; // insert between two elements
        }
      }
    }
  }
  if (glyphs.length == 0) {
    return 0; // first order if list is empty
  } else {
    const lastGlyph = glyphs[glyphs.length - 1];
    return lastGlyph.get ('order') + 0.5; // insert after the last element
  }
}

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      allGlyphs: allGlyphs,
      selectedGlyphs: {},
    };
    return state.set ('', initialState);
  },
  toggleGlyphs: (state, action) => {
    const id = action.get ('glyphId');
    const selectedGlyphs = state.get (`selectedGlyphs.${id}`, null);
    if (selectedGlyphs) {
      return state.del (`selectedGlyphs.${id}`);
    } else {
      const glyph = state.get (`allGlyphs.${id}`).toJS ();
      glyph.order = getGlyphOrder (state.get ('selectedGlyphs'), null);
      return state.set (`selectedGlyphs.${id}`, glyph);
    }
  },
  dragGlyphs: (state, action) => {
    const fromId = action.get ('fromId');
    const toId = action.get ('toId');
    const glyph = state.get (`selectedGlyphs.${fromId}`).toJS ();
    glyph.order = getGlyphOrder (state.get ('selectedGlyphs'), toId);
    return state.set (`selectedGlyphs.${fromId}`, glyph);
  },
  clearGlyphs: state => {
    return state.set ('selectedGlyphs', {});
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, labId) {
  quest.do ({id: quest.goblin.id});
  const lab = quest.useAs ('laboratory', labId);
  lab.add ({widgetId: quest.goblin.id});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'toggleGlyphs', function (quest, glyphId) {
  quest.do ({glyphId});
});

Goblin.registerQuest (goblinName, 'dragGlyphs', function (quest, fromId, toId) {
  quest.do ({fromId, toId});
});

Goblin.registerQuest (goblinName, 'clearGlyphs', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
