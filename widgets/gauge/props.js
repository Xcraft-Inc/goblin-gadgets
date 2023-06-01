// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    value: {
      type: types.number,
      min: 0,
      max: 100,
      description: 'Value between 0 and 100.',
    },
    gradient: {
      type: types.enumeration(
        '',
        'red-yellow-green',
        'yellow-green',
        'blue-petrol-green',
        'fix'
      ),
    },
    color: {
      type: types.color,
      description: "Color for gradient='fix'.",
    },
    kind: {
      type: types.enumeration('', 'mission', 'rounded', 'simple'),
    },
    direction: {
      type: types.enumeration('vertical', 'horizontal'),
    },
    disabled: {
      type: types.boolean,
    },
    flash: {
      type: types.boolean,
    },
    displayZero: {
      type: types.boolean,
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
