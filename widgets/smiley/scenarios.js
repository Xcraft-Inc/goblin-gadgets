export default [
  {
    name: 'default',
    props: {
      size: '200px',
    },
  },
  {
    name: 'tiny',
    props: {
      size: '50px',
    },
  },
  {
    name: 'big',
    props: {
      size: '500px',
    },
  },
  {
    name: 'orange',
    props: {
      size: '200px',
      mainColor: '#fe0',
      topColor: '#f00',
      satisfaction: 0,
    },
  },
  {
    name: 'green',
    props: {
      size: '200px',
      mainColor: 'HSL(95,100,100)',
      satisfaction: 75,
    },
  },
  {
    name: 'blue',
    props: {
      size: '200px',
      mainColor: '#08f',
      topColor: 'HSL(180,29,99)',
      satisfaction: 50,
    },
  },
  {
    name: 'strange',
    props: {
      size: '200px',
      mainColor: '#f0f',
      topColor: 'HSL(180,50,100)',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
