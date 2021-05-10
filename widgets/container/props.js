import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'onClick',
    group: 'main',
    type: types.function,
  },

  // Aspect.
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
    name: 'selected',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'hidden',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'isDragged',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'isTransparentWhenDrag',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'hasHeLeft',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum([
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
      'wrap',
    ]),
  },
  {
    name: 'cursor',
    group: 'aspect',
    type: types.cursor,
  },
  {
    name: 'subkind',
    group: 'aspect',
    type: types.enum([
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
      'wrap',
    ]),
  },
  {
    name: 'border',
    group: 'aspect',
    type: types.enum(['', 'top', 'right', 'bottom', 'left']),
  },
  {
    name: 'trianglePosition',
    group: 'aspect',
    type: types.enum(['', 'top', 'right', 'bottom', 'left', 'none']),
  },
  {
    name: 'triangleShift',
    group: 'aspect',
    type: types.pixel,
    min: 0,
    max: 100,
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'busyBackgroundColor',
    group: 'aspect',
    type: types.color,
  },

  // Layout.
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
    name: 'minWidth',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'minHeight',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'maxWidth',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'maxHeight',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'verticalJustify',
    group: 'layout',
    type: types.enum(['', 'center', 'top']),
  },
  {
    name: 'verticalSpacing',
    group: 'layout',
    type: types.verticalSpacing,
  },
  {
    name: 'marginBottom',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'floatingHeight',
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
];
