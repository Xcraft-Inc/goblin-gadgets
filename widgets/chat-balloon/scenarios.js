export default [
  {
    name: 'sended',
    props: {
      type: 'sended',
      dateTime: '31.03.2019 - 11:03',
      message: 'Salut, comment vas-tu ?',
    },
  },
  {
    name: 'received',
    props: {
      type: 'received',
      dateTime: '31.03.2019 - 11:12',
      message: 'Merci, bien',
    },
  },
  {
    name: 'huge',
    props: {
      type: 'sended',
      dateTime: '25.12.2019 - 23:00',
      message:
        "Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.",
      hasMagnifyingGlass: true,
    },
  },
  {
    name: 'fun',
    props: {
      type: 'received',
      look: 'whatsapp',
      dateTimeColor: '#5c29a2',
      backgroundColor: '#b684b1',
      textColor: 'black',
      dateTime: '25.12.2019 - 23:00',
      message:
        "Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte.",
      hasMagnifyingGlass: true,
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
