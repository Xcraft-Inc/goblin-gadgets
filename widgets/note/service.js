'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    let r = action.get ('note');
    if (!r) {
      r = {};
    }
    const initialState = {
      id: action.get ('id'),
      order: r.order ? r.order : 0,
      content: r.content ? r.content : '',
      glyphs: r.glyphs ? r.glyphs : {},
    };
    return state.set ('', initialState);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, desktopId, note) {
  quest.do ({id: quest.goblin.id, note});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
