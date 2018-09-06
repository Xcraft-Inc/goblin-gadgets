/******************************************************************************/

export default function styles(theme, props) {
  let flexGrow = '1';
  let overflowX = 'auto';
  let overflowY = 'auto';
  let width = props.width;
  let height = props.height;
  let margin = null;
  let padding = null;
  let cursor = null;

  const m = theme.shapes.containerMargin;
  const isHorizontal = props.direction === 'horizontal';

  if (props.kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
  }

  if (props.kind === 'table-body') {
    flexGrow = null;
    overflowX = isHorizontal && props.width ? 'scroll' : 'hidden';
    overflowY = !isHorizontal && props.height ? 'scroll' : 'hidden';
    cursor = 'default';
  }

  const box = {
    flexGrow,
    overflowX,
    overflowY,
    width,
    height,
    margin,
    padding,
    cursor,
  };

  return {
    box,
  };
}

/******************************************************************************/
