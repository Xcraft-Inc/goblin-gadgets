// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    value: {
      type: types.number,
      min: 0,
      max: 360,
      description: 'Value between 0 and 360.',
    },
    gliderSize: {
      type: types.enumeration('', 'small', 'default', 'large'),
    },
    cabSize: {
      type: types.enumeration('', 'small', 'default', 'large'),
    },
    disabled: {
      type: types.boolean,
    },
  },

  ['layout']: {
    grow: {
      type: types.grow,
    },
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

  ['function']: {
    onChange: {
      type: types.function,
    },
  },

  ['functionality']: {
    changeMode: {
      type: types.enumeration('blur', 'throttled', 'immediate', 'passthrough'),
      description:
        "'blur': onChange is called only on blur.\n'throttled': onChange is called on blur and every X ms (see 'throttleDelay').\n'immediate': onChange is called on each key press.\n'passthrough': value and onChange are directly given to the underlying input.",
    },
    throttleDelay: {
      type: types.number,
      min: 0,
      max: 10000,
    },
  },
});
