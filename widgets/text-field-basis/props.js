import {types} from 'goblin-gadgets/types/types.js';

export default [
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
    name: 'readonly',
    group: 'text',
    type: types.bool,
    defaultValue: 'false',
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
    type: types.enum([
      '',
      'rounded',
      'smooth',
      'left-rounded',
      'right-rounded',
      'left-smooth',
      'right-smooth',
    ]),
    defaultValue: '',
  },
  {
    name: 'rows',
    group: 'text',
    type: types.enum(['', '1', '2', '3', '4', '5', '10']),
    defaultValue: '',
  },
  {
    name: 'width',
    group: 'layout',
    type: types.size,
    defaultValue: '',
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.enum(['', '0.5', '1']),
    defaultValue: '',
  },
  {
    name: 'justify',
    group: 'text',
    type: types.enum(['', 'left', 'right']),
    defaultValue: '',
    description: "Works only with text multiline (use property 'rows').",
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
];
