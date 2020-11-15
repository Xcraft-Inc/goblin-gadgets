import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';

/******************************************************************************/

const r1 = [
  {
    id: 'fact',
    kind: 'toy',
    title: 'Facturation',
    glyph: 'solid/bicycle',
    iconShadow: 'default',
    textColor: '#eee',
    background: 'linear-gradient(180deg, #77b258 70%, #04a1c3)',
    backgroundHover: 'linear-gradient(180deg, #77b258 70%, #04a1c3)',
    shadow: 'strong',
  },
  {
    id: 'sal',
    kind: 'toy',
    title: 'Salaires',
    glyph: 'solid/rocket',
    iconShadow: 'default',
    textColor: '#eee',
    background: 'linear-gradient(180deg, #f4a649 70%, #ff4605)',
    backgroundHover: 'linear-gradient(180deg, #f4a649 70%, #ff4605)',
    shadow: 'strong',
  },
  {
    id: 'compta',
    kind: 'toy',
    title: 'Comptabilité',
    glyph: 'solid/car',
    iconShadow: 'default',
    textColor: '#eee',
    background: 'linear-gradient(180deg, #549dd7 70%, #515cc1)',
    backgroundHover: 'linear-gradient(180deg, #549dd7 70%, #515cc1)',
    shadow: 'strong',
  },
];

const r2 = [
  {
    id: 'r1',
    title: 'epsitec',
    glyph: 'solid/plus',
    textColor: '#eee',
    background: 'linear-gradient(125deg, #e6316e, #fe8506)',
    backgroundHover: 'linear-gradient(90deg, #e6316e, #fe8506)',
    shadow: 'light',
    iconShadow: 'none',
  },
  {
    id: 'r2',
    title: 'polyphème',
    glyph: 'solid/bicycle',
    textColor: '#eee',
    background: 'linear-gradient(125deg, #e6316e, #fe8506)',
    backgroundHover: 'linear-gradient(90deg, #e6316e, #fe8506)',
    shadow: 'light',
    iconShadow: 'none',
  },
];

const r3 = [
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

const r4 = [
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
  R4: r4,
};

const samples = [
  {id: 'R1', text: 'Crésus'},
  {id: 'R2', text: 'Westeros'},
  {id: 'R3', text: 'BD'},
  {id: 'R4', text: 'Single'},
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
    name: 'title',
    group: 'aspect',
    type: types.string,
  },
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
