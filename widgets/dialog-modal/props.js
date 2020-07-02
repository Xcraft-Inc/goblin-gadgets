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
    name: 'close',
    group: 'main',
    type: types.function,
  },

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
    name: 'left',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'right',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'top',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'bottom',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'center',
    group: 'layout',
    type: types.pixel,
  },
  {
    name: 'triangleShift',
    group: 'layout',
    type: types.pixel,
  },
];
