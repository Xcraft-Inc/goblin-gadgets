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
    type: types.pixel,
  },
  {
    name: 'itemWidth',
    group: 'aspect',
    type: types.pixel,
  },
  {
    name: 'itemMargin',
    group: 'aspect',
    type: types.pixel,
  },

  // Buttons.
  {
    name: 'buttonsTop',
    group: 'buttons',
    type: types.pixel,
  },
  {
    name: 'buttonsBottom',
    group: 'buttons',
    type: types.pixel,
  },
  {
    name: 'buttonsCenter',
    group: 'buttons',
    type: types.pixel,
  },
  {
    name: 'buttonsSize',
    group: 'buttons',
    type: types.pixel,
  },
  {
    name: 'buttonsShift',
    group: 'buttons',
    type: types.pixel,
  },
  {
    name: 'buttonsShape',
    group: 'buttons',
    type: types.enum(['', 'circle', 'semiCircle']),
  },
];
