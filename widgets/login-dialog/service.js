'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    let login = action.get ('login');
    if (!login) {
      login = {};
    }
    const initialState = {
      id: action.get ('id'),
      user: login.user.value,
      password: login.password.value,
    };
    return state.set ('', initialState);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, desktopId, login) {
  quest.do ({id: quest.goblin.id, login});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
