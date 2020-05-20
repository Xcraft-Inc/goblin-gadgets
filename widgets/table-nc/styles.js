import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'frame',
  'grow',
  'hasButtons',
  'height',
  'headerWithoutHorizontalSeparator',
  'compactMargins',
];

export default function styles(theme, props) {
  const {
    frame,
    grow,
    hasButtons,
    height,
    headerWithoutHorizontalSeparator,
    compactMargins,
  } = props;

  const m = compactMargins ? '0px' : theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.5);

  const border = frame ? '1px solid ' + theme.palette.tableBorder : null;

  const box = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: grow,
    overflowY: 'hidden',
  };

  const filter = {
    margin: '0px 1px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  const table = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
    borderRadius: hasButtons
      ? theme.shapes.tableActionRadius +
        ' ' +
        theme.shapes.tableActionRadius +
        ' 0px 0px'
      : null,
  };

  // If property 'height' is defined, vertical scroller is already visible,
  // for scrolling the body (without header). Header must have a right
  // padding with include the scroller width.
  const paddingRight = height ? Unit.add(theme.shapes.scrollerThickness, m) : m;

  const header = {
    borderBottom: headerWithoutHorizontalSeparator
      ? null
      : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: v1 + ' ' + paddingRight + ' ' + v1 + ' ' + m,
    cursor: 'default',
    backgroundColor: hasButtons ? theme.palette.tableActionBackground : null,
  };

  const postHeader = {
    ...header,
    borderTop: frame ? null : '1px solid ' + theme.palette.tableBorder,
  };

  const body = {
    height: height,
    overflowY: 'auto',
    cursor: 'default',
  };

  const buttons = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  return {
    box,
    filter,
    table,
    postHeader,
    header,
    body,
    buttons,
  };
}

/******************************************************************************/
