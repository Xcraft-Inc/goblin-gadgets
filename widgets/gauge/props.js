import {types} from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'value',
    group: 'aspect',
    type: types.number,
    description: 'Value between 0 and 100',
  },
  {
    name: 'gradient',
    group: 'aspect',
    type: types.enum(['', 'red-yellow-green', 'yellow-green']),
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['', 'mission', 'rounded']),
    defaultValue: '',
  },
  {
    name: 'direction',
    group: 'aspect',
    type: types.enum(['vertical', 'horizontal']),
    description: 'Use layout row-grow or column-grow to see the gauge',
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
    defaultValue: false,
  },
  {
    name: 'flash',
    group: 'aspect',
    type: types.bool,
    defaultValue: false,
  },
];
