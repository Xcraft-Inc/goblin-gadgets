const types = {
  any: {
    type: 'any',
  },

  bool: {
    type: 'bool',
    defaultValue: false,
    widget: 'checkbox',
  },

  string: {
    type: 'string',
    defaultValue: '',
    widget: 'combo',
    readonly: false,
    samples: ['', 'Accept', 'Close'],
  },

  nabu: {
    type: 'nabu',
    defaultValue: '',
    widget: 'combo',
    multiline: true,
    readonly: false,
    samples: [
      '',
      "D'accord",
      'Annuler',
      {text: 'Petit texte', value: 'Ceci est un petit texte'},
      {text: '3 courtes lignes', value: 'Pierre\nJacques\nJean'},
      {
        text: '7 courtes lignes',
        value:
          '1: Lundi\n2: Mardi\n3: Mercredi\n4: Jeudi\n5: Vendredi\n6: Samedi\n7: Dimanche',
      },
      {
        text: '3 lignes courtes et longues',
        value:
          "1) Bref\n2) Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.\n3) Certes",
      },
      {
        text: 'Très long texte',
        value:
          "Un matin, au coucher du soleil, un jeune vieillard assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte. Soudain, il entendit un bruit silencieux. Il monta les escaliers de la cave pour descendre au grenier et vit, par le trou de la serrure bouché, un nègre blanc qui déterrait les morts pour les manger vivants, et sa femme qui pleurait en riant la mort de ses quatre fils, morts noyés dans une piscine vide, le premier Jean, le deuxième Paul, le troisième Pierre et le quatrième André qui n'était pas encore né.",
      },
    ],
  },

  number: {
    type: 'number',
    defaultValue: 0,
    widget: 'combo',
    readonly: false,
    samples: [
      {text: '', value: null},
      {text: '0', value: 0},
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '10', value: 10},
      {text: '123', value: 123},
      {text: "9'999", value: 9999},
    ],
  },

  enum: values => ({
    type: 'enum',
    defaultValue: values[0],
    widget: 'combo',
    readonly: true,
    values: values,
  }),

  oneOfType: types => ({
    type: 'oneOfType',
    defaultValue: types[0].defaultValue,
    widget: 'oneOfType',
    types,
  }),

  component: {
    type: 'component',
    widget: 'combo',
    readonly: false,
    samples: [
      'short-text',
      'long-text',
      'text-field',
      'text-field-multiline',
      'button',
      'button-10',
    ],
  },

  function: {
    type: 'function',
    widget: 'combo',
    readonly: false,
    samples: ['alert', 'log'],
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
  },

  angle: {
    type: 'angle',
    widget: 'combo',
    readonly: false,
    samples: ['', '90', '180', '270'],
  },

  percentage: {
    type: 'percentage',
    widget: 'combo',
    readonly: false,
    samples: ['', '50%', '75%', '100%', '150%', '200%'],
  },

  spacing: {
    type: 'spacing',
    widget: 'combo',
    readonly: true,
    samples: ['', 'overlap', 'tiny', 'large', 'double'],
  },

  verticalSpacing: {
    type: 'verticalSpacing',
    widget: 'combo',
    readonly: true,
    samples: ['', 'overlap', 'compact', 'normal', 'large'],
  },

  shortcut: {
    type: 'shortcut',
    widget: 'combo',
    readonly: false,
    samples: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
  },

  grow: {
    type: 'grow',
    widget: 'combo',
    readonly: true,
    samples: ['', '0.5', '1'],
  },

  fontStyle: {
    type: 'fontStyle',
    widget: 'combo',
    readonly: true,
    samples: ['', 'italic', 'oblique'],
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
  },

  fontWeight: {
    type: 'fontWeight',
    widget: 'combo',
    readonly: false,
    samples: [
      '',
      'normal',
      'bold',
      'bolder',
      'lighter',
      '1',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '1000',
    ],
  },

  textTransform: {
    type: 'textTransform',
    widget: 'combo',
    readonly: true,
    samples: ['', 'capitalize', 'uppercase', 'lowercase'],
  },

  justify: {
    type: 'justify',
    widget: 'combo',
    readonly: true,
    samples: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
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
