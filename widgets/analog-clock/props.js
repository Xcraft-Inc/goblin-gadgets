import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Aspect.
  {
    name: 'size',
    group: 'aspect',
    type: types.pixel,
    min: 10,
    max: 1000,
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
    min: 0,
    max: 5,
  },

  // Time.
  {
    name: 'fixedTime',
    group: 'time',
    type: types.time,
    description:
      'If this property is omitted, the clock displays the current time in real time.',
  },
  {
    name: 'digitalTime',
    group: 'time',
    type: types.bool,
  },

  // Function.
  {
    name: 'draggingEnabled',
    group: 'function',
    type: types.bool,
  },
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
  {
    name: 'onTimeChanged',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onDragStarted',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onDragMoved',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onTimeEnded',
    group: 'function',
    type: types.function,
  },
];
