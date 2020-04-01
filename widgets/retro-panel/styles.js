import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
  'grow',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'radius',
  'margin',
  'padding',
  'strokeColor',
  'fillColor',
];

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top = '0px',
    bottom = '0px',
    left = '0px',
    right = '0px',
    width,
    height,
    grow,
    flexDirection = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    radius = '50px',
    margin = '100px',
    padding,
    strokeColor = 'black',
    fillColor = 'yellow',
  } = props;

  const _absolute = {
    position: 'absolute',
    top: Unit.add(top, margin),
    bottom: Unit.add(bottom, margin),
    left: Unit.add(left, margin),
    right: Unit.add(right, margin),
  };

  const _relative = {
    position: 'relative',
    width,
    height,
    flexGrow: grow,
    margin,
    padding,
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
  };

  const _metalPlate = {
    border: `1px solid ${strokeColor}`,
    borderRadius: radius,
    background: fillColor,
    boxShadow: `black 0px 0px ${Unit.multiply(radius, 2.5)} ${Unit.multiply(
      margin,
      0.1
    )}`,
  };

  const retroPanelMetalPlateAbsolute = {
    ..._absolute,
    ..._metalPlate,
  };

  const retroPanelMetalPlateRelative = {
    ..._relative,
    ..._metalPlate,
  };

  /******************************************************************************/

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

  const title = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: Unit.multiply(margin, 1.8),
  };

  /******************************************************************************/

  return {
    retroPanelMetalPlateAbsolute,
    retroPanelMetalPlateRelative,

    gear1,
    gear2,
    gear3,
    gear4,

    title,
  };
}

/******************************************************************************/
