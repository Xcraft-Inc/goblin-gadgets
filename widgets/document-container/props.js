// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
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
    cornerSize: {
      type: types.pixel,
      min: 0,
      max: 100,
    },
    grow: {
      type: types.grow,
    },

    // Aspect
    color: {
      type: types.color,
    },
    hoverColor: {
      type: types.color,
    },
    borderSize: {
      type: types.pixel,
      min: 0,
      max: 20,
    },
    borderColor: {
      type: types.color,
    },
    hoverChildrenFontSize: {
      type: types.percentage,
    },
    hoverChildrenOpacity: {
      type: types.number,
      min: 0,
      max: 1,
    },
    transition: {
      type: types.transition,
    },
  },

  ['main']: {
    children: {
      type: types.component,
    },
  },
});
