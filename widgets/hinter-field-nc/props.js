// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    readonly: {
      type: types.boolean,
    },
    disabled: {
      type: types.boolean,
    },
    required: {
      type: types.boolean,
    },
  },

  ['event']: {
    onSearchChange: {
      type: types.function,
    },
    onAdd: {
      type: types.function,
    },
    onClear: {
      type: types.function,
    },
    onShow: {
      type: types.function,
    },
  },

  ['glyph']: {
    selectedGlyph: {
      type: types.glyph,
    },
    selectedGlyphColor: {
      type: types.color,
    },
  },

  ['text']: {
    searchValue: {
      type: types.string,
      description: 'Use this property for editing a search value.',
    },
    selectedValue: {
      type: types.string,
      description: 'Use this property for showing a selected value.',
    },
    hintText: {
      type: types.nabu,
    },
    tooltip: {
      type: types.nabu,
    },
    wrap: {
      type: types.enumeration(
        '',
        'no',
        'no-end',
        'no-strict',
        'yes',
        'yes-permissive'
      ),
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    grow: {
      type: types.grow,
    },
  },
});
