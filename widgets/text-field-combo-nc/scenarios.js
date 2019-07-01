export default [
  {
    name: 'team',
    props: {
      list: 'team',
      hintText: 'Collaborateur',
      width: '200px',
      menuType: 'wrap',
      restrictsToList: true,
    },
  },
  {
    name: 'colors',
    props: {
      list: 'colors',
      width: '100px',
      menuType: 'wrap',
    },
  },
  {
    name: 'months',
    props: {
      list: 'months',
      hintText: "Mois de l'échéance",
      width: '200px',
      menuType: 'wrap',
      restrictsToList: true,
    },
  },
  {
    name: 'transports',
    props: {
      list: 'transports',
      hintText: 'Moyen de transport',
      width: '200px',
      menuType: 'wrap',
      restrictsToList: true,
    },
  },
  {
    name: 'localities',
    props: {
      list: 'localities',
      width: '300px',
      widthItemWidth: '200px',
      hintText: 'Domicile',
      menuType: 'wrap',
    },
  },
  {
    name: 'strange',
    props: {
      list: 'strange',
      shape: 'rounded',
      restrictsToList: true,
    },
  },
  {
    name: 'multiline',
    props: {
      list: 'multiline',
      width: '300px',
      rows: '3',
      restrictsToList: true,
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
