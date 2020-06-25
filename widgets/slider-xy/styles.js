import {Unit, ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

function px(n) {
  return n + 'px';
}

function pc(n) {
  return n + '%';
}

/******************************************************************************/

export const propNames = [
  'valueX',
  'valueY',
  'disabled',
  'grow',
  'width',
  'height',
  'cabSize',
  'marginSize',
  'marginStyle',
  'hue',
  'draggingScale',
];

export default function styles(theme, props) {
  const {
    valueX,
    valueY,
    disabled,
    grow,
    width,
    height,
    cabSize = 'default',
    marginSize = 'default',
    marginStyle = 'shadow',
    hue,
    draggingScale = 1,
  } = props;

  const isDark = theme.colors.isDarkTheme;
  const hasCab =
    valueX !== null &&
    valueX !== undefined &&
    valueY !== null &&
    valueY !== undefined;
  const cabValueX = Math.max(Math.min(valueX, 100), 0); // 0..100
  const cabValueY = Math.max(Math.min(valueY, 100), 0); // 0..100

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
    sliderXY.borderRadius = px(insideMargin);
    sliderXY.boxShadow = isDark
      ? '#444 0px -2px 2px inset'
      : '#bbb 0px 2px 5px inset';
  }

  const inside = {
    position: 'absolute',
    left: px(insideMargin),
    right: px(insideMargin),
    bottom: px(insideMargin),
    top: px(insideMargin),
    display: 'flex',
    flexDirection: 'row',
  };

  const hslFragment = {
    flexGrow: 1,
    height: '100%',
  };

  const _hsl = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
  };

  const hslUL = {
    ..._hsl,
    // background: `radial-gradient(farthest-corner at 0% 0%, white, transparent 71%)`,
    background: 'white',
  };

  const hslUR = {
    ..._hsl,
    background: `radial-gradient(farthest-corner at 100% 0%, ${hue}, transparent 71%)`,
  };

  const hslD = {
    ..._hsl,
    background: `linear-gradient(0deg, black, transparent)`,
  };

  const cab = {
    position: 'absolute',
    left: `calc(${pc(cabValueX)} - ${px(cabThickness / 2)})`,
    bottom: `calc(${pc(cabValueY)} - ${px(cabThickness / 2)})`,
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.6)',
    display: hasCab ? null : 'none',
  };

  const cabDragging = {
    ...cab,
    left: `calc(${pc(cabValueX)} - ${px(cabThickness / 4)})`,
    bottom: `calc(${pc(cabValueY)} - ${px(cabThickness / 4)})`,
    width: px(cabThickness / 2),
    height: px(cabThickness / 2),
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
    hslFragment,
    hslUL,
    hslUR,
    hslD,
    cab,
    cabDragging,
    fullscreen,
  };
}

/******************************************************************************/
