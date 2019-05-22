export default {
  bool: {
    type: 'bool',
  },

  string: {
    type: 'string',
  },

  enum: values => ({
    type: 'enum',
    values,
  }),
};
