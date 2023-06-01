// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    kind: {
      type: types.enumeration('none', 'blob', 'wave'),
    },
    color: {
      type: types.color,
    },
    duration: {
      type: types.string,
    },
    direction: {
      type: types.enumeration('normal', 'reverse'),
    },
  },
});
