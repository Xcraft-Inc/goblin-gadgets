// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

export default propsList({
  ['main']: {
    identicalCount: {
      type: types.number,
    },
    tooltip: {
      type: types.string,
    },
    children: {
      type: types.component,
    },
    flash: {
      type: types.boolean,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    opacity: {
      type: types.number,
      min: 0,
      max: 1,
    },
    cursor: {
      type: types.cursor,
    },
    hideContent: {
      type: types.boolean,
    },
  },

  ['aspect']: {
    color: {
      type: types.color,
    },
    kind: {
      type: types.enumeration(
        '',
        'ticket',
        'rect',
        'cover',
        'thin',
        'event',
        'subpane'
      ),
    },
    subkind: {
      type: types.enumeration('', 'dragged'),
    },
    shadow: {
      type: types.boolean,
    },
    hatch: {
      type: types.boolean,
    },
    backgroundText: {
      type: types.union(types.number, types.string),
    },
    hudGlyph: {
      type: types.glyph,
    },
    shape: {
      type: types.enumeration('', 'middle', 'first', 'continued', 'last'),
    },
    hoverShape: {
      type: types.enumeration('', 'middle', 'first', 'continued', 'last'),
    },
  },

  ['corner']: {
    cornerPosition: {
      type: types.enumeration(
        '',
        'topRight',
        'topLeft',
        'bottomRight',
        'bottomLeft'
      ),
    },
    cornerColor: {
      type: types.color,
    },
    cornerSize: {
      type: types.pixel,
      min: 0,
      max: 100,
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
    verticalSpacing: {
      type: types.verticalSpacing,
    },
    horizontalSpacing: {
      type: types.horizontalSpacing,
    },
  },

  ['function']: {
    onMouseOver: {
      type: types.function,
    },
    onMouseOut: {
      type: types.function,
    },
    mouseDown: {
      type: types.function,
    },
    mouseUp: {
      type: types.function,
    },
  },
});
