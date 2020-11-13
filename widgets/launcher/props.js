import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';

/******************************************************************************/

const r1 = [
  {
    id: 'fact',
    title: 'Facturation',
    glyph: 'solid/bicycle',
    iconShadow: true,
    textColor: '#eee',
    background: '#74ae56',
    backgroundHover: 'red',
    shadow: true,
  },
  {
    id: 'sal',
    title: 'Salaires',
    glyph: 'solid/rocket',
    iconShadow: true,
    textColor: '#eee',
    background: '#fdac4c',
    backgroundHover: 'red',
    shadow: true,
  },
  {
    id: 'compta',
    title: 'Comptabilité',
    glyph: 'solid/car',
    iconShadow: true,
    textColor: '#eee',
    background: '#559dd8',
    backgroundHover: 'red',
    shadow: true,
  },
];

const r2 = [
  {
    id: 'r1',
    title: 'Bragon',
    subtitle: 'Chevalier',
    glyph: 'solid/square',
    kind: 'toy',
    textColor: '#fff',
    background: 'mediumslateblue',
    backgroundHover: 'red',
    gaugeColor: 'mediumslateblue',
    startedCount: 3,
    totalCount: 5,
  },
  {
    id: 'r2',
    title: 'Mara',
    subtitle: 'Princesse',
    glyph: 'solid/circle',
    kind: 'toy',
    textColor: '#fff',
    background: 'turquoise',
    backgroundHover: 'red',
    gaugeColor: 'turquoise',
    startedCount: 4,
    totalCount: 5,
  },
];

const r3 = [
  {
    id: 's',
    title: 'Vérification',
    glyph: 'solid/check',
    kind: 'toy',
    textColor: '#333',
    background: '#ddd',
    backgroundHover: '#fff',
  },
];

/******************************************************************************/

const samplesData = {
  R1: r1,
  R2: r2,
  R3: r3,
};

const samples = [
  {id: 'R1', text: 'Crésus'},
  {id: 'R2', text: 'BD'},
  {id: 'R3', text: 'Single'},
];

addType('rockets', {
  type: 'rockets',
  defaultValue: 'R1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesData,
  propType: PropTypes.array,
});

/******************************************************************************/

export default [
  // Aspect.
  {
    name: 'rockets',
    group: 'aspect',
    type: types.rockets,
    description: 'The list of rockets.',
  },
  {
    name: 'background',
    group: 'aspect',
    type: types.background,
  },
  {
    name: 'rocketSize',
    group: 'aspect',
    type: types.pixel,
    min: 50,
    max: 500,
  },

  // Blob.
  {
    name: 'blobKind',
    group: 'blob',
    type: types.enum(['none', 'blob', 'wave']),
  },
  {
    name: 'blobColor',
    group: 'blob',
    type: types.string,
  },

  // Function.
  {
    name: 'onLaunchRocket',
    group: 'function',
    type: types.function,
  },
];
