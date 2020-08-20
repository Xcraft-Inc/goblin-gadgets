import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'cornerSize',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 100,
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
    type: types.pixel,
    min: 0,
    max: 20,
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
    min: 0,
    max: 1,
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
