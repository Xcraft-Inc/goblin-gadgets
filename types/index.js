export default {
  bool: {
    type: 'bool',
  },

  string: {
    type: 'string',
  },

  number: {
    type: 'number',
  },

  enum: values => ({
    type: 'enum',
    values,
  }),

  component: {
    type: 'component',
  },

  function: {
    type: 'function',
  },

  color: {
    type: 'color',
  },

  size: {
    type: 'size',
  },

  glyph: {
    type: 'glyph',
  },
};
