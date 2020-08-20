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
  {
    name: 'required',
    group: 'aspect',
    type: types.bool,
  },

  // Event
  {
    name: 'onSearchChange',
    group: 'event',
    type: types.function,
  },
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
    name: 'selectedGlyph',
    group: 'glyph',
    type: types.glyph,
  },
  {
    name: 'selectedGlyphColor',
    group: 'glyph',
    type: types.color,
  },

  // Text
  {
    name: 'searchValue',
    group: 'text',
    type: types.string,
    description: 'Use this property for editing a search value.',
  },
  {
    name: 'selectedValue',
    group: 'text',
    type: types.string,
    description: 'Use this property for showing a selected value.',
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.nabu,
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
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
