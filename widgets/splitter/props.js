// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    kind: {
      type: types.enumeration('vertical', 'horizontal'),
      description: "Use container 'resizable' to see the splitter.",
    },
    children: {
      type: types.component,
    },
    hide: {
      type: types.boolean,
      description: 'Hide the splitter.',
    },
  },

  ['overflow']: {
    firstOverflow: {
      type: types.enumeration('hidden', 'visible'),
    },
    lastOverflow: {
      type: types.enumeration('hidden', 'visible'),
    },
  },

  ['size (initial)']: {
    firstSize: {
      type: types.union(types.pixel, types.percentage),
    },
    lastSize: {
      type: types.union(types.pixel, types.percentage),
      description: 'Use one of the two properties, but not both.',
    },
  },

  ['size (limit)']: {
    firstMinSize: {
      type: types.union(types.pixel, types.percentage),
    },
    firstMaxSize: {
      type: types.union(types.pixel, types.percentage),
    },
    lastMinSize: {
      type: types.union(types.pixel, types.percentage),
    },
    lastMaxSize: {
      type: types.union(types.pixel, types.percentage),
    },
  },
});
