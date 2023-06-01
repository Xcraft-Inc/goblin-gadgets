// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    cellFormat: {
      type: types.enumeration('', 'original'),
    },
    selectionMode: {
      type: types.enumeration('', 'none', 'single', 'multi'),
    },
    row: {
      type: types.any,
    },
  },

  ['aspect']: {
    selected: {
      type: types.boolean,
    },
    topSeparator: {
      type: types.boolean,
    },
    bottomSeparator: {
      type: types.boolean,
    },
    compactMargins: {
      type: types.boolean,
    },
    isLast: {
      type: types.boolean,
    },
    level: {
      type: types.number,
      min: 0,
      max: 10,
    },
    fontSizeStrategy: {
      type: types.enumeration('', 'decrease'),
    },
  },

  ['function']: {
    selectionChanged: {
      type: types.function,
    },
    onDoubleClick: {
      type: types.function,
    },
  },
});
