import Types from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'children',
    group: 'main',
    type: Types.types.component,
  },
  {
    name: 'onClick',
    group: 'main',
    type: Types.types.function,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'show',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'selected',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'hidden',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'busy',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'isDragged',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'isTransparentWhenDrag',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'hasHeLeft',
    group: 'aspect',
    type: Types.types.bool,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: Types.types.enum([
      '',
      'actions',
      'actions-lines',
      'actions-line-primary',
      'actions-line-secondary',
      'box',
      'boxes',
      'chronos-events',
      'column',
      'column-full',
      'compact-row',
      'content',
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
      'pane-warning',
      'pane-warning-button',
      'push-to-edge',
      'right',
      'roadbook-tickets',
      'root',
      'row',
      'row-draggable',
      'row-field',
      'row-pane',
      'row-pane-drag',
      'row-wrap',
      'scrollable-column',
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
      'view-edge',
      'view-right',
      'view-stretch',
      'view-tab',
      'view-tab-right',
      'views',
      'wrap',
    ]),
  },
  {
    name: 'cursor',
    group: 'aspect',
    type: Types.types.cursor,
  },
  {
    name: 'subkind',
    group: 'aspect',
    type: Types.types.enum([
      '',
      'box',
      'box-left',
      'business',
      'footer',
      'info',
      'large-box',
      'left',
      'light-box',
      'list',
      'me',
      'no-overlay',
      'no-shadow',
      'padding',
      'top-margin',
      'wide-info',
      'wrap',
    ]),
  },
  {
    name: 'border',
    group: 'aspect',
    type: Types.types.enum(['', 'top', 'right', 'bottom', 'left']),
  },
  {
    name: 'trianglePosition',
    group: 'aspect',
    type: Types.types.enum(['', 'top', 'right', 'bottom', 'left', 'none']),
  },
  {
    name: 'triangleShift',
    group: 'aspect',
    type: Types.types.size,
  },
  {
    name: 'width',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'height',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'minWidth',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'minHeight',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'maxWidth',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'maxHeight',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'verticalJustify',
    group: 'Layout',
    type: Types.types.enum(['', 'top']),
  },
  {
    name: 'verticalSpacing',
    group: 'Layout',
    type: Types.types.spacing,
  },
  {
    name: 'marginBottom',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'floatingHeight',
    group: 'Layout',
    type: Types.types.size,
  },
  {
    name: 'grow',
    group: 'Layout',
    type: Types.types.grow,
  },
  {
    name: 'spacing',
    group: 'Layout',
    type: Types.types.spacing,
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: Types.types.color,
  },
  {
    name: 'busyBackgroundColor',
    group: 'aspect',
    type: Types.types.color,
  },
];
