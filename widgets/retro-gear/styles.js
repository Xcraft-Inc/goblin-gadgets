import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'angle',
  'color',
  'opacity',
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
    color = '#aaa',
    opacity = 1,
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

  const _gear = {
    position: 'absolute',
    top: top ? Unit.sub(top, radius) : null,
    bottom: bottom ? Unit.sub(bottom, radius) : null,
    left: left ? Unit.sub(left, radius) : null,
    right: right ? Unit.sub(right, radius) : null,
    width: size,
    height: size,
    transform: rotationDuration ? 'rotate(0deg)' : `rotate(${angle})`,

    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fillRule: 'evenodd',

    animation: rotationDuration ? `${rotationDuration} infinite linear` : null,
    animationName: rotationDuration ? keyframes : null,
  };

  const gearLight = {
    ..._gear,
    stroke: ColorManipulator.darken(color, 0.8),
    strokeWidth: '1px',
    fill: color,
    opacity: opacity,
  };

  const gearDark = {
    ..._gear,
    stroke: ColorManipulator.darken(color, 0.8),
    strokeWidth: '1px',
    fill: ColorManipulator.darken(color, 0.1),
    opacity: Math.min(opacity * 1.5, 1),
  };

  /******************************************************************************/

  return {
    gearLight,
    gearDark,
  };
}

/******************************************************************************/
