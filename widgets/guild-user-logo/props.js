import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'initials',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.enum([
      'circle',
      'hexagon',
      'square',
      'triangle',
      'certificate',
      'star',
      'heart',
    ]),
  },
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
  },

  // Layout.
  {
    name: 'size',
    group: 'layout',
    type: types.pixel,
    min: 20,
    max: 400,
  },
];
