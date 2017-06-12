import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const inputKind = props.kind;
  const inputWidth = props.width;
  const inputHeight = props.height;

  let width = null;
  let height = '1px';
  let borderWidth = '1px 0px 0px 0px';
  let borderStyle = 'solid';
  let borderColor = theme.palette.paneNavigatorInactiveBorder;
  let margin = '0px';
  let padding = '0px';
  let backgroundColor = null;

  const s = theme.shapes.lineSpacing;

  if (inputWidth) {
    width = inputWidth;
  }

  let topMargin = '0px';
  let bottomMargin = s;
  if (inputHeight) {
    const h = Unit.multiply (inputHeight, 0.5);
    topMargin = Unit.add (topMargin, h);
    bottomMargin = Unit.add (bottomMargin, h);
  }

  margin = topMargin + ' 0px ' + bottomMargin + ' 0px';

  if (inputKind === 'task') {
    height = theme.shapes.taskSeparatorHeight;
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
    backgroundColor = theme.palette.taskSeparatorBackground;
  }

  if (inputKind === 'space') {
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (inputKind === 'menu-separator') {
    height = theme.shapes.flyingBalloonPadding;
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (inputKind === 'floating-footer') {
    borderColor = theme.palette.floatingSecondary;
  }

  if (inputKind === 'ticket-warning') {
    borderColor = theme.palette.text;
    margin = '0px 0px 5px 0px';
  }

  const boxStyle = {
    width: width,
    height: height,
    borderWidth: borderWidth,
    borderStyle: borderStyle,
    borderColor: borderColor,
    margin: margin,
    padding: padding,
    backgroundColor: backgroundColor,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
