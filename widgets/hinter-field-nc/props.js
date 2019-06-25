import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect
  {
    name: 'show',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },

  // Event
  {
    name: 'onAdd',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onClear',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onShow',
    group: 'event',
    type: types.function,
  },

  // Glyph
  {
    name: 'glyph',
    group: 'glyph',
    type: types.glyph,
  },
  {
    name: 'glyphColor',
    group: 'glyph',
    type: types.color,
  },

  // Text
  {
    name: 'searchValue',
    group: 'text',
    type: types.string,
  },
  {
    name: 'selectedValue',
    group: 'text',
    type: types.string,
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.string,
  },
  {
    name: 'tooltip',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'wrap',
    group: 'text',
    type: types.enum([
      '',
      'no',
      'no-end',
      'no-strict',
      'yes',
      'yes-permissive',
    ]),
  },

  // Layout
  {
    name: 'width',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
