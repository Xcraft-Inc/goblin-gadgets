import React from 'react';
import CarouselItem from '../carousel-item/widget';

/******************************************************************************/

const children = (
  <React.Fragment>
    <CarouselItem
      width="200px"
      height="300px"
      itemMargin="10px"
      backgroundColor="yellow"
    />
    <CarouselItem
      width="200px"
      height="300px"
      itemMargin="10px"
      backgroundColor="orange"
    />
    <CarouselItem
      width="200px"
      height="300px"
      itemMargin="10px"
      backgroundColor="red"
    />
    <CarouselItem
      width="200px"
      height="300px"
      itemMargin="10px"
      backgroundColor="purple"
    />
    <CarouselItem
      width="200px"
      height="300px"
      itemMargin="10px"
      backgroundColor="blue"
    />
  </React.Fragment>
);

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
      children: children,
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
      children: children,
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
      children: children,
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
      children: children,
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
