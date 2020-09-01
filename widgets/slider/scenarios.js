export default [
  {
    name: 'horizontal',
    props: {
      direction: 'horizontal',
      barColor: '#f00',
      width: '150px',
      value: {type: 'number', value: 25},
      displayValue: 'dragging',
    },
  },
  {
    name: 'vertical',
    props: {
      direction: 'vertical',
      barColor: '#f00',
      height: '150px',
      value: {type: 'number', value: 25},
      displayValue: 'dragging',
    },
  },
  {
    name: 'gradient',
    props: {
      direction: 'horizontal',
      width: '150px',
      value: {type: 'number', value: 25},
      gradient: '1to2',
      gradientColor1: '#ff0',
      gradientColor2: '#f00',
      gliderSize: 'large',
    },
  },
  {
    name: 'rainbow',
    props: {
      direction: 'horizontal',
      width: '150px',
      value: {type: 'number', value: 25},
      gradient: 'rainbow',
      gliderSize: 'large',
      cabSize: 'large',
      cabType: 'thin',
    },
  },
  {
    name: 'step',
    props: {
      direction: 'horizontal',
      width: '300px',
      min: -1,
      max: 1,
      step: 0.1,
      value: {type: 'number', value: 0},
      displayValue: 'always',
    },
  },
  {
    name: 'double',
    props: {
      direction: 'horizontal',
      barColor: '#0f0',
      barPosition: 'middle',
      width: '500px',
      min: 0,
      max: 100,
      value: {type: 'string', value: '20;80'},
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
