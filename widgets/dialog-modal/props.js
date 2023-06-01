// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    children: {
      type: types.component,
    },
    zIndex: {
      type: types.union(types.number, types.string),
    },
    subkind: {
      type: types.enumeration(
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
        'wrap'
      ),
    },
    backgroundClose: {
      type: types.boolean,
    },
    enterKeyStaysInside: {
      type: types.boolean,
    },
    close: {
      type: types.function,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    height: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    left: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    right: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    top: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    bottom: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    center: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    triangleShift: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    margin: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
  },
});
