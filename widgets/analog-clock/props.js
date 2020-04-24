import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Aspect.
  {
    name: 'size',
    group: 'aspect',
    type: types.size,
  },
  {
    name: 'look',
    group: 'aspect',
    type: types.enum([
      '',
      'cff',
      'black',
      'classic',
      'simple',
      'discreet',
      'ring',
      'transparent',
      'light',
      'royal',
      'smoothy',
      'dots',
    ]),
  },
  {
    name: 'transition',
    group: 'aspect',
    type: types.transition,
  },
  {
    name: 'limit',
    group: 'aspect',
    type: types.number,
  },

  // Time.
  {
    name: 'fixedTime',
    group: 'time',
    type: types.time,
    description:
      'If this property is omitted, the clock displays the current time in real time.',
  },

  // Function.
  {
    name: 'mouseOver',
    group: 'function',
    type: types.function,
  },
  {
    name: 'mouseOut',
    group: 'function',
    type: types.function,
  },
];
