import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

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
  let glyphChrome;
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

    glyphChrome = {};
    glyph = {};
    glyphLens = {};
  }

  //--------\
  //  RETRO  >
  //--------/
  if (look === 'retro') {
    const colorOn = glyphColor;
    const colorOff = ColorManipulator.darken(glyphColor, 0.6);
    const colorHalo = ColorManipulator.lighten(glyphColor, 0.6);

    const glyphBackground = '#333';
    const glyphBorderTop = '5px solid #aaa';
    const glyphBorderBottom = '5px solid #777';
    const glyphBorderLeft = '5px solid #aaa';
    const glyphBorderRight = '5px solid #777';
    const glyphShadow = '2px 5px 17px 0px #222';

    const glyphHilitedBackground = '#555';
    const glyphHilitedBorderTop = '5px solid #fff';
    const glyphHilitedBorderBottom = '5px solid #ddd';
    const glyphHilitedBorderLeft = '5px solid #fff';
    const glyphHilitedBorderRight = '5px solid #ddd';
    const glyphHilitedShadow = `${colorHalo} 0px 0px 20px 10px`;

    let glyphChromeKeyframes;
    let glyphKeyframes;

    if (status === 'not-read') {
      glyphChromeKeyframes = {
        '0%': {
          backgroundColor: glyphHilitedBackground,
          borderTop: glyphHilitedBorderTop,
          borderBottom: glyphHilitedBorderBottom,
          borderLeft: glyphHilitedBorderLeft,
          borderRight: glyphHilitedBorderRight,
          boxShadow: glyphHilitedShadow,
        },
        '50%': {
          backgroundColor: glyphHilitedBackground,
          borderTop: glyphHilitedBorderTop,
          borderBottom: glyphHilitedBorderBottom,
          borderLeft: glyphHilitedBorderLeft,
          borderRight: glyphHilitedBorderRight,
          boxShadow: glyphHilitedShadow,
        },
        '51%': {
          backgroundColor: glyphBackground,
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
        '100%': {
          backgroundColor: glyphBackground,
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
      };
      glyphKeyframes = {
        '0%': {
          backgroundColor: colorOn,
        },
        '50%': {
          backgroundColor: colorOn,
        },
        '51%': {
          backgroundColor: colorOff,
        },
        '100%': {
          backgroundColor: colorOff,
        },
      };
    } else {
      glyphChromeKeyframes = {
        '0%': {
          backgroundColor: glyphBackground,
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
        '100%': {
          backgroundColor: glyphBackground,
          borderTop: glyphBorderTop,
          borderBottom: glyphBorderBottom,
          borderLeft: glyphBorderLeft,
          borderRight: glyphBorderRight,
          boxShadow: glyphShadow,
        },
      };
      glyphKeyframes = {
        '0%': {
          backgroundColor: colorOn,
        },
        '100%': {
          backgroundColor: colorOn,
        },
      };
    }

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

    glyphChrome = {
      width: '50px',
      height: '50px',
      margin: '0px 10px 0px 0px',
      padding: '2px',
      borderRadius: '30px',
      backgroundColor: '#111',
      animationName: glyphChromeKeyframes,
      animationDuration: '0.6s',
      animationIterationCount: 'infinite',
    };

    glyph = {
      width: '50px',
      height: '50px',
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
    glyphChrome,
    glyph,
    glyphLens,
  };
}

/******************************************************************************/
