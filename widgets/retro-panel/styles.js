import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'radius',
  'margin',
  'strokeColor',
  'fillColor',
];

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top,
    bottom,
    left,
    right,
    radius = '50px',
    margin = '100px',
    strokeColor = 'black',
    fillColor = 'yellow',
  } = props;

  const retroPanelMetalPlate = {
    position: 'absolute',
    top: Unit.add(top, margin),
    bottom: Unit.add(bottom, margin),
    left: Unit.add(left, margin),
    right: Unit.add(right, margin),
    border: `1px solid ${strokeColor}`,
    borderRadius: radius,
    background: fillColor,
    boxShadow: `black 0px 0px 100px ${Unit.multiply(margin, 0.1)}`,
  };

  const gear1 = {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    width: '0px',
    height: '0px',
  };

  const gear2 = {
    ...gear1,
    right: '351px',
    bottom: '562px',
  };

  const gear3 = {
    ...gear1,
    right: '784px',
    bottom: '399px',
  };

  const gear4 = {
    ...gear1,
    right: '973px',
    bottom: '764px',
  };

  /******************************************************************************/

  return {
    retroPanelMetalPlate,
    gear1,
    gear2,
    gear3,
    gear4,
  };
}

/******************************************************************************/
