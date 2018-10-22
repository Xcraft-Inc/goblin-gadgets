import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'maxWidth', 'zIndex', 'trianglePosition'];

export default function styles(theme, props) {
  const {width, maxWidth, zIndex, trianglePosition} = props;

  const t = Unit.add(theme.shapes.flyingBalloonTriangleSize, '0px', 0); // round (suppress decimals)

  // This box is an invisible floating box that contains a component Container
  // with kind='flying-balloon'. For example, if trianglePosition='left', the
  // floating box is positioned to the right the parent box.
  const boxStyle = {
    width: width || '100%',
    maxWidth: maxWidth || '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: zIndex || 1,
  };
  if (trianglePosition === 'left') {
    boxStyle.left = '100%';
    boxStyle.margin = '0px 0px 0px ' + t;
    boxStyle.alignItems = 'flex-start';
  } else if (trianglePosition === 'right') {
    boxStyle.right = '100%';
    boxStyle.margin = '0px ' + t + ' 0px 0px';
    boxStyle.alignItems = 'flex-end';
  } else if (trianglePosition === 'bottom') {
    boxStyle.left = '-1px';
    boxStyle.bottom = '100%';
    boxStyle.margin = '0px 0px ' + t + ' 0px';
    boxStyle.alignItems = 'flex-start';
  } else {
    boxStyle.left = '-1px';
    boxStyle.top = '100%';
    boxStyle.margin = t + ' 0px 0px 0px';
    boxStyle.alignItems = 'flex-start';
  }

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
