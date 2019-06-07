import {types} from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'checked',
    group: 'main',
    type: types.bool,
    default: false,
  },
  {
    name: 'onChange',
    group: 'main',
    type: types.function,
  },
  {
    name: 'glyphColor',
    group: 'glyph',
    type: types.color,
  },
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
    defaultValue: false,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
      '',
      'simple',
      'active',
      'check-button',
      'radio',
      'switch',
    ]),
    defaultValue: 'check-button',
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: types.bool,
    defaultValue: false,
  },
  {
    name: 'focusable',
    group: 'aspect',
    type: types.bool,
    defaultValue: false,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: types.bool,
    defaultValue: false,
  },
  {
    name: 'glyphFlip',
    group: 'glyph',
    type: types.enum(['', 'horizontal', 'vertical']),
  },
  {
    name: 'glyphSpin',
    group: 'glyph',
    type: types.enum(['', 'yes']),
  },
  {
    name: 'glyphSize',
    group: 'glyph',
    type: types.percentage,
  },
  {
    name: 'width',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'activeColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'badgeValue',
    group: 'badge',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'badgePush',
    group: 'badge',
    type: types.bool,
  },
  {
    name: 'badgePosition',
    group: 'badge',
    type: types.enum(['', 'top-right', 'over']),
    defaultValue: 'over',
  },
  {
    name: 'badgeShape',
    group: 'badge',
    type: types.enum(['', 'circle']),
  },
  {
    name: 'badgeColor',
    group: 'badge',
    type: types.enum(['', 'red', 'green']),
  },
  {
    name: 'cursor',
    group: 'aspect',
    type: types.cursor,
  },
  {
    name: 'show',
    group: 'aspect',
    type: types.bool,
    defaultValue: true,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: types.bool,
    defaultValue: true,
  },
  {
    name: 'toAnchor',
    group: 'aspect',
    type: types.string,
  },
];
