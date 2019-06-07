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
    defaultValue: 'false',
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
    defaultValue: 'false',
  },
  {
    name: 'value',
    group: 'text',
    type: types.string,
    defaultValue: '',
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.string,
    defaultValue: '',
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.string,
    defaultValue: '',
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
    defaultValue: '',
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
    defaultValue: '',
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
    defaultValue: '',
  },
  {
    name: 'justify',
    group: 'text',
    type: types.justify,
    defaultValue: '',
    description: 'Works only with text input not with textarea',
  },
  {
    name: 'show',
    group: 'aspect',
    type: types.bool,
    defaultValue: 'true',
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: types.bool,
    defaultValue: 'true',
  },
  {
    name: 'size',
    group: 'layout',
    type: types.size,
    defaultValue: '',
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
