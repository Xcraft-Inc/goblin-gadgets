import {types, addType} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';
import {array} from 'xcraft-core-stones';

/******************************************************************************/

const r1 = [
  {
    id: 'fact',
    kind: 'toy',
    title: 'Facturation',
    glyph: 'solid/bicycle',
    background: 'linear-gradient(180deg, #77b258 70%, #04a1c3)',
    backgroundHover: 'linear-gradient(180deg, #77b258 70%, #04a1c3)',
  },
  {
    id: 'sal',
    kind: 'toy',
    title: 'Salaires',
    glyph: 'solid/rocket',
    background: 'linear-gradient(180deg, #f4a649 70%, #ff4605)',
    backgroundHover: 'linear-gradient(180deg, #f4a649 70%, #ff4605)',
  },
  {
    id: 'compta',
    kind: 'toy',
    title: 'Comptabilité',
    glyph: 'solid/car',
    background: 'linear-gradient(180deg, #549dd7 70%, #515cc1)',
    backgroundHover: 'linear-gradient(180deg, #549dd7 70%, #515cc1)',
  },
];

const r2 = [
  {
    id: 'r1',
    title: 'epsitec',
    glyph: 'solid/plus',
    background: 'linear-gradient(125deg, #ff1461, #fe8506)',
    backgroundHover: 'linear-gradient(100deg, #ff1461, #fe8506)',
  },
  {
    id: 'r2',
    title: 'polyphème',
    glyph: 'solid/bicycle',
    background: 'linear-gradient(125deg, #ff1461, #fe8506)',
    backgroundHover: 'linear-gradient(100deg, #ff1461, #fe8506)',
  },
];

const r3 = [
  {
    id: 'r1',
    title: 'Bragon',
    subtitle: 'Chevalier',
    glyph: 'solid/square',
    kind: 'toy',
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
  type: array,
  defaultValue: 'R1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesData,
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
    name: 'background',
    group: 'aspect',
    type: types.background,
  },

  // Rockets.
  {
    name: 'rockets',
    group: 'rockets',
    type: types.rockets,
    description: 'The list of rockets.',
  },
  {
    name: 'rocketSize',
    group: 'rockets',
    type: types.pixel,
    min: 50,
    max: 500,
  },
  {
    name: 'rocketTextColor',
    group: 'rockets',
    type: types.color,
  },
  {
    name: 'rocketShadow',
    group: 'rockets',
    type: types.enum(['none', 'light', 'deep', 'strong']),
  },
  {
    name: 'rocketIconShadow',
    group: 'rockets',
    type: types.enum(['none', 'default', 'light']),
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
