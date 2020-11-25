import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Main
  {
    name: 'text',
    group: 'main',
    type: types.nabu,
    defaultValue: '',
  },
  {
    name: 'onClick',
    group: 'main',
    type: types.function,
  },
  {
    name: 'disabled',
    group: 'main',
    type: types.bool,
  },

  // Aspect
  {
    name: 'glyphColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
      '',
      'action',
      'big-center',
      'button-footer',
      'button-notification',
      'calendar',
      'calendar-list',
      'calendar-title',
      'calendar-navigator',
      'center-to-box',
      'check-button',
      'chronos-navigator',
      'combo',
      'combo-item',
      'combo-text-markdown',
      'combo-wrap-item',
      'compact',
      'desk-title',
      'disabled-light',
      'dynamic-toolbar',
      'dynamic-toolbar-left',
      'dynamic-toolbar-top-left',
      'dynamic-toolbar-top-right',
      'flat-list-combo-item',
      'field-combo',
      'floating-footer',
      'floating-header',
      'flying-balloon',
      'footer',
      'glyph-item',
      'hover',
      'identity',
      'info',
      'label',
      'label-field',
      'label-text-field',
      'large-left',
      'large-right',
      'large-single',
      'main-tab',
      'main-tab-right',
      'markdown',
      'menu-item',
      'mission-top',
      'notification',
      'notification-close',
      'notification-extend',
      'one-line-height',
      'pane-header',
      'pane-hnavigator',
      'pane-navigator',
      'pane-vnavigator',
      'pane-warning',
      'plugin-light',
      'plugin-dark',
      'recurrence',
      'round',
      'secondary-action',
      'subaction',
      'table-action',
      'table-action-frame',
      'table-cell',
      'table-cell-sorting-header',
      'task',
      'task-bar',
      'task-logo',
      'task-show-footer',
      'task-tab',
      'text',
      'text-field-combo-glyph',
      'thin-left',
      'thin-right',
      'ticket-hud',
      'ticket-warning',
      'title',
      'title-recurrence',
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
    name: 'shape',
    group: 'aspect',
    type: types.shape,
  },
  {
    name: 'active',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'maxLines',
    group: 'aspect',
    type: types.number,
    min: 1,
    max: 20,
  },
  {
    name: 'skipEmptyLines',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'singleLine',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'insideButton',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
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
    name: 'cursor',
    group: 'aspect',
    type: types.cursor,
  },
  {
    name: 'empty',
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
    name: 'markdownVerticalSpacing',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 100,
  },

  // Glyph
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
    type: types.enum(['horizontal', 'vertical', 'both']),
  },
  {
    name: 'glyphSpin',
    group: 'glyph',
    type: types.bool,
  },
  {
    name: 'glyphPosition',
    group: 'glyph',
    type: types.enum(['', 'left', 'center', 'right']),
  },
  {
    name: 'glyphSize',
    group: 'glyph',
    type: types.percentage,
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
    name: 'height',
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
  {
    name: 'horizontalSpacing',
    group: 'layout',
    type: types.horizontalSpacing,
  },
  {
    name: 'bottomSpacing',
    group: 'layout',
    type: types.enum(['', 'large']),
  },
  {
    name: 'vpos',
    group: 'layout',
    type: types.enum(['', 'top', 'first-line']),
  },

  // Text
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
    type: types.enum([
      '',
      'no',
      'no-end',
      'no-strict',
      'yes',
      'yes-permissive',
    ]),
  },
  // GetGlyph ? GetText ?
  // Create custom function to choose a glyph or a text ?
  // ClassName ? Possibility to get a className from a parent node ?
];
