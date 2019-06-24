import {types} from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'beforeChange',
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
    name: 'onMouseUp',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onDebouncedChange',
    group: 'event',
    type: types.function,
  },
  {
    name: 'selectAllOnFocus',
    group: 'event',
    type: types.bool,
  },
  {
    name: 'defaultFocus',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'active',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'value',
    group: 'text',
    type: types.string,
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.string,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
  },
  {
    name: 'autocomplete',
    group: 'text',
    type: types.string,
  },
  {
    name: 'maxLength',
    group: 'text',
    type: types.number,
  },
  {
    name: 'rows',
    group: 'text',
    type: types.enum(['', '1', '2', '3', '4', '5', '10']),
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'justify',
    group: 'text',
    type: types.justify,
    description: 'Works only with text input not with textarea',
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
  {
    name: 'size',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'type',
    group: 'layout',
    type: types.enum(['text', 'textarea']),
  },
  {
    name: 'required',
    group: 'layout',
    type: types.bool,
  },
  {
    name: 'requiredHinter',
    group: 'layout',
    type: types.bool,
  },
];
