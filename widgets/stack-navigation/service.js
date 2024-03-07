'use strict';

const path = require('path');
const goblinName = path.basename(module.parent.filename, '.js');
const Goblin = require('xcraft-core-goblin');
const {fromJS} = require('immutable');

function deleteUndefinedValues(obj) {
  if (!obj) {
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      delete obj[key];
    }
  }
}

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

  _open: (state, action) => {
    return state.push('stack', fromJS(action.get('screen')));
  },
  _startOpenAnimation: (state, action) => {
    return state
      .set('operation', 'open')
      .push('stack', fromJS(action.get('screen')));
  },
  _endOpenAnimation: (state) => {
    return state.set('operation', null).set('operationParams', null);
  },

  _back: (state, action) => {
    const backCount = action.get('backCount');
    let stack = state.get('stack');
    stack = stack.splice(stack.size - backCount, backCount);
    return state.set('stack', stack);
  },
  _startBackAnimation: (state, action) => {
    const backCount = action.get('backCount');
    return state
      .set('operation', 'back')
      .set('operationParams', {backCount})
      .set('backAnimationId', action.get('correlationId'));
  },
  _endBackAnimation: (state) => {
    let stack = state.get('stack');
    const backCount = state.get('operationParams.backCount');
    stack = stack.splice(stack.size - backCount, backCount);
    return state
      .set('operation', null)
      .set('operationParams', null)
      .set('stack', stack)
      .set('backAnimationId', null);
  },

  _replace: (state, action) => {
    const replaceCount = action.get('replaceCount');
    let stack = state.get('stack');
    stack = stack.splice(stack.size - replaceCount, replaceCount);
    stack = stack.push('', fromJS(action.get('screen')));
    return state.set('stack', stack);
  },
  _startReplaceAnimation: (state, action) => {
    const replaceCount = action.get('replaceCount');
    return state
      .set('operation', 'replace')
      .set('operationParams', {replaceCount})
      .push('stack', fromJS(action.get('screen')));
  },
  _endReplaceAnimation: (state) => {
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
  create: function (quest, desktopId, servicesArgs, screens) {
    quest.goblin.setX('desktopId', desktopId);
    quest.goblin.setX('screens', screens);
    quest.goblin.setX('servicesArgs', servicesArgs);
    quest.do();
  },

  //-----------------------------------------------------------------------------

  _getScreenDefinition: function (quest, screenName, args) {
    const screens = quest.goblin.getX('screens');
    let screen = screens[screenName];
    if (!screen) {
      throw new Error('Unknown screen');
    }
    if (typeof screen === 'function') {
      screen = screen(args);
      deleteUndefinedValues(screen.widgetProps);
      deleteUndefinedValues(screen.serviceArgs);
    }
    const state = quest.goblin.getState();
    const stack = state.get('stack');
    let count = 0;
    for (const stackScreen of stack) {
      if (stackScreen.get('widget') === screen.widget) {
        if (stackScreen.get('count') >= count) {
          count = stackScreen.get('count') + 1;
        }
      }
    }
    return {
      ...screen,
      count,
      key: `${screen.widget}-${count}`,
    };
  },

  _initService: function* (quest, screen) {
    let {service, serviceId, serviceArgs} = screen;
    const desktopId = quest.goblin.getX('desktopId');
    const servicesArgs = quest.goblin.getX('servicesArgs');

    if (!serviceId && service) {
      serviceId = `${service}@${quest.uuidV4()}`;
    }
    if (serviceId) {
      yield quest.create(serviceId, {
        ...servicesArgs,
        ...serviceArgs,
        id: serviceId,
        desktopId,
      });
    }
    return serviceId;
  },

  _killServices: function* (quest, stack, count, skipCount) {
    for (let i = 0; i < count; i++) {
      const screen = stack.get(stack.size - 1 - skipCount - i);
      if (screen) {
        const serviceId = screen.get('serviceId');
        if (serviceId) {
          yield quest.kill([serviceId]);
        }
      }
    }
  },

  endAnimation: function* (quest) {
    const state = quest.goblin.getState();
    const operation = state.get('operation');

    if (operation === 'back') {
      yield quest.me.endBackAnimation();
    } else if (operation === 'replace') {
      yield quest.me.endReplaceAnimation();
    } else {
      yield quest.me._endOpenAnimation();
    }
  },

  // --- Open -------------------------------------------------------------------

  open: function* (quest, screenName, args) {
    const screen = yield quest.me._getScreenDefinition({screenName, args});

    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If an operation is running, do not open the new screen.
      return;
    }

    screen.serviceId = yield quest.me._initService({screen});

    if (screen.animations && screen.animations.open) {
      yield quest.me._startOpenAnimation({screen});
    } else {
      yield quest.me._open({screen});
    }

    return screen.serviceId;
  },

  _open: function (quest) {
    quest.do();
  },

  _startOpenAnimation: function (quest) {
    quest.do();
  },

  _endOpenAnimation: function (quest) {
    quest.do();
  },

  // --- Back -------------------------------------------------------------------

  back: function* (quest, backCount, waitEnd, next) {
    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If an operation is running, do nothing.
      return;
    }

    if (!backCount || backCount < 1) {
      backCount = 1;
    }

    const stack = state.get('stack');
    const screenForAnimation = stack.get(stack.length - backCount);
    const animations = screenForAnimation.get('animations');
    if (animations && animations.get('back')) {
      let unsub = null;
      let correlationId = null;
      if (waitEnd) {
        const waitDone = next.parallel();
        correlationId = quest.uuidV4();
        unsub = quest.sub(`*::${quest.goblin.id}.back-finished`, function (
          _,
          {msg, resp}
        ) {
          if (msg.data.correlationId === correlationId) {
            waitDone();
          }
        });
      }

      yield quest.me._startBackAnimation({backCount, correlationId});

      if (waitEnd) {
        yield next.sync();
        unsub();
      }
    } else {
      yield quest.me._back();
      yield quest.me._killServices({stack, count: backCount, skipCount: 0});
    }
  },

  _back: function (quest) {
    quest.do();
  },

  _startBackAnimation: function (quest) {
    quest.do();
  },

  endBackAnimation: function* (quest) {
    const state = quest.goblin.getState();
    const stack = state.get('stack');
    const backCount = state.get('operationParams.backCount');

    // Pop stack first and kill after
    // Using a quest.do here doesn't work: the kill is done before pop...
    yield quest.me._endBackAnimation();
    yield quest.me._killServices({stack, count: backCount, skipCount: 0});

    const backAnimationId = state.get('backAnimationId');
    if (backAnimationId) {
      quest.evt('back-finished', {
        correlationId: backAnimationId,
      });
    }
  },

  _endBackAnimation: function (quest) {
    quest.do();
  },

  // --- Replace ----------------------------------------------------------------

  replace: function* (quest, screenName, args, replaceCount) {
    const screen = yield quest.me._getScreenDefinition({screenName, args});

    const state = quest.goblin.getState();

    const operation = state.get('operation');
    if (operation) {
      // If an operation is running, do nothing.
      return;
    }

    screen.serviceId = yield quest.me._initService({screen});

    if (!replaceCount || replaceCount < 1) {
      replaceCount = 1;
    }

    if (
      screen.animations &&
      (screen.animations.replace || screen.animations.open)
    ) {
      yield quest.me._startReplaceAnimation({screen, replaceCount});
    } else {
      const stack = state.get('stack');
      yield quest.me._replace({screen, replaceCount});
      yield quest.me._killServices({stack, count: replaceCount, skipCount: 0});
    }

    return screen.serviceId;
  },

  _replace: function (quest) {
    quest.do();
  },

  _startReplaceAnimation: function (quest) {
    quest.do();
  },

  endReplaceAnimation: function* (quest) {
    const state = quest.goblin.getState();
    const stack = state.get('stack');
    const replaceCount = state.get('operationParams.replaceCount');

    // Pop stack first and kill after
    // Using a quest.do here doesn't work: the kill is done before pop...
    yield quest.me._endReplaceAnimation();

    yield quest.me._killServices({stack, count: replaceCount, skipCount: 1});
  },

  _endReplaceAnimation: function (quest) {
    quest.do();
  },

  //-----------------------------------------------------------------------------

  delete: function (quest) {},
};

// Register all quests
for (const questName in quests) {
  Goblin.registerQuest(goblinName, questName, quests[questName]);
}

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
