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
    min: 0,
    max: 1000,
  },
  {
    name: 'itemWidth',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'itemMargin',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 1000,
  },

  // Buttons.
  {
    name: 'buttonsTop',
    group: 'buttons',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'buttonsBottom',
    group: 'buttons',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'buttonsCenter',
    group: 'buttons',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'buttonsSize',
    group: 'buttons',
    type: types.pixel,
    min: 0,
    max: 100,
  },
  {
    name: 'buttonsShift',
    group: 'buttons',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'buttonsShape',
    group: 'buttons',
    type: types.enum(['', 'circle', 'semiCircle']),
  },
];
