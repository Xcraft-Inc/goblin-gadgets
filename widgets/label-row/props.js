import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Label
  {
    name: 'labelWidth',
    group: 'Label',
    type: types.size,
  },
  {
    name: 'labelText',
    group: 'Label',
    type: types.nabu,
  },
  {
    name: 'labelWrap',
    group: 'Label',
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
    group: 'Label',
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
    group: 'Layout',
    type: types.size,
  },
  {
    name: 'height',
    group: 'Layout',
    type: types.size,
  },
  {
    name: 'spacing',
    group: 'Layout',
    type: types.spacing,
  },
  {
    name: 'verticalSpacing',
    group: 'Layout',
    type: types.verticalSpacing,
  },
  {
    name: 'verticalJustify',
    group: 'Layout',
    type: types.enum(['', 'top']),
  },
  {
    name: 'grow',
    group: 'Layout',
    type: types.grow,
  },
];
