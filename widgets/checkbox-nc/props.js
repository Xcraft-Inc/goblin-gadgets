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
    name: 'onChange',
    group: 'main',
    type: types.function,
  },
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
  },

  // Text
  {
    name: 'text',
    group: 'text',
    type: types.nabu,
    defaultValue: '',
  },
  {
    name: 'textColor',
    group: 'text',
    type: types.color,
  },
  {
    name: 'fontSize',
    group: 'text',
    type: types.percentage,
  },
  {
    name: 'fontWeight',
    group: 'text',
    type: types.fontWeight,
  },
  {
    name: 'fontStyle',
    group: 'text',
    type: types.fontStyle,
  },
  {
    name: 'textTransform',
    group: 'text',
    type: types.textTransform,
  },
  {
    name: 'wrap',
    group: 'text',
    type: types.enum(['', 'no', 'no-strict', 'yes', 'yes-permissive']),
  },

  // Glyph
  {
    name: 'glyphColor',
    group: 'glyph',
    type: types.color,
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

  // Aspect
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['', 'big', 'active', 'check-button', 'radio', 'switch']),
  },
  {
    name: 'background',
    group: 'aspect',
    type: types.enum(['', 'light', 'dark']),
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'focusable',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: types.bool,
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
    name: 'cursor',
    group: 'aspect',
    type: types.cursor,
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
    name: 'toAnchor',
    group: 'aspect',
    type: types.string,
  },

  // Layout
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

  // Badge
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
];
