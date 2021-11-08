import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = ['size', 'rimColor', 'segmentColor', 'thickness'];

export default function styles(theme, props) {
  let {
    size = '160px',
    rimColor = 'rgba(0, 0, 0, 0.2)',
    segmentColor = '#000',
    thickness,
  } = props;

  if (!thickness) {
    thickness = px(n(size) / 10);
  }

  const keyframes = {
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
  };

  const spinner = {
    width: size,
    height: size,
    border: `${thickness} solid ${rimColor}`,
    borderLeft: `${thickness} solid ${segmentColor}`,
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: '1.1s infinite linear',
    animationName: keyframes,
  };

  /******************************************************************************/

  return {
    spinner,
  };
}

/******************************************************************************/
