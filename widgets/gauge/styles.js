import * as Bool from 'gadgets/helpers/bool-helpers';

/******************************************************************************/

//  Compute the color of gauge.
function getColor(props, value) {
  if (value) {
    value /= 100; // 0..1
    let red, green, blue;
    if (props.gradient === 'red-yellow-green') {
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
    } else if (props.gradient === 'yellow-green') {
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

export default function styles(theme, props) {
  // TODO: props.value should not be used in styles.js as it can take many different values

  const value = Math.max(Math.min(props.value, 100), 0); // 0..100

  const boxStyle = {
    position: 'relative',
    display: 'flex',
    height: props.direction === 'horizontal' ? null : '100%',
    width: props.direction === 'horizontal' ? '100%' : null,
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
    height: props.direction === 'horizontal' ? '100%' : value + '%',
    width: props.direction === 'horizontal' ? value + '%' : '100%',
    backgroundColor: getColor(props, value),
    animationName: Bool.isTrue(props.flash) ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  const glossStyle = {
    position: 'absolute',
    height: props.direction === 'horizontal' ? '1px' : `calc(${value}% - 8px)`,
    left: props.direction === 'horizontal' ? '1px' : '2px',
    bottom: props.direction === 'horizontal' ? null : '1px',
    top: props.direction === 'horizontal' ? '2px' : null,
    width: props.direction === 'horizontal' ? `calc(${value}% - 8px)` : '1px',
    margin: props.direction === 'horizontal' ? '0px 2px' : '2px 0px',
    backgroundColor: theme.palette.ticketGaugeContentGlossy,
    animationName: Bool.isTrue(props.flash) ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  if (props.kind === 'mission') {
    //  Compute radius at left border, for including into left of Ticket kind='thin'.
    const topLeftRadius = value >= 90 ? theme.shapes.ticketRectRadius : '0px';
    const bottomLeftRadius = theme.shapes.ticketRectRadius;

    contentStyle.borderRadius = `${topLeftRadius} 0px 0px ${bottomLeftRadius}`;
    glossStyle.visibility = 'hidden';
  }

  if (props.kind === 'rounded') {
    boxStyle.borderRadius = '50px';
    boxStyle.backgroundColor = theme.palette.ticketGaugeBackground;
    boxStyle.boxShadow = theme.palette.ticketGaugeBackgroundShadow;
    contentStyle.position = 'absolute';
    contentStyle.bottom = '1px';
    contentStyle.left = '1px';
    contentStyle.borderRadius = '50px';
    contentStyle.width =
      props.direction === 'horizontal'
        ? `calc(${value}% - 2px)`
        : 'calc(100% - 2px)';
    contentStyle.height =
      props.direction === 'horizontal'
        ? 'calc(100% - 2px)'
        : `calc(${value}% - 2px)`;
    contentStyle.boxShadow = theme.palette.ticketGaugeContentShadow;
    if (value === 0) {
      boxStyle.border = '1px solid ' + theme.palette.ticketGaugeEmptyBorder;
      boxStyle.backgroundColor = null;
      boxStyle.boxShadow = null;
      contentStyle.visibility = 'hidden';
      glossStyle.visibility = 'hidden';
    }
  }

  if (Bool.isTrue(props.disabled)) {
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
