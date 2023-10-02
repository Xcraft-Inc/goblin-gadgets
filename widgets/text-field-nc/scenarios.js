export default [
  {
    name: 'default',
    props: {
      value: 'Jean Dupond',
    },
  },
  {
    name: 'disabled',
    props: {
      value: 'Jean Dupond',
      disabled: true,
    },
  },
  {
    name: 'readonly',
    props: {
      value: 'Jean Dupond',
      readonly: true,
    },
  },
  {
    name: 'multiline',
    props: {
      value:
        "Histoire absurde\nUn matin, au coucher du soleil, un jeune vieillard assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte. Soudain, il entendit un bruit silencieux. Il monta les escaliers de la cave pour descendre au grenier et vit, par le trou de la serrure bouché, un nègre blanc qui déterrait les morts pour les manger vivants, et sa femme qui pleurait en riant la mort de ses quatre fils, morts noyés dans une piscine vide, le premier Jean, le deuxième Paul, le troisième Pierre et le quatrième André qui n'était pas encore né.",
      rows: 10,
    },
  },
  {
    name: 'rounded-required',
    props: {
      value: 'Chaise à bascule Batavia-520',
      required: true,
      shape: 'rounded',
    },
  },
  {
    name: 'price',
    props: {
      value: '125.30',
      width: '120px',
      justify: 'end',
    },
  },
  {
    name: 'balloon-info',
    props: {
      value: '5',
      width: '120px',
      info: '05.11.2019',
    },
  },
  {
    name: 'balloon-warning',
    props: {
      value: '32.01.2019',
      width: '120px',
      warning: 'Date incorrecte',
      info: '31.01.2019',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
