import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Perso.
  {
    name: 'initials',
    group: 'perso',
    type: types.string,
  },
  {
    name: 'pseudo',
    group: 'perso',
    type: types.string,
  },
  {
    name: 'firstName',
    group: 'perso',
    type: types.string,
  },
  {
    name: 'lastName',
    group: 'perso',
    type: types.string,
  },

  // Logo.
  {
    name: 'logoShape',
    group: 'logo',
    type: types.enum([
      'circle',
      'hexagon',
      'square',
      'triangle',
      'certificate',
      'star',
      'heart',
    ]),
  },
  {
    name: 'logoColor',
    group: 'logo',
    type: types.color,
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
    name: 'onClose',
    group: 'function',
    type: types.function,
  },
];
