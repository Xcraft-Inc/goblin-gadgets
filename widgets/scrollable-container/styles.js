/******************************************************************************/

export default function styles(theme, props) {
  let display = props.display;
  let flexDirection = props.flexDirection;
  let flexGrow = '1';
  let flexBasis = null;
  let flexShrink = null;
  let overflowX = 'auto';
  let overflowY = 'auto';
  let width = props.width;
  let height = props.height;
  let margin = null;
  let padding = null;
  let cursor = null;

  const m = theme.shapes.containerMargin;

  if (props.kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
    flexBasis = '0';
    flexShrink = '1';
  }

  if (props.kind === 'table-body') {
    flexGrow = null;
    overflowX = 'hidden';
    overflowY = props.height ? 'scroll' : 'hidden';
    cursor = 'default';
  }

  const box = {
    display,
    flexDirection,
    flexGrow,
    flexBasis,
    flexShrink,
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
