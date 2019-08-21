'use strict';

const path = require('path');
const goblinName = path.basename(module.parent.filename, '.js');
const Goblin = require('xcraft-core-goblin');
const {fromJS} = require('immutable');

const logicState = {
  id: null,
  stack: [],
  operation: null,
};

const logicHandlers = {
  create: (state, action) => {
    return state.set('id', action.get('id'));
  },
  open: (state, action) => {
    return state
      .set('operation', 'open')
      .push('stack', fromJS(action.get('screen')));
  },
  back: state => {
    return state.set('operation', 'back');
  },
  endOpenAnimation: state => {
    return state.set('operation', null);
  },
  _endBackAnimation: state => {
    return state.set('operation', null).pop('stack');
  },
};

const quests = {
  create: function(quest, desktopId) {
    quest.goblin.setX('desktopId', desktopId);
    quest.do();
  },

  open: function*(quest, widget, widgetProps, service, serviceId, serviceArgs) {
    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If operation is running, do not open the new screen.
      return;
    }

    const desktopId = quest.goblin.getX('desktopId');
    if (!serviceId && service) {
      serviceId = `${service}@${quest.uuidV4()}`;
    }
    if (serviceId) {
      yield quest.create(serviceId, {
        ...serviceArgs,
        id: serviceId,
        desktopId,
      });
    }

    quest.do({
      screen: {
        widget,
        widgetProps,
        service,
        serviceId,
        serviceArgs,
      },
    });
  },

  back: function(quest) {
    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If operation is running, do not open the new screen.
      return;
    }

    quest.do();
  },

  endAnimation: function*(quest) {
    const state = quest.goblin.getState();
    const operation = state.get('operation');

    if (operation === 'back') {
      yield quest.me.endBackAnimation();
    } else {
      yield quest.me.endOpenAnimation();
    }
  },

  endOpenAnimation: function(quest) {
    quest.do();
  },

  endBackAnimation: function*(quest) {
    const state = quest.goblin.getState();
    const last = state.get('stack').last();
    if (!last) {
      return;
    }
    const serviceId = last.get('serviceId');

    // Pop stack first and kill after
    // Using a quest.do here doesn't work: the kill is done before pop...
    yield quest.me._endBackAnimation();

    if (serviceId) {
      yield quest.kill([serviceId]);
    }
  },

  _endBackAnimation: function(quest) {
    quest.do();
  },

  delete: function(quest) {},
};

// Register all quests
for (const questName in quests) {
  Goblin.registerQuest(goblinName, questName, quests[questName]);
}

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
