export default [
  {
    name: 'default',
    props: {
      kind: 'ticket',
      shape: 'middle',
      color: '#eee',
      backgroundText: '1',
      flash: true,
      width: '250px',
      height: '100px',
    },
  },
  {
    name: 'last',
    props: {
      kind: 'ticket',
      shape: 'last',
      hoverShape: 'continued',
      color: '#eec',
      backgroundText: '2',
      hatch: true,
      width: '250px',
      height: '100px',
    },
  },
  {
    name: 'expanded',
    props: {
      kind: 'rect',
      shape: 'middle',
      color: '#cee',
      hudGlyph: 'solid/check',
      hatch: true,
      width: '250px',
      height: '200px',
    },
  },
];
