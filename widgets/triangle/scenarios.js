export default [
  {
    name: 'default',
    props: {
      parentSimulatorWidth: '300px',
      parentSimulatorHeight: '32px',
    },
  },
  {
    name: 'big-bottom',
    props: {
      parentSimulatorWidth: '300px',
      parentSimulatorHeight: '32px',
      position: 'bottom',
      size: '50px',
      color: 'red',
    },
  },
  {
    name: 'big-top',
    props: {
      parentSimulatorWidth: '300px',
      parentSimulatorHeight: '32px',
      position: 'top',
      size: '50px',
      color: 'red',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
