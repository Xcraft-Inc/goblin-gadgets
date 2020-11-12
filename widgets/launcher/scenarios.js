export default [
  {
    name: 'default',
    props: {
      look: 'smooth',
      blobKind: 'wave',
      blobColor: 'rgba(255,255,255,0.1)',
      background: '#082e4d',
      rocketSize: '150px',
      rockets: 'R1',
    },
  },
  {
    name: 'comics',
    props: {
      look: 'simple',
      blobKind: 'blob',
      blobColor: 'orange',
      background: 'purple',
      rocketSize: '200px',
      rockets: 'R2',
    },
  },
  {
    name: 'single',
    props: {
      look: 'smooth',
      blobKind: 'blob',
      blobColor: 'red',
      background: '#aaa',
      rocketSize: '250px',
      rockets: 'R3',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
