export default [
  {
    name: 'horizontal',
    props: {
      direction: 'horizontal',
      colorBar: '#f00',
      width: '150px',
      value: 25,
      displayValue: 'dragging',
    },
  },
  {
    name: 'vertical',
    props: {
      direction: 'vertical',
      colorBar: '#f00',
      height: '150px',
      value: 25,
      displayValue: 'dragging',
    },
  },
  {
    name: 'gradient',
    props: {
      direction: 'horizontal',
      width: '150px',
      value: 25,
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
      value: 25,
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
      value: 0,
      displayValue: 'always',
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
