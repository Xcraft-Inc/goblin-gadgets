export default [
  {
    name: 'team',
    props: {
      list: 'team',
      hintText: 'Collaborateur',
      width: '200px',
      menuType: 'wrap',
      readonly: true,
    },
  },
  {
    name: 'colors',
    props: {
      list: 'colors',
      width: '100px',
      menuType: 'wrap',
      readonly: true,
    },
  },
  {
    name: 'months',
    props: {
      list: 'months',
      hintText: "Mois de l'échéance",
      width: '200px',
      menuType: 'wrap',
      readonly: true,
    },
  },
  {
    name: 'transports',
    props: {
      list: 'transports',
      hintText: 'Moyen de transport',
      width: '200px',
      menuType: 'wrap',
      readonly: true,
    },
  },
  {
    name: 'localities',
    props: {
      list: 'localities',
      hintText: 'Domicile',
      readonly: true,
    },
  },
  {
    name: 'strange',
    props: {
      list: 'strange',
      shape: 'rounded',
      readonly: true,
    },
  },
  {
    name: 'multiline',
    props: {
      list: 'multiline',
      width: '300px',
      rows: '3',
      readonly: true,
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
