'use strict';

const path = require ('path');
const goblinName = path.basename (module.parent.filename, '.js');
const Goblin = require ('xcraft-core-goblin');
const uuidV4 = require ('uuid/v4');

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
      'action',
      'calendar',
      'calendar-navigation',
      'chronos-navigator',
      'combo',
      'footer',
      'frameless',
      'glyph-item',
      'identity',
      'label',
      'main-tab',
      'main-tab-right',
      'menu-item',
      'notification',
      'notification-close',
      'pane-navigator',
      'pane-hnavigator',
      'pane-vnavigator',
      'recurrence',
      'round',
      'subaction',
      'task-bar',
      'task-tab',
      'task-logo',
      'thin-left',
      'thin-right',
      'tray-title',
      'view-tab',
      'view-tab-right',
      'warning',
    ],
    value: '',
  },
  active: {
    id: 'active',
    order: 0.5,
    type: 'bool',
    field: 'active',
    value: 'false',
  },
  disabled: {
    id: 'disabled',
    order: 0.6,
    type: 'bool',
    field: 'disabled',
    value: 'false',
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
  glyphRotate: {
    id: 'glyphRotate',
    order: 2.1,
    type: 'combo',
    field: 'glyphRotate',
    list: ['', '90', '180', '270'],
    value: '',
  },
  glyphFlip: {
    id: 'glyphFlip',
    order: 2.2,
    type: 'combo',
    field: 'glyphFlip',
    list: ['', 'horizontal', 'vertical'],
    value: '',
  },
  glyphSpin: {
    id: 'glyphSpin',
    order: 2.3,
    type: 'combo',
    field: 'glyphSpin',
    list: ['', 'yes'],
    value: '',
  },
  glyphPosition: {
    id: 'glyphPosition',
    order: 2.5,
    type: 'combo',
    field: 'glyphPosition',
    list: ['', 'left', 'right'],
    value: '',
  },
  shape: {
    id: 'shape',
    order: 2.9,
    type: 'combo',
    field: 'shape',
    list: [
      '',
      'rounded',
      'left-rounded',
      'right-rounded',
      'smooth',
      'left-smooth',
      'right-smooth',
    ],
    value: '',
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
    value: '',
  },
  width: {
    id: 'width',
    order: 6,
    type: 'text',
    unit: 'px',
    field: 'width',
    list: ['', '32px', '50px', '100px', '150px', '200px', '300px', '500px'],
    value: '',
  },
  height: {
    id: 'height',
    order: 7,
    type: 'text',
    unit: 'px',
    field: 'height',
    list: ['', '32px', '50px', '100px', '150px', '200px'],
    value: '',
  },
  grow: {
    id: 'grow',
    order: 8,
    type: 'text',
    field: 'grow',
    list: ['', '0.5', '1'],
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
    list: [
      '',
      'primary',
      'secondary',
      'base',
      'white',
      'lightgrey',
      'grey',
      'black',
      'red',
      'green',
      'blue',
      'yellow',
      '#68a',
    ],
    value: '',
  },
  textColor: {
    id: 'textColor',
    order: 11,
    type: 'text',
    field: 'textColor',
    list: [
      '',
      'primary',
      'secondary',
      'base',
      'white',
      'lightgrey',
      'grey',
      'black',
      'red',
      'green',
      'blue',
      'yellow',
      '#68a',
    ],
    value: '',
  },
  backgroundColor: {
    id: 'backgroundColor',
    order: 11.5,
    type: 'text',
    field: 'backgroundColor',
    list: [
      '',
      'primary',
      'secondary',
      'base',
      'white',
      'lightgrey',
      'grey',
      'black',
      'red',
      'green',
      'blue',
      'yellow',
      '#68a',
    ],
    value: '',
  },
  activeColor: {
    id: 'activeColor',
    order: 11.6,
    type: 'text',
    field: 'activeColor',
    list: [
      '',
      'primary',
      'secondary',
      'base',
      'white',
      'lightgrey',
      'grey',
      'black',
      'red',
      'green',
      'blue',
      'yellow',
      '#68a',
    ],
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
  place: {
    id: 'place',
    order: 15,
    type: 'combo',
    field: 'place',
    list: ['', '1/1', '1/3', '2/3', '3/3'],
    value: '',
  },
  calendarWeekend: {
    id: 'calendarWeekend',
    order: 15.1,
    type: 'bool',
    field: 'calendarWeekend',
    value: '',
  },
  calendarDimmed: {
    id: 'calendarDimmed',
    order: 15.2,
    type: 'bool',
    field: 'calendarDimmed',
    value: '',
  },
  subkind: {
    id: 'subkind',
    order: 15.3,
    type: 'combo',
    field: 'subkind',
    list: ['', 'with-badge'],
    value: '',
  },
  cursor: {
    id: 'cursor',
    order: 16,
    type: 'combo',
    field: 'cursor',
    list: [
      '',
      'default',
      'none',
      'pointer',
      'cell',
      'crosshair',
      'text',
      'move',
      'not-allowed',
      'ew-resize',
      'ns-resize',
      'grab',
    ],
    value: '',
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

//?const params = convertToMapWithIds (data);

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
