import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Main
  {
    name: 'checked',
    group: 'main',
    type: types.bool,
    default: false,
  },
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
  },
  {
    name: 'onClick',
    group: 'main',
    type: types.function,
  },

  // Layout
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
    min: 10,
    max: 200,
  },
];
