import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['', 'vertical', 'horizontal']),
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },

  // Aspect.
  {
    name: 'firstSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'lastSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'firstMinSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'firstMaxSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'lastMinSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'lastMaxSize',
    group: 'aspect',
    type: types.size,
  },
];
