/******************************************************************************/

export const propNames = [
  'kind',
  'display',
  'flexDirection',
  'width',
  'height',
];

export default function styles(theme, props) {
  const {kind, display, flexDirection, width, height} = props;

  let flexGrow = '1';
  let flexBasis = null;
  let flexShrink = null;
  let overflowX = 'auto';
  let overflowY = 'auto';
  let margin = null;
  let padding = null;
  let cursor = null;

  const m = theme.shapes.containerMargin;

  if (kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
    flexBasis = '0';
    flexShrink = '1';
  }

  if (kind === 'table-body') {
    flexGrow = null;
    overflowX = 'hidden';
    overflowY = height ? 'scroll' : 'hidden';
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
