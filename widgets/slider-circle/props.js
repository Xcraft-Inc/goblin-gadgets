import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'value',
    group: 'aspect',
    type: types.number,
    min: 0,
    max: 360,
    description: 'Value between 0 and 360.',
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
    name: 'disabled',
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
