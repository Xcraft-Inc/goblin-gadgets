import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'kind',
    group: 'main',
    type: types.enum(['vertical', 'horizontal']),
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },

  // Size.
  {
    name: 'firstSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
    description: "Initial size of first panel. Do not use with 'lastSize'",
  },
  {
    name: 'lastSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
    description: "Initial size of last panel. Do not use with 'firstSize'",
  },
  {
    name: 'firstMinSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'firstMaxSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'lastMinSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'lastMaxSize',
    group: 'size',
    type: types.oneOfType([types.size, types.percentage]),
  },
];
