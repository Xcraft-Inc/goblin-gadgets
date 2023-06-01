// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    rimColor: {
      type: types.color,
    },
    segmentColor: {
      type: types.color,
    },
  },

  ['layout']: {
    size: {
      type: types.pixel,
      min: 20,
      max: 1000,
    },
    thickness: {
      type: types.pixel,
      min: 1,
      max: 100,
    },
  },
});
