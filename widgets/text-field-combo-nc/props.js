// @ts-check
import {types, addType} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';
import {array, object, union} from 'xcraft-core-stones';

const samples = [
  {value: 'team', text: 'Collaborateurs'},
  {value: 'colors', text: 'Couleurs'},
  {value: 'months', text: 'Mois'},
  {value: 'transports', text: 'Moyens de transport'},
  {value: 'localities', text: 'Localités'},
  {value: 'strange', text: 'Bizarre'},
  {value: 'multiline', text: 'Multiligne'},
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
  type: union(array, object),
  //? defaultValue: 'T1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesList,
});

/******************************************************************************/

export default propsList({
  ['event']: {
    onChange: {
      type: types.function,
    },
    onShowCombo: {
      type: types.function,
    },
  },

  ['text']: {
    // value: {
    //   type: types.nabu,
    // },
    readonly: {
      type: types.boolean,
    },
    restrictsToList: {
      type: types.boolean,
    },
    selectedId: {
      type: types.union(types.number, types.string),
    },
    hintText: {
      type: types.nabu,
    },
    rows: {
      type: types.number,
      min: 1,
      max: 20,
    },
  },

  ['menu']: {
    list: {
      type: types.dataList,
      required: true,
    },
    menuType: {
      type: types.enumeration('', 'menu', 'wrap'),
    },
    flyingBalloonAnchor: {
      type: types.enumeration('', 'top', 'bottom', 'left', 'right'),
    },
    menuItemWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    menuItemTooltips: {
      type: types.boolean,
    },
    comboGlyph: {
      type: types.glyph,
    },
    comboTextTransform: {
      type: types.enumeration('', 'none'),
    },
    hideButtonCombo: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    shape: {
      type: types.shape,
    },
    tooltip: {
      type: types.nabu,
    },
    required: {
      type: types.boolean,
    },
    disabled: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    autoFocus: {
      type: types.boolean,
    },
    selectAllOnFocus: {
      type: types.boolean,
    },
    show: {
      type: types.boolean,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    fieldWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    horizontalSpacing: {
      type: types.horizontalSpacing,
    },
    grow: {
      type: types.grow,
    },
  },
});
