'use strict';
const Goblin = require('xcraft-core-goblin');

module.exports = config => {
  const {name, actions, events} = config;
  const goblinName = `${name}-gadget`;

  const logicHandlers = {
    create: (state, action) => {
      return state.set('', {
        id: action.get('id'),
      });
    },
  };

  Goblin.registerQuest(goblinName, 'create', function(quest) {
    quest.do({id: quest.goblin.id});
    return quest.goblin.id;
  });

  if (actions) {
    Object.assign(logicHandlers, actions);
    Object.keys(actions).forEach(a => {
      Goblin.registerQuest(goblinName, a, function(quest) {
        quest.do();
        if (events && events[a]) {
          const state = quest.goblin.getState();
          const eventPayload = events[a](state);
          quest.evt(a, eventPayload);
        }
      });
    });
  }

  Goblin.registerQuest(goblinName, 'delete', function(quest) {});

  return Goblin.configure(goblinName, {}, logicHandlers);
};
