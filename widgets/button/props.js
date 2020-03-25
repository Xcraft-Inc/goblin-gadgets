import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Main.
  {
    name: 'text',
    group: 'main',
    type: types.nabu,
    defaultValue: '',
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'onDoubleClick',
    group: 'main',
    type: types.function,
    description: "Works only with kind 'container' and 'box'.",
  },
  {
    name: 'onClick',
    group: 'main',
    type: types.function,
  },
  {
    name: 'onMouseDown',
    group: 'main',
    type: types.function,
  },
  {
    name: 'onMouseUp',
    group: 'main',
    type: types.function,
  },
  {
    name: 'onMouseOver',
    group: 'main',
    type: types.function,
  },
  {
    name: 'onMouseOut',
    group: 'main',
    type: types.function,
  },
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
  },

  // Aspect.
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
      '',
      'action',
      'button-notification',
      'button-footer',
      'box',
      'calendar-list',
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
      'flat-list-combo-item',
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
      'plugin-dark',
      'plugin-light',
      'recurrence',
      'round',
      'secondary-action',
      'subaction',
      'table-action',
      'table-action-frame',
      'task-bar',
      'task-tab',
      'task-logo',
      'task-show-footer',
      'text',
      'thin-left',
      'thin-right',
      'toolbar',
      'tree-expand',
      'view-tab',
      'view-tab-first',
      'view-tab-last',
      'view-tab-single',
      'view-tab-right',
      'warning',
    ]),
  },
  {
    name: 'subkind',
    group: 'aspect',
    type: types.enum(['', 'add', 'sub', 'base']),
    description: "Only with kind='calendar' and active='true'.",
  },
  {
    name: 'textColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'active',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'focused',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'focusable',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'readonly',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'border',
    group: 'aspect',
    type: types.enum(['', 'none']),
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'shortcut',
    group: 'aspect',
    type: types.shortcut,
  },
  {
    name: 'justify',
    group: 'aspect',
    type: types.justify,
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
  {
    name: 'place',
    group: 'aspect',
    type: types.place,
  },

  // Glyph.
  {
    name: 'glyphColor',
    group: 'glyph',
    type: types.color,
  },
  {
    name: 'glyph',
    group: 'glyph',
    type: types.glyph,
  },
  {
    name: 'glyphRotate',
    group: 'glyph',
    type: types.angle,
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
    name: 'glyphPosition',
    group: 'glyph',
    type: types.enum(['', 'left', 'right']),
  },
  {
    name: 'glyphSize',
    group: 'glyph',
    type: types.percentage,
  },

  // Layout.
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
    name: 'horizontalSpacing',
    group: 'layout',
    type: types.horizontalSpacing,
  },
  {
    name: 'vpos',
    group: 'layout',
    type: types.enum(['', 'top', 'first-line']),
  },

  // Text.
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

  // Badge.
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
    type: types.enum(['', 'red', 'green', 'dark']),
  },
  {
    name: 'badgeSize',
    group: 'badge',
    type: types.percentage,
  },
];
