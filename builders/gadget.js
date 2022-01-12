'use strict';
//T:2019-02-27

const Goblin = require('xcraft-core-goblin');

module.exports = (config) => {
  const {name, initialState, actions, events, gadgets} = config;
  const goblinName = `${name}-gadget`;

  const logicHandlers = {
    create: (state, action) => {
      return state.set(
        '',
        Object.assign(
          {
            id: action.get('id'),
            childrenGadgets: action.get('childrenGadgets'),
          },
          action.get('initialState')
        )
      );
    },
  };

  Goblin.registerQuest(goblinName, 'create', function* (
    quest,
    desktopId,
    options
  ) {
    const childrenGadgets = {};
    if (gadgets) {
      const {common} = require('goblin-workshop');
      yield common.createGadgets(quest, goblinName, gadgets, childrenGadgets);
    }

    quest.do({id: quest.goblin.id, initialState, childrenGadgets});

    if (options) {
      quest.dispatch('configure', options);
    }

    if (events && events.create) {
      const state = quest.goblin.getState();
      const eventPayload = events.create(state);
      quest.evt('create', eventPayload);
    }
    return quest.goblin.id;
  });

  if (actions) {
    Object.assign(logicHandlers, actions);
    Object.keys(actions).forEach((a) => {
      Goblin.registerQuest(goblinName, a, function (quest, $msg) {
        quest.do();
        if (events && events[a]) {
          const state = quest.goblin.getState();
          const eventPayload = events[a](state, $msg);
          quest.evt(a, eventPayload);
        }
      });
    });
  }

  if (gadgets) {
    for (const key of Object.keys(gadgets)) {
      //Register gagdet quest handlers
      if (gadgets[key].onActions) {
        for (const handler of Object.keys(gadgets[key].onActions)) {
          const {jsify} = require('xcraft-core-utils/lib/string.js');
          const questName = jsify(`${key}-${handler}`);
          logicHandlers[questName] = gadgets[key].onActions[handler];

          Goblin.registerQuest(goblinName, questName, function* (quest) {
            quest.do();
            yield quest.me.update();
          });
        }
      }
    }
  }

  Goblin.registerQuest(goblinName, 'delete', function (quest) {});

  return Goblin.configure(goblinName, {}, logicHandlers);
};
