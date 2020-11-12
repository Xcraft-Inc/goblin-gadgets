import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['none', 'blob', 'wave']),
  },
  {
    name: 'color',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'duration',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'direction',
    group: 'aspect',
    type: types.enum(['normal', 'reverse']),
  },
];
