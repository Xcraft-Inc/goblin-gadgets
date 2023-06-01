// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    appName: {
      type: types.string,
    },
    guildMaster: {
      type: types.string,
    },
    status: {
      type: types.enumeration('locked', 'ok'),
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
    onEditProfile: {
      type: types.function,
    },
    onEnter: {
      type: types.function,
    },
  },
});
