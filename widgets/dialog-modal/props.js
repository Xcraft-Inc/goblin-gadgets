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
    type: types.number,
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
    type: types.size,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'left',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'right',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'top',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'bottom',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'center',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'triangleShift',
    group: 'layout',
    type: types.size,
  },
];
