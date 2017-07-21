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
      'big-center',
      'center-to-box',
      'floating-footer',
      'floating-header',
      'flying-balloon',
      'footer',
      'info',
      'large-left',
      'large-right',
      'large-single',
      'notification',
      'one-line-height',
      'pane-header',
      'task',
      'ticket-warning',
      'title',
      'title-recurrence',
    ],
    value: '',
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
    list: [
      '',
      'Label',
      'Long mot (anticonstitutionnellement) pour tester le mode wrap',
      'Première ligne<br/>Deuxième ligne',
      'Normal <em>sélectionné</em> normal',
    ],
    value: 'Label',
  },
  glyph: {
    id: 'glyph',
    order: 2,
    type: 'text',
    field: 'glyph',
    list: ['', 'check', 'close', 'bicycle', 'car', 'rocket', 'calendar'],
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
  tooltip: {
    id: 'tooltip',
    order: 3,
    type: 'text',
    field: 'tooltip',
    value: '',
  },
  justify: {
    id: 'justify',
    order: 5,
    type: 'combo',
    field: 'justify',
    list: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
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
  bottomSpacing: {
    id: 'bottomSpacing',
    order: 9.5,
    type: 'combo',
    field: 'bottomSpacing',
    list: ['', 'large'],
    value: '',
  },
  vpos: {
    id: 'vpos',
    order: 9.6,
    type: 'combo',
    field: 'vpos',
    list: ['', 'top'],
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
  glyphSize: {
    id: 'glyphSize',
    order: 12,
    type: 'combo',
    field: 'glyphSize',
    list: ['', '50%', '75%', '100%', '150%', '200%'],
    value: '',
  },
  fontSize: {
    id: 'fontSize',
    order: 13,
    type: 'combo',
    field: 'fontSize',
    list: ['', '50%', '75%', '100%', '150%', '200%'],
    value: '',
  },
  fontWeight: {
    id: 'fontWeight',
    order: 13.1,
    type: 'combo',
    field: 'fontWeight',
    list: ['', 'bold'],
    value: '',
  },
  fontStyle: {
    id: 'fontStyle',
    order: 13.2,
    type: 'combo',
    field: 'fontStyle',
    list: ['', 'italic', 'oblique'],
    value: '',
  },
  textTransform: {
    id: 'textTransform',
    order: 14,
    type: 'combo',
    field: 'textTransform',
    list: ['', 'uppercase', 'none'],
    value: '',
  },
  wrap: {
    id: 'wrap',
    order: 15,
    type: 'combo',
    field: 'wrap',
    list: ['', 'no', 'stretch', 'break-word'],
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
