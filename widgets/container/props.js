// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['main']: {
    children: {
      type: types.component,
    },
    onClick: {
      type: types.function,
    },
  },

  ['aspect']: {
    disabled: {
      type: types.boolean,
    },
    show: {
      type: types.boolean,
    },
    selected: {
      type: types.boolean,
    },
    hidden: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    busy: {
      type: types.boolean,
    },
    busyLook: {
      type: types.enumeration(
        '',
        'old',
        'smallest',
        'very-small',
        'small',
        'large'
      ),
    },
    isDragged: {
      type: types.boolean,
    },
    isTransparentWhenDrag: {
      type: types.boolean,
    },
    hasHeLeft: {
      type: types.boolean,
    },
    kind: {
      type: types.enumeration(
        '',
        'actions',
        'archived',
        'box',
        'boxes',
        'chronos-events',
        'column',
        'column-minus-margin',
        'column-full',
        'compact-row',
        'content',
        'desk-tickets',
        'drag-to-delete',
        'drag-too-many',
        'floating',
        'floating-footer',
        'floating-header',
        'flying-balloon',
        'flying-chat',
        'flying-combo',
        'flying-dialog',
        'footer',
        'full-view',
        'glyph-samples',
        'left-bar',
        'main-tab',
        'main-tab-right',
        'mandats',
        'no-overlay',
        'pane',
        'pane-top',
        'panes',
        'pane-header',
        'pane-header-light',
        'pane-hnavigator',
        'pane-navigator',
        'pane-top',
        'pane-vnavigator',
        'pane-wizard',
        'push-to-edge',
        'right',
        'roadbook-tickets',
        'root',
        'root-sample',
        'row',
        'row-draggable',
        'row-field',
        'row-pane',
        'row-pane-drag',
        'row-wrap',
        'scrollable-column',
        'scrollable-tickets-desks',
        'scrollable-tickets-messengers-right',
        'second-bar',
        'task-bar',
        'thin-center',
        'thin-column',
        'thin-main',
        'thin-row',
        'ticket-hud',
        'ticket-in-codispatch',
        'ticket-mode',
        'ticket-row',
        'ticket-column',
        'tickets',
        'tickets-desk',
        'tickets-messengers',
        'tickets-messenger',
        'tickets-root',
        'tickets-trips',
        'tickets-tray',
        'top-bar',
        'view',
        'views',
        'view-edge',
        'view-right',
        'view-stretch',
        'view-tab',
        'view-tab-right',
        'view-wedge',
        'wrap'
      ),
    },
    cursor: {
      type: types.cursor,
    },
    subkind: {
      type: types.enumeration(
        '',
        'archived',
        'border-box',
        'box',
        'box-left',
        'business',
        'center',
        'draft',
        'footer',
        'full',
        'info',
        'large-box',
        'left',
        'light-box',
        'list',
        'me',
        'no-overlay',
        'no-shadow',
        'other',
        'padding',
        'top-margin',
        'trashed',
        'warning',
        'wide-info',
        'wrap'
      ),
    },
    border: {
      type: types.enumeration('', 'top', 'right', 'bottom', 'left'),
    },
    trianglePosition: {
      type: types.enumeration('', 'top', 'right', 'bottom', 'left', 'none'),
    },
    triangleShift: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
    backgroundColor: {
      type: types.color,
    },
    busyBackgroundColor: {
      type: types.color,
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
    minWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    minHeight: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    maxWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    maxHeight: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    verticalJustify: {
      type: types.enumeration('', 'center', 'top'),
    },
    verticalSpacing: {
      type: types.verticalSpacing,
    },
    marginBottom: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    floatingHeight: {
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
  },
});
