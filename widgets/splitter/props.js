import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default [
  // Main.
  {
    name: 'kind',
    group: 'main',
    type: types.enum(['vertical', 'horizontal']),
    description: "Use container 'resizable' to see the splitter.",
  },
  {
    name: 'children',
    group: 'main',
    type: types.component,
  },
  {
    name: 'hide',
    group: 'main',
    type: types.bool,
    description: 'Hide the splitter.',
  },

  // Overflow.
  {
    name: 'firstOverflow',
    group: 'overflow',
    type: types.enum(['hidden', 'visible']),
  },
  {
    name: 'lastOverflow',
    group: 'overflow',
    type: types.enum(['hidden', 'visible']),
  },

  // Size (initial).
  {
    name: 'firstSize',
    group: 'size (initial)',
    type: types.oneOfType([types.pixel, types.percentage]),
  },
  {
    name: 'lastSize',
    group: 'size (initial)',
    type: types.oneOfType([types.pixel, types.percentage]),
    description: 'Use one of the two properties, but not both.',
  },

  // Size (limit).
  {
    name: 'firstMinSize',
    group: 'size (limit)',
    type: types.oneOfType([types.pixel, types.percentage]),
  },
  {
    name: 'firstMaxSize',
    group: 'size (limit)',
    type: types.oneOfType([types.pixel, types.percentage]),
  },
  {
    name: 'lastMinSize',
    group: 'size (limit)',
    type: types.oneOfType([types.pixel, types.percentage]),
  },
  {
    name: 'lastMaxSize',
    group: 'size (limit)',
    type: types.oneOfType([types.pixel, types.percentage]),
  },
];
