export default [
  {
    name: 'hint',
    props: {
      hintText: 'Client',
      tooltip: 'Client pour la livraison',
    },
  },
  {
    name: 'readonly',
    props: {
      readonly: true,
      value: 'Colis AT-25 (25x25x65cm)',
      tooltip: 'Colis',
    },
  },
  {
    name: 'required',
    props: {
      required: true,
      tooltip: 'Adresse de facturation',
    },
  },
  {
    name: 'rounded',
    props: {
      shape: 'rounded',
      hintText: 'Recherche',
    },
  },
  {
    name: 'quantity',
    props: {
      width: '100px',
      justify: 'end',
      value: '5.2',
      tooltip: 'Quantité',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
