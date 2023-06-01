// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    value: {
      type: types.string,
      description: 'Values XY between 0 and 100 (by example "50;0").',
    },
    marginSize: {
      type: types.enumeration('', 'zero', 'small', 'default', 'large'),
    },
    marginStyle: {
      type: types.enumeration('', 'none', 'shadow'),
    },
    cabSize: {
      type: types.enumeration('', 'small', 'default', 'large'),
    },
    hue: {
      type: types.number,
      min: 0,
      max: 360,
    },
    disabled: {
      type: types.boolean,
    },
    draggingScale: {
      type: types.number,
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
