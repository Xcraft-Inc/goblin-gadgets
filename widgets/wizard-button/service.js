'use strict';

const path = require ('path');
const goblinName = path.basename (module.parent.filename, '.js');
const Goblin = require ('xcraft-core-goblin');
const uuidV4 = require ('uuid/v4');

// Define initial logic values
const logicState = {};

const data = [
  {
    type: 'combo',
    field: 'kind',
    list: [
      '',
      'label',
      'task-logo',
      'task-bar',
      'main-tab',
      'main-tab-right',
      'view-tab',
      'view-tab-right',
      'task-tab',
      'pane-navigator',
      'pane-hnavigator',
      'pane-vnavigator',
      'footer',
      'notification',
      'notification-close',
      'warning',
      'action',
      'subaction',
      'combo',
      'round',
      'identity',
      'thin-left',
      'thin-right',
      'frameless',
      'menu-item',
      'glyph-item',
      'tray-title',
      'calendar',
      'calendar-navigation',
      'container',
      'container-start',
      'box',
      'chronos-navigator',
      'recurrence',
      'hover',
    ],
    value: '',
  },
  {
    type: 'text',
    field: 'text',
    value: 'Abc',
  },
  {
    type: 'text',
    field: 'glyph',
    list: ['', 'check', 'bicycle', 'car', 'rocket', 'calendar'],
    value: 'check',
  },
  {
    type: 'text',
    field: 'tooltip',
    value: '',
  },
  {
    type: 'text',
    field: 'shortcut',
    list: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
    value: '',
  },
  {
    type: 'combo',
    field: 'justify',
    list: ['', 'flex-start', 'center', 'flex-end'],
    value: 'center',
  },
  {
    type: 'text',
    field: 'width',
    list: ['', '32px', '50px', '100px', '200px', '300px', '500px'],
    value: '',
  },
  {
    type: 'text',
    field: 'height',
    list: ['', '32px', '50px', '100px', '200px'],
    value: '',
  },
  {
    type: 'text',
    field: 'grow',
    list: ['', '0.5', '1'],
    value: '',
  },
  {
    type: 'combo',
    field: 'spacing',
    list: ['', 'overlap', 'tiny', 'large'],
    value: '',
  },
  {
    type: 'text',
    field: 'glyphColor',
    list: ['', 'primary', 'secondary', 'base', '#fff', '#888', '#000', '#f00'],
    value: '',
  },
  {
    type: 'text',
    field: 'textColor',
    list: ['', 'primary', 'secondary', 'base', '#fff', '#888', '#000', '#f00'],
    value: '',
  },
  {
    type: 'combo',
    field: 'textTransform',
    list: ['', 'uppercase'],
    value: '',
  },
  {
    type: 'text',
    field: 'badgeValue',
    list: ['', '1', '2', '99'],
    value: '',
  },
  {
    type: 'combo',
    field: 'glyphPosition',
    list: ['', 'left', 'right'],
    value: '',
  },
  {
    type: 'combo',
    field: 'place',
    list: ['', '1/1', '1/3', '2/3', '3/3'],
    value: '',
  },
  {
    type: 'bool',
    field: 'active',
    value: 'false',
  },
  {
    type: 'bool',
    field: 'show',
    value: 'true',
  },
  {
    type: 'bool',
    field: 'visibility',
    value: 'true',
  },
];

function convertToMapWithIds (data) {
  const result = {};
  let order = 0;
  for (const item of data) {
    const id = uuidV4 ();
    item.id = id;
    item.order = order++;
    result[id] = item;
  }
  return result;
}

const params = convertToMapWithIds (data);

// Define logic handlers according rc.json
const logicHandlers = {
  create: (state, action) => {
    const initialState = {
      id: action.get ('id'),
      params: params,
    };
    return state.set ('', initialState);
  },
};

// Register quest's according rc.json
Goblin.registerQuest (goblinName, 'create', function (quest, desktopId) {
  const desk = quest.useAs ('desktop', desktopId);
  desk.createFormFor ({workitemId: quest.goblin.id});
  desk.addTab ({
    name: 'Wizard',
    contextId: 'test',
    view: 'test-wizard',
    workitemId: quest.goblin.id,
  });
  quest.do ();
  return quest.goblin.id;
});

Goblin.registerQuest (goblinName, 'delete', function () {});

Object.keys (params).forEach (p => {
  const param = params[p];
  Goblin.registerQuest (goblinName, `change-${param.field}`, function (quest) {
    quest.do ();
  });
  logicHandlers[`change-${param.field}`] = (state, action) => {
    param.value = action.get ('newValue');
    return state.set (`params.${param.field}`, param);
  };
});

// Create a Goblin with initial state and handlers
module.exports = Goblin.configure (goblinName, logicState, logicHandlers);
