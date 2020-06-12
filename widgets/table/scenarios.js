export default [
  {
    name: 'little',
    props: {
      data: 'T1',
    },
  },
  {
    name: 'medium',
    props: {
      data: 'T2',
      frame: true,
    },
  },
  {
    name: 'big',
    props: {
      data: 'T3',
      frame: true,
    },
  },
  {
    name: 'filter',
    props: {
      data: 'T4',
      sortingColumns: 'S1',
      frame: true,
      hasButtons: true,
    },
  },
  {
    name: 'levels',
    props: {
      data: 'T5',
      frame: true,
      headerWithoutHorizontalSeparator: true,
      fontSizeStrategy: 'decrease',
    },
  },
  {
    name: 'scroll',
    props: {
      data: 'T5',
      frame: true,
      hasButtons: true,
      headerWithoutHorizontalSeparator: true,
      height: '200px',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
