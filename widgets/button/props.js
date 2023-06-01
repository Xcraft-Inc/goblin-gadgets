// @ts-check
import {propsList} from '../../types/props-list.js';
import {types} from '../../types/types.js';

export default propsList({
  ['main']: {
    text: {
      type: types.nabu,
    },
    children: {
      type: types.component,
    },
    onDoubleClick: {
      type: types.function,
      description: "Works only with kind 'container' and 'box'.",
    },
    onClick: {
      type: types.function,
    },
    onRightClick: {
      type: types.function,
    },
    onMouseDown: {
      type: types.function,
    },
    onMouseUp: {
      type: types.function,
    },
    onMouseOver: {
      type: types.function,
    },
    onMouseOut: {
      type: types.function,
    },
    disabled: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    kind: {
      type: types.enumeration(
        '',
        'action',
        'button-notification',
        'button-footer',
        'box',
        'calendar',
        'calendar-list',
        'calendar-navigator',
        'calendar-title',
        'check-button',
        'chronos-navigator',
        'chronos-navigator',
        'combo',
        'combo-item',
        'combo-wrap-item',
        'compact',
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
        'warning'
      ),
    },
    subkind: {
      type: types.enumeration('', 'add', 'sub', 'base'),
      description: "Only with kind='calendar' and active='true'.",
    },
    heightStrategy: {
      type: types.enumeration('', 'compact', 'space'),
    },
    textColor: {
      type: types.color,
    },
    active: {
      type: types.boolean,
    },
    focused: {
      type: types.boolean,
    },
    focusable: {
      type: types.boolean,
    },
    readonly: {
      type: types.boolean,
    },
    busy: {
      type: types.boolean,
    },
    border: {
      type: types.enumeration('', 'none'),
    },
    shape: {
      type: types.shape,
    },
    tooltip: {
      type: types.nabu,
    },
    shortcut: {
      type: types.shortcut,
    },
    justify: {
      type: types.justify,
    },
    backgroundColor: {
      type: types.color,
    },
    activeColor: {
      type: types.color,
    },
    cursor: {
      type: types.cursor,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    toAnchor: {
      type: types.string,
    },
    place: {
      type: types.place,
    },
  },

  ['glyph']: {
    glyphColor: {
      type: types.color,
    },
    glyph: {
      type: types.glyph,
    },
    glyphRotate: {
      type: types.angle,
    },
    glyphFlip: {
      type: types.enumeration('', 'horizontal', 'vertical'),
    },
    glyphSpin: {
      type: types.enumeration('', 'yes'),
    },
    glyphPosition: {
      type: types.enumeration('', 'left', 'right'),
    },
    glyphSize: {
      type: types.percentage,
      min: 20,
      max: 500,
      step: 10,
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
    vpos: {
      type: types.enumeration('', 'top', 'first-line'),
    },
  },

  ['text']: {
    fontSize: {
      type: types.percentage,
      min: 20,
      max: 500,
      step: 10,
    },
    fontWeight: {
      type: types.fontWeight,
    },
    fontStyle: {
      type: types.fontStyle,
    },
    textTransform: {
      type: types.textTransform,
    },
    wrap: {
      type: types.enumeration('', 'no', 'no-strict', 'yes', 'yes-permissive'),
    },
  },

  ['badge']: {
    badgeValue: {
      type: types.union(types.number, types.string),
    },
    badgePush: {
      type: types.boolean,
    },
    badgePosition: {
      type: types.enumeration('', 'top-right', 'over'),
    },
    badgeShape: {
      type: types.enumeration('', 'circle'),
    },
    badgeColor: {
      type: types.enumeration('', 'red', 'green', 'dark'),
    },
    badgeSize: {
      type: types.number,
      min: 0.2,
      max: 4,
      step: 0.1,
    },
  },

  ['triangle']: {
    triangleColor: {
      type: types.color,
      description: "Only with kind='main-tab' and active='true'.",
    },
    triangleSize: {
      type: types.pixel,
      min: 0,
      max: 20,
    },
  },
});
