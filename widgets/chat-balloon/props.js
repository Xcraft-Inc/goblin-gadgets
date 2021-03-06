import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Content.
  {
    name: 'dateTime',
    group: 'content',
    type: types.nabu,
    defaultValue: '',
  },
  {
    name: 'message',
    group: 'content',
    type: types.nabu,
    defaultValue: '',
  },

  // Aspect.
  {
    name: 'type',
    group: 'aspect',
    type: types.enum(['', 'sended', 'received']),
  },
  {
    name: 'look',
    group: 'aspect',
    type: types.enum(['', 'whatsapp', 'smooth', 'round']),
  },
  {
    name: 'dateTimeColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'backgroundColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'textColor',
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

  // Main.
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'onDocument',
    group: 'main',
    type: types.function,
  },
];
