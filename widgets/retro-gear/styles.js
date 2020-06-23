import {Unit} from 'goblin-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'toothThickness',
  'toothCount',
  'angle',
  'rotationDuration',
  'rotationDirection',
  'rotationMovement',
];

/******************************************************************************/

function getStepsKeyFrames(toothCount, rotationDirection) {
  const keyFrames = {};
  const cw = rotationDirection === 'cw';

  for (let i = 0; i < toothCount; i++) {
    const progress = (i * 100) / toothCount;
    const angle = (360 / toothCount) * i;
    keyFrames[progress + '%'] = {
      transform: `rotate(${cw ? angle : -angle}deg)`,
    };
  }

  const last = cw ? 'rotate(359.999deg)' : 'rotate(-359.999deg)';
  keyFrames['100%'] = {transform: last};

  return keyFrames;
}

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top,
    bottom,
    left,
    right,
    radius = '100px',
    toothThickness = 60,
    toothCount,
    angle = '0deg',
    rotationDuration,
    rotationDirection = 'cw',
    rotationMovement = 'continuous',
  } = props;

  const size = Unit.multiply(radius, 2);
  const steps = rotationMovement === 'steps';

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
    animationName: rotationDuration
      ? steps
        ? getStepsKeyFrames(toothCount, rotationDirection)
        : keyframes
      : null,
    animationTimingFunction: steps ? 'cubic-bezier(0.5, 0.5, 0, 1)' : null,
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
