import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'rimColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'segmentColor',
    group: 'aspect',
    type: types.color,
  },

  // Layout.
  {
    name: 'size',
    group: 'layout',
    type: types.pixel,
    min: 20,
    max: 1000,
  },
  {
    name: 'thickness',
    group: 'layout',
    type: types.pixel,
    min: 1,
    max: 100,
  },
];
