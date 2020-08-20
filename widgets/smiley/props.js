import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'mainColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'topColor',
    group: 'aspect',
    type: types.color,
  },

  // Smile.
  {
    name: 'satisfaction',
    group: 'smile',
    type: types.number,
    min: 0,
    max: 100,
    step: 10,
    description: '0 = unhappy, 100 = happy',
  },
  {
    name: 'transition',
    group: 'smile',
    type: types.transition,
  },

  // Layout.
  {
    name: 'size',
    group: 'layout',
    type: types.pixel,
    min: 10,
    max: 1000,
  },
];
