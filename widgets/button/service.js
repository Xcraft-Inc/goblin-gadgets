'use strict';

const path = require('path');

const goblinName = path.basename(module.parent.filename, '.js');

const Goblin = require('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    return state
      .set('id', action.get('id'))
      .set('text', action.get('text'))
      .set('kind', action.get('kind'));
  },
};

// Register quest's according rc.json
Goblin.registerQuest(goblinName, 'create', function(quest, text, kind) {
  quest.do({id: quest.goblin.id, text, kind});
  return quest.goblin.id;
});

Goblin.registerQuest(goblinName, 'delete', function() {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
