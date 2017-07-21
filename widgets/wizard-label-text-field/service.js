'use strict';

const path = require ('path');
const goblinName = path.basename (module.parent.filename, '.js');
const Goblin = require ('xcraft-core-goblin');
const uuidV4 = require ('uuid/v4');

// Define initial logic values
const logicState = {};

const params = {
  disabled: {
    id: 'disabled',
    order: 0,
    type: 'bool',
    field: 'disabled',
    value: 'false',
  },
  readonly: {
    id: 'readonly',
    order: 1,
    type: 'bool',
    field: 'readonly',
    value: 'false',
  },
  defaultValue: {
    id: 'defaultValue',
    order: 2,
    type: 'text',
    field: 'defaultValue',
    list: ['', 'LabelTextField', 'Jean Dupond'],
    value: 'LabelTextField',
  },
  selectedValue: {
    id: 'selectedValue',
    order: 2.5,
    type: 'text',
    field: 'selectedValue',
    list: [
      '',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    value: '',
  },
  labelText: {
    id: 'labelText',
    order: 3,
    type: 'text',
    field: 'labelText',
    list: ['', 'LabelTextField'],
    value: 'Label',
  },
  labelGlyph: {
    id: 'labelGlyph',
    order: 4,
    type: 'text',
    field: 'labelGlyph',
    list: ['', 'check', 'close', 'bicycle', 'car', 'rocket', 'calendar'],
    value: '',
  },
  shape: {
    id: 'shape',
    order: 5,
    type: 'combo',
    field: 'shape',
    list: ['', 'rounded', 'smooth'],
    value: '',
  },
  messageInfo: {
    id: 'messageInfo',
    order: 6,
    type: 'text',
    field: 'messageInfo',
    value: '',
  },
  messageWarning: {
    id: 'messageWarning',
    order: 7,
    type: 'text',
    field: 'messageWarning',
    value: '',
  },
  hintText: {
    id: 'hintText',
    order: 8,
    type: 'text',
    field: 'hintText',
    list: ['', 'Prénom et nom', 'Adresse'],
    value: 'Adresse',
  },
  tooltip: {
    id: 'tooltip',
    order: 9,
    type: 'text',
    field: 'tooltip',
    value: '',
  },
  width: {
    id: 'width',
    order: 10,
    type: 'text',
    unit: 'px',
    field: 'width',
    list: ['', '32px', '50px', '100px', '150px', '200px', '300px', '500px'],
    value: '',
  },
  labelWidth: {
    id: 'labelWidth',
    order: 11,
    type: 'text',
    unit: 'px',
    field: 'labelWidth',
    list: ['', '32px', '50px', '100px', '150px', '200px', '300px', '500px'],
    value: '',
  },
  fieldWidth: {
    id: 'fieldWidth',
    order: 12,
    type: 'text',
    unit: 'px',
    field: 'fieldWidth',
    list: ['', '32px', '50px', '100px', '150px', '200px', '300px', '500px'],
    value: '',
  },
  height: {
    id: 'height',
    order: 13,
    type: 'text',
    unit: 'px',
    field: 'height',
    list: ['', '32px', '50px', '100px', '150px', '200px'],
    value: '',
  },
  grow: {
    id: 'grow',
    order: 14,
    type: 'text',
    field: 'grow',
    list: ['', '0.5', '1'],
    value: '',
  },
  spacing: {
    id: 'spacing',
    order: 15,
    type: 'combo',
    field: 'spacing',
    list: ['', 'overlap', 'tiny', 'large'],
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
