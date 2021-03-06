import {types} from 'goblin-gadgets/types/types.js';

export default [
  // Aspect.
  {
    name: 'size',
    group: 'aspect',
    type: types.pixel,
    min: 50,
    max: 500,
  },
  {
    name: 'textColor',
    group: 'aspect',
    type: types.color,
  },
  {
    name: 'shadow',
    group: 'aspect',
    type: types.enum(['none', 'light', 'deep', 'strong']),
  },
  {
    name: 'kind',
    group: 'aspect',
    type: types.enum(['default', 'toy']),
  },
  {
    name: 'disabled',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'crossed',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'background',
    group: 'aspect',
    type: types.background,
  },
  {
    name: 'backgroundHover',
    group: 'aspect',
    type: types.background,
  },

  // Content.
  {
    name: 'title',
    group: 'content',
    type: types.nabu,
  },
  {
    name: 'subtitle',
    group: 'content',
    type: types.nabu,
  },
  {
    name: 'icon',
    group: 'content',
    type: types.string,
  },
  {
    name: 'iconShadow',
    group: 'content',
    type: types.enum(['none', 'default', 'light']),
  },
  {
    name: 'glyph',
    group: 'content',
    type: types.glyph,
  },

  // Gauge.
  {
    name: 'gaugeColor',
    group: 'gauge',
    type: types.color,
  },
  {
    name: 'startedCount',
    group: 'gauge',
    type: types.number,
    min: 0,
    max: 100,
  },
  {
    name: 'totalCount',
    group: 'gauge',
    type: types.number,
    min: 0,
    max: 100,
  },

  // Additional.
  {
    name: 'additionalText',
    group: 'additional',
    type: types.nabu,
  },
  {
    name: 'additionalGlyph',
    group: 'additional',
    type: types.glyph,
  },
  {
    name: 'additionalAnimation',
    group: 'additional',
    type: types.enum(['none', 'zoom', 'shift', 'dancing', 'parkinson']),
  },
  {
    name: 'onAdditional',
    group: 'additional',
    type: types.function,
  },

  // Function.
  {
    name: 'onClick',
    group: 'function',
    type: types.function,
  },
];
