'use strict';

const path = require('path');
const goblinName = path.basename(module.parent.filename, '.js');
const Goblin = require('xcraft-core-goblin');
const {fromJS} = require('immutable');

const logicState = {
  id: null,
  stack: [],
  operation: null,
  operationParams: null,
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
  replace: (state, action) => {
    let replaceCount = action.get('replaceCount');
    if (!replaceCount || replaceCount < 1) {
      replaceCount = 1;
    }
    return state
      .set('operation', 'replace')
      .set('operationParams', {replaceCount})
      .push('stack', fromJS(action.get('screen')));
  },
  endOpenAnimation: state => {
    return state.set('operation', null).set('operationParams', null);
  },
  _endBackAnimation: state => {
    return state
      .set('operation', null)
      .set('operationParams', null)
      .pop('stack');
  },
  _endReplaceAnimation: state => {
    let stack = state.get('stack');
    const replaceCount = state.get('operationParams.replaceCount');
    stack = stack.splice(stack.size - 1 - replaceCount, replaceCount);
    return state
      .set('operation', null)
      .set('operationParams', null)
      .set('stack', stack);
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
      // If an operation is running, do not open the new screen.
      return;
    }

    serviceId = yield quest.me._initService({service, serviceId, serviceArgs});

    quest.do({
      screen: {
        widget,
        widgetProps,
        serviceId,
      },
    });
  },

  _initService: function*(quest, service, serviceId, serviceArgs) {
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
    return serviceId;
  },

  back: function(quest) {
    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If an operation is running, do nothing.
      return;
    }

    quest.do();
  },

  replace: function*(
    quest,
    widget,
    widgetProps,
    service,
    serviceId,
    serviceArgs
  ) {
    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If an operation is running, do nothing.
      return;
    }

    serviceId = yield quest.me._initService({service, serviceId, serviceArgs});

    quest.do({
      screen: {
        widget,
        widgetProps,
        serviceId,
      },
    });
  },

  endAnimation: function*(quest) {
    const state = quest.goblin.getState();
    const operation = state.get('operation');

    if (operation === 'back') {
      yield quest.me.endBackAnimation();
    } else if (operation === 'replace') {
      yield quest.me.endReplaceAnimation();
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

  endReplaceAnimation: function*(quest) {
    const state = quest.goblin.getState();
    const stack = state.get('stack');
    let replaceCount = state.get('operationParams.replaceCount');

    // Pop stack first and kill after
    // Using a quest.do here doesn't work: the kill is done before pop...
    yield quest.me._endReplaceAnimation();

    for (let i = 0; i < replaceCount; i++) {
      const screen = stack.get(stack.size - 2 - i);
      if (screen) {
        const serviceId = screen.get('serviceId');
        if (serviceId) {
          yield quest.kill([serviceId]);
        }
      }
    }
  },

  _endReplaceAnimation: function(quest) {
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
