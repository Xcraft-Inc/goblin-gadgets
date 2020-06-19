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
    name: 'cabSize',
    group: 'aspect',
    type: types.enum(['', 'small', 'default', 'large']),
  },
  {
    name: 'gradientColorUL',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'gradientColorUR',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'gradientColorDL',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'gradientColorDR',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
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
