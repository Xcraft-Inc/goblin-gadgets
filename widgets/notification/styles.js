import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['status', 'look', 'data'];

export default function styles(theme, props) {
  const {status, look = 'modern', data} = props;

  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;

  let glyphColor = data.color;
  if (glyphColor) {
    glyphColor = ColorHelpers.getMarkColor(theme, glyphColor);
  }

  let notification;
  let glyph;
  let glyphLens;

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

    glyph = {};
    glyphLens = {};
  }

  //--------\
  //  RETRO  >
  //--------/
  if (look === 'retro') {
    const glyphBorderTop = '5px solid #aaa';
    const glyphBorderBottom = '5px solid #777';
    const glyphBorderLeft = '5px solid #aaa';
    const glyphBorderRight = '5px solid #777';
    const glyphShadow = '2px 5px 17px 0px #222';

    const glyphHilitedBorderTop = '5px solid #fff';
    const glyphHilitedBorderBottom = '5px solid #ddd';
    const glyphHilitedBorderLeft = '5px solid #fff';
    const glyphHilitedBorderRight = '5px solid #ddd';
    const glyphHilitedShadow = 'rgba(255,255,255,0.5) 0px 0px 20px 10px';

    let glyphKeyframes;

    if (status === 'not-read') {
      glyphKeyframes = {
        '0%': {
          borderTop: glyphHilitedBorderTop,
          borderBottom: glyphHilitedBorderBottom,
          borderLeft: glyphHilitedBorderLeft,
          borderRight: glyphHilitedBorderRight,
          boxShadow: glyphHilitedShadow,
        },
        '50%': {
          borderTop: glyphHilitedBorderTop,
          borderBottom: glyphHilitedBorderBottom,
          borderLeft: glyphHilitedBorderLeft,
          borderRight: glyphHilitedBorderRight,
          boxShadow: glyphHilitedShadow,
        },
        '51%': {
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
        '100%': {
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
      };
    } else {
      glyphKeyframes = {
        '0%': {
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
        '100%': {
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
      };
    }

    notification = {
      minHeight: '32px',
      display: 'flex',
      flexDirection: 'row',
      color: '#bbb',
      margin: '20px 10px',
      borderRadius: '15px',
      paddingTop: m,
      paddingRight: '0px',
      paddingBottom: m,
      paddingLeft: m,
      background: 'linear-gradient(90deg, #222 -150%, #444)',
      boxShadow: '2px 6px 13px 4px #222',
      userSelect: 'none',
    };

    glyph = {
      width: '50px',
      height: '50px',
      margin: '0px 10px 0px 0px',
      padding: '2px',
      borderRadius: '30px',
      animationName: glyphKeyframes,
      animationDuration: '0.6s',
      animationIterationCount: 'infinite',
    };

    glyphLens = {
      position: 'relative',
      left: '-2px',
      top: '-52px',
      width: '30px',
      height: '30px',
      background: 'radial-gradient(circle closest-side, white, transparent)',
    };
  }

  /******************************************************************************/

  return {
    notification,
    glyph,
    glyphLens,
  };
}

/******************************************************************************/
