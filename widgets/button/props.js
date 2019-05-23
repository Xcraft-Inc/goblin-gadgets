import Type from 'goblin-gadgets/types/index.js';

export default [
  {
    name: 'text',
    group: 'main',
    type: Type.string,
    description: 'The text of the button',
    required: true,
    defaultValue: '',
  },
  {
    name: 'textColor',
    group: 'aspect',
    type: Type.color,
    defaultValue: '',
  },
  {
    name: 'glyphColor',
    group: 'aspect',
    type: Type.color,
    defaultValue: '',
  },
  {
    name: 'disabled',
    group: 'main',
    type: Type.bool,
    defaultValue: false,
  },
  {
    name: 'kind',
    group: 'aspect',
    type: Type.enum([
      '',
      'action',
      'button-notification',
      'button-footer',
      'calendar',
      'calendar-navigator',
      'check-button',
      'chronos-navigator',
      'chronos-navigator',
      'combo',
      'combo-item',
      'combo-wrap-item',
      'desk-title',
      'disabled-light',
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
      'pane-navigator',
      'pane-hnavigator',
      'pane-vnavigator',
      'recurrence',
      'round',
      'subaction',
      'task-bar',
      'task-tab',
      'task-logo',
      'thin-left',
      'thin-right',
      'toolbar',
      'view-tab',
      'view-tab-right',
      'warning',
      'text',
    ]),
    description: 'The kind property change the style of the button.',
    defaultValue: '',
  },
  {
    name: 'glyph',
    group: 'aspect',
    type: Type.glyph,
    description: 'Display a glyph before text.',
    defaultValue: '',
  },
];
