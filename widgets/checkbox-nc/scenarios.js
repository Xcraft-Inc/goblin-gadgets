export default [
  {
    name: 'default',
    props: {
      checked: true,
      text: 'Compatbilise les recettes',
      width: '300px',
    },
  },
  {
    name: 'switch',
    props: {
      kind: 'switch',
      checked: true,
      text: 'Sauvegardes automatiques',
      width: '300px',
    },
  },
  {
    name: 'radio',
    props: {
      kind: 'radio',
      checked: true,
      text: 'Rose',
      width: '200px',
    },
  },
  {
    name: 'active',
    props: {
      kind: 'active',
      checked: true,
      text: 'Standard',
      width: '200px',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
