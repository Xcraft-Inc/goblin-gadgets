/******************************************************************************/

export default function styles (theme, props) {
  let minWidth = null;

  if (props.width) {
    minWidth = props.width;
  }

  const boxStyle = {
    minWidth: minWidth,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
