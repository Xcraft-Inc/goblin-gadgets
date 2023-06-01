// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['main']: {
    checked: {
      type: types.boolean,
      // default: false,
    },
    onChange: {
      type: types.function,
    },
    disabled: {
      type: types.boolean,
    },
  },

  ['text']: {
    text: {
      type: types.nabu,
      defaultValue: '',
    },
    textColor: {
      type: types.color,
    },
    fontSize: {
      type: types.percentage,
    },
    fontWeight: {
      type: types.fontWeight,
    },
    fontStyle: {
      type: types.fontStyle,
    },
    textTransform: {
      type: types.textTransform,
    },
    wrap: {
      type: types.enumeration('', 'no', 'no-strict', 'yes', 'yes-permissive'),
    },
  },

  ['glyph']: {
    glyphColor: {
      type: types.color,
    },
    glyphFlip: {
      type: types.enumeration('', 'horizontal', 'vertical'),
    },
    glyphSpin: {
      type: types.enumeration('', 'yes'),
    },
    glyphSize: {
      type: types.percentage,
    },
  },

  ['aspect']: {
    kind: {
      type: types.enumeration(
        '',
        'big',
        'active',
        'check-button',
        'radio',
        'switch'
      ),
    },
    look: {
      type: types.enumeration('', 'modern', 'retro'),
    },
    backgroundBrigtness: {
      type: types.enumeration('', 'light', 'dark'),
    },
    readonly: {
      type: types.boolean,
    },
    focusable: {
      type: types.boolean,
    },
    busy: {
      type: types.boolean,
    },
    backgroundColor: {
      type: types.color,
    },
    activeColor: {
      type: types.color,
    },
    cursor: {
      type: types.cursor,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
    toAnchor: {
      type: types.string,
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

  ['badge']: {
    badgeValue: {
      type: types.union(types.number, types.string),
    },
    badgePush: {
      type: types.boolean,
    },
    badgePosition: {
      type: types.enumeration('', 'top-right', 'over'),
    },
    badgeShape: {
      type: types.enumeration('', 'circle'),
    },
    badgeColor: {
      type: types.enumeration('', 'red', 'green'),
    },
  },
});
