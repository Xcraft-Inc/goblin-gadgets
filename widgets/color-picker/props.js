// @ts-check
import {types, addType} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';
import {array, object, union} from 'xcraft-core-stones';

/******************************************************************************/

const samples = [
  {value: 'pallet1', text: 'rouge, vert, bleu'},
  {value: 'pallet2', text: '9 couleurs pastels'},
  {value: 'pallet3', text: '18 couleurs vives'},
  {value: 'pallet4', text: 'mélange'},
];

const samplesList = {
  pallet1: ['#FF0000', '#00FF00', '#0000FF'],
  pallet2: [
    'HSL(0,25,100)',
    'HSL(40,25,100)',
    'HSL(80,25,100)',
    'HSL(120,25,100)',
    'HSL(160,25,100)',
    'HSL(200,25,100)',
    'HSL(240,25,100)',
    'HSL(280,25,100)',
    'HSL(320,25,100)',
  ],
  pallet3: [
    'HSL(0,100,100)',
    'HSL(20,100,100)',
    'HSL(40,100,100)',
    'HSL(60,100,100)',
    'HSL(80,100,100)',
    'HSL(100,100,100)',
    'HSL(120,100,100)',
    'HSL(140,100,100)',
    'HSL(160,100,100)',
    'HSL(180,100,100)',
    'HSL(200,100,100)',
    'HSL(220,100,100)',
    'HSL(240,100,100)',
    'HSL(260,100,100)',
    'HSL(280,100,100)',
    'HSL(300,100,100)',
    'HSL(320,100,100)',
    'HSL(340,100,100)',
  ],
  pallet4: [
    'HSL(19,62,100)',
    'HSL(291,62,100)',
    '#49A6FF',
    '#D773FF',
    'CMYK(65,80,0,21)',
    'G(27)',
    'G(52)',
  ],
};

addType('dataPallet', {
  type: union(array, object),
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesList,
});

/******************************************************************************/

export default propsList({
  ['aspect']: {
    color: {
      type: types.richColor,
    },
    pallet: {
      type: types.dataPallet,
    },
    borderRadius: {
      type: types.pixel,
      min: 0,
      max: 50,
    },
    frame: {
      type: types.enumeration('shadow', 'no'),
    },
    backgroundColor: {
      type: types.color,
    },
  },

  ['layout']: {
    grow: {
      type: types.grow,
    },
    width: {
      type: types.pixel,
      min: 520,
      max: 1000,
    },
  },

  ['functionality']: {
    showHSL: {
      type: types.enumeration('yes', 'no'),
    },
    showRGB: {
      type: types.enumeration('yes', 'no'),
    },
    showCMYK: {
      type: types.enumeration('yes', 'no'),
    },
    showG: {
      type: types.enumeration('yes', 'no'),
    },
    showPaste: {
      type: types.enumeration('yes', 'no'),
    },
  },

  ['function']: {
    onChange: {
      type: types.function,
    },
  },
});
