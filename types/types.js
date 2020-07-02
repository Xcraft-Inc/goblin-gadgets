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
    restrictsToList: false,
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
    restrictsToList: false,
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
      {
        id:
          '```A partir de __septembre__, notre restaurant __Au bon Goût__ sera ouvert de _11h_ à _22h_ les jours suivants:\n\n- Mardi\n- Mercredi\n- Vendredi\n- Samedi\n```',
        text: 'Markdown',
      },
    ],
  },

  number: {
    type: 'number',
    defaultValue: 0,
    widget: 'combo',
    restrictsToList: false,
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
    restrictsToList: false,
    samples: [
      {id: null, text: ''},
      {id: '1969-07-21', text: 'Premiers pas sur la lune'},
      {id: '2019-01-01', text: 'Début 2019'},
      {id: '2020-04-01', text: "Poisson d'avril 2019"},
      {id: '2019-05-01', text: 'Fête du travail 2019'},
      {id: '2019-12-25', text: 'Noël 2019'},
      {id: '2019-12-31', text: 'Fin 2019'},
    ],
  },

  time: {
    type: 'time',
    widget: 'combo',
    restrictsToList: false,
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

  enum: (values) => ({
    type: 'enum',
    defaultValue: values[0],
    widget: 'combo',
    restrictsToList: true,
    values: values,
  }),

  oneOfType: (types) => ({
    type: 'oneOfType',
    defaultValue: types[0].defaultValue,
    widget: 'oneOfType',
    types,
  }),

  component: {
    type: 'component',
    widget: 'combo',
    restrictsToList: false,
    samples: [
      'short-text',
      'long-text',
      'text-field',
      'text-field-multiline',
      'button',
      'button-10',
      'carousel-panes',
      'two-boxes',
    ],
  },

  function: {
    type: 'function',
    widget: 'combo',
    restrictsToList: false,
    samples: ['alert', 'log'],
  },

  color: {
    type: 'color',
    widget: 'combo',
    restrictsToList: false,
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

  richColor: {
    type: 'richColor',
    widget: 'combo',
    restrictsToList: false,
    samples: [
      '',
      '#000000',
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FF8000',
      '#FFFFFF',
      'CMYK(0,0,0,0)',
      'CMYK(100,0,100,0)',
      'CMYK(100,75,50,0)',
      'CMYK(0,0,0,100)',
      'HSL(0,100,100)',
      'HSL(40,50,100)',
      'HSL(300,100,50)',
      'G(0)',
      'G(128)',
      'G(255)',
    ],
  },

  pixel: {
    type: 'pixel',
    widget: 'combo',
    restrictsToList: false,
    samples: [
      {id: null, text: ''},
      {id: '0px', text: '0 px'},
      {id: '1px', text: '1 px'},
      {id: '2px', text: '2 px'},
      {id: '10px', text: '10 px'},
      {id: '20px', text: '20 px'},
      {id: '32px', text: '32 px'},
      {id: '50px', text: '50 px'},
      {id: '100px', text: '100 px'},
      {id: '200px', text: '200 px'},
      {id: '300px', text: '300 px'},
      {id: '500px', text: '500 px'},
    ],
  },

  glyph: {
    type: 'glyph',
    widget: 'combo',
    restrictsToList: false,
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
    restrictsToList: true,
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
    restrictsToList: false,
    samples: ['', '90', '180', '270'],
  },

  percentage: {
    type: 'percentage',
    widget: 'combo',
    restrictsToList: false,
    samples: ['', '10%', '25%', '50%', '75%', '90%', '100%', '150%', '200%'],
  },

  horizontalSpacing: {
    type: 'horizontalSpacing',
    widget: 'combo',
    restrictsToList: true,
    samples: [
      '',
      'overlap',
      'zero',
      'tiny',
      'compact',
      'large',
      'big',
      'double',
    ],
  },

  verticalSpacing: {
    type: 'verticalSpacing',
    widget: 'combo',
    restrictsToList: true,
    samples: ['', 'overlap', 'compact', 'normal', 'large'],
  },

  shortcut: {
    type: 'shortcut',
    widget: 'combo',
    restrictsToList: false,
    samples: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
  },

  grow: {
    type: 'grow',
    widget: 'combo',
    restrictsToList: false,
    samples: ['', '0.5', '1'],
  },

  fontStyle: {
    type: 'fontStyle',
    widget: 'combo',
    restrictsToList: true,
    samples: ['', 'italic', 'oblique'],
  },

  cursor: {
    type: 'cursor',
    widget: 'combo',
    restrictsToList: true,
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
    restrictsToList: false,
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
    restrictsToList: true,
    samples: ['', 'capitalize', 'uppercase', 'lowercase'],
  },

  justify: {
    type: 'justify',
    widget: 'combo',
    restrictsToList: true,
    samples: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
  },

  textJustify: {
    type: 'textJustify',
    widget: 'combo',
    restrictsToList: true,
    samples: ['', 'left', 'center', 'right'],
  },

  place: {
    type: 'place',
    widget: 'combo',
    restrictsToList: false,
    samples: [
      '',
      '1/1',
      '1/2',
      '2/2',
      '1/3',
      '2/3',
      '3/3',
      '1/4',
      '2/4',
      '3/4',
      '4/4',
      'single',
      'left',
      'middle',
      'right',
    ],
  },

  transition: {
    type: 'transition',
    widget: 'combo',
    restrictsToList: false,
    samples: [
      '',
      '0.0s ease-out',
      '0.2s ease-out',
      '0.5s ease-out',
      '1.0s ease-out',
    ],
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
