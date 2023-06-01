// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    children: {
      type: types.component,
    },
  },

  ['ui']: {
    responsive: {
      type: types.boolean,
    },
    touch: {
      type: types.boolean,
    },
    navigator: {
      type: types.enumeration('', 'none', 'bullets'),
    },
    cycling: {
      type: types.enumeration('', 'blocked', 'loop'),
    },
    forceRequiredToOverflow: {
      type: types.number,
    },
  },

  ['aspect']: {
    maxWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    itemWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    itemMargin: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
  },

  ['buttons']: {
    buttonsTop: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    buttonsBottom: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    buttonsCenter: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    buttonsSize: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
    buttonsShift: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    buttonsShape: {
      type: types.enumeration('', 'circle', 'semiCircle'),
    },
  },
});
