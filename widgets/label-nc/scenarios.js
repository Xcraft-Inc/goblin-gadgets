export default [
  {
    name: 'default',
    props: {
      text: 'Adresse du client',
      width: '200px',
    },
  },
  {
    name: 'markdown',
    props: {
      kind: 'markdown',
      text: '```# Bonjour\n\n- Madame\n- Monsieur\n```',
      width: '300px',
    },
  },
  {
    name: 'big',
    props: {
      kind: 'big-center',
      text: 'Grand titre',
      width: '200px',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
