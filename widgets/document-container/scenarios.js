export default [
  {
    name: 'A4',
    props: {
      width: '100px',
      height: '140px',
      cornerSize: '20px',
      color: '#ddd',
      hoverColor: 'orange',
    },
  },
  {
    name: 'A3',
    props: {
      width: '200px',
      height: '280px',
      cornerSize: '20px',
      color: '#ddd',
      hoverColor: 'orange',
    },
  },
  {
    name: 'special',
    props: {
      width: '200px',
      height: '150px',
      cornerSize: '50px',
      color: 'pink',
      hoverColor: 'cyan',
      borderSize: '10px',
      borderColor: 'blue',
      transition: '1.0s ease-out',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
