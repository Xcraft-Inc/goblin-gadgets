import {Unit, ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

function px(n) {
  return n + 'px';
}

function pc(n) {
  return n + '%';
}

function n(n) {
  if (typeof n === 'string' && n.endsWith('px')) {
    return parseInt(n.substring(0, n.length - 2));
  }
  return n;
}

/******************************************************************************/

export const propNames = [
  'disabled',
  'grow',
  'width',
  'height',
  'gliderSize',
  'cabSize',
];

export default function styles(theme, props) {
  const {
    disabled,
    grow,
    width,
    height,
    gliderSize = 'default',
    cabSize = 'default',
  } = props;

  const gliderThickness = {
    small: 10,
    default: 20,
    large: 30,
  }[gliderSize];

  const cabThickness = {
    small: 8,
    default: 14,
    large: 18,
  }[cabSize];

  const sliderCircle = {
    position: 'relative',
    flexGrow: grow,
    width: width,
    height: height,
    opacity: disabled ? 0.4 : 1,
    borderRadius: '100%',
    background: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
    cursor: disabled ? null : 'pointer',
  };

  const inside = {
    position: 'absolute',
    left: px(gliderThickness),
    right: px(gliderThickness),
    bottom: px(gliderThickness),
    top: px(gliderThickness),
    borderRadius: '100%',
    backgroundColor: theme.palette.calendarBackground,
    display: 'flex',
    flexDirection: 'row',
  };

  const cab = {
    position: 'absolute',
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.6)',
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
    sliderCircle,
    inside,
    cab,
    fullscreen,
  };
}

/******************************************************************************/
