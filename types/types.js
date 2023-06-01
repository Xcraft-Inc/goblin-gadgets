'use strict';

import {
  string,
  enumeration,
  percentage,
  any,
  boolean,
  number,
  date,
  time,
  union,
  object,
  func,
} from 'xcraft-core-stones';
import {component} from './ui-types.js';
import {nabu} from './data-types.js';

export const types = {
  any: {
    type: any,
    widget: 'text-field',
  },

  boolean: {
    type: boolean,
    defaultValue: false,
    widget: 'checkbox',
  },

  string: {
    type: string,
    defaultValue: '',
    widget: 'text-field',
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
    type: nabu,
    defaultValue: '',
    widget: 'combo',
    multiline: true,
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
    type: number,
    defaultValue: 0,
    widget: 'number',
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
    type: date,
    widget: 'date',
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
    type: time,
    widget: 'time',
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

  enumeration: (...values) => ({
    type: enumeration(...values),
    defaultValue: values[0],
    widget: 'combo',
    restrictsToList: true,
    values: values,
  }),

  union: (...types) => ({
    type: union(...types.map((t) => t.type)),
    defaultValue: types[0].defaultValue,
    widget: 'oneOfType',
    types,
  }),

  component: {
    type: component,
    widget: 'combo',
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
    type: func,
    widget: 'combo',
    samples: ['alert', 'log'],
  },

  color: {
    type: string,
    widget: 'color',
    samples: [
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
    type: string,
    widget: 'color',
    samples: [
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

  background: {
    type: string,
    widget: 'combo',
    samples: [
      '#000000',
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FF8000',
      '#FFFFFF',
      '#888888',
      'orange',
      'pink',
      'purple',
      'linear-gradient(180deg, #56b4ff, #9651c6)',
      'linear-gradient(180deg, black, purple)',
      'linear-gradient(90deg, #ffff00, #ff0088)',
      'linear-gradient(-45deg, #00aaaa 50%, #aa00aa 50%)',
      'radial-gradient(#2288ff, #000088)',
      'radial-gradient(at 0% 0%, #ffaa00, #000088 80%)',
    ],
  },

  pixel: {
    type: string,
    widget: 'combo',
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
    type: union(
      string,
      object({
        glyph: string,
        color: string,
      })
    ),
    widget: 'combo',
    samples: [
      'solid/check',
      'solid/times',
      'solid/bicycle',
      'solid/car',
      'solid/rocket',
      'solid/calendar',
    ],
  },

  shape: {
    type: enumeration(
      'rounded',
      'left-rounded',
      'right-rounded',
      'smooth',
      'left-smooth',
      'right-smooth'
    ),
    widget: 'combo',
  },

  angle: {
    type: string,
    widget: 'combo',
    samples: ['0', '90', '180', '270'],
  },

  percentage: {
    type: percentage,
    widget: 'percentage',
    samples: ['0%', '10%', '25%', '50%', '75%', '90%', '100%', '150%', '200%'],
  },

  horizontalSpacing: {
    type: enumeration(
      'overlap',
      'zero',
      'tiny',
      'compact',
      'large',
      'big',
      'double'
    ),
    widget: 'combo',
  },

  verticalSpacing: {
    type: enumeration('overlap', 'compact', 'normal', 'large'),
    widget: 'combo',
  },

  shortcut: {
    type: string,
    widget: 'combo',
    samples: ['_ctrl_+A', '_shift_+A', '_alt_+A'],
  },

  grow: {
    type: union(number, string),
    widget: 'combo',
    samples: ['1', '2'],
  },

  fontStyle: {
    type: enumeration('italic', 'oblique'),
    widget: 'combo',
  },

  cursor: {
    type: enumeration(
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
      'inherit'
    ),
    widget: 'combo',
  },

  fontWeight: {
    type: string,
    widget: 'combo',
    samples: [
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
    type: enumeration('capitalize', 'uppercase', 'lowercase'),
    widget: 'combo',
  },

  justify: {
    type: enumeration(
      'start',
      'center',
      'end',
      'around',
      'between',
      'flex-start',
      'none'
    ),
    widget: 'combo',
  },

  textJustify: {
    type: enumeration('left', 'center', 'right'),
    widget: 'combo',
  },

  place: {
    type: string,
    widget: 'combo',
    samples: [
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
    type: string,
    widget: 'combo',
    samples: [
      '0.0s ease-out',
      '0.2s ease-out',
      '0.5s ease-out',
      '1.0s ease-out',
    ],
  },

  /** @deprecated use types.union */
  oneOfType: (t) => types.union(...t),

  /** @deprecated use types.enumeration */
  enum: (values) => types.enumeration(...values),

  /** @deprecated use types.boolean */
  get bool() {
    return types.boolean;
  },
};

export function addType(name, type) {
  if (types.name) {
    throw new Error(`Type ${name} is already defined`);
  }
  types[name] = type;
}
