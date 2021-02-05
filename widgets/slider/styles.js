import {ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const to = Unit.to;

/******************************************************************************/

export const propNames = [
  'direction',
  'disabled',
  'grow',
  'width',
  'height',
  'barColor',
  'gradient',
  'gradientColor1',
  'gradientColor2',
  'gliderSize',
  'cabSize',
  'cabType',
  'barPosition',
  'cssUnit',
];

export default function styles(theme, props) {
  const {
    direction,
    disabled,
    grow,
    width,
    height,
    barColor,
    gradient,
    gradientColor1,
    gradientColor2,
    gliderSize = 'default',
    cabSize = 'default',
    cabType = 'round',
    barPosition = 'start',
    cssUnit = 'px',
  } = props;

  const isDark = theme.colors.isDarkTheme;
  const isHorizontal = direction === 'horizontal';
  const barFinalColor = ColorHelpers.getMarkColor(theme, barColor);
  const gradientFinalColor1 = ColorHelpers.getMarkColor(theme, gradientColor1);
  const gradientFinalColor2 = ColorHelpers.getMarkColor(theme, gradientColor2);

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
    borderRadius: to(sliderThickness / 2, cssUnit),
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? null : 'pointer',
  };

  const inside = {
    position: 'absolute',
    left: to(sliderThickness / 2, cssUnit),
    right: to(sliderThickness / 2, cssUnit),
    bottom: to(sliderThickness / 2, cssUnit),
    top: to(sliderThickness / 2, cssUnit),
  };

  const glider = {
    position: 'absolute',
    left: to(-gliderThickness / 2, cssUnit),
    right: to(-gliderThickness / 2, cssUnit),
    bottom: to(-gliderThickness / 2, cssUnit),
    top: to(-gliderThickness / 2, cssUnit),
    borderRadius: to(gliderThickness / 2, cssUnit),
    background: '#ddd',
    display: 'flex',
  };

  const bar = {
    ...glider,
    backgroundColor: barFinalColor,
    opacity: barFinalColor ? 1 : 0,
  };

  const cab = {
    position: 'absolute',
    width: to(cabThickness, cssUnit),
    height: to(cabThickness, cssUnit),
    borderRadius: to(cabThickness / 2, cssUnit),
    background: 'white',
  };

  if (gradient === '1to2') {
    const a = isHorizontal ? '90deg' : '0deg';
    glider.background = `linear-gradient(${a}, ${gradientFinalColor1}, ${gradientFinalColor2})`;
  }

  if (isHorizontal) {
    slider.width = width;
    slider.minWidth = to(50, cssUnit);
    slider.minHeight = to(sliderThickness, cssUnit);
    slider.maxHeight = to(sliderThickness, cssUnit);
    slider.boxShadow = isDark
      ? `#444 ${to(0, cssUnit)} ${to(-2, cssUnit)} ${to(2, cssUnit)} inset`
      : `#bbb ${to(0, cssUnit)} ${to(2, cssUnit)} ${to(5, cssUnit)} inset`;

    glider.boxShadow =
      `rgba(0,0,0,0.5) ` +
      `${to(0, cssUnit)} ${to(2, cssUnit)} ${to(2, cssUnit)} inset`;
    glider.flexDirection = 'row';

    const r = to(gliderThickness / 2, cssUnit);
    bar.borderRadius =
      barPosition === 'middle'
        ? to(0, cssUnit)
        : barPosition === 'end'
        ? `${to(0, cssUnit)} ${r} ${r} ${to(0, cssUnit)}`
        : `${r} ${to(0, cssUnit)} ${to(0, cssUnit)} ${r}`;
    bar.right = null;
    bar.boxShadow =
      `${ColorManipulator.darken(barFinalColor, 0.6)} ` +
      `${to(0, cssUnit)} ${to(-3, cssUnit)} ${to(6, cssUnit)} inset`;

    cab.width = to(cabWidth, cssUnit);
    cab.bottom = to(-cabThickness / 2 + 1, cssUnit);
    cab.boxShadow =
      `${to(0, cssUnit)} ${to(3, cssUnit)} ` +
      `${to(4, cssUnit)} ${to(0, cssUnit)} ` +
      `rgba(0,0,0,0.6)`;
  } else {
    slider.height = height;
    slider.minHeight = to(50, cssUnit);
    slider.minWidth = to(sliderThickness, cssUnit);
    slider.maxWidth = to(sliderThickness, cssUnit);
    slider.boxShadow = isDark
      ? `#444 ${to(-2, cssUnit)} ${to(0, cssUnit)} ${to(2, cssUnit)} inset`
      : `#bbb ${to(2, cssUnit)} ${to(0, cssUnit)} ${to(5, cssUnit)} inset`;

    glider.boxShadow =
      `rgba(0,0,0,0.5) ` +
      `${to(2, cssUnit)} ${to(0, cssUnit)} ${to(2, cssUnit)} inset`;
    glider.flexDirection = 'column-reverse';

    const r = to(gliderThickness / 2, cssUnit);
    bar.borderRadius =
      barPosition === 'middle'
        ? to(0, cssUnit)
        : barPosition === 'end'
        ? `${r} ${r} ${to(0, cssUnit)} ${to(0, cssUnit)}`
        : `${to(0, cssUnit)} ${to(0, cssUnit)} ${r} ${r}`;
    bar.top = null;
    bar.boxShadow =
      `${ColorManipulator.darken(barFinalColor, 0.6)} ` +
      `${to(-3, cssUnit)} ${to(0, cssUnit)} ${to(6, cssUnit)} inset`;

    cab.height = to(cabWidth, cssUnit);
    cab.left = to(-cabThickness / 2 - 1, cssUnit);
    cab.boxShadow =
      `${to(3, cssUnit)} ${to(0, cssUnit)} ` +
      `${to(4, cssUnit)} ${to(0, cssUnit)} ` +
      `rgba(0,0,0,0.6)`;
  }

  const rainbow = {
    ...glider,
    padding: isHorizontal
      ? `${to(0, cssUnit)} ${to(gliderThickness / 2, cssUnit)}`
      : `${to(gliderThickness / 2, cssUnit)} ${to(0, cssUnit)}`,
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
    left: to(0, cssUnit),
    right: to(0, cssUnit),
    bottom: to(0, cssUnit),
    top: to(0, cssUnit),
    borderRadius: to(gliderThickness / 2, cssUnit),
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
    padding: to(2, cssUnit),
    borderRadius: to(20, cssUnit),
    boxShadow:
      `${to(0, cssUnit)} ${to(5, cssUnit)} ` +
      `${to(10, cssUnit)} ${to(3, cssUnit)} ${valueShadowColor}`,
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
