import {types} from 'goblin-gadgets/types/types.js';

export default [
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
    name: 'cornerSize',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'hoverCornerSize',
    group: 'layout',
    type: types.pixel,
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
    name: 'borderSize',
    group: 'aspect',
    type: types.pixel,
  },
  {
    name: 'borderColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'hoverColor',
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
    type: types.enum([
      '',
      '0.0s ease-out',
      '0.2s ease-out',
      '0.5s ease-out',
      '1.0s ease-out',
    ]),
  },

  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
];
