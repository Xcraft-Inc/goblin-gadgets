// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['content']: {
    dateTime: {
      type: types.nabu,
      defaultValue: '',
    },
    message: {
      type: types.nabu,
      defaultValue: '',
    },
  },

  ['aspect']: {
    type: {
      type: types.enumeration('', 'sended', 'received'),
    },
    look: {
      type: types.enumeration('', 'whatsapp', 'smooth', 'round'),
    },
    dateTimeColor: {
      type: types.color,
    },
    backgroundColor: {
      type: types.color,
    },
    textColor: {
      type: types.color,
    },
  },
  ['Layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
  },

  ['main']: {
    children: {
      type: types.component,
    },
    onDocument: {
      type: types.function,
    },
  },
});
