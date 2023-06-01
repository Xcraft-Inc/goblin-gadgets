// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    mainColor: {
      type: types.color,
    },
    topColor: {
      type: types.color,
    },
  },

  ['smile']: {
    satisfaction: {
      type: types.number,
      min: 0,
      max: 100,
      step: 10,
      description: '0 = unhappy, 100 = happy',
    },
    transition: {
      type: types.transition,
    },
  },

  ['layout']: {
    size: {
      type: types.pixel,
      min: 10,
      max: 1000,
    },
  },

  ['xcraft.ch']: {
    step: {
      type: types.number,
      min: 1,
      max: 7,
      description:
        'This component is didactic. The different steps correspond to the xcraft.ch documentation.',
    },
  },
});
