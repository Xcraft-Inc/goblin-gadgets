import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },

  // UI.
  {
    name: 'responsive',
    group: 'ui',
    type: types.bool,
  },
  {
    name: 'touch',
    group: 'ui',
    type: types.bool,
  },
  {
    name: 'navigator',
    group: 'ui',
    type: types.enum(['', 'none', 'bullets']),
  },
  {
    name: 'cycling',
    group: 'ui',
    type: types.enum(['', 'blocked', 'loop']),
  },
  {
    name: 'forceRequiredToOverflow',
    group: 'ui',
    type: types.number,
  },

  // Aspect.
  {
    name: 'maxWidth',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'itemWidth',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'itemMargin',
    group: 'aspect',
    type: types.size,
  },

  // Buttons.
  {
    name: 'buttonsTop',
    group: 'buttons',
    type: types.size,
  },
  {
    name: 'buttonsBottom',
    group: 'buttons',
    type: types.size,
  },
  {
    name: 'buttonsCenter',
    group: 'buttons',
    type: types.size,
  },
  {
    name: 'buttonsSize',
    group: 'buttons',
    type: types.size,
  },
  {
    name: 'buttonsShift',
    group: 'buttons',
    type: types.size,
  },
  {
    name: 'buttonsShape',
    group: 'buttons',
    type: types.enum(['', 'circle', 'semiCircle']),
  },
];
