import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'identicalCount',
    group: 'main',
    type: types.number,
  },
  {
    name: 'tooltip',
    group: 'main',
    type: types.string,
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'flash',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'show',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'visibility',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'opacity',
    group: 'main',
    type: types.number,
    min: 0,
    max: 1,
  },
  {
    name: 'cursor',
    group: 'main',
    type: types.cursor,
  },
  {
    name: 'hideContent',
    group: 'main',
    type: types.bool,
  },

  // Aspect.
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
      '',
      'ticket',
      'rect',
      'cover',
      'thin',
      'event',
      'subpane',
    ]),
  },
  {
    name: 'subkind',
    group: 'aspect',
    type: types.enum(['', 'dragged']),
  },
  {
    name: 'shadow',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'hatch',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'backgroundText',
    group: 'aspect',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'hudGlyph',
    group: 'aspect',
    type: types.glyph,
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.enum(['', 'middle', 'first', 'continued', 'last']),
  },
  {
    name: 'hoverShape',
    group: 'aspect',
    type: types.enum(['', 'middle', 'first', 'continued', 'last']),
  },

  // Corner.
  {
    name: 'cornerPosition',
    group: 'corner',
    type: types.enum(['', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']),
  },
  {
    name: 'cornerColor',
    group: 'corner',
    type: types.color,
  },
  {
    name: 'cornerSize',
    group: 'corner',
    type: types.pixel,
    min: 0,
    max: 100,
  },

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
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'verticalSpacing',
    group: 'layout',
    type: types.verticalSpacing,
  },
  {
    name: 'horizontalSpacing',
    group: 'layout',
    type: types.horizontalSpacing,
  },

  // Function.
  {
    name: 'onMouseOver',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onMouseOut',
    group: 'function',
    type: types.function,
  },
  {
    name: 'mouseDown',
    group: 'function',
    type: types.function,
  },
  {
    name: 'mouseUp',
    group: 'function',
    type: types.function,
  },
];
