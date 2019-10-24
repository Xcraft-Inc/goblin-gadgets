import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'maxWidth', 'zIndex', 'trianglePosition'];

export default function styles(theme, props) {
  const {width, maxWidth, zIndex, trianglePosition} = props;

  const t = Unit.add(theme.shapes.flyingBalloonTriangleSize, '0px', 0); // round (suppress decimals)

  // This box is an invisible floating box that contains a component Container
  // with kind='flying-balloon'. For example, if trianglePosition='left', the
  // floating box is positioned to the right the parent box.
  const box = {
    width: width || '100%',
    maxWidth: maxWidth || '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: zIndex || 1,
    // Show the flying-balloon when text-input has the focus.
    // Hide the flying-balloon when text-input does not have the focus.
    visibility: 'hidden',
  };
  if (trianglePosition === 'left') {
    box.left = '100%';
    box.margin = '0px 0px 0px ' + t;
    box.alignItems = 'flex-start';
  } else if (trianglePosition === 'right') {
    box.right = '100%';
    box.margin = '0px ' + t + ' 0px 0px';
    box.alignItems = 'flex-end';
  } else if (trianglePosition === 'bottom') {
    box.left = '-1px';
    box.bottom = '100%';
    box.margin = '0px 0px ' + t + ' 0px';
    box.alignItems = 'flex-start';
  } else {
    box.left = '-1px';
    box.top = '100%';
    box.margin = t + ' 0px 0px 0px';
    box.alignItems = 'flex-start';
  }

  return {
    box,
  };
}

/******************************************************************************/
