const types = {
  any: {
    type: 'any',
    widget: 'text-field',
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
    samples: [
      '',
      "D'accord",
      'Annuler',
      'Jean Dupond',
      '481.95',
      "Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.",
    ],
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
      {id: 'Ceci est un petit texte', text: 'Petit texte'},
      {id: 'Pierre\nJacques\nJean', text: '3 courtes lignes'},
      {
        id:
          '1: Lundi\n2: Mardi\n3: Mercredi\n4: Jeudi\n5: Vendredi\n6: Samedi\n7: Dimanche',
        text: '7 courtes lignes',
      },
      {
        id:
          "1) Bref\n2) Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.\n3) Certes",
        text: '3 lignes courtes et longues',
      },
      {
        id:
          "Un matin, au coucher du soleil, un jeune vieillard assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte. Soudain, il entendit un bruit silencieux. Il monta les escaliers de la cave pour descendre au grenier et vit, par le trou de la serrure bouché, un nègre blanc qui déterrait les morts pour les manger vivants, et sa femme qui pleurait en riant la mort de ses quatre fils, morts noyés dans une piscine vide, le premier Jean, le deuxième Paul, le troisième Pierre et le quatrième André qui n'était pas encore né.",
        text: 'Très long texte',
      },
    ],
  },

  number: {
    type: 'number',
    defaultValue: 0,
    widget: 'combo',
    readonly: false,
    samples: [
      {id: null, text: ''},
      {id: 0, text: '0'},
      {id: 1, text: '1'},
      {id: 2, text: '2'},
      {id: 3, text: '3'},
      {id: 10, text: '10'},
      {id: 50, text: '50'},
      {id: 123, text: '123'},
      {id: 999, text: "9'999"},
    ],
  },

  date: {
    type: 'date',
    widget: 'combo',
    readonly: false,
    samples: [
      {id: null, text: ''},
      {id: '1969-07-21', text: 'Premiers pas sur la lune'},
      {id: '2020-04-01', text: "Prochain poisson d'avril"},
      {id: '2019-05-01', text: 'Fête du travail 2019'},
      {id: '2019-12-25', text: 'Noël 2019'},
      {id: '2020-12-25', text: 'Noël 2020'},
    ],
  },

  time: {
    type: 'time',
    widget: 'combo',
    readonly: false,
    samples: [
      {id: null, text: ''},
      {id: '08:00:00', text: 'Au travail'},
      {id: '10:00:00', text: 'Début de la pause'},
      {id: '10:30:00', text: 'Fin de la pause'},
      {id: '12:30:00', text: 'Miam miam'},
      {id: '17:30:00', text: 'Fin du travail'},
      {id: '22:15:00', text: 'Hop, au lit'},
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
      {id: '#d2e6f9', text: '#d2e6f9 — light blue'},
      {id: '#8ab6df', text: '#8ab6df — blue'},
      {id: '#f5ddb8', text: '#f5ddb8 — light orange'},
      {id: '#fbce89', text: '#fbce89 — orange'},
      {id: '#c6f7da', text: '#c6f7da — light green'},
      {id: '#74f7a9', text: '#74f7a9 — green'},
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
      'smooth',
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

  textJustify: {
    type: 'textJustify',
    widget: 'combo',
    readonly: true,
    samples: ['', 'left', 'center', 'right'],
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
