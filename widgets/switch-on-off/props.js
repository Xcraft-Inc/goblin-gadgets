// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['main']: {
    checked: {
      type: types.boolean,
      // default: false,
    },
    disabled: {
      type: types.boolean,
    },
    onClick: {
      type: types.function,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 10,
      max: 200,
    },
  },
});
