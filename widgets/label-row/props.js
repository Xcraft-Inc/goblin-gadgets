import {types} from 'goblin-gadgets/types/types.js';

export default [
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
    name: 'labelGlyph',
    group: 'Label',
    type: types.glyph,
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
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
