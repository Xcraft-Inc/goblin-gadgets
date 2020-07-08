export default [
  {
    name: 'horizontal',
    props: {
      direction: 'horizontal',
      colorBar: '#f00',
      width: '150px',
      value: 25,
      displayTooltipWhileDragging: true,
    },
  },
  {
    name: 'vertical',
    props: {
      direction: 'vertical',
      colorBar: '#f00',
      height: '150px',
      value: 25,
      displayTooltipWhileDragging: true,
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
    name: 'empty',
    props: {},
  },
];
