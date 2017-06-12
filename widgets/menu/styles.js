/******************************************************************************/

export default function styles (theme, props) {
  const inputWidth = props.width;

  let minWidth = null;

  if (inputWidth) {
    minWidth = inputWidth;
  }

  const boxStyle = {
    minWidth: minWidth,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
