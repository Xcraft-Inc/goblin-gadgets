export default [
  {
    name: 'little',
    props: {
      widgetId: 'table@test',
      data: 'T1',
      sortedRows: 'R1',
    },
  },
  {
    name: 'medium',
    props: {
      widgetId: 'table@test',
      data: 'T2',
      sortedRows: 'R2',
    },
  },
  {
    name: 'big',
    props: {
      widgetId: 'table@test',
      data: 'T3',
      sortedRows: 'R3',
      frame: true,
    },
  },
  {
    name: 'filter',
    props: {
      widgetId: 'table@test',
      data: 'T4',
      sortedRows: 'R4',
      sortingColumns: 'S1',
      frame: true,
      hasButtons: true,
    },
  },
  {
    name: 'levels',
    props: {
      widgetId: 'table@test',
      data: 'T5',
      sortedRows: 'R5',
      frame: true,
      headerWithoutHorizontalSeparator: true,
      fontSizeStrategy: 'decrease',
    },
  },
  {
    name: 'scroll',
    props: {
      widgetId: 'table@test',
      data: 'T5',
      sortedRows: 'R5',
      frame: true,
      hasButtons: true,
      headerWithoutHorizontalSeparator: true,
      height: '200px',
    },
  },
  {
    name: 'empty',
    props: {widgetId: 'table@test'},
  },
];
