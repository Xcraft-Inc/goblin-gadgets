import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'value',
    group: 'aspect',
    type: types.number,
    description: 'Value between 0 and 100.',
  },
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'direction',
    group: 'aspect',
    type: types.enum(['vertical', 'horizontal']),
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