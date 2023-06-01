// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    initials: {
      type: types.string,
    },
    tooltip: {
      type: types.nabu,
    },
    shape: {
      type: types.enumeration(
        '',
        'circle',
        'hexagon',
        'square',
        'triangle',
        'certificate',
        'star',
        'heart'
      ),
    },
    color: {
      type: types.color,
    },
    uri: {
      type: types.string,
    },
  },

  ['layout']: {
    size: {
      type: types.pixel,
      min: 20,
      max: 400,
    },
  },
});
