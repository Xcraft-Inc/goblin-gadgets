// @ts-check
import {propsList} from '../../types/props-list.js';
import {types} from 'goblin-gadgets/types/types.js';

/******************************************************************************/

export default propsList({
  ['aspect']: {
    size: {
      type: types.pixel,
      min: 10,
      max: 1000,
    },
    look: {
      type: types.enumeration(
        '',
        'cff',
        'black',
        'classic',
        'simple',
        'discreet',
        'ring',
        'transparent',
        'light',
        'royal',
        'smoothy',
        'dots'
      ),
    },
    transition: {
      type: types.transition,
    },
    limit: {
      type: types.number,
      min: 0,
      max: 5,
    },
  },
  ['time']: {
    fixedTime: {
      type: types.time,
      description:
        'If this property is omitted, the clock displays the current time in real time.',
    },
    digitalTime: {
      type: types.boolean,
    },
    serverTick: {
      type: types.number,
      description:
        'This property can be used in order to sync the lock with a master (for each minute)',
    },
  },
  ['function']: {
    draggingEnabled: {
      type: types.boolean,
    },
    mouseOver: {
      type: types.function,
    },
    mouseOut: {
      type: types.function,
    },
    onTimeChanged: {
      type: types.function,
    },
    onDragStarted: {
      type: types.function,
    },
    onDragMoved: {
      type: types.function,
    },
    onTimeEnded: {
      type: types.function,
    },
  },
});
