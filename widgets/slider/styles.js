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
  'width',
  'height',
  'color',
];

export default function styles(theme, props) {
  const {value, direction, disabled, width, height, color = '#888'} = props;

  const cabValue = Math.max(Math.min(value, 100), 0); // 0..100
  const thickness = 20;
  const gliderThickness = 8;
  const cabThickness = 12;

  const slider = {
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: px(thickness / 2),
    opacity: disabled ? 0.4 : 1,
  };

  const inside = {
    position: 'absolute',
    left: px(thickness / 2),
    right: px(thickness / 2),
    bottom: px(thickness / 2),
    top: px(thickness / 2),
  };

  const glider = {
    position: 'absolute',
    left: px(-gliderThickness / 2),
    right: px(-gliderThickness / 2),
    bottom: px(-gliderThickness / 2),
    top: px(-gliderThickness / 2),
    borderRadius: px(gliderThickness / 2),
    backgroundColor: '#ddd',
  };

  const bar = {
    ...glider,
    backgroundColor: color,
  };

  const cab = {
    position: 'absolute',
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    cursor: 'pointer',
  };

  if (direction === 'horizontal') {
    slider.width = width;
    slider.height = px(thickness);
    slider.boxShadow = '#bbb 0px 2px 5px inset';

    glider.boxShadow = '#aaa 0px 2px 2px inset';

    const r = px(gliderThickness / 2);
    bar.borderRadius = `${r} 0px 0px ${r}`;
    bar.width = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
    bar.boxShadow = `${ColorManipulator.darken(color, 0.6)} 0px -3px 6px inset`;

    cab.left = `calc(${pc(cabValue)} - ${px(cabThickness / 2)})`;
    cab.bottom = px(-cabThickness / 2);
    cab.boxShadow = '0px 3px 4px 0px rgba(0,0,0,0.6)';
  } else {
    slider.height = height;
    slider.width = px(thickness);
    slider.boxShadow = '#bbb 2px 0px 5px inset';

    glider.boxShadow = '#aaa 2px 0px 2px inset';

    const r = px(gliderThickness / 2);
    bar.borderRadius = `${r} ${r} 0px 0px`;
    bar.height = `calc(${pc(cabValue)} + ${px(gliderThickness / 2)})`;
    bar.boxShadow = `${ColorManipulator.darken(color, 0.6)} -3px 0px 6px inset`;

    cab.bottom = `calc(${pc(cabValue)} - ${px(cabThickness / 2)})`;
    cab.left = px(-cabThickness / 2);
    cab.boxShadow = '3px 0px 4px 0px rgba(0,0,0,0.6)';
  }

  /******************************************************************************/

  return {
    slider,
    inside,
    glider,
    bar,
    cab,
  };
}

/******************************************************************************/
