import {Unit} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export const propNames = [
  'frame',
  'grow',
  'hasButtons',
  'height',
  'headerWithoutHorizontalSeparator',
];

export default function styles(theme, props) {
  const {
    frame,
    grow,
    hasButtons,
    height,
    headerWithoutHorizontalSeparator,
  } = props;

  const m = theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.5);

  const border = Bool.isTrue(frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const box = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: grow,
    overflowY: 'hidden',
  };

  const table = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
    borderRadius: Bool.isTrue(hasButtons)
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
    borderBottom: Bool.isTrue(headerWithoutHorizontalSeparator)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: v1 + ' ' + paddingRight + ' ' + v1 + ' ' + m,
    cursor: 'default',
    backgroundColor: Bool.isTrue(hasButtons)
      ? theme.palette.tableActionBackground
      : null,
  };

  const postHeader = {
    ...header,
    borderTop: Bool.isTrue(frame)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
  };

  const body = {
    height: height,
    overflowY: height ? 'scroll' : 'hidden',
    cursor: 'default',
  };

  const verticalSeparator = {
    visibility: Bool.isTrue(frame) && height ? 'visible' : 'hidden',
    position: 'absolute',
    height: '100%',
    top: '0px',
    right: Unit.add(theme.shapes.scrollerThickness, '1px'),
    borderRight: '1px solid ' + theme.palette.tableBorder,
  };

  const buttons = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  return {
    box,
    table,
    postHeader,
    header,
    body,
    verticalSeparator,
    buttons,
  };
}

/******************************************************************************/
