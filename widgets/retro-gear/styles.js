import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'toothThickness',
  'angle',
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
    toothThickness = 60,
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

  const shadowRadius = Unit.sub(radius, toothThickness + 'px');
  const shadowSize = Unit.multiply(shadowRadius, 2);

  const shadow1 = {
    position: 'absolute',
    top: top ? Unit.sub(top, shadowRadius) : null,
    bottom: bottom ? Unit.sub(bottom, shadowRadius) : null,
    left: left ? Unit.sub(left, shadowRadius) : null,
    right: right ? Unit.sub(right, shadowRadius) : null,
    width: shadowSize,
    height: shadowSize,
    borderRadius: shadowSize,
    boxShadow: `black 0px 0px 150px ${Unit.multiply(radius, 0.08)}`,
  };

  const shadow2 = {
    ...shadow1,
    boxShadow: `inset black 0px 0px ${Unit.multiply(
      radius,
      0.4
    )} ${Unit.multiply(radius, 0.24)}`,
  };

  const shadow3 = {
    ...shadow1,
    boxShadow: `inset black ${Unit.multiply(radius, 0.01)} ${Unit.multiply(
      radius,
      0.01
    )} ${Unit.multiply(radius, 0.2)} 0px`,
  };

  /******************************************************************************/

  return {
    gear,
    shadow1,
    shadow2,
    shadow3,
  };
}

/******************************************************************************/
