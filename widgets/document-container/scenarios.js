export default [
  {
    name: 'A4',
    props: {
      width: '100px',
      height: '140px',
      cornerSize: '20px',
      hoverCornerSize: '40px',
      color: '#ddd',
      hoverColor: '#aaa',
    },
  },
  {
    name: 'A3',
    props: {
      width: '200px',
      height: '280px',
      cornerSize: '20px',
      hoverCornerSize: '40px',
      color: '#ddd',
      hoverColor: '#aaa',
    },
  },
  {
    name: 'special',
    props: {
      width: '200px',
      height: '150px',
      cornerSize: '50px',
      hoverCornerSize: '80px',
      color: 'pink',
      hoverColor: 'orange',
      transition: '1.0s ease-out',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
