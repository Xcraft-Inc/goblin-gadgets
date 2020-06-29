import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'valueX',
    group: 'aspect',
    type: types.number,
    description: 'Value between 0 and 100.',
  },
  {
    name: 'valueY',
    group: 'aspect',
    type: types.number,
    description: 'Value between 0 and 100.',
  },
  {
    name: 'marginSize',
    group: 'aspect',
    type: types.enum(['', 'zero', 'small', 'default', 'large']),
  },
  {
    name: 'marginStyle',
    group: 'aspect',
    type: types.enum(['', 'none', 'shadow']),
  },
  {
    name: 'cabSize',
    group: 'aspect',
    type: types.enum(['', 'small', 'default', 'large']),
  },
  {
    name: 'hue',
    group: 'aspect',
    type: types.number,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'draggingScale',
    group: 'aspect',
    type: types.number,
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
  {
    name: 'height',
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
