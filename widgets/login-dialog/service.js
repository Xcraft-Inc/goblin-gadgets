'use strict';

const path = require ('path');
const goblinName = path.basename (module.parent.filename, '.js');
const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const users = [
  {
    user: 'daniel',
    password: 'blupi',
  },
  {
    user: 'samuel',
    password: 'barbare',
  },
  {
    user: 'pierre',
    password: 'Smaky324',
  },
  {
    user: 'paul',
    password: 'vélo',
  },
];

function isCorrectPassword (user, password) {
  // user = user.toLowerCase ();
  for (const u of users) {
    if (u.user === user && u.password === password) {
      return true;
    }
  }
  return false;
}

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
      tryCounter: login.tryCounter.value,
      maxTry: login.maxTry.value,
      error: login.error.value,
      close: false,
      login: login.login.value,
    };
    return state.set ('', initialState);
  },
  submit: (state, action) => {
    const form = action.get ('value');
    const user = form.user.value;
    const password = form.password.value;
    if (isCorrectPassword (user, password)) {
      state = state.set ('login', user);
      state = state.set ('tryCounter', 0);
      state = state.set ('error', null);
      state = state.set ('close', true);
    } else {
      const tryCounter = state.get ('tryCounter') + 1;
      const maxTry = state.get ('maxTry');
      state = state.set ('login', null);
      state = state.set ('tryCounter', tryCounter);
      state = state.set (
        'error',
        `Utilisateur ou mot de passe incorrect (${tryCounter}/${maxTry})`
      );
      if (tryCounter >= maxTry) {
        state = state.set ('close', true);
      }
    }
    return state;
  },
  reset: (state, action) => {
    state = state.set ('tryCounter', 0);
    state = state.set ('error', null);
    state = state.set ('close', false);
    return state;
  },
  logout: (state, action) => {
    state = state.set ('login', null);
    state = state.set ('tryCounter', 0);
    state = state.set ('error', null);
    return state;
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, desktopId, login) {
  quest.do ({id: quest.goblin.id, login});
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'submit', function (quest, value) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'reset', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'logout', function (quest) {
  quest.do ();
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
