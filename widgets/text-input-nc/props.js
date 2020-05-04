import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'inputType',
    group: 'aspect',
    type: types.enum(['', 'textarea', 'password']),
  },
  {
    name: 'active',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'required',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'wrong',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
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

  // Event.
  {
    name: 'onUpDown',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onChange',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onFocus',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onBlur',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onValidate',
    group: 'event',
    type: types.function,
    description: 'When "enter" is pressed.',
  },

  // Text.
  {
    name: 'value',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'readonly',
    group: 'text',
    type: types.bool,
  },
  {
    name: 'rows',
    group: 'text',
    type: types.enum(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
  },
  {
    name: 'justify',
    group: 'text',
    type: types.textJustify,
  },

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
