import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'zIndex',
    group: 'main',
    type: types.number,
  },
  {
    name: 'backgroundColor',
    group: 'main',
    type: types.color,
  },
  {
    name: 'onClick',
    group: 'main',
    type: types.function,
  },
];
