export default [
  {
    name: 'default',
    props: {
      kind: 'ticket',
      shape: 'middle',
      color: '#eee',
      backgroundText: {value: '1', type: 'string'},
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
      backgroundText: {value: '2', type: 'string'},
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
