import {Unit, ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import px from '../helpers/px-helpers';

/******************************************************************************/

export const propNames = [
  'disabled',
  'grow',
  'width',
  'height',
  'cabSize',
  'marginSize',
  'marginStyle',
  'draggingScale',
];

export default function styles(theme, props) {
  const {
    disabled,
    grow,
    width,
    height,
    cabSize = 'default',
    marginSize = 'default',
    marginStyle = 'shadow',
    draggingScale = 1,
  } = props;

  const isDark = theme.colors.isDarkTheme;

  const cabThickness = {
    default: 14,
    large: 18,
  }[cabSize];

  const insideMargin = {
    zero: 0,
    small: 8,
    default: 12,
    large: 20,
  }[marginSize];

  const sliderXY = {
    position: 'relative',
    flexGrow: grow,
    width: width,
    height: height,
    opacity: disabled ? 0.4 : 1,
    transform: 'scale(1)',
    transition: '0.3s ease-out',
    cursor: disabled ? null : 'pointer',
  };

  const sliderXYdragging = {
    ...sliderXY,
    transform: `scale(${draggingScale})`,
  };

  if (marginSize !== 'zero' && marginStyle === 'shadow') {
    sliderXY.borderRadius = px.toPx(insideMargin);
    sliderXY.boxShadow = isDark
      ? '#444 0px -2px 2px inset'
      : '#bbb 0px 2px 5px inset';
  }

  const inside = {
    position: 'absolute',
    left: px.toPx(insideMargin),
    right: px.toPx(insideMargin),
    bottom: px.toPx(insideMargin),
    top: px.toPx(insideMargin),
    display: 'flex',
    flexDirection: 'row',
  };

  const cab = {
    position: 'absolute',
    width: px.toPx(cabThickness),
    height: px.toPx(cabThickness),
    borderRadius: px.toPx(cabThickness / 2),
    background: 'white',
    boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.6)',
  };

  const cabDragging = {
    ...cab,
    width: px.toPx(cabThickness / 2),
    height: px.toPx(cabThickness / 2),
  };

  const fullscreen = {
    zIndex: 999,
    position: 'fixed',
    display: 'flex',
    visibility: 'visible',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(255,0,0,0.5)',
  };

  /******************************************************************************/

  return {
    sliderXY,
    sliderXYdragging,
    inside,
    cab,
    cabDragging,
    fullscreen,
  };
}

/******************************************************************************/
