'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const allGlyphs = {
  g1: {
    id: 'g1',
    name: 'Pick',
    glyph: 'bookmark-primary',
    description: 'Marque pour pick',
  },
  g2: {
    id: 'g2',
    name: 'Drop',
    glyph: 'bookmark-secondary',
    description: 'Marque pour drop',
  },
  g3: {
    id: 'g3',
    name: 'Attention',
    glyph: 'warning',
    description: 'Triangle attention',
  },
  g3b: {
    id: 'g3b',
    name: 'Alerte',
    glyph: 'warning-primary',
    description: 'Alerte niveau 5',
  },
  g6: {
    id: 'g6',
    name: 'Validation',
    glyph: 'check-#ad00ff',
    description: '',
  },
  g4: {
    id: 'g4',
    name: 'Vélo',
    glyph: 'bicycle',
    description: 'Petit vélo comme moyen de transport\nSuite...',
  },
  g5: {
    id: 'g5',
    name: 'Bus',
    glyph: 'bus',
    description: 'Autocar comme moyen de transport',
  },
  g7: {
    id: 'g7',
    name: 'Train',
    glyph: 'train',
    description: 'Train comme moyen de transport',
  },
  g7b: {
    id: 'g7b',
    name: 'Voiture',
    glyph: 'car',
    description: 'Voiture comme moyen de transport',
  },
  g8: {
    id: 'g8',
    name: 'Fusée',
    glyph: 'rocket',
    description: 'Fusée interplanétaire',
  },
  g10: {
    id: 'g10',
    name: 'Pick',
    glyph: 'plus-square-pick',
    description: 'Prendre un colis',
  },
  g11: {
    id: 'g11',
    name: 'Drop',
    glyph: 'minus-square-drop',
    description: 'Déposer un colis',
  },
  g12: {
    id: 'g12',
    name: 'Task',
    glyph: 'square-base',
    description: 'Tâche',
  },
};

const selectedGlyphs = {
  g1: {
    id: 'g1',
    name: 'Pick',
    glyph: 'bookmark-primary',
    description: 'Marque pour pick',
  },
  g8: {
    id: 'g8',
    name: 'Fusée',
    glyph: 'rocket',
    description: 'Fusée interplanétaire',
  },
  g6: {
    id: 'g6',
    name: 'Validation',
    glyph: 'check-#ad00ff',
    description: '',
  },
};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      allGlyphs: allGlyphs,
      selectedGlyphs: selectedGlyphs,
    };
    return state.set ('', initialState);
  },
  toggleGlyphs: (state, action) => {
    const id = action.get ('id');
    const selectedId = state.get (`selectedIds.${id}`, null);
    if (selectedId) {
      return state.del (`selectedIds.${id}`);
    } else {
      return state.set (`selectedIds.${id}`, id);
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

Goblin.registerQuest (goblinName, 'toggleGlyphs', function (quest, id) {
  quest.do ({id});
});

Goblin.registerQuest (goblinName, 'clearGlyphs', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
