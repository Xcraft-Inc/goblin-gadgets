// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    disabled: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    kind: {
      type: types.enumeration(
        '',
        'task',
        'space',
        'exact',
        'menu-separator',
        'menu-line',
        'floating-footer',
        'ticket-warning',
        'grow',
        'sajex'
      ),
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
  },
});
