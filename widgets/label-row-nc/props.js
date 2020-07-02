import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Label
  {
    name: 'labelWidth',
    group: 'label',
    type: types.pixel,
  },
  {
    name: 'labelText',
    group: 'label',
    type: types.nabu,
  },
  {
    name: 'labelWrap',
    group: 'label',
    type: types.enum([
      '',
      'no',
      'no-end',
      'no-strict',
      'yes',
      'yes-permissive',
    ]),
  },
  {
    name: 'labelGlyph',
    group: 'label',
    type: types.glyph,
  },

  // Main
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },

  // Aspect
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
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

  // Layout
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
  {
    name: 'horizontalSpacing',
    group: 'layout',
    type: types.horizontalSpacing,
  },
  {
    name: 'verticalSpacing',
    group: 'layout',
    type: types.verticalSpacing,
  },
  {
    name: 'verticalJustify',
    group: 'layout',
    type: types.enum(['', 'center', 'top']),
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
