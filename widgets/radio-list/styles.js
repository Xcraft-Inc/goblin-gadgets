/******************************************************************************/

export default function styles (theme, props) {
  let direction, wrap;
  switch (props.direction) {
    case 'row':
      direction = 'row';
      wrap = null;
      break;
    case 'column':
      direction = 'column';
      wrap = null;
      break;
    case 'wrap':
      direction = 'column';
      wrap = 'wrap';
      break;
    default:
      direction = 'column';
      wrap = null;
      break;
  }

  const boxStyle = {
    height: props.height,
    display: 'flex',
    flexDirection: direction,
    alignItems: 'flex-start',
    flexWrap: wrap,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
