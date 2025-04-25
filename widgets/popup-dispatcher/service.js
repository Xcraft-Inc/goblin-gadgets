'use strict';

const path = require('path');
const goblinName = path.basename(module.parent.filename, '.js');
const Goblin = require('xcraft-core-goblin');

/******************************************************************************/

// Define initial logic values
const logicState = {
  id: goblinName,
  popup: null,
  params: null,
};

/******************************************************************************/

const logicHandlers = {
  create: (state, action) => {
    return state.set('id', action.get('id'));
  },

  show: (state, action) => {
    return state
      .set('popup', action.get('popup'))
      .set('params', action.get('params'));
  },

  hide: (state) => {
    return state.set('popup', null).set('params', null);
  },

  setParams: (state, action) => {
    return state.merge('params', action.get('params'));
  },
};

/******************************************************************************/

Goblin.registerQuest(goblinName, 'create', async function (
  quest,
  id,
  desktopId,
  labId
) {
  quest.goblin.setX('desktopId', desktopId);
  quest.goblin.setX('labId', labId);

  await quest.warehouse.subscribe({
    feed: desktopId,
    branches: [id],
  });

  quest.do({id});
});

/******************************************************************************/

Goblin.registerQuest(goblinName, 'show', async function (quest, popup, params) {
  await quest.me.showWindow();
  quest.do({popup, params});
});

Goblin.registerQuest(goblinName, 'prompt', async function (
  quest,
  popup,
  params
) {
  await quest.me.showWindow();
  const result = await quest.sub.callAndWait(async function () {
    await quest.me.show({popup, params});
  }, `*::*<${popup}.done>`);

  return result;
});

Goblin.registerQuest(goblinName, 'hide', function (quest, result) {
  const state = quest.goblin.getState();
  const popup = state.get('popup');
  quest.evt(`<${popup}.done>`, result);
  quest.do();
});

Goblin.registerQuest(goblinName, 'setParams', function (quest, params) {
  quest.do({params});
});

Goblin.registerQuest(goblinName, 'showWindow', async function (quest) {
  const labId = quest.goblin.getX('labId');
  if (!labId) {
    return;
  }
  const winId = `wm@${labId}`;
  try {
    const wmAPI = quest.getAPI(winId);
    await wmAPI.moveToFront();
  } catch (e) {
    const err = e.stack || e.message || e;
    quest.log.warn(
      `Unable to call goblin-wm API ! showWindow works only in electron app ! ${err}`
    );
  }
});

Goblin.registerQuest(goblinName, 'delete', function (quest) {});

/******************************************************************************/
module.exports = Goblin.configure(goblinName, logicState, logicHandlers);
