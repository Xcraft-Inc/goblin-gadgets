import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'value',
    group: 'aspect',
    type: types.number,
    min: 0,
    max: 100,
    description: 'Value between 0 and 100.',
  },

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
