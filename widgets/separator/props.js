import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
  },

  // Aspect.
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
      '',
      'task',
      'space',
      'exact',
      'menu-separator',
      'menu-line',
      'floating-footer',
      'ticket-warning',
      'grow',
      'sajex',
    ]),
  },

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
];
