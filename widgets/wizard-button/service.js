'use strict';

const path = require ('path');

const goblinName = path.basename (module.parent.filename, '.js');

const Goblin = require ('xcraft-core-goblin');

// Define initial logic values
const logicState = {};

const params = {
  kind: {
    id: 'kind',
    order: 0,
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
  text: {
    id: 'text',
    order: 1,
    type: 'text',
    field: 'text',
    value: 'Abc',
  },
  glyph: {
    id: 'glyph',
    order: 2,
    type: 'text',
    field: 'glyph',
    list: ['', 'check', 'bicycle', 'car', 'rocket', 'calendar'],
    value: 'check',
  },
  tooltip: {
    id: 'tooltip',
    order: 3,
    type: 'text',
    field: 'tooltip',
    value: '',
  },
  shortcut: {
    id: 'shortcut',
    order: 4,
    type: 'text',
    field: 'shortcut',
    list: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
    value: '',
  },
  justify: {
    id: 'justify',
    order: 5,
    type: 'combo',
    field: 'justify',
    list: ['', 'flex-start', 'center', 'flex-end'],
    value: 'center',
  },
  width: {
    id: 'width',
    order: 6,
    type: 'text',
    field: 'width',
    list: ['', '32px', '50px', '100px', '200px', '300px', '500px'],
    value: '',
  },
  height: {
    id: 'height',
    order: 7,
    type: 'text',
    field: 'height',
    list: ['', '32px', '50px', '100px', '200px'],
    value: '',
  },
  grow: {
    id: 'grow',
    order: 8,
    type: 'text',
    field: 'grow',
    list: ['', '0.5', '1', '2'],
    value: '',
  },
  spacing: {
    id: 'spacing',
    order: 9,
    type: 'combo',
    field: 'spacing',
    list: ['', 'overlap', 'tiny', 'large'],
    value: '',
  },
  glyphColor: {
    id: 'glyphColor',
    order: 10,
    type: 'text',
    field: 'glyphColor',
    list: ['', 'primary', 'secondary', 'base', '#fff', '#888', '#000', '#f00'],
    value: '',
  },
  textColor: {
    id: 'textColor',
    order: 11,
    type: 'text',
    field: 'textColor',
    list: ['', 'primary', 'secondary', 'base', '#fff', '#888', '#000', '#f00'],
    value: '',
  },
  textTransform: {
    id: 'textTransform',
    order: 12,
    type: 'combo',
    field: 'textTransform',
    list: ['', 'uppercase'],
    value: '',
  },
  badgeValue: {
    id: 'badgeValue',
    order: 13,
    type: 'text',
    field: 'badgeValue',
    list: ['', '1', '2', '99'],
    value: '',
  },
  glyphPosition: {
    id: 'glyphPosition',
    order: 14,
    type: 'combo',
    field: 'glyphPosition',
    list: ['', 'left', 'right'],
    value: '',
  },
  place: {
    id: 'place',
    order: 15,
    type: 'combo',
    field: 'place',
    list: ['', '1/3', '2/3', '3/3'],
    value: '',
  },
  active: {
    id: 'active',
    order: 16,
    type: 'bool',
    field: 'active',
    value: 'false',
  },
  show: {
    id: 'show',
    order: 17,
    type: 'bool',
    field: 'show',
    value: 'true',
  },
  visibility: {
    id: 'visibility',
    order: 18,
    type: 'bool',
    field: 'visibility',
    value: 'true',
  },
};

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
