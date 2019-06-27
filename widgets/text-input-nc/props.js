import {types} from 'goblin-gadgets/types/types.js';

export default [
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
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
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
    description: 'When "enter" is pressed',
  },
  {
    name: 'value',
    group: 'text',
    type: types.string,
  },
  {
    name: 'readonly',
    group: 'text',
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
    name: 'rows',
    group: 'text',
    type: types.enum(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
  },
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
  {
    name: 'justify',
    group: 'text',
    type: types.textJustify,
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
];
