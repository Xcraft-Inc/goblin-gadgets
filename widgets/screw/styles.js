import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'angle',
  'color',
  'colorShadow',
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
    color = '#777',
    colorShadow = '#111',
  } = props;

  const colorBorder = ColorManipulator.darken(color, 0.4); // #333
  const colorSlot = ColorManipulator.lighten(color, 0.1); // #666

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
    backgroundColor: color,
    boxShadow: `1px 2px 5px 1px ${colorShadow}`,
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
