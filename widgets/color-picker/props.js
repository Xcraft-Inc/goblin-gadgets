import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'color',
    group: 'aspect',
    type: types.enum([
      '',
      '#FF0000',
      'CMY(100,0,200)',
      'HSL(50,100,100)',
      'G(128)',
    ]),
  },

  // Layout.
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'width',
    group: 'layout',
    type: types.size,
  },

  // Function.
  {
    name: 'onChange',
    group: 'function',
    type: types.function,
  },
];
