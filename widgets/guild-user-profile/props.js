// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['perso']: {
    initials: {
      type: types.string,
    },
    pseudo: {
      type: types.string,
    },
    firstName: {
      type: types.string,
    },
    lastName: {
      type: types.string,
    },
  },

  ['logo']: {
    logoShape: {
      type: types.enumeration(
        'circle',
        'hexagon',
        'square',
        'triangle',
        'certificate',
        'star',
        'heart'
      ),
    },
    logoColor: {
      type: types.color,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    height: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    grow: {
      type: types.grow,
    },
  },

  ['function']: {
    onClose: {
      type: types.function,
    },
  },
});
