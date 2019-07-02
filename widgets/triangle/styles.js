import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'parentSimulatorWidth',
  'parentSimulatorHeight',
  'position',
  'size',
  'shift',
  'color',
];

export default function styles(theme, props) {
  let {
    parentSimulatorWidth,
    parentSimulatorHeight,
    position = 'bottom',
    size = theme.shapes.flyingBalloonTriangleSize,
    shift,
    color = theme.palette.flyingBalloonBackground,
  } = props;

  const triangleColor = ColorHelpers.getMarkColor(theme, color);

  const parentSimulator = {
    position: 'relative',
    width: parentSimulatorWidth,
    height: parentSimulatorHeight,
    border: '1px dashed #aaa',
  };

  let triangle = {};
  const t = Unit.add(size, '0px', 0); // round (suppress decimals)
  const tt = shift ? Unit.add(t, shift) : t;
  const p = Unit.add(size, '1px');

  switch (position) {
    case 'left':
      triangle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        left: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderLeft: t + ' solid ' + triangleColor,
      };
      break;
    case 'right':
      triangle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        right: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderRight: t + ' solid ' + triangleColor,
      };
      break;
    case 'bottom':
      triangle = {
        position: 'absolute',
        width: '0px',
        left: 'calc(50% - ' + tt + ')',
        bottom: '-' + p,
        borderLeft: t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderBottom: t + ' solid ' + triangleColor,
      };
      break;
    case 'top':
      triangle = {
        position: 'absolute',
        width: '0px',
        left: 'calc(50% - ' + tt + ')',
        top: '-' + p,
        borderLeft: t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderTop: t + ' solid ' + triangleColor,
      };
      break;
  }

  return {
    parentSimulator,
    triangle,
  };
}

/******************************************************************************/
