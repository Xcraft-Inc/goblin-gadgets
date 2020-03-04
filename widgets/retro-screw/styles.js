import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'size',
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
    size = '12px',
    angle = '45deg',
    backgroundBrigtness,
  } = props;

  const isDark = backgroundBrigtness === 'dark';

  const colorBorder = isDark ? '#222' : '#555';
  const colorBackground = isDark ? '#777' : '#bbb';
  const colorSlot = isDark ? '#666' : '#aaa';
  const shadow = isDark
    ? '1px 2px 5px 1px rgba(0,0,0,1)'
    : '1px 2px 5px 1px rgba(0,0,0,0.4)';

  const screw = {
    position: 'absolute',
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: size,
    height: size,
    borderRadius: '6px',
    border: `1px solid ${colorBorder}`,
    backgroundColor: colorBackground,
    boxShadow: shadow,
  };

  const slot = {
    position: 'absolute',
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: size,
    height: Unit.multiply(size, 0.25),
    margin: `${Unit.multiply(size, 0.375)} 0px`,
    border: `1px solid ${colorBorder}`,
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
