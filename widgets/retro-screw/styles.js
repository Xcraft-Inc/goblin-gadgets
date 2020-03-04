import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'angle',
  'backgroundBrigtness',
];

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top,
    bottom,
    left,
    right,
    radius = '7px',
    angle = '45deg',
    backgroundBrigtness,
  } = props;

  const isDark = backgroundBrigtness === 'dark';
  const size = Unit.multiply(radius, 2);

  const colorBorder = isDark ? '#222' : '#555';
  const colorBackground = isDark ? '#777' : '#bbb';
  const colorSlot = isDark ? '#666' : '#aaa';
  const shadow = isDark
    ? '1px 2px 5px 1px rgba(0,0,0,1)'
    : '1px 2px 5px 1px rgba(0,0,0,0.4)';

  const screw = {
    position: 'absolute',
    top: top ? Unit.sub(top, radius) : null,
    bottom: bottom ? Unit.sub(bottom, radius) : null,
    left: left ? Unit.sub(left, radius) : null,
    right: right ? Unit.sub(right, radius) : null,
    width: size,
    height: size,
    borderRadius: '100px',
    border: `1px solid ${colorBorder}`,
    boxSizing: 'border-box',
    backgroundColor: colorBackground,
    boxShadow: shadow,
  };

  const slot = {
    position: 'absolute',
    top: top ? Unit.sub(top, radius) : null,
    bottom: bottom ? Unit.sub(bottom, radius) : null,
    left: left ? Unit.sub(left, radius) : null,
    right: right ? Unit.sub(right, radius) : null,
    width: Unit.sub(size, '2px'),
    height: Unit.multiply(size, 0.3),
    margin: `${Unit.multiply(size, 0.35)} 1px`, // 0.35 = (1 - 0.3) / 2
    borderTop: `1px solid ${colorBorder}`,
    borderBottom: `1px solid ${colorBorder}`,
    boxSizing: 'border-box',
    backgroundColor: colorSlot,
    transform: `rotate(${angle})`,
  };

  /******************************************************************************/

  return {
    screw,
    slot,
  };
}

/******************************************************************************/
