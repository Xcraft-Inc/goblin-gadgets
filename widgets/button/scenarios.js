export default [
  {
    name: 'default',
    props: {
      text: "D'accord",
      width: '200px',
    },
  },
  {
    name: 'action',
    props: {
      kind: 'action',
      glyph: 'solid/rocket',
      text: 'Démarrer',
      place: '1/1',
      width: '200px',
    },
  },
  {
    name: 'task-bar',
    props: {
      kind: 'task-bar',
      glyph: 'solid/bicycle',
      text: 'Bike',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
