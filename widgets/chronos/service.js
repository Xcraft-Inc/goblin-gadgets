'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const uuidV4 = require ('uuid/v4');

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const chronos = action.get ('chronos');
    const initialState = {
      id: action.get ('id'),
      chronos: chronos ? chronos : {},
    };
    return state.set ('', initialState);
  },
  add: (state, action) => {
    const chronoId = action.get ('chronoId');
    const order = state.get ('chronos').state.size;
    return state.set (`chronos.${chronoId}`, {
      id: chronoId,
      order: order,
    });
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (
  quest,
  desktopId,
  chronos
) {
  quest.goblin.setX ('desktopId', desktopId);
  quest.do ({id: quest.goblin.id});
  for (const r in chronos) {
    quest.cmd ('chronos.add', {
      id: quest.goblin.id,
      desktopId,
      chrono: chronos[r],
    });
  }
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'add', function (quest, chrono) {
  const desktopId = quest.goblin.getX ('desktopId');
  const chronoId = chrono ? chrono.id : uuidV4 ();
  const id = `chrono@${chronoId}`;
  quest.create (id, {
    id,
    desktopId,
    chrono,
  });
  quest.do ({chronoId: id});
});

Goblin.registerQuest (goblinName, 'delete', function () {});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
