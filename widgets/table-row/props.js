import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'cellFormat',
    group: 'main',
    type: types.enum(['', 'original']),
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: types.enum(['', 'none', 'single', 'multi']),
  },
  {
    name: 'row',
    group: 'main',
    type: types.any,
  },

  // Aspect.
  {
    name: 'selected',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'topSeparator',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'bottomSeparator',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'compactMargins',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'isLast',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'level',
    group: 'aspect',
    type: types.number,
  },
  {
    name: 'fontSizeStrategy',
    group: 'aspect',
    type: types.enum(['', 'decrease']),
  },

  // Function.
  {
    name: 'selectionChanged',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onDoubleClick',
    group: 'function',
    type: types.function,
  },
];
