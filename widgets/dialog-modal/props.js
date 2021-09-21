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
    name: 'zIndex',
    group: 'main',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'subkind',
    group: 'main',
    type: types.enum([
      '',
      'archived',
      'box',
      'box-left',
      'business',
      'draft',
      'footer',
      'full',
      'info',
      'large-box',
      'left',
      'light-box',
      'list',
      'me',
      'no-overlay',
      'no-shadow',
      'other',
      'padding',
      'top-margin',
      'trashed',
      'warning',
      'wide-info',
      'wrap',
    ]),
  },
  {
    name: 'backgroundClose',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'enterKeyStaysInside',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'close',
    group: 'main',
    type: types.function,
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
    name: 'left',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'right',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'top',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'bottom',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'center',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'triangleShift',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'margin',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 100,
  },
];
