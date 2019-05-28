import Type from 'goblin-gadgets/types/index.js';

export default [
  {
    name: 'active',
    group: 'aspect',
    type: Type.bool,
    defaultValue: 'false',
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: Type.bool,
    defaultValue: 'false',
  },
  {
    name: 'value',
    group: 'text',
    type: Type.string,
    defaultValue: '',
  },
  {
    name: 'readonly',
    group: 'text',
    type: Type.bool,
    defaultValue: 'false',
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: Type.string,
    defaultValue: '',
  },
  {
    name: 'shape',
    group: 'aspect',
    type: Type.enum([
      '',
      'rounded',
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
    type: Type.enum(['', '1', '2', '3', '4', '5', '10']),
    defaultValue: '',
  },
  {
    name: 'width',
    group: 'layout',
    type: Type.size,
    defaultValue: '',
  },
  {
    name: 'grow',
    group: 'layout',
    type: Type.enum(['', '0.5', '1']),
    defaultValue: '',
  },
  {
    name: 'justify',
    group: 'text',
    type: Type.enum(['', 'left', 'right']),
    defaultValue: '',
    description: 'Works only with text input not with textarea',
  },
  {
    name: 'show',
    group: 'aspect',
    type: Type.bool,
    defaultValue: 'true',
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: Type.bool,
    defaultValue: 'true',
  },
];
