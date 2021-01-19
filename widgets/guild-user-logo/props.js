import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'initials',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.enum([
      '',
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
  {
    name: 'uri',
    group: 'aspect',
    type: types.string,
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
