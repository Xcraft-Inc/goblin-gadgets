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

  // Layout.
  {
    name: 'step',
    group: 'xcraft.ch',
    type: types.number,
    min: 1,
    max: 7,
    description:
      'This component is didactic. The different steps correspond to the xcraft.ch documentation.',
  },
];
