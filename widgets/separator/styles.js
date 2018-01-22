import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let width = null;
  let height = '1px';
  let grow = null;
  let borderWidth = '1px 0px 0px 0px';
  let borderStyle = 'solid';
  let borderColor = theme.palette.paneNavigatorInactiveBorder;
  let margin = '0px';
  let padding = '0px';
  let backgroundColor = null;

  const s = theme.shapes.lineSpacing;

  if (props.width) {
    width = props.width;
  }

  let topMargin = '0px';
  let bottomMargin = s;
  if (props.height) {
    const h = Unit.multiply (props.height, 0.5);
    topMargin = Unit.add (topMargin, h);
    bottomMargin = Unit.add (bottomMargin, h);
  }

  margin = topMargin + ' 0px ' + bottomMargin + ' 0px';

  if (props.kind === 'task') {
    //? height = theme.shapes.taskSeparatorHeight;
    height = '5px';
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
    //? backgroundColor = theme.palette.taskSeparatorBackground;
    backgroundColor = '#285a89';
  }

  if (props.kind === 'space') {
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (props.kind === 'menu-separator') {
    height = theme.shapes.flyingBalloonPadding;
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (props.kind === 'floating-footer') {
    borderColor = theme.palette.floatingSecondary;
  }

  if (props.kind === 'ticket-warning') {
    borderColor = theme.palette.text;
    margin = '0px 0px 5px 0px';
  }

  if (props.kind === 'grow') {
    (grow = '1'), (margin = null);
    padding = null;
  }

  const boxStyle = {
    width: width,
    height: height,
    flexGrow: grow,
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
