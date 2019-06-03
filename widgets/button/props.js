import Types from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'text',
    group: 'main',
    type: Types.types.nabu,
    defaultValue: '',
  },
  {
    name: 'children',
    group: 'main',
    type: Types.types.component,
    defaultValue: '',
  },
  {
    name: 'onDoubleClick',
    group: 'main',
    type: Types.types.function,
    description: "Works only with kind 'container' and 'box'",
  },
  {
    name: 'onClick',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'onMouseDown',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'onMouseUp',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'onMouseOver',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'onMouseOut',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'textColor',
    group: 'aspect',
    type: Types.types.color,
  },
  {
    name: 'glyphColor',
    group: 'glyph',
    type: Types.types.color,
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
      'action',
      'button-notification',
      'button-footer',
      'box',
      'calendar',
      'calendar-navigator',
      'calendar-title',
      'check-button',
      'chronos-navigator',
      'chronos-navigator',
      'combo',
      'combo-item',
      'combo-wrap-item',
      'container',
      'desk-title',
      'disabled-light',
      'dynamic-toolbar',
      'dynamic-toolbar-left',
      'dynamic-toolbar-top-left',
      'dynamic-toolbar-top-right',
      'glyph-item',
      'hover',
      'identity',
      'label',
      'main-tab',
      'main-tab-right',
      'menu-item',
      'notification-close',
      'notification-extend',
      'pane-navigator',
      'pane-hnavigator',
      'pane-vnavigator',
      'pane-warning',
      'plugin-light',
      'recurrence',
      'round',
      'secondary-action',
      'subaction',
      'table-action-frame',
      'task-bar',
      'task-tab',
      'task-logo',
      'task-show-footer',
      'text',
      'thin-left',
      'thin-right',
      'toolbar',
      'view-tab',
      'view-tab-right',
      'warning',
    ]),
    description: 'The kind property change the style of the button.',
    defaultValue: '',
  },
  {
    name: 'glyph',
    group: 'glyph',
    type: Types.types.glyph,
    description: 'Display a glyph before text.',
  },
  {
    name: 'active',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'focusable',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: false,
  },
  {
    name: 'border',
    group: 'aspect',
    type: Types.types.enum(['', 'none']),
    defaultValue: '',
  },
  {
    name: 'glyphRotate',
    group: 'glyph',
    type: Types.types.angle,
  },
  {
    name: 'glyphFlip',
    group: 'glyph',
    type: Types.types.enum(['', 'horizontal', 'vertical']),
  },
  {
    name: 'glyphSpin',
    group: 'glyph',
    type: Types.types.enum(['', 'yes']),
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
  },
  {
    name: 'shape',
    group: 'aspect',
    type: Types.types.shape,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: Types.types.nabu,
  },
  {
    name: 'shortcut',
    group: 'aspect',
    type: Types.types.shortcut,
  },
  {
    name: 'justify',
    group: 'aspect',
    type: Types.types.justify,
  },
  {
    name: 'width',
    group: 'layout',
    type: Types.types.size,
  },
  {
    name: 'height',
    group: 'layout',
    type: Types.types.size,
  },
  {
    name: 'grow',
    group: 'layout',
    type: Types.types.grow,
  },
  {
    name: 'spacing',
    group: 'layout',
    type: Types.types.spacing,
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: Types.types.color,
  },
  {
    name: 'activeColor',
    group: 'aspect',
    type: Types.types.color,
  },
  {
    name: 'fontSize',
    group: 'text',
    type: Types.types.percentage,
  },
  {
    name: 'fontWeight',
    group: 'text',
    type: Types.types.fontWeight,
  },
  {
    name: 'fontStyle',
    group: 'text',
    type: Types.types.fontStyle,
  },
  {
    name: 'textTransform',
    group: 'text',
    type: Types.types.textTransform,
  },
  {
    name: 'wrap',
    group: 'text',
    type: Types.types.enum(['', 'no', 'no-strict', 'yes', 'yes-permissive']),
  },
  {
    name: 'badgeValue',
    group: 'badge',
    type: Types.types.number,
  },
  {
    name: 'badgePush',
    group: 'badge',
    type: Types.types.bool,
  },
  {
    name: 'badgePosition',
    group: 'badge',
    type: Types.types.enum(['', 'top-right', 'over']),
    defaultValue: 'over',
  },
  {
    name: 'badgeShape',
    group: 'badge',
    type: Types.types.enum(['', 'circle']),
  },
  {
    name: 'badgeColor',
    group: 'badge',
    type: Types.types.enum(['', 'red', 'green']),
  },
  {
    name: 'badgeSize',
    group: 'badge',
    type: Types.types.percentage,
  },
  {
    name: 'place',
    group: 'aspect',
    type: Types.types.enum([
      '',
      '1/1',
      '1/2',
      '2/2',
      '1/3',
      '2/3',
      '3/3',
      '1/4',
      '2/4',
      '3/4',
      '4/4',
      'single',
      'left',
      'middle',
      'right',
    ]),
  },
  {
    name: 'calendarWeekend',
    group: 'calendar',
    type: Types.types.bool,
  },
  {
    name: 'calendarDimmed',
    group: 'calendar',
    type: Types.types.bool,
  },
  {
    name: 'cursor',
    group: 'aspect',
    type: Types.types.cursor,
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
  {
    name: 'toAnchor',
    group: 'aspect',
    type: Types.types.string,
  },
];
