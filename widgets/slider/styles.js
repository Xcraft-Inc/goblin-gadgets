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
  'value',
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
    value,
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
  const hasCab = value !== null && value !== undefined;
  const cabValue = Math.max(Math.min(value, 100), 0); // 0..100
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
    display: hasCab && barColor ? null : 'none',
  };

  const cab = {
    position: 'absolute',
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    display: hasCab ? null : 'none',
  };

  if (gradient === '1to2') {
    const a = direction === 'horizontal' ? '90deg' : '0deg';
    glider.background = `linear-gradient(${a}, ${gradientColor1}, ${gradientColor2})`;
  }

  if (direction === 'horizontal') {
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
    bar.width = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
    bar.boxShadow = `${ColorManipulator.darken(
      colorBar,
      0.6
    )} 0px -3px 6px inset`;

    cab.width = px(cabWidth);
    cab.left = `calc(${pc(cabValue)} - ${px(cabWidth / 2)})`;
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
    glider.flexDirection = 'column';

    const r = px(gliderThickness / 2);
    bar.borderRadius = `0px 0px ${r} ${r}`;
    bar.top = null;
    bar.height = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
    bar.boxShadow = `${ColorManipulator.darken(
      colorBar,
      0.6
    )} -3px 0px 6px inset`;

    cab.height = px(cabWidth);
    cab.bottom = `calc(${pc(cabValue)} - ${px(cabWidth / 2)})`;
    cab.left = px(-cabThickness / 2 - 1);
    cab.boxShadow = '3px 0px 4px 0px rgba(0,0,0,0.6)';
  }

  const rainbow = {
    ...glider,
    padding: `0px ${px(gliderThickness / 2)}`,
    background: '#f00',
    boxShadow: 'unset',
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
    slider,
    inside,
    glider,
    rainbow,
    rainbowShadow,
    bar,
    cab,
    fullscreen,
  };
}

/******************************************************************************/
