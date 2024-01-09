import {ColorHelpers} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = ['size', 'rimColor', 'segmentColor', 'thickness'];

export default function styles(theme, props) {
  let {
    size = null,
    rimColor = 'rgba(0, 0, 0, 0.2)',
    segmentColor = '#000',
    thickness = '20%',
  } = props;

  if (!thickness && size) {
    const t = n(size) / 10;
    thickness = px(Math.trunc(t) + 1);
  }

  rimColor = ColorHelpers.getMarkColor(theme, rimColor);
  segmentColor = ColorHelpers.getMarkColor(theme, segmentColor);

  const keyframes = {
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
  };

  const spinner = {
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: '1.1s infinite linear',
    animationName: keyframes,

    aspectRatio: '1/1',
    margin: '10%',
    backgroundImage: `conic-gradient(${rimColor} 80%, ${segmentColor} 20%)`,

    width: size || '100%',
    height: size || '100%',
    maxWidth: size ? null : '160px',
    maxHeight: size ? null : '160px',

    /* 0.5px's are needed to avoid hard-stopping */
    mask: `radial-gradient(
      farthest-side,
      transparent calc(100% - ${thickness} - 0.5px),
      #000 calc(100% - ${thickness} + 0.5px)
    )`,
  };

  /******************************************************************************/

  return {
    spinner,
  };
}

/******************************************************************************/
