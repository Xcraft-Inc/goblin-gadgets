import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';

const samples = [
  {id: 'team', text: 'Collaborateurs'},
  {id: 'colors', text: 'Couleurs'},
  {id: 'months', text: 'Mois'},
  {id: 'transports', text: 'Moyens de transport'},
  {id: 'localities', text: 'Localités'},
  {id: 'strange', text: 'Bizarre'},
  {id: 'multiline', text: 'Multiligne'},
];

const samplesList = {
  team: [
    'Ernest',
    'Marie-Antoinette',
    'Jean-Pierre',
    'Nicole',
    'Sandra',
    'Marc-Antoine',
    'Sophie',
  ],
  colors: [
    {id: 'R', text: 'Rouge'},
    {id: 'G', text: 'Vert'},
    {id: 'B', text: 'Bleu'},
  ],
  months: [
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
  transports: [
    {id: 'bike', text: 'Vélo', glyph: 'solid/bicycle'},
    {id: 'car', text: 'Voiture', glyph: 'solid/car'},
    {id: 'rocket', text: 'Fusée super-sonique', glyph: 'solid/rocket'},
  ],
  localities: [
    'Allaman',
    'Avanche',
    'Berne',
    'Belmont',
    'Bienne',
    'Boudry',
    'Brig',
    'Chamblon',
    'Cheseaux',
    'Chexbres',
    'Crissier',
    'Cortaillod',
    'Delémont',
    'Echallens',
    'Fribourg',
    'Genève',
    'Granson',
    'Jouxtens',
    'La Brévine',
    'La Chaux-de-Fonds',
    'La Sarraz',
    'Lausanne',
    'Le Locle',
    'Les Breuleux',
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
    'Ursy',
    'Vevey',
    'Villeneuve',
    'Yverdon-les-Bains',
    'Winthertur',
    'Zurich',
  ],
  strange: [
    'Allaman',
    'Avanche',
    'Cortaillod',
    'Genève',
    'Jouxtens',
    'La Brévine',
    {id: 'chx-fds', text: 'La Chaux-de-Fonds', glyph: 'solid/rocket'},
    'Lausanne',
    'Le Locle',
    'Neuchâtel',
    'Pully',
    'Renens',
    'Rolle',
    'Sion',
    'Soleure',
    'St. Maurice',
    "Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.",
    'Vevey',
    'Villeneuve',
    'Yverdon-les-Bains',
    'Zurich',
  ],
  multiline: [
    'Ligne 1\nLigne 2\nLigne 3',
    'A\nB\nC',
    'Samedi\nDimanche',
    'Tralala',
    'Ligne 1\nLigne 2\nLigne 3\nLigne 4\nLigne 5',
    'Fin',
  ],
};

/******************************************************************************/

addType('dataList', {
  type: 'dataList',
  //? defaultValue: 'T1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesList,
  propType: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
});

/******************************************************************************/

export default [
  // Event.
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

  // Text.
  {
    name: 'value',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'readonly',
    group: 'text',
    type: types.bool,
  },
  {
    name: 'restrictsToList',
    group: 'text',
    type: types.bool,
  },
  {
    name: 'selectedId',
    group: 'text',
    type: types.oneOfType([types.number, types.string]),
  },
  {
    name: 'hintText',
    group: 'text',
    type: types.nabu,
  },
  {
    name: 'rows',
    group: 'text',
    type: types.number,
    min: 1,
    max: 20,
  },

  // Menu.
  {
    name: 'list',
    group: 'menu',
    type: types.dataList,
    required: true,
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
    name: 'menuItemWidth',
    group: 'menu',
    type: types.pixel,
    min: 0,
    max: 1000,
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

  // Aspect.
  {
    name: 'shape',
    group: 'aspect',
    type: types.shape,
  },
  {
    name: 'tooltip',
    group: 'aspect',
    type: types.nabu,
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

  // Layout.
  {
    name: 'width',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'fieldWidth',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },
  {
    name: 'horizontalSpacing',
    group: 'layout',
    type: types.horizontalSpacing,
  },
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
];
