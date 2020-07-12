import {ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

export const propNames = [
  'direction',
  'disabled',
  'grow',
  'width',
  'height',
  'colorBar',
  'gradient',
  'gradientColor1',
  'gradientColor2',
  'gliderSize',
  'cabSize',
  'cabType',
];

export default function styles(theme, props) {
  const {
    direction,
    disabled,
    grow,
    width,
    height,
    colorBar,
    gradient,
    gradientColor1,
    gradientColor2,
    gliderSize = 'default',
    cabSize = 'default',
    cabType = 'round',
  } = props;

  const isDark = theme.colors.isDarkTheme;
  const isHorizontal = direction === 'horizontal';
  const barColor = colorBar ? ColorHelpers.getMarkColor(theme, colorBar) : null;

  const sliderThickness = 24;

  const gliderThickness = {
    small: 4,
    default: 8,
    large: 14,
  }[gliderSize];

  let cabThickness = {
    small: 8,
    default: 14,
    large: 18,
  }[cabSize];

  let cabWidth = cabThickness;
  if (cabType === 'thin') {
    cabWidth = 4;
    cabThickness *= 1.5;
  }

  const slider = {
    position: 'relative',
    flexGrow: grow,
    backgroundColor: isDark ? '#000' : '#eee',
    borderRadius: px(sliderThickness / 2),
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? null : 'pointer',
  };

  const inside = {
    position: 'absolute',
    left: px(sliderThickness / 2),
    right: px(sliderThickness / 2),
    bottom: px(sliderThickness / 2),
    top: px(sliderThickness / 2),
  };

  const glider = {
    position: 'absolute',
    left: px(-gliderThickness / 2),
    right: px(-gliderThickness / 2),
    bottom: px(-gliderThickness / 2),
    top: px(-gliderThickness / 2),
    borderRadius: px(gliderThickness / 2),
    background: '#ddd',
    display: 'flex',
  };

  const bar = {
    ...glider,
    backgroundColor: barColor,
    opacity: barColor ? 1 : 0,
  };

  const cab = {
    position: 'absolute',
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
  };

  if (gradient === '1to2') {
    const a = isHorizontal ? '90deg' : '0deg';
    glider.background = `linear-gradient(${a}, ${gradientColor1}, ${gradientColor2})`;
  }

  if (isHorizontal) {
    slider.width = width;
    slider.minWidth = '50px';
    slider.minHeight = px(sliderThickness);
    slider.maxHeight = px(sliderThickness);
    slider.boxShadow = isDark
      ? '#444 0px -2px 2px inset'
      : '#bbb 0px 2px 5px inset';

    glider.boxShadow = 'rgba(0,0,0,0.5) 0px 2px 2px inset';
    glider.flexDirection = 'row';

    const r = px(gliderThickness / 2);
    bar.borderRadius = `${r} 0px 0px ${r}`;
    bar.right = null;
    bar.boxShadow = `${ColorManipulator.darken(
      colorBar,
      0.6
    )} 0px -3px 6px inset`;

    cab.width = px(cabWidth);
    cab.bottom = px(-cabThickness / 2 + 1);
    cab.boxShadow = '0px 3px 4px 0px rgba(0,0,0,0.6)';
  } else {
    slider.height = height;
    slider.minHeight = '50px';
    slider.minWidth = px(sliderThickness);
    slider.maxWidth = px(sliderThickness);
    slider.boxShadow = isDark
      ? '#444 -2px 0px 2px inset'
      : '#bbb 2px 0px 5px inset';

    glider.boxShadow = 'rgba(0,0,0,0.5) 2px 0px 2px inset';
    glider.flexDirection = 'column-reverse';

    const r = px(gliderThickness / 2);
    bar.borderRadius = `0px 0px ${r} ${r}`;
    bar.top = null;
    bar.boxShadow = `${ColorManipulator.darken(
      colorBar,
      0.6
    )} -3px 0px 6px inset`;

    cab.height = px(cabWidth);
    cab.left = px(-cabThickness / 2 - 1);
    cab.boxShadow = '3px 0px 4px 0px rgba(0,0,0,0.6)';
  }

  const rainbow = {
    ...glider,
    padding: isHorizontal
      ? `0px ${px(gliderThickness / 2)}`
      : `${px(gliderThickness / 2)} 0px`,
    background: '#f00',
    boxShadow: 'unset',
  };

  const rainbowInside = {
    flexGrow: 1,
    background: `linear-gradient(${
      isHorizontal ? '90deg' : '0deg'
    }, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
  };

  const rainbowShadow = {
    position: 'absolute',
    left: px(0),
    right: px(0),
    bottom: px(0),
    top: px(0),
    borderRadius: px(gliderThickness / 2),
    boxShadow: glider.boxShadow,
  };

  const value = {
    position: 'absolute',
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: isHorizontal ? null : 'flex-end',
  };

  const valueBackgroundColor = isDark ? '#333' : '#eee';
  const valueTextColor = isDark ? '#eee' : '#222';
  const valueShadowColor = isDark ? 'black' : 'rgba(0,0,0,0.5)';

  const valueLabel = {
    padding: '2px',
    borderRadius: '20px',
    boxShadow: `0px 5px 10px 3px ${valueShadowColor}`,
    backgroundColor: valueBackgroundColor,
    color: valueTextColor,
  };

  /******************************************************************************/

  return {
    slider,
    inside,
    glider,
    rainbow,
    rainbowInside,
    rainbowShadow,
    bar,
    cab,
    value,
    valueLabel,
  };
}

/******************************************************************************/
