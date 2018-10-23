/******************************************************************************/

export const propNames = ['direction', 'width', 'height'];

export default function styles(theme, props) {
  const {direction: directionProp, width, height} = props;

  let direction, wrap, overflowX, overflowY;
  switch (directionProp) {
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
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: width ? null : '1',
  };

  const rowsStyle = {
    width,
    height,
    display: 'flex',
    flexDirection: direction,
    flexGrow: width ? null : '1',
    flexWrap: wrap,
    alignItems: 'flex-start',
    overflowX: overflowX,
    overflowY: overflowY,
  };

  const headerStyle = {
    minHeight: '32px',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row',
    margin: '-5px 0px 5px 0px',
  };

  return {
    box: boxStyle,
    rows: rowsStyle,
    header: headerStyle,
  };
}

/******************************************************************************/
