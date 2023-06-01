// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    children: {
      type: types.component,
    },
    resizing: {
      type: types.boolean,
    },
    zIndex: {
      type: types.union(types.number, types.string),
    },
    drawChildrenWhileResizing: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    borderSize: {
      type: types.pixel,
      min: 0,
      max: 20,
    },
    borderRadius: {
      type: types.pixel,
      min: 0,
      max: 50,
    },
    margin: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
    borderColor: {
      type: types.color,
    },
  },

  ['title']: {
    titleBarHeight: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
    titleBarText: {
      type: types.nabu,
    },
  },

  ['layout']: {
    position: {
      type: types.enumeration('fixed', 'absolute', 'relative'),
    },
    minWidth: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    minHeight: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
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
    horizontal: {
      type: types.pixel,
      min: -500,
      max: 500,
    },
    vertical: {
      type: types.pixel,
      min: -500,
      max: 500,
    },
  },

  ['function']: {
    onMinimize: {
      type: types.function,
    },
    onMaximize: {
      type: types.function,
    },
    onCloseDialog: {
      type: types.function,
    },
    onMouseDown: {
      type: types.function,
    },
    onMouseMove: {
      type: types.function,
    },
    onMouseUp: {
      type: types.function,
    },
  },
});
