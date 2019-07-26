import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Layout.
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
  {
    name: 'cornerSize',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },

  // Aspect
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'hoverColor',
    group: 'aspect',
    type: types.color,
  },
];
