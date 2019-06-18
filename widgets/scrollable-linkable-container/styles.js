/******************************************************************************/

export const propNames = ['kind', 'height'];

export default function styles(theme, props) {
  const {kind, height} = props;

  let flexGrow = '1';
  let overflowY = 'auto';
  let boxHeight = null;
  let margin = null;
  let padding = null;
  let cursor = null;

  const m = theme.shapes.containerMargin;

  if (kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
  }

  if (kind === 'table-body') {
    flexGrow = null;
    overflowY = height ? 'scroll' : 'hidden';
    boxHeight = height;
    cursor = 'default';
  }

  const box = {
    flexGrow: flexGrow,
    overflowY: overflowY,
    height: boxHeight,
    margin: margin,
    padding: padding,
    cursor: cursor,
  };

  return {
    box,
  };
}

/******************************************************************************/
