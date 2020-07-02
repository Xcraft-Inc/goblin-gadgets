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
    name: 'gradient',
    group: 'aspect',
    type: types.enum([
      '',
      'red-yellow-green',
      'yellow-green',
      'blue-petrol-green',
      'fix',
    ]),
  },
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
    description: "Color for gradient='fix'.",
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['', 'mission', 'rounded', 'simple']),
  },
  {
    name: 'direction',
    group: 'aspect',
    type: types.enum(['vertical', 'horizontal']),
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'flash',
    group: 'aspect',
    type: types.bool,
  },

  // Layout.
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
];
