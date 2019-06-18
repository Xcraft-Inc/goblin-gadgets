import * as Bool from 'gadgets/helpers/bool-helpers';

/******************************************************************************/

//  Compute the color of gauge.
function getColor(gradient, value) {
  if (value) {
    value /= 100; // 0..1
    let red, green, blue;
    if (gradient === 'red-yellow-green') {
      if (value < 0.5) {
        // From red to yellow.
        value = value * 2; // 0..1
        red = 255;
        green = 255 * value; // 0/1 -> 0/255
      } else {
        // From yellow to green.
        value = (value - 0.5) * 2; // 0..1
        red = 255 - 255 * value; // 0/1 -> 255/0
        green = 255;
      }
      blue = 0;
    } else if (gradient === 'yellow-green') {
      // From yellow to green.
      red = 255 - 255 * value; // 0/1 -> 255/0
      green = 255;
      blue = 0;
    } else {
      // From orange to red.
      red = 255;
      green = 128 - 128 * value; // 0/1 -> 128/0
      blue = 0;
    }
    return `rgb(${Math.floor(red)},${Math.floor(green)},${Math.floor(blue)})`;
  } else {
    return '#fff';
  }
}

/******************************************************************************/

export const propNames = [
  'value',
  'direction',
  'flash',
  'kind',
  'disabled',
  'gradient',
];

export default function styles(theme, props) {
  const {value, direction, flash, kind, disabled, gradient} = props;

  const gaugeValue = Math.max(Math.min(value, 100), 0); // 0..100

  const boxStyle = {
    position: 'relative',
    display: 'flex',
    height: direction === 'horizontal' ? null : '100%',
    width: direction === 'horizontal' ? '100%' : null,
    alignItems: 'flex-end',
  };

  const keyframes = {
    '0%': {
      opacity: 1,
    },
    '90%': {
      opacity: 0.1,
    },
    '100%': {
      opacity: 1,
    },
  };

  const contentStyle = {
    position: 'absolute',
    height: direction === 'horizontal' ? '100%' : gaugeValue + '%',
    width: direction === 'horizontal' ? gaugeValue + '%' : '100%',
    backgroundColor: getColor(gradient, gaugeValue),
    animationName: Bool.isTrue(flash) ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  const glossStyle = {
    position: 'absolute',
    height: direction === 'horizontal' ? '1px' : `calc(${gaugeValue}% - 8px)`,
    left: direction === 'horizontal' ? '1px' : '2px',
    bottom: direction === 'horizontal' ? null : '1px',
    top: direction === 'horizontal' ? '2px' : null,
    width: direction === 'horizontal' ? `calc(${gaugeValue}% - 8px)` : '1px',
    margin: direction === 'horizontal' ? '0px 2px' : '2px 0px',
    backgroundColor: theme.palette.ticketGaugeContentGlossy,
    animationName: Bool.isTrue(flash) ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  if (kind === 'mission') {
    //  Compute radius at left border, for including into left of Ticket kind='thin'.
    const topLeftRadius =
      gaugeValue >= 90 ? theme.shapes.ticketRectRadius : '0px';
    const bottomLeftRadius = theme.shapes.ticketRectRadius;

    contentStyle.borderRadius = `${topLeftRadius} 0px 0px ${bottomLeftRadius}`;
    glossStyle.visibility = 'hidden';
  }

  if (kind === 'rounded') {
    boxStyle.borderRadius = '50px';
    boxStyle.backgroundColor = theme.palette.ticketGaugeBackground;
    boxStyle.boxShadow = theme.palette.ticketGaugeBackgroundShadow;
    contentStyle.position = 'absolute';
    contentStyle.bottom = '1px';
    contentStyle.left = '1px';
    contentStyle.borderRadius = '50px';
    contentStyle.width =
      direction === 'horizontal'
        ? `calc(${gaugeValue}% - 2px)`
        : 'calc(100% - 2px)';
    contentStyle.height =
      direction === 'horizontal'
        ? 'calc(100% - 2px)'
        : `calc(${gaugeValue}% - 2px)`;
    contentStyle.boxShadow = theme.palette.ticketGaugeContentShadow;
    if (gaugeValue === 0) {
      boxStyle.border = '1px solid ' + theme.palette.ticketGaugeEmptyBorder;
      boxStyle.backgroundColor = null;
      boxStyle.boxShadow = null;
      contentStyle.visibility = 'hidden';
      glossStyle.visibility = 'hidden';
    }
  }

  if (Bool.isTrue(disabled)) {
    boxStyle.backgroundColor = theme.palette.buttonDisableBackground;
    boxStyle.boxShadow = null;
    contentStyle.visibility = 'hidden';
    glossStyle.visibility = 'hidden';
  }

  return {
    box: boxStyle,
    content: contentStyle,
    gloss: glossStyle,
  };
}

/******************************************************************************/
