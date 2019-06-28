import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';

const samples = [
  {id: 'L1', text: 'Collaborateurs'},
  {id: 'L2', text: 'Couleurs'},
  {id: 'L3', text: 'Mois'},
  {id: 'L4', text: 'Moyens de transport'},
  {id: 'L5', text: 'Long et dégénéré'},
];

const samplesList = {
  L1: ['Jean-Pierre', 'Marc', 'Ernest'],
  L2: [
    {id: 'R', text: 'Rouge'},
    {id: 'G', text: 'Vert'},
    {id: 'B', text: 'Bleu'},
  ],
  L3: [
    {id: '1', text: 'Janvier'},
    {id: '2', text: 'Février'},
    {id: '3', text: 'Mars'},
    {id: '4', text: 'Avril'},
    {id: '5', text: 'Mai'},
    {id: '6', text: 'Juin'},
    {id: '7', text: 'Juillet'},
    {id: '8', text: 'Août'},
    {id: '9', text: 'Septembre'},
    {id: '10', text: 'Octobre'},
    {id: '11', text: 'Novembre'},
    {id: '12', text: 'Décembre'},
  ],
  L4: [
    {id: 'bike', text: 'Vélo', glyph: 'solid/bicycle'},
    {id: 'car', text: 'Voiture', glyph: 'solid/car'},
    {id: 'rocket', text: 'Fusée super-sonique', glyph: 'solid/rocket'},
  ],
  L5: [
    'Allaman',
    'Avanche',
    'Berne',
    'Belmont',
    'Boudry',
    'Cheseaux',
    'Chexbres',
    'Crissier',
    'Cortaillod',
    'Delémont',
    'Fribourg',
    'Genève',
    'Jouxtens',
    'La Brévine',
    'La Chaux-de-Fonds',
    'Le Locle',
    'Lausanne',
    'Martigny',
    'Montreux',
    'Neuchâtel',
    'Nyon',
    'Paudex',
    'Prilly',
    'Pully',
    'Renens',
    'Rolle',
    'Sainte-Croix',
    'Sierre',
    'Sion',
    'Soleure',
    'St. Maurice',
    "Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.",
    'Vevey',
    'Villeneuve',
    'Yverdon-les-Bains',
    'Zurich',
  ],
};

/******************************************************************************/

addType('dataList', {
  type: 'dataList',
  defaultValue: 'T1',
  widget: 'combo',
  readonly: true,
  samples: samples,
  samplesData: samplesList,
  propType: PropTypes.object,
});

/******************************************************************************/

export default [
  {
    name: 'onChange',
    group: 'event',
    type: types.function,
  },
  {
    name: 'onShowCombo',
    group: 'event',
    type: types.function,
  },
  {
    name: 'readonly',
    group: 'text',
    type: types.bool,
  },
  {
    name: 'comboReadonly',
    group: 'text',
    type: types.bool,
  },
  {
    name: 'list',
    group: 'menu',
    type: types.dataList,
    required: true,
  },
  {
    name: 'selectedId',
    group: 'text',
    type: types.string,
  },
  {
    name: 'menuType',
    group: 'menu',
    type: types.enum(['', 'menu', 'wrap']),
  },
  {
    name: 'flyingBalloonAnchor',
    group: 'menu',
    type: types.enum(['', 'top', 'bottom', 'left', 'right']),
  },
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'width',
    group: 'layout',
    type: types.size,
  },
  {
    name: 'rows',
    group: 'text',
    type: types.enum(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
  },
  {
    name: 'required',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'visibility',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'autoFocus',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'selectAllOnFocus',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'show',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'menuItemWidth',
    group: 'menu',
    type: types.size,
  },
  {
    name: 'menuItemTooltips',
    group: 'menu',
    type: types.bool,
  },
  {
    name: 'comboGlyph',
    group: 'menu',
    type: types.glyph,
  },
  {
    name: 'comboTextTransform',
    group: 'menu',
    type: types.enum(['', 'none']),
  },
  {
    name: 'hideButtonCombo',
    group: 'menu',
    type: types.bool,
  },

  {
    name: 'spacing',
    group: 'layout',
    type: types.spacing,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
