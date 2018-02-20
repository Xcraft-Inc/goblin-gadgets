import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

//  Compute the color of gauge.
//  100 -> red
//    0 -> orange
function getColor (value) {
  if (value) {
    const green = Math.min (Math.max (128 - 128 * value / 100, 0), 128); // 0/100 -> 128/0 (orange/red)
    return `rgb(255,${Math.floor (green)},0)`;
  } else {
    return '#fff';
  }
}

export default function styles (theme, props) {
  const value = Math.max (Math.min (props.value, 100), 0); // 0..100

  const boxStyle = {
    position: 'relative',
    display: 'flex',
    height: '100%',
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
    height: value + '%',
    width: '100%',
    backgroundColor: getColor (value),
    animationName: Bool.isTrue (props.flash) ? keyframes : null,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  };

  const glossStyle = {
    position: 'absolute',
    height: `calc(${value}% - 2px)`,
    left: '2px',
    bottom: '1px',
    width: '1px',
    backgroundColor: theme.palette.ticketGaugeContentGlossy,
    animationName: Bool.isTrue (props.flash) ? keyframes : null,
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
    boxStyle.borderRadius = '4px';
    boxStyle.backgroundColor = theme.palette.ticketGaugeBackground;
    boxStyle.boxShadow = theme.palette.ticketGaugeBackgroundShadow;
    contentStyle.position = 'absolute';
    contentStyle.bottom = '1px';
    contentStyle.left = '1px';
    contentStyle.borderRadius = '1px';
    contentStyle.width = 'calc(100% - 2px)';
    contentStyle.height = `calc(${value}% - 2px)`;
    contentStyle.boxShadow = theme.palette.ticketGaugeContentShadow;
    if (value === 0) {
      boxStyle.border = '1px solid ' + theme.palette.ticketGaugeEmptyBorder;
      boxStyle.backgroundColor = null;
      boxStyle.boxShadow = null;
      contentStyle.visibility = 'hidden';
      glossStyle.visibility = 'hidden';
    }
  }

  if (Bool.isTrue (props.disabled)) {
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
