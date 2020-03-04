import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'margin',
  'material',
  'border',
  'status',
  'backgroundColor',
  'color',
  'glyphSize',
  'textSize',
  'textTransform',
  'textWeight',
];

export default function styles(theme, props) {
  const {
    width = '50px',
    height = '50px',
    margin,
    material = 'led',
    border = 'silver',
    status,
    backgroundColor,
    color,
    glyphSize,
    textSize,
    textTransform,
    textWeight,
  } = props;

  let glyphColor = backgroundColor;
  if (glyphColor) {
    glyphColor = ColorHelpers.getMarkColor(theme, glyphColor);
  }

  let colorOn, colorOff;
  if (material === 'opal') {
    colorOn = `radial-gradient(at 48% 48%, ${glyphColor} 25%, black)`;
    colorOff = `radial-gradient(at 48% 48%, ${ColorManipulator.darken(
      glyphColor,
      0.6
    )} 25%, black)`;
  } else {
    colorOn = glyphColor;
    colorOff = ColorManipulator.darken(glyphColor, 0.6);
  }
  const colorHalo = ColorManipulator.lighten(glyphColor, 0.6);

  const borderColor = border === 'gold' ? theme.palette.chrome : '#aaa';

  const glyphBackground = '#333';
  const glyphBorderTop = `5px solid ${ColorManipulator.darken(
    borderColor,
    0.0
  )}`;
  const glyphBorderBottom = `5px solid ${ColorManipulator.darken(
    borderColor,
    0.15
  )}`;
  const glyphBorderLeft = `5px solid ${ColorManipulator.darken(
    borderColor,
    0.0
  )}`;
  const glyphBorderRight = `5px solid ${ColorManipulator.darken(
    borderColor,
    0.15
  )}`;
  const glyphShadow = `3px 5px ${Unit.multiply(width, 0.3)} ${Unit.multiply(
    width,
    0.05
  )} #222`;

  const glyphHilitedBackground = '#555';
  const glyphHilitedBorderTop = `5px solid ${ColorManipulator.lighten(
    borderColor,
    0.9
  )}`;
  const glyphHilitedBorderBottom = `5px solid ${ColorManipulator.lighten(
    borderColor,
    0.5
  )}`;
  const glyphHilitedBorderLeft = `5px solid ${ColorManipulator.lighten(
    borderColor,
    0.9
  )}`;
  const glyphHilitedBorderRight = `5px solid ${ColorManipulator.lighten(
    borderColor,
    0.5
  )}`;
  const glyphHilitedShadow = `${colorHalo} 0px 0px 20px 10px`;

  let glyphChromeKeyframes;
  let buttonKeyframes;

  if (status === 'flash') {
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
    buttonKeyframes = {
      '0%': {
        background: colorOn,
      },
      '50%': {
        background: colorOn,
      },
      '51%': {
        background: colorOff,
      },
      '100%': {
        background: colorOff,
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
    buttonKeyframes = {
      '0%': {
        background: colorOn,
      },
      '100%': {
        background: colorOn,
      },
    };
  }

  /******************************************************************************/

  const illuminatedButton = {
    position: 'relative',
    width: width,
    height: height,
    margin: margin,
    padding: '2px',
    borderRadius: '1000px',
    backgroundColor: '#111',
    animationName: glyphChromeKeyframes,
    animationDuration: '0.6s',
    animationIterationCount: 'infinite',
  };

  const button = {
    'width': width,
    'height': height,
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '1000px',
    'animationName': buttonKeyframes,
    'animationDuration': '0.6s',
    'animationIterationCount': 'infinite',
    ':hover .lens-hover': {
      background:
        'radial-gradient(at 50% 50%, rgba(255,255,255,1.0) 0%, transparent 68%)',
    },
  };

  const buttonLens = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    borderRadius: '1000px',
    background:
      'radial-gradient(at 30% 30%, rgba(255,255,255,0.9) 0%, transparent 30%)',
  };

  const queue = {
    position: 'absolute',
    left: 'calc(50% - 5px)',
    right: 'calc(50% - 5px)',
    top: 'calc(100% + 4px)',
    bottom: '-60px',
    borderRadius: '0px 0px 5px 5px',
    background: ColorManipulator.darken(borderColor, 0.15),
  };

  const queueEnd = {
    position: 'absolute',
    left: 'calc(50% - 18px)',
    right: 'calc(50% - 18px)',
    top: 'calc(100% + 37px)',
    bottom: '-73px',
    borderRadius: '100px',
    background: ColorManipulator.darken(borderColor, 0.15),
    boxShadow: '7px 8px 21px 0px #222',
  };

  const glyph = {
    color: color,
    fontSize: glyphSize,
  };

  const text = {
    color: color,
    fontSize: textSize,
    fontWeight: textWeight,
    textTransform: textTransform,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  /******************************************************************************/

  return {
    illuminatedButton,
    button,
    buttonLens,
    queue,
    queueEnd,
    glyph,
    text,
  };
}

/******************************************************************************/
