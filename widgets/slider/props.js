// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    barColor: {
      type: types.color,
    },
    barPosition: {
      type: types.enumeration('', 'start', 'middle', 'end'),
    },
    direction: {
      type: types.enumeration('vertical', 'horizontal'),
    },
    gliderSize: {
      type: types.enumeration('', 'small', 'default', 'large'),
    },
    cabSize: {
      type: types.enumeration('', 'small', 'default', 'large'),
    },
    cabType: {
      type: types.enumeration('', 'round', 'thin'),
    },
    gradient: {
      type: types.enumeration('', '1to2', 'rainbow'),
    },
    gradientColor1: {
      type: types.color,
    },
    gradientColor2: {
      type: types.color,
    },
    disabled: {
      type: types.boolean,
    },
  },

  ['value']: {
    value: {
      type: types.union(types.number, types.string),
      description:
        'Value between "min" and "max", or two values separate by ";".',
    },
    min: {
      type: types.number,
      description: 'Default value is 0.',
    },
    max: {
      type: types.number,
      description: 'Default value is 100.',
    },
    step: {
      type: types.number,
      description: 'Default value is 1.',
    },
    displayValue: {
      type: types.enumeration('', 'never', 'dragging', 'always'),
    },
    getDisplayedValue: {
      type: types.function,
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
