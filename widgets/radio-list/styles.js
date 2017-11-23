/******************************************************************************/

export default function styles (theme, props) {
  let direction, wrap, overflowX, overflowY;
  switch (props.direction) {
    case 'row':
      direction = 'row';
      wrap = null;
      overflowX = 'auto';
      overflowY = null;
      break;
    case 'wrap':
      direction = 'column';
      wrap = 'wrap';
      overflowX = 'auto';
      overflowY = null;
      break;
    default:
      // column
      direction = 'column';
      wrap = null;
      overflowX = null;
      overflowY = 'auto';
      break;
  }

  const boxStyle = {
    width: props.width,
    height: props.height,
    display: 'flex',
    flexDirection: direction,
    flexGrow: props.width ? null : '1',
    flexWrap: wrap,
    alignItems: 'flex-start',
    overflowX: overflowX,
    overflowY: overflowY,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
