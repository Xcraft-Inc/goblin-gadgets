import getAnimation from './animations';

/******************************************************************************/

export const propNames = ['animation'];

export default function styles(theme, props) {
  const {animation} = props;

  const a = getAnimation(animation);

  const stackNavigationContainer = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    animationName: a.name,
    animationDuration: a.duration,
    animationTimingFunction: a.timingFunction,
    animationIterationCount: 1,
    animationFillMode: 'forwards',
  };

  return {
    stackNavigationContainer,
  };
}

/******************************************************************************/
