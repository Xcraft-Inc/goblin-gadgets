'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    return state.set ('id', action.get ('id'));
  },
  kind: (state, action) => {
    return state.set ('kind', action.get ('kind'));
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest) {
  quest.do ({id: quest.goblin.id});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'kind', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
