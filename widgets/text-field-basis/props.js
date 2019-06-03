import Types from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'active',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: 'false',
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: 'false',
  },
  {
    name: 'value',
    group: 'text',
    type: Types.types.string,
    defaultValue: '',
  },
  {
    name: 'readonly',
    group: 'text',
    type: Types.types.bool,
    defaultValue: 'false',
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: Types.types.string,
    defaultValue: '',
  },
  {
    name: 'shape',
    group: 'aspect',
    type: Types.types.enum([
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
    type: Types.types.enum(['', '1', '2', '3', '4', '5', '10']),
    defaultValue: '',
  },
  {
    name: 'width',
    group: 'layout',
    type: Types.types.size,
    defaultValue: '',
  },
  {
    name: 'grow',
    group: 'layout',
    type: Types.types.enum(['', '0.5', '1']),
    defaultValue: '',
  },
  {
    name: 'justify',
    group: 'text',
    type: Types.types.enum(['', 'left', 'right']),
    defaultValue: '',
    description: 'Works only with text input not with textarea',
  },
  {
    name: 'show',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: 'true',
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: Types.types.bool,
    defaultValue: 'true',
  },
];
