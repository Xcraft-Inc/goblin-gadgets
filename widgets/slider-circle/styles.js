import {Unit} from 'goblin-theme';
const px = Unit.toPx;

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

  /******************************************************************************/

  return {
    sliderCircle,
    inside,
    cab,
  };
}

/******************************************************************************/
