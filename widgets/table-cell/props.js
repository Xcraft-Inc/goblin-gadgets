import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'rowId',
    group: 'main',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'text',
    group: 'main',
    type: types.nabu,
    defaultValue: '',
  },
  {
    name: 'glyph',
    group: 'main',
    type: types.glyph,
  },
  {
    name: 'cellFormat',
    group: 'main',
    type: types.enum(['', 'original']),
  },
  {
    name: 'type',
    group: 'main',
    type: types.enum([
      'string',
      'markdown',
      'enum',
      'date',
      'time',
      'datetime',
      'price',
      'weight',
      'length',
      'pixel',
      'volume',
      'bool',
      'number',
      'percent',
      'delay',
      'month',
      'dow',
      'quarter',
      'semester',
    ]),
  },
  {
    name: 'index',
    group: 'main',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'maxHeight',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },

  // Aspect.
  {
    name: 'isSortable',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'isHeader',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'isLast',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'simpleHeader',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'level',
    group: 'aspect',
    type: types.number,
  },
  {
    name: 'textAlign',
    group: 'aspect',
    type: types.enum(['', 'right', 'left', 'center']),
  },
  {
    name: 'horizontalSpacing',
    group: 'aspect',
    type: types.horizontalSpacing,
  },
  {
    name: 'fontSizeStrategy',
    group: 'aspect',
    type: types.enum(['', 'decrease']),
  },
  {
    name: 'indent',
    group: 'aspect',
    type: types.enum(['', 'space']),
  },
  {
    name: 'verticalAlign',
    group: 'aspect',
    type: types.enum(['', 'baseline', 'center']),
  },

  // Function.
  {
    name: 'onClick',
    group: 'function',
    type: types.function,
  },
];
