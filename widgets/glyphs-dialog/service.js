'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const allGlyphs = {
  id: 'glyphs-mock',
  glyphs: [
    {
      id: 'g1',
      Name: 'Pick',
      Glyph: 'bookmark-primary',
      Description: 'Marque pour pick',
    },
    {
      id: 'g2',
      Name: 'Drop',
      Glyph: 'bookmark-secondary',
      Description: 'Marque pour drop',
    },
    {
      id: 'g3',
      Name: 'Attention',
      Glyph: 'warning',
      Description: 'Triangle attention',
    },
    {
      id: 'g3b',
      Name: 'Alerte',
      Glyph: 'warning-primary',
      Description: 'Alerte niveau 5',
    },
    {
      id: 'g6',
      Name: 'Validation',
      Glyph: 'check-#ad00ff',
      Description: '',
    },
    {
      id: 'g4',
      Name: 'Vélo',
      Glyph: 'bicycle',
      Description: 'Petit vélo comme moyen de transport\nSuite...',
    },
    {
      id: 'g5',
      Name: 'Bus',
      Glyph: 'bus',
      Description: 'Autocar comme moyen de transport',
    },
    {
      id: 'g7',
      Name: 'Train',
      Glyph: 'train',
      Description: 'Train comme moyen de transport',
    },
    {
      id: 'g7b',
      Name: 'Voiture',
      Glyph: 'car',
      Description: 'Voiture comme moyen de transport',
    },
    {
      id: 'g8',
      Name: 'Fusée',
      Glyph: 'rocket',
      Description: 'Fusée interplanétaire',
    },
    {
      id: 'g10',
      Name: 'Pick',
      Glyph: 'plus-square-pick',
      Description: 'Prendre un colis',
    },
    {
      id: 'g11',
      Name: 'Drop',
      Glyph: 'minus-square-drop',
      Description: 'Déposer un colis',
    },
    {
      id: 'g12',
      Name: 'Task',
      Glyph: 'square-base',
      Description: 'Tâche',
    },
  ],
};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      allGlyphs: allGlyphs,
      selectedGlyphs: [],
    };
    return state.set ('', initialState);
  },
  toggleGlyphs: (state, action) => {
    const glyph = action.get ('glyph');
    const list = state.get ('selectedGlyphs', []);
    if (list.indexOf (glyph) === -1) {
      const newList = list.push (glyph);
      return state.set ('selectedGlyphs', newList);
    } else {
      const newList = list.unpush (glyph);
      return state.set ('selectedGlyphs', newList);
    }
  },
  clearGlyphs: state => {
    return state.set ('selectedGlyphs', []);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest) {
  quest.do ({id: quest.goblin.id});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'toggleGlyphs', function (quest, glyph) {
  quest.do ({glyph});
});

Goblin.registerQuest (goblinName, 'clearGlyphs', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
