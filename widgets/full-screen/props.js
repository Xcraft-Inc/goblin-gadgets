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
    backgroundColor: {
      type: types.color,
    },
    onClick: {
      type: types.function,
    },
  },
});
