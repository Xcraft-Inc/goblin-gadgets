export default [
  {
    name: 'default',
    props: {
      title: 'Crésus',
      blobKind: 'wave',
      blobColor: 'rgba(255,255,255,0.08)',
      background: 'linear-gradient(180deg, #052036, #082e4d 20%)',
      rocketSize: '150px',
      rocketIconShadow: 'default',
      rocketTextColor: '#eee',
      rocketShadow: 'strong',
      rockets: 'R1',
    },
  },
  {
    name: 'westeros',
    props: {
      title: 'Epsitec',
      blobKind: 'wave',
      blobColor: 'rgba(0,0,0,0.1)',
      background: 'linear-gradient(150deg, #011526 30%, #c853ff)',
      rocketSize: '200px',
      rocketTextColor: '#eee',
      rocketShadow: 'deep',
      rocketIconShadow: 'none',
      rockets: 'R2',
    },
  },
  {
    name: 'comics',
    props: {
      blobKind: 'blob',
      blobColor: 'orange',
      background: 'purple',
      rocketSize: '200px',
      rocketTextColor: '#fff',
      rockets: 'R3',
    },
  },
  {
    name: 'single',
    props: {
      blobKind: 'blob',
      blobColor: 'red',
      background: '#aaa',
      rocketSize: '250px',
      rockets: 'R4',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
