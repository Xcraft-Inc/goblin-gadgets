import Type from 'goblin-gadgets/types/index.js';

export default [
  {
    name: 'data',
    group: 'main',
    type: Type.dataTable,
    description: 'The data of table',
    required: true,
  },
  {
    name: 'grow',
    group: 'main',
    type: Type.grow,
  },
  {
    name: 'frame',
    group: 'main',
    type: Type.bool,
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: Type.string,
    defaultValue: 'single',
  },
];
