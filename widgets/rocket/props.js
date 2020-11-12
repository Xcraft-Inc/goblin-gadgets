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
    name: 'look',
    group: 'aspect',
    type: types.enum(['simple', 'smooth', 'clearline', 'serious']),
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
    name: 'background',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'backgroundHover',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'title',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'subtitle',
    group: 'aspect',
    type: types.nabu,
  },
  {
    name: 'icon',
    group: 'aspect',
    type: types.string,
  },
  {
    name: 'glyph',
    group: 'aspect',
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
