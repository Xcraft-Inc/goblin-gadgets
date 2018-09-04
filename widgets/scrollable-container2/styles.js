/******************************************************************************/

export default function styles(theme, props) {
  let flexGrow = '1';
  let overflowY = 'auto';
  let height = null;
  let margin = null;
  let padding = null;
  let cursor = null;

  const m = theme.shapes.containerMargin;

  if (props.kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
  }

  if (props.kind === 'table-body') {
    flexGrow = null;
    overflowY = props.height ? 'scroll' : 'hidden';
    height = props.height;
    cursor = 'default';
  }

  const box = {
    flexGrow: flexGrow,
    overflowY: overflowY,
    height: height,
    margin: margin,
    padding: padding,
    cursor: cursor,
  };

  return {
    box,
  };
}

/******************************************************************************/
