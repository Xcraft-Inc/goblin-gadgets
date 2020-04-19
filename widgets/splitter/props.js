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

  // Initial size.
  {
    name: 'firstSize',
    group: 'initial size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'lastSize',
    group: 'initial size',
    type: types.oneOfType([types.size, types.percentage]),
    description: 'Use one of the two properties, but not both.',
  },

  // Limit size.
  {
    name: 'firstMinSize',
    group: 'limit size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'firstMaxSize',
    group: 'limit size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'lastMinSize',
    group: 'limit size',
    type: types.oneOfType([types.size, types.percentage]),
  },
  {
    name: 'lastMaxSize',
    group: 'limit size',
    type: types.oneOfType([types.size, types.percentage]),
  },
];
