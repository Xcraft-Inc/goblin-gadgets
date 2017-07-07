import ReactDOM from 'react-dom';
import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;

  let margin = null;
  let paddingLeft = null;
  let backgroundColor = null;
  let borderLeftWidth = null;
  let borderLeftStyle = null;
  let borderLeftColor = null;

  if (props.status === 'not-read') {
    margin = '0px 0px ' + Unit.multiply (s, 0.4) + ' 0px';
    paddingLeft = Unit.sub (m, theme.shapes.notificationMarkWidth);
    borderLeftWidth = theme.shapes.notificationMarkWidth;
    borderLeftStyle = 'solid';
    borderLeftColor = ColorHelpers.getMarkColor (theme, 'primary');
    backgroundColor = theme.palette.notificationBackgroundNotRead;
  } else {
    margin = '0px 0px 1px 0px';
    paddingLeft = m;
    backgroundColor = theme.palette.notificationBackgroundRead;
  }

  const boxStyle = {
    minHeight: '32px',
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.notificationText,
    margin: margin,
    paddingTop: m,
    paddingRight: '0px',
    paddingBottom: m,
    paddingLeft: paddingLeft,
    borderLeftWidth: borderLeftWidth,
    borderLeftStyle: borderLeftStyle,
    borderLeftColor: borderLeftColor,
    backgroundColor: backgroundColor,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
