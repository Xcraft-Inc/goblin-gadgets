'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const allGlyphs = {
  g1: {
    id: 'g1',
    Name: 'Pick',
    Glyph: 'bookmark-primary',
    Description: 'Marque pour pick',
  },
  g2: {
    id: 'g2',
    Name: 'Drop',
    Glyph: 'bookmark-secondary',
    Description: 'Marque pour drop',
  },
  g3: {
    id: 'g3',
    Name: 'Attention',
    Glyph: 'warning',
    Description: 'Triangle attention',
  },
  g3b: {
    id: 'g3b',
    Name: 'Alerte',
    Glyph: 'warning-primary',
    Description: 'Alerte niveau 5',
  },
  g6: {
    id: 'g6',
    Name: 'Validation',
    Glyph: 'check-#ad00ff',
    Description: '',
  },
  g4: {
    id: 'g4',
    Name: 'Vélo',
    Glyph: 'bicycle',
    Description: 'Petit vélo comme moyen de transport\nSuite...',
  },
  g5: {
    id: 'g5',
    Name: 'Bus',
    Glyph: 'bus',
    Description: 'Autocar comme moyen de transport',
  },
  g7: {
    id: 'g7',
    Name: 'Train',
    Glyph: 'train',
    Description: 'Train comme moyen de transport',
  },
  g7b: {
    id: 'g7b',
    Name: 'Voiture',
    Glyph: 'car',
    Description: 'Voiture comme moyen de transport',
  },
  g8: {
    id: 'g8',
    Name: 'Fusée',
    Glyph: 'rocket',
    Description: 'Fusée interplanétaire',
  },
  g10: {
    id: 'g10',
    Name: 'Pick',
    Glyph: 'plus-square-pick',
    Description: 'Prendre un colis',
  },
  g11: {
    id: 'g11',
    Name: 'Drop',
    Glyph: 'minus-square-drop',
    Description: 'Déposer un colis',
  },
  g12: {
    id: 'g12',
    Name: 'Task',
    Glyph: 'square-base',
    Description: 'Tâche',
  },
};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      allGlyphs: allGlyphs,
      selectedIds: {},
    };
    return state.set ('', initialState);
  },
  toggleGlyphs: (state, action) => {
    const glyph = action.get ('glyph');
    const selectedId = state.get (`selectedIds.${glyph.id}`, null);
    if (selectedId) {
      return state.del (`selectedIds.${glyph.id}`);
    } else {
      return state.set (`selectedIds.${glyph.id}`, glyph.id);
    }
  },
  clearGlyphs: state => {
    return state.set ('selectedIds', {});
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, labId) {
  quest.do ({id: quest.goblin.id});
  const lab = quest.useAs ('laboratory', labId);
  lab.add ({widgetId: quest.goblin.id});
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
