const types = {
  bool: {
    type: 'bool',
    widget: 'check-box',
    checker: 'bool',
  },

  string: {
    type: 'string',
    widget: 'text-field',
    checker: 'string',
  },

  nabu: {
    type: 'nabu',
    widget: 'text-field',
    checker: 'nabu',
  },

  number: {
    type: 'number',
    widget: 'text-field',
    checker: 'string',
  },

  enum: values => ({
    type: 'enum',
    widget: 'combo',
    readonly: true,
    values: values,
  }),

  oneOfType: values => ({
    type: 'oneOfType',
    widget: 'oneOfType',
    values: values,
  }),

  component: {
    type: 'component',
    widget: 'combo',
    readonly: false,
    samples: ['short-text', 'long-text', 'button', 'button-10'],
    checker: 'component',
  },

  function: {
    type: 'function',
    widget: 'combo',
    readonly: false,
    samples: ['alert', 'log'],
    checker: 'function',
  },

  color: {
    type: 'color',
    widget: 'combo',
    readonly: false,
    samples: [
      '',
      'base',
      'primary',
      'secondary',
      'success',
      'pick',
      'drop',
      'task',
      'white',
      'lightgrey',
      'grey',
      'black',
      'red',
      'green',
      'blue',
      'yellow',
      {text: '#d2e6f9 — light blue', value: '#d2e6f9'},
      {text: '#8ab6df — blue', value: '#8ab6df'},
      {text: '#f5ddb8 — light orange', value: '#f5ddb8'},
      {text: '#fbce89 — orange', value: '#fbce89'},
      {text: '#c6f7da — light green', value: '#c6f7da'},
      {text: '#74f7a9 — green', value: '#74f7a9'},
    ],
    checker: 'string',
  },

  size: {
    type: 'size',
    widget: 'combo',
    readonly: false,
    samples: [
      '',
      '0px',
      '1px',
      '2px',
      '10px',
      '20px',
      '32px',
      '50px',
      '100px',
      '200px',
      '300px',
      '500px',
    ],
    checker: 'string',
  },

  glyph: {
    type: 'glyph',
    widget: 'combo',
    readonly: false,
    samples: [
      '',
      'solid/check',
      'solid/times',
      'solid/bicycle',
      'solid/car',
      'solid/rocket',
      'solid/calendar',
    ],
    checker: 'string',
  },

  shape: {
    type: 'shape',
    widget: 'combo',
    readonly: true,
    samples: [
      '',
      'rounded',
      'left-rounded',
      'right-rounded',
      'left-smooth',
      'right-smooth',
    ],
    checker: 'string',
  },

  angle: {
    type: 'angle',
    widget: 'combo',
    readonly: false,
    samples: ['', '90', '180', '270'],
    checker: 'string',
  },

  percentage: {
    type: 'percentage',
    widget: 'combo',
    readonly: false,
    samples: ['', '50%', '75%', '100%', '150%', '200%'],
    checker: 'string',
  },

  spacing: {
    type: 'spacing',
    widget: 'combo',
    readonly: true,
    samples: ['', 'overlap', 'tiny', 'large', 'double'],
    checker: 'string',
  },

  shortcut: {
    type: 'shortcut',
    widget: 'combo',
    readonly: false,
    samples: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
    checker: 'string',
  },

  grow: {
    type: 'grow',
    widget: 'combo',
    readonly: true,
    samples: ['', '0.5', '1'],
    checker: 'string',
  },

  fontStyle: {
    type: 'fontStyle',
    widget: 'combo',
    readonly: true,
    samples: ['', 'italic', 'oblique'],
    checker: 'string',
  },

  cursor: {
    type: 'cursor',
    widget: 'combo',
    readonly: true,
    samples: [
      '',
      'default',
      'none',
      'pointer',
      'cell',
      'crosshair',
      'text',
      'move',
      'not-allowed',
      'ew-resize',
      'ns-resize',
      'grab',
    ],
    checker: 'string',
  },

  fontWeight: {
    type: 'fontWeight',
    widget: 'combo',
    readonly: false,
    samples: ['', 'bold', 'bolder', 'lighter'],
    checker: 'string',
  },

  textTransform: {
    type: 'textTransform',
    widget: 'combo',
    readonly: true,
    samples: ['', 'capitalize', 'uppercase', 'lowercase'],
    checker: 'string',
  },

  justify: {
    type: 'justify',
    widget: 'combo',
    readonly: true,
    samples: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
    checker: 'string',
  },
};

//-----------------------------------------------------------------------------

function addType(name, type) {
  if (types.name) {
    throw new Error(`Type ${name} is already defined`);
  }
  types[name] = type;
}

//-----------------------------------------------------------------------------

module.exports = {
  types,
  addType,
};
