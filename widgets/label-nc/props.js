// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['main']: {
    text: {
      type: types.nabu,
      defaultValue: '',
    },
    onClick: {
      type: types.function,
    },
    disabled: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    glyphColor: {
      type: types.color,
    },
    kind: {
      type: types.enumeration(
        '',
        'action',
        'alert',
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
        'warning'
      ),
    },
    shape: {
      type: types.shape,
    },
    active: {
      type: types.boolean,
    },
    maxLines: {
      type: types.number,
      min: 1,
      max: 20,
    },
    skipEmptyLines: {
      type: types.boolean,
    },
    singleLine: {
      type: types.boolean,
    },
    insideButton: {
      type: types.boolean,
    },
    tooltip: {
      type: types.nabu,
    },
    justify: {
      type: types.justify,
    },
    backgroundColor: {
      type: types.color,
    },
    cursor: {
      type: types.cursor,
    },
    empty: {
      type: types.boolean,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    markdownVerticalSpacing: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
  },

  ['glyph']: {
    glyph: {
      type: types.glyph,
    },
    glyphRotate: {
      type: types.angle,
    },
    glyphFlip: {
      type: types.enumeration('horizontal', 'vertical', 'both'),
    },
    glyphSpin: {
      type: types.boolean,
    },
    glyphPosition: {
      type: types.enumeration('', 'left', 'center', 'right'),
    },
    glyphSize: {
      type: types.percentage,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    height: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    grow: {
      type: types.grow,
    },
    horizontalSpacing: {
      type: types.horizontalSpacing,
    },
    bottomSpacing: {
      type: types.enumeration('', 'large'),
    },
    vpos: {
      type: types.enumeration('', 'top', 'first-line'),
    },
  },

  ['text']: {
    textColor: {
      type: types.color,
    },
    fontSize: {
      type: types.percentage,
    },
    fontWeight: {
      type: types.fontWeight,
    },
    fontStyle: {
      type: types.fontStyle,
    },
    fontFamily: {
      type: types.string,
    },
    textTransform: {
      type: types.textTransform,
    },
    wrap: {
      type: types.enumeration(
        '',
        'no',
        'no-end',
        'no-strict',
        'yes',
        'yes-permissive'
      ),
    },
    // GetGlyph ? GetText ?
    // Create custom function to choose a glyph or a text ?
    // ClassName ? Possibility to get a className from a parent node ?
  },
});
