import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'barColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'barPosition',
    group: 'aspect',
    type: types.enum(['', 'start', 'middle', 'end']),
  },
  {
    name: 'direction',
    group: 'aspect',
    type: types.enum(['vertical', 'horizontal']),
  },
  {
    name: 'gliderSize',
    group: 'aspect',
    type: types.enum(['', 'small', 'default', 'large']),
  },
  {
    name: 'cabSize',
    group: 'aspect',
    type: types.enum(['', 'small', 'default', 'large']),
  },
  {
    name: 'cabType',
    group: 'aspect',
    type: types.enum(['', 'round', 'thin']),
  },
  {
    name: 'gradient',
    group: 'aspect',
    type: types.enum(['', '1to2', 'rainbow']),
  },
  {
    name: 'gradientColor1',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'gradientColor2',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },

  // Value.
  {
    name: 'value',
    group: 'value',
    type: types.oneOfType([types.number, types.string]),
    description:
      'Value between "min" and "max", or two values separate by ";".',
  },
  {
    name: 'min',
    group: 'value',
    type: types.number,
    description: 'Default value is 0.',
  },
  {
    name: 'max',
    group: 'value',
    type: types.number,
    description: 'Default value is 100.',
  },
  {
    name: 'step',
    group: 'value',
    type: types.number,
    description: 'Default value is 1.',
  },
  {
    name: 'displayValue',
    group: 'value',
    type: types.enum(['', 'never', 'dragging', 'always']),
  },
  {
    name: 'getDisplayedValue',
    group: 'value',
    type: types.function,
  },

  // Layout.
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },

  // Function.
  {
    name: 'onChange',
    group: 'function',
    type: types.function,
  },

  // Functionality.
  {
    name: 'changeMode',
    group: 'functionality',
    type: types.enum(['blur', 'throttled', 'immediate', 'passthrough']),
    description:
      "'blur': onChange is called only on blur.\n'throttled': onChange is called on blur and every X ms (see 'throttleDelay').\n'immediate': onChange is called on each key press.\n'passthrough': value and onChange are directly given to the underlying input.",
  },
  {
    name: 'throttleDelay',
    group: 'functionality',
    type: types.number,
    min: 0,
    max: 10000,
  },
];
