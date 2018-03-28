'use strict';
const Goblin = require('xcraft-core-goblin');
function jsifyQuestName(quest) {
  return quest.replace(/-([a-z])/g, (m, g1) => g1.toUpperCase());
}

module.exports = config => {
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

  Goblin.registerQuest(goblinName, 'create', function(quest, options) {
    const childrenGadgets = {};
    if (gadgets) {
      for (const key of Object.keys(gadgets)) {
        const gadget = gadgets[key];
        const newGadgetId = `${gadget.type}@${quest.goblin.id}`;

        childrenGadgets[key] = {id: newGadgetId, type: gadget.type};

        if (gadgets[key].onActions) {
          for (const handler of Object.keys(gadgets[key].onActions)) {
            quest.goblin.defer(
              quest.sub(`${newGadgetId}.${handler}`, (err, msg) =>
                quest.me[jsifyQuestName(`${key}-${handler}`)](msg.data)
              )
            );
          }
        }

        quest.create(`${gadget.type}-gadget`, {
          id: newGadgetId,
          options: gadget.options,
        });
      }
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

  if (gadgets) {
    for (const key of Object.keys(gadgets)) {
      //Register gagdet quest handlers
      if (gadgets[key].onActions) {
        for (const handler of Object.keys(gadgets[key].onActions)) {
          logicHandlers[`${key}-${handler}`] = gadgets[key].onActions[handler];

          Goblin.registerQuest(goblinName, `${key}-${handler}`, function(
            quest
          ) {
            quest.do();
            quest.me.update();
          });
        }
      }
    }
  }

  Goblin.registerQuest(goblinName, 'delete', function(quest) {});

  return Goblin.configure(goblinName, {}, logicHandlers);
};
