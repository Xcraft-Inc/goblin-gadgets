// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import {propsList} from '../../types/props-list.js';

export default propsList({
  ['aspect']: {
    size: {
      type: types.pixel,
      min: 50,
      max: 500,
    },
    textColor: {
      type: types.color,
    },
    shadow: {
      type: types.enumeration('none', 'light', 'deep', 'strong'),
    },
    kind: {
      type: types.enumeration('default', 'toy'),
    },
    disabled: {
      type: types.boolean,
    },
    crossed: {
      type: types.boolean,
    },
    background: {
      type: types.background,
    },
    backgroundHover: {
      type: types.background,
    },
  },

  ['content']: {
    title: {
      type: types.nabu,
    },
    subtitle: {
      type: types.nabu,
    },
    icon: {
      type: types.string,
    },
    iconShadow: {
      type: types.enumeration('none', 'default', 'light'),
    },
    glyph: {
      type: types.glyph,
    },
  },

  ['gauge']: {
    gaugeColor: {
      type: types.color,
    },
    startedCount: {
      type: types.number,
      min: 0,
      max: 100,
    },
    totalCount: {
      type: types.number,
      min: 0,
      max: 100,
    },
  },

  ['additional']: {
    additionalText: {
      type: types.nabu,
    },
    additionalGlyph: {
      type: types.glyph,
    },
    additionalAnimation: {
      type: types.enumeration('none', 'zoom', 'shift', 'dancing', 'parkinson'),
    },
    onAdditional: {
      type: types.function,
    },
  },

  ['function']: {
    onClick: {
      type: types.function,
    },
  },
});
