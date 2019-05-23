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

  color: {
    type: 'color',
  },

  size: {
    type: 'size',
  },

  glyph: {
    type: 'size',
  },
};
