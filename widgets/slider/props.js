import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'value',
    group: 'aspect',
    type: types.number,
    description: 'Value between 0 and 100.',
  },
  {
    name: 'min',
    group: 'aspect',
    type: types.number,
    description: 'Default value is 0.',
  },
  {
    name: 'max',
    group: 'aspect',
    type: types.number,
    description: 'Default value is 100.',
  },
  {
    name: 'step',
    group: 'aspect',
    type: types.number,
    description: 'Default value is 1.',
  },
  {
    name: 'colorBar',
    group: 'aspect',
    type: types.color,
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
  {
    name: 'displayTooltipWhileDragging',
    group: 'aspect',
    type: types.bool,
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
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
  },

  // Function.
  {
    name: 'onChange',
    group: 'function',
    type: types.function,
  },
  {
    name: 'formatTooltip',
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
  },
];
