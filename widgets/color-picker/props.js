import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
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