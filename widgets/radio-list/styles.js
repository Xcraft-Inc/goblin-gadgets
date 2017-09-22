/******************************************************************************/

export default function styles (theme, props) {
  const boxStyle = {
    display: 'flex',
    flexDirection: props.direction ? props.direction : 'column',
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
