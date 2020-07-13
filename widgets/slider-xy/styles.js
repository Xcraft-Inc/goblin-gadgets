import {Unit} from 'goblin-theme';
const px = Unit.toPx;

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

  const cab = {
    position: 'absolute',
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.6)',
  };

  const cabDragging = {
    ...cab,
    width: px(cabThickness / 2),
    height: px(cabThickness / 2),
  };

  /******************************************************************************/

  return {
    sliderXY,
    sliderXYdragging,
    inside,
    cab,
    cabDragging,
  };
}

/******************************************************************************/
