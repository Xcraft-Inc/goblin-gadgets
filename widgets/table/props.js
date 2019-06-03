import Types from 'goblin-gadgets/types/types.js';

export default [
  {
    name: 'data',
    group: 'main',
    type: Types.types.dataTable,
    description: 'The data of table',
    required: true,
  },
  {
    name: 'grow',
    group: 'main',
    type: Types.types.grow,
  },
  {
    name: 'frame',
    group: 'main',
    type: Types.types.bool,
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: Types.types.string,
    defaultValue: 'single',
  },
  {
    name: 'hasButtons',
    group: 'main',
    type: Types.types.bool,
    defaultValue: 'single',
  },
  {
    name: 'height',
    group: 'main',
    type: Types.types.size,
  },
  {
    name: 'headerWithoutHorizontalSeparator',
    group: 'main',
    type: Types.types.bool,
  },
];