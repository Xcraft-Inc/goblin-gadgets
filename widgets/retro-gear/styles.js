import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'angle',
  'color',
  'rotationDuration',
  'rotationDirection',
];

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top,
    bottom,
    left,
    right,
    radius = '100px',
    angle = '0deg',
    rotationDuration,
    rotationDirection,
  } = props;

  const size = Unit.multiply(radius, 2);

  const keyframes = {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform:
        rotationDirection === 'cw'
          ? 'rotate(359.999deg)'
          : 'rotate(-359.999deg)',
    },
  };

  const gear = {
    position: 'absolute',
    top: top ? Unit.sub(top, radius) : null,
    bottom: bottom ? Unit.sub(bottom, radius) : null,
    left: left ? Unit.sub(left, radius) : null,
    right: right ? Unit.sub(right, radius) : null,
    width: size,
    height: size,
    transform: rotationDuration ? 'rotate(0deg)' : `rotate(${angle})`,

    animation: rotationDuration ? `${rotationDuration} infinite linear` : null,
    animationName: rotationDuration ? keyframes : null,
  };

  /******************************************************************************/

  return {
    gear,
  };
}

/******************************************************************************/
