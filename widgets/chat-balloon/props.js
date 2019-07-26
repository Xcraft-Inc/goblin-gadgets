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
  {
    name: 'hasMagnifyingGlass',
    group: 'content',
    type: types.bool,
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
  {
    name: 'transition',
    group: 'aspect',
    type: types.enum([
      '',
      '0.0s ease-out',
      '0.2s ease-out',
      '0.5s ease-out',
      '1.0s ease-out',
    ]),
  },

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.size,
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
