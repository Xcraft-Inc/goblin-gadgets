import React from 'react';
import CarouselItem from '../carousel-item/widget';

/******************************************************************************/

function getChildren(width, height, itemMargin) {
  return (
    <React.Fragment>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="yellow"
      />
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="orange"
      />
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="red"
      />
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="purple"
      />
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="blue"
      />
    </React.Fragment>
  );
}

/******************************************************************************/

export default [
  {
    name: 'Default',
    props: {
      maxWidth: '660px',
      itemWidth: '220px',
      itemMargin: '10px',
      buttonsCenter: '0px',
      buttonsShape: 'circle',
      buttonsSize: '40px',
      buttonsShift: '5px',
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '10px'),
    },
  },
  {
    name: 'Compact',
    props: {
      maxWidth: '606px',
      itemWidth: '202px',
      itemMargin: '1px',
      buttonsCenter: '0px',
      buttonsShape: 'circle',
      buttonsSize: '40px',
      buttonsShift: '5px',
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '1px'),
    },
  },
  {
    name: '1/5',
    props: {
      maxWidth: '220px',
      itemWidth: '220px',
      itemMargin: '10px',
      buttonsCenter: '0px',
      buttonsShape: 'semiCircle',
      buttonsSize: '80px',
      forceRequiredToOverflow: 10,
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '10px'),
    },
  },
  {
    name: '3/5',
    props: {
      maxWidth: '660px',
      itemWidth: '220px',
      itemMargin: '10px',
      buttonsCenter: '0px',
      buttonsShape: 'semiCircle',
      buttonsSize: '80px',
      forceRequiredToOverflow: 10,
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '10px'),
    },
  },
  {
    name: '5/5',
    props: {
      maxWidth: '1100px',
      itemWidth: '220px',
      itemMargin: '10px',
      buttonsCenter: '0px',
      buttonsShape: 'semiCircle',
      buttonsSize: '80px',
      forceRequiredToOverflow: 10,
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '10px'),
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
