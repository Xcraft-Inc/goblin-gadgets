/******************************************************************************/

//  Compute the color of gauge.
//  100 -> red
//   75 -> orange
//   50 -> yellow
//   25 -> yellow
//    0 -> yellow
function getColor (value) {
  if (value) {
    value = Math.max (value * 2 - 100, 0); // 100/50/0 -> 100/0/0
    const green = Math.floor ((100 - value) * 2.55);
    return `rgb(255,${green},0)`;
  } else {
    return '#fff';
  }
}

export default function styles (theme, props) {
  const inputValue = Math.max (Math.min (props.value, 100), 0); // 0..100

  const boxStyle = {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
  };

  //  Compute radius at left border, for including into left of Ticket kind='thin'.
  const topLeftRadius = inputValue >= 90
    ? theme.shapes.ticketRectRadius
    : '0px';
  const bottomLeftRadius = theme.shapes.ticketRectRadius;

  const contentStyle = {
    height: inputValue + '%',
    width: '100%',
    borderRadius: `${topLeftRadius} 0px 0px ${bottomLeftRadius}`,
    backgroundColor: getColor (inputValue),
  };

  return {
    box: boxStyle,
    content: contentStyle,
  };
}

/******************************************************************************/
