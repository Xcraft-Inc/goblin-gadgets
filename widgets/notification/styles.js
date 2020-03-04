import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['status'];

export default function styles(theme, props) {
  const {status} = props;

  const look = theme.look.name;
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;

  let notification;

  //---------\
  //  MODERN  >
  //---------/
  if (look === 'modern') {
    let margin = null;
    let paddingLeft = null;
    let backgroundColor = null;
    let borderLeftWidth = null;
    let borderLeftStyle = null;
    let borderLeftColor = null;

    if (status === 'not-read') {
      margin = '0px 0px ' + Unit.multiply(s, 0.4) + ' 0px';
      paddingLeft = Unit.sub(m, theme.shapes.notificationMarkWidth);
      borderLeftWidth = theme.shapes.notificationMarkWidth;
      borderLeftStyle = 'solid';
      borderLeftColor = ColorHelpers.getMarkColor(theme, 'primary');
      backgroundColor = theme.palette.notificationBackgroundNotRead;
    } else {
      margin = '0px 0px 1px 0px';
      paddingLeft = m;
      backgroundColor = theme.palette.notificationBackgroundRead;
    }

    notification = {
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
      userSelect: 'none',
    };
  }

  //--------\
  //  RETRO  >
  //--------/
  if (look === 'retro') {
    notification = {
      minHeight: '32px',
      display: 'flex',
      flexDirection: 'row',
      color: '#bbb',
      margin: '20px',
      borderRadius: '15px',
      paddingTop: m,
      paddingRight: '0px',
      paddingBottom: m,
      paddingLeft: m,
      background: 'linear-gradient(90deg, #222 -150%, #444)',
      boxShadow: '4px 7px 23px 3px #222',
      userSelect: 'none',
    };
  }

  /******************************************************************************/

  return {
    notification,
  };
}

/******************************************************************************/
