// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    rowId: {
      type: types.union(types.number, types.string),
    },
    text: {
      type: types.any,
      defaultValue: '',
    },
    glyph: {
      type: types.glyph,
    },
    cellFormat: {
      type: types.enumeration('', 'original'),
    },
    type: {
      type: types.enumeration(
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
        'semester'
      ),
    },
    index: {
      type: types.union(types.number, types.string),
    },
    children: {
      type: types.component,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    maxHeight: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    grow: {
      type: types.grow,
    },
  },

  ['aspect']: {
    isSortable: {
      type: types.boolean,
    },
    isHeader: {
      type: types.boolean,
    },
    isLast: {
      type: types.boolean,
    },
    simpleHeader: {
      type: types.boolean,
    },
    level: {
      type: types.number,
      min: 0,
      max: 10,
    },
    textAlign: {
      type: types.enumeration('', 'right', 'left', 'center'),
    },
    horizontalSpacing: {
      type: types.horizontalSpacing,
    },
    fontSizeStrategy: {
      type: types.enumeration('', 'decrease'),
    },
    indent: {
      type: types.enumeration('', 'space'),
    },
    verticalAlign: {
      type: types.enumeration('', 'baseline', 'center'),
    },
  },

  ['function']: {
    onClick: {
      type: types.function,
    },
  },
});
