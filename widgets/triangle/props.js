import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Main.
  {
    name: 'position',
    group: 'main',
    type: types.enum(['left', 'right', 'top', 'bottom']),
    description: 'Position of the triangle, relative to the parent.',
  },
  {
    name: 'size',
    group: 'main',
    type: types.pixel,
  },
  {
    name: 'shift',
    group: 'main',
    type: types.pixel,
  },
  {
    name: 'color',
    group: 'main',
    type: types.color,
  },

  // Simulation.
  {
    name: 'parentSimulatorHeight',
    group: 'simulation',
    type: types.pixel,
  },
  {
    name: 'parentSimulatorWidth',
    group: 'simulation',
    type: types.pixel,
    description:
      'Height and width of the parent, only for simulation. Normally, these values are not specified.',
  },
];
