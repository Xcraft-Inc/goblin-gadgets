import React from 'react';
import CarouselItem from '../carousel-item/widget';
import Button from '../button/widget';

/******************************************************************************/

function getChildren(width, height, itemMargin) {
  return (
    <React.Fragment>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="yellow"
      >
        <Button text="1/5" />
      </CarouselItem>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="orange"
      >
        <Button text="2/5" />
      </CarouselItem>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="red"
      >
        <Button text="3/5" />
      </CarouselItem>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="purple"
      >
        <Button text="4/5" />
      </CarouselItem>
      <CarouselItem
        width={width}
        height={height}
        itemMargin={itemMargin}
        backgroundColor="blue"
      >
        <Button text="5/5" />
      </CarouselItem>
    </React.Fragment>
  );
}

/******************************************************************************/

export default [
  {
    name: 'Spaced',
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
    name: 'Near',
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
    name: 'Compact',
    props: {
      maxWidth: '600px',
      itemWidth: '200px',
      itemMargin: '0px',
      buttonsCenter: '0px',
      buttonsShape: 'circle',
      buttonsSize: '40px',
      buttonsShift: '5px',
      cycling: 'blocked',
      navigator: 'bullets',
      responsive: true,
      touch: true,
      children: getChildren('200px', '300px', '0px'),
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
