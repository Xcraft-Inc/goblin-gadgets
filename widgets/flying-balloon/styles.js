import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const t = Unit.add (theme.shapes.flyingBalloonTriangleSize, '0px', 0); // round (suppress decimals)

  // This box is an invisible floating box that contains a component Container
  // with kind='flying-balloon'. For example, if trianglePosition='left', the
  // floating box is positioned to the right the parent box.
  const boxStyle = {
    width: props.width ? props.width : '100%',
    maxWidth: props.maxWidth ? props.maxWidth : '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    zIndex: props.zIndex ? props.zIndex : 1,
  };
  if (props.trianglePosition === 'left') {
    boxStyle.left = '100%';
    boxStyle.margin = '0px 0px 0px ' + t;
  } else if (props.trianglePosition === 'right') {
    boxStyle.right = '100%';
    boxStyle.margin = '0px ' + t + ' 0px 0px';
  } else if (props.trianglePosition === 'bottom') {
    boxStyle.left = '-1px';
    boxStyle.bottom = '100%';
    boxStyle.margin = '0px 0px ' + t + ' 0px';
  } else {
    boxStyle.left = '-1px';
    boxStyle.top = '100%';
    boxStyle.margin = t + ' 0px 0px 0px';
  }

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
