import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'appName',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'guildMaster',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'status',
    group: 'aspect',
    type: types.enum(['locked', 'ok']),
  },

  // Layout.
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
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },

  // Function.
  {
    name: 'onEditProfile',
    group: 'function',
    type: types.function,
  },
  {
    name: 'onEnter',
    group: 'function',
    type: types.function,
  },
];
