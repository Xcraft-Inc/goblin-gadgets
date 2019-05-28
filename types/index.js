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

  shape: {
    type: 'shape',
  },

  angle: {
    type: 'angle',
  },

  percentage: {
    type: 'percentage',
  },

  spacing: {
    type: 'spacing',
  },

  shortcut: {
    type: 'shortcut',
  },

  grow: {
    type: 'grow',
  },

  fontStyle: {
    type: 'fontStyle',
  },

  cursor: {
    type: 'cursor',
  },

  fontWeight: {
    type: 'fontWeight',
  },

  textTransform: {
    type: 'textTransform',
  },

  justify: {
    type: 'justify',
  },
};
