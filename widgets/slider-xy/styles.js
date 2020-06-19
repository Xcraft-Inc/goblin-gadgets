import {Unit, ColorManipulator} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

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
  } = props;

  const hasCab =
    valueX !== null &&
    valueX !== undefined &&
    valueY !== null &&
    valueY !== undefined;
  const cabValueX = Math.max(Math.min(valueX, 100), 0); // 0..100
  const cabValueY = Math.max(Math.min(valueY, 100), 0); // 0..100

  let cabThickness = {
    small: 8,
    default: 14,
    large: 18,
  }[cabSize];

  const sliderXY = {
    position: 'relative',
    flexGrow: grow,
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? null : 'pointer',
  };

  const areaFragment = {
    flexGrow: 1,
    height: '100%',
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
    areaFragment,
    cab,
    fullscreen,
  };
}

/******************************************************************************/
