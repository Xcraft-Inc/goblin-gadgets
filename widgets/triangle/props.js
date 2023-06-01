import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['main']: {
    position: {
      group: 'main',
      type: types.enumeration('left', 'right', 'top', 'bottom'),
      description: 'Position of the triangle, relative to the parent.',
    },
    size: {
      group: 'main',
      type: types.pixel,
      min: 0,
      max: 200,
    },
    shift: {
      group: 'main',
      type: types.pixel,
      min: -500,
      max: 500,
    },
    color: {
      group: 'main',
      type: types.color,
    },
  },

  ['simulation']: {
    parentSimulatorHeight: {
      group: 'simulation',
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    parentSimulatorWidth: {
      group: 'simulation',
      type: types.pixel,
      min: 0,
      max: 1000,
      description:
        'Height and width of the parent, only for simulation. Normally, these values are not specified.',
    },
  },
});
