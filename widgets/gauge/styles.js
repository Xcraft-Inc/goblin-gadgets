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
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
  };

  //  Compute radius at left border, for including into left of Ticket kind='thin'.
  const topLeftRadius = value >= 90 ? theme.shapes.ticketRectRadius : '0px';
  const bottomLeftRadius = theme.shapes.ticketRectRadius;

  const contentStyle = {
    height: value + '%',
    width: '100%',
    borderRadius: `${topLeftRadius} 0px 0px ${bottomLeftRadius}`,
    backgroundColor: getColor (value),
    animation: Bool.isTrue (props.flash)
      ? 'gauge-flash linear 1s infinite'
      : null,
  };

  return {
    box: boxStyle,
    content: contentStyle,
  };
}

/******************************************************************************/
