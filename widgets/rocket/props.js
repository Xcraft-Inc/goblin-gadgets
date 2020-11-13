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
    type: types.bool,
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
    type: types.string,
  },
  {
    name: 'backgroundHover',
    group: 'aspect',
    type: types.string,
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
    type: types.bool,
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

  // Function.
  {
    name: 'onClick',
    group: 'function',
    type: types.function,
  },
];
