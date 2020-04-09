//T:2019-02-27

import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['kind', 'width', 'height'];

export default function styles(theme, props) {
  const {kind, width, height} = props;

  let boxWidth = null;
  let boxHeight = '1px';
  let grow = null;
  let borderWidth = '1px 0px 0px 0px';
  let borderStyle = 'solid';
  let borderColor = theme.palette.paneNavigatorInactiveBorder;
  let margin = '0px';
  let padding = '0px';
  let backgroundColor = null;

  const s = theme.shapes.lineSpacing;

  if (width) {
    boxWidth = width;
  }

  let topMargin = '0px';
  let bottomMargin = s;
  if (height) {
    const h = Unit.multiply(height, 0.5);
    topMargin = Unit.add(topMargin, h);
    bottomMargin = Unit.add(bottomMargin, h);
  }

  margin = topMargin + ' 0px ' + bottomMargin + ' 0px';

  if (kind === 'task') {
    if (theme.look.name === 'retro') {
      boxHeight = Unit.multiply(theme.shapes.taskSeparatorHeight, 2);
      margin = '0px';
      borderWidth = '0px';
      borderStyle = 'none';
    } else {
      boxHeight = theme.shapes.taskSeparatorHeight;
      margin = '0px';
      borderWidth = '0px';
      borderStyle = 'none';
      backgroundColor = theme.palette.taskSeparatorBackground;
    }
  }

  if (kind === 'space') {
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (kind === 'exact') {
    boxHeight = height;
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (kind === 'menu-separator') {
    boxHeight = theme.shapes.flyingBalloonPadding;
    margin = '0px';
    borderWidth = '0px';
    borderStyle = 'none';
  }

  if (kind === 'menu-line') {
    margin = '5px 0px';
  }

  if (kind === 'floating-footer') {
    borderColor = theme.palette.floatingSecondary;
  }

  if (kind === 'ticket-warning') {
    borderColor = theme.palette.text;
    margin = '0px 0px 5px 0px';
  }

  if (kind === 'grow') {
    grow = '1';
    margin = null;
    padding = null;
  }

  if (kind === 'sajex') {
    grow = '1';
    margin = null;
    padding = null;
    borderWidth = '0px';
    borderStyle = 'none';
  }

  const box = {
    width: boxWidth,
    height: boxHeight,
    flexGrow: grow,
    borderWidth: borderWidth,
    borderStyle: borderStyle,
    borderColor: borderColor,
    margin: margin,
    padding: padding,
    backgroundColor: backgroundColor,
  };

  return {
    box,
  };
}

/******************************************************************************/
