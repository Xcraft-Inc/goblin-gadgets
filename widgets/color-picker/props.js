import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'color',
    group: 'aspect',
    type: types.richColor,
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
    type: types.pixel,
  },

  // Function.
  {
    name: 'onChange',
    group: 'function',
    type: types.function,
  },
];
