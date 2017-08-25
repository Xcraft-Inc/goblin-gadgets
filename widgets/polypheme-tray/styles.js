/******************************************************************************/

export default function styles (theme, props) {
  const left = props.left;
  const right = props.right;
  const top = props.top;
  const bottom = props.bottom;

  const boxStyle = {
    position: 'absolute',
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    backgroundColor: theme.palette.ticketGlueBackground,
    boxShadow: theme.shapes.ticketGlueShadow,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
