export default [
  {
    name: 'date',
    props: {
      type: 'date',
      value: '2019-12-25',
      width: '120px',
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
    name: 'volume',
    props: {
      type: 'volume',
      value: '2 .3 .4',
      width: '200px',
      tooltip: 'Volume du colis',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
