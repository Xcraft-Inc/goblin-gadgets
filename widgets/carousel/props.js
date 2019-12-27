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
    type: types.enum(['none', 'bullets']),
  },
  {
    name: 'cycling',
    group: 'ui',
    type: types.enum(['blocked', 'loop']),
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
  {
    name: 'buttonsTop',
    group: 'aspect',
    type: types.size,
  },
];
