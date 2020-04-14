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
      'classic',
      'black',
      'simple',
      'smoothy',
      'transparent',
      'light',
      'royal',
      'ring',
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
  {
    name: 'mouseOver',
    group: 'aspect',
    type: types.function,
  },
  {
    name: 'mouseOut',
    group: 'aspect',
    type: types.function,
  },
];
