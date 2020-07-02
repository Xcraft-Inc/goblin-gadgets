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
  },
  {
    name: 'borderRadius',
    group: 'aspect',
    type: types.pixel,
  },
  {
    name: 'margin',
    group: 'aspect',
    type: types.pixel,
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
  },
  {
    name: 'minHeight',
    group: 'layout',
    type: types.pixel,
  },
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
    name: 'horizontal',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'vertical',
    group: 'layout',
    type: types.pixel,
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
