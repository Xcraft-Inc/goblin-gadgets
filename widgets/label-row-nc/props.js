// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['label']: {
    labelWidth: {
      type: types.pixel,
      min: 0,
      max: 500,
    },
    labelText: {
      type: types.nabu,
    },
    labelWrap: {
      type: types.enumeration(
        '',
        'no',
        'no-end',
        'no-strict',
        'yes',
        'yes-permissive'
      ),
    },
    labelGlyph: {
      type: types.glyph,
    },
  },

  ['main']: {
    children: {
      type: types.component,
    },
  },

  ['aspect']: {
    disabled: {
      type: types.boolean,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
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
    horizontalSpacing: {
      type: types.horizontalSpacing,
    },
    verticalSpacing: {
      type: types.verticalSpacing,
    },
    verticalJustify: {
      type: types.enumeration('', 'center', 'top'),
    },
    grow: {
      type: types.grow,
    },
  },
});
