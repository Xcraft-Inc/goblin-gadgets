import Types from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'text',
    group: 'main',
    type: Types.types.nabu,
    defaultValue: '',
  },
  {
    name: 'onClick',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'textColor',
    group: 'aspect',
    type: Types.types.color,
    defaultValue: '',
  },
  {
    name: 'glyphColor',
    group: 'aspect',
    type: Types.types.color,
    defaultValue: '',
  },
  {
    name: 'disabled',
    group: 'main',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: Types.types.enum([
      '',
      'big-center',
      'button-footer',
      'button-notification',
      'center-to-box',
      'check-button',
      'combo',
      'compact',
      'floating-footer',
      'floating-header',
      'flying-balloon',
      'footer',
      'info',
      'large-left',
      'large-right',
      'large-single',
      'main-tab',
      'main-tab-right',
      'menu-item',
      'notification',
      'one-line-height',
      'pane-header',
      'task',
      'task-logo',
      'task-show-footer',
      'ticket-warning',
      'title',
      'title-recurrence',
      'view-tab',
      'view-tab-right',
    ]),
    description: 'The kind property change the style of the button.',
    defaultValue: '',
  },
  {
    name: 'shape',
    group: 'aspect',
    type: Types.types.shape,
    description: 'Change shape of the button.',
    defaultValue: '',
  },
  {
    name: 'active',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'maxLines',
    group: 'aspect',
    type: Types.types.number,
  },
  {
    name: 'skipEmptyLines',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'singleLine',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'glyph',
    group: 'glyph',
    type: Types.types.glyph,
    description: 'Display a glyph before text.',
    defaultValue: '',
  },
  {
    name: 'glyphRotate',
    group: 'glyph',
    type: Types.types.angle,
    defaultValue: '',
  },
  {
    name: 'glyphFlip',
    group: 'glyph',
    type: Types.types.enum(['horizontal', 'vertical', 'both']),
  },
  {
    name: 'glyphSpin',
    group: 'glyph',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'glyphPosition',
    group: 'glyph',
    type: Types.types.enum(['', 'left', 'right']),
    defaultValue: 'left',
  },
  {
    name: 'glyphSize',
    group: 'glyph',
    type: Types.types.percentage,
    defaultValue: '',
  },
  {
    name: 'insideButton',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: Types.types.string,
    defaultValue: '',
  },
  {
    name: 'justify',
    group: 'aspect',
    type: Types.types.justify,
    defaultValue: '',
  },
  {
    name: 'width',
    group: 'layout',
    type: Types.types.size,
    defaultValue: '',
  },
  {
    name: 'height',
    group: 'layout',
    type: Types.types.size,
    defaultValue: '',
  },
  {
    name: 'grow',
    group: 'layout',
    type: Types.types.grow,
    defaultValue: '',
  },
  {
    name: 'spacing',
    group: 'layout',
    type: Types.types.spacing,
    defaultValue: '',
  },
  {
    name: 'bottomSpacing',
    group: 'layout',
    type: Types.types.enum(['', 'large']),
    defaultValue: '',
  },
  {
    name: 'vpos',
    group: 'layout',
    type: Types.types.enum(['', 'top']),
    defaultValue: '',
  },
  {
    name: 'textColor',
    group: 'text',
    type: Types.types.color,
    defaultValue: '',
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: Types.types.color,
    defaultValue: '',
  },
  {
    name: 'fontSize',
    group: 'text',
    type: Types.types.percentage,
    defaultValue: '',
  },
  {
    name: 'fontWeight',
    group: 'text',
    type: Types.types.fontWeight,
    defaultValue: '',
  },
  {
    name: 'fontStyle',
    group: 'text',
    type: Types.types.fontStyle,
    defaultValue: '',
  },
  {
    name: 'textTransform',
    group: 'text',
    type: Types.types.textTransform,
    defaultValue: '',
  },
  {
    name: 'wrap',
    group: 'text',
    type: Types.types.enum(['', 'no', 'no-strict', 'yes', 'yes-permissive']),
    defaultValue: '',
  },
  {
    name: 'cursor',
    group: 'aspect',
    type: Types.types.cursor,
    defaultValue: '',
  },
  {
    name: 'show',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: true,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: true,
  },
  // GetGlyph ? GetText ?
  // Create custom function to choose a glyph or a text ?
  // ClassName ? Possibility to get a className from a parent node ?
];
