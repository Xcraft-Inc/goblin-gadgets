import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

//  Compute the color of gauge.
function getColor(theme, gradient, color, value) {
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
    } else if (gradient === 'blue-petrol-green') {
      if (value < 0.5) {
        // From blue to purple.
        value = value * 2; // 0..1
        blue = 255;
        red = 0;
        green = 255 * value; // 0/1 -> 0/255
      } else {
        // From purple to green.
        value = (value - 0.5) * 2; // 0..1
        blue = 255 - 255 * value; // 0/1 -> 255/0
        green = 255;
      }
      red = 0;
    } else if (gradient === 'fix') {
      return ColorHelpers.getMarkColor(theme, color);
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
  'width',
  'height',
  'color',
  'displayZero',
];

export default function styles(theme, props) {
  const {
    value,
    direction,
    flash,
    kind,
    disabled,
    gradient,
    width,
    height,
    color,
    displayZero,
  } = props;

  const gaugeValue = Math.max(Math.min(value, 100), 0); // 0..100

  const gauge = {
    position: 'relative',
    display: 'flex',
    height: height || (direction === 'horizontal' ? null : '100%'),
    width: width || (direction === 'horizontal' ? '100%' : null),
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

  const content = {
    position: 'absolute',
    height: direction === 'horizontal' ? '100%' : gaugeValue + '%',
    width: direction === 'horizontal' ? gaugeValue + '%' : '100%',
    backgroundColor: getColor(theme, gradient, color, gaugeValue),
    animationName: flash ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  const gloss = {
    position: 'absolute',
    height: direction === 'horizontal' ? '1px' : `calc(${gaugeValue}% - 8px)`,
    left: direction === 'horizontal' ? '1px' : '2px',
    bottom: direction === 'horizontal' ? null : '1px',
    top: direction === 'horizontal' ? '2px' : null,
    width: direction === 'horizontal' ? `calc(${gaugeValue}% - 8px)` : '1px',
    margin: direction === 'horizontal' ? '0px 2px' : '2px 0px',
    backgroundColor: theme.palette.ticketGaugeContentGlossy,
    animationName: flash ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  if (kind === 'mission') {
    //  Compute radius at left border, for including into left of Ticket kind='thin'.
    const topLeftRadius =
      gaugeValue >= 90 ? theme.shapes.ticketRectRadius : '0px';
    const bottomLeftRadius = theme.shapes.ticketRectRadius;

    content.borderRadius = `${topLeftRadius} 0px 0px ${bottomLeftRadius}`;
    gloss.visibility = 'hidden';
  } else {
    if (kind === 'rounded') {
      gauge.borderRadius = '50px';
      content.borderRadius = '50px';
    } else if (kind === 'simple') {
      gloss.visibility = 'hidden';
    }
    gauge.backgroundColor = theme.palette.ticketGaugeBackground;
    gauge.boxShadow = theme.palette.ticketGaugeBackgroundShadow;
    content.position = 'absolute';
    content.bottom = '1px';
    content.left = '1px';
    content.width =
      direction === 'horizontal'
        ? `calc(${gaugeValue}% - 2px)`
        : 'calc(100% - 2px)';
    content.height =
      direction === 'horizontal'
        ? 'calc(100% - 2px)'
        : `calc(${gaugeValue}% - 2px)`;
    content.boxShadow = theme.palette.ticketGaugeContentShadow;
    if (gaugeValue === 0 && !displayZero) {
      gauge.border = '1px solid ' + theme.palette.ticketGaugeEmptyBorder;
      gauge.backgroundColor = null;
      gauge.boxShadow = null;
      content.visibility = 'hidden';
      gloss.visibility = 'hidden';
    }
  }

  if (disabled) {
    gauge.backgroundColor = theme.palette.buttonDisableBackground;
    gauge.boxShadow = null;
    content.visibility = 'hidden';
    gloss.visibility = 'hidden';
  }

  return {
    gauge,
    content,
    gloss,
  };
}

/******************************************************************************/
