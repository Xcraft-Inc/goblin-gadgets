import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'resizing',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'zIndex',
    group: 'main',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'drawChildrenWhileResizing',
    group: 'main',
    type: types.bool,
  },

  // Aspect.
  {
    name: 'borderSize',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 20,
  },
  {
    name: 'borderRadius',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 50,
  },
  {
    name: 'margin',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 100,
  },
  {
    name: 'borderColor',
    group: 'aspect',
    type: types.color,
  },

  // Title.
  {
    name: 'titleBarHeight',
    group: 'title',
    type: types.pixel,
    min: 0,
    max: 100,
  },
  {
    name: 'titleBarText',
    group: 'title',
    type: types.nabu,
  },

  // Layout.
  {
    name: 'position',
    group: 'layout',
    type: types.enum(['fixed', 'absolute', 'relative']),
  },
  {
    name: 'minWidth',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'minHeight',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
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
    name: 'horizontal',
    group: 'layout',
    type: types.pixel,
    min: -500,
    max: 500,
  },
  {
    name: 'vertical',
    group: 'layout',
    type: types.pixel,
    min: -500,
    max: 500,
  },

  // Function.
  {
    name: 'onMinimize',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onMaximize',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onCloseDialog',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onMouseDown',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onMouseMove',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onMouseUp',
    group: 'function',
    type: types.function,
  },
];
