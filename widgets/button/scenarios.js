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
    name: 'calendar',
    props: {
      kind: 'calendar',
      subkind: 'add',
      active: true,
      text: '31',
    },
  },
  {
    name: 'badge',
    props: {
      text: 'Notifications',
      glyph: 'solid/rocket',
      glyphPosition: 'right',
      badgeValue: '3',
      badgeShape: 'circle',
      badgeSize: 1.5,
      badgePush: true,
      width: '160px',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
