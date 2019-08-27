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
  replace: (state, action) => {
    return state
      .set('operation', 'replace')
      .push('stack', fromJS(action.get('screen')));
  },
  endOpenAnimation: state => {
    return state.set('operation', null);
  },
  _endBackAnimation: state => {
    return state.set('operation', null).pop('stack');
  },
  _endReplaceAnimation: state => {
    const stack = state.get('stack');
    return state.set('operation', null).del(`stack.[${stack.size - 2}]`);
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
    const beforeLast = stack.get(stack.size - 2);
    if (!beforeLast) {
      return;
    }
    const serviceId = beforeLast.get('serviceId');

    // Pop stack first and kill after
    // Using a quest.do here doesn't work: the kill is done before pop...
    yield quest.me._endReplaceAnimation();

    if (serviceId) {
      yield quest.kill([serviceId]);
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
