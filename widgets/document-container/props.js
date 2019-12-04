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
  {
    name: 'borderSize',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'borderColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'hoverChildrenFontSize',
    group: 'aspect',
    type: types.percentage,
  },
  {
    name: 'hoverChildrenOpacity',
    group: 'aspect',
    type: types.number,
  },
  {
    name: 'transition',
    group: 'aspect',
    type: types.transition,
  },

  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
];
