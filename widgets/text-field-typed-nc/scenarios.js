export default [
  {
    name: 'date',
    props: {
      type: 'date',
      value: '2019-12-25',
      width: '140px',
      tooltip: 'Date de facturation',
    },
  },
  {
    name: 'time',
    props: {
      type: 'time',
      value: '09:30:00',
      width: '100px',
      tooltip: 'Heure limite',
    },
  },
  {
    name: 'date-time',
    props: {
      type: 'datetime',
      value: '2019-12-25T12:00:00.000Z',
      width: '200px',
      tooltip: 'Date et heure du rendez-vous',
    },
  },
  {
    name: 'number',
    props: {
      type: 'number',
      min: 0,
      max: 10,
      step: 0.5,
      value: 5,
      tooltip: 'Quantité',
    },
  },
  {
    name: 'integer',
    props: {
      type: 'integer',
      min: 1,
      max: 10,
      step: 1,
      value: 1,
      tooltip: 'Nombre de copies',
    },
  },
  {
    name: 'percent',
    props: {
      type: 'percent',
      min: 0,
      max: 1,
      step: '0.05',
      value: '0.1',
      tooltip: 'Quantité',
    },
  },
  {
    name: 'price',
    props: {
      type: 'price',
      min: 0,
      max: 100,
      step: '5',
      value: '75',
      tooltip: 'Prix HT',
    },
  },
  {
    name: 'pixel',
    props: {
      type: 'pixel',
      min: 0,
      max: 500,
      step: '10',
      value: '120px',
      tooltip: 'Largeur en pixels',
    },
  },
  {
    name: 'volume',
    props: {
      type: 'volume',
      value: '2 .3 .4',
      width: '200px',
      tooltip: 'Volume du colis',
    },
  },
  {
    name: 'color',
    props: {
      type: 'color',
      value: 'HSL(50,100,100)',
      tooltip: 'Couleur de Blupi',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
