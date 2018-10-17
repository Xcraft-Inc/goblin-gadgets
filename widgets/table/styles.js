import {Unit} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.5);

  const border = Bool.isTrue(props.frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const box = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: props.grow,
    overflowY: 'hidden',
  };

  const table = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: props.grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
    borderRadius: Bool.isTrue(props.hasButtons)
      ? theme.shapes.tableActionRadius +
        ' ' +
        theme.shapes.tableActionRadius +
        ' 0px 0px'
      : null,
  };

  // If property 'height' is defined, vertical scroller is already visible,
  // for scrolling the body (without header). Header must have a right
  // padding with include the scroller width.
  const paddingRight = props.height
    ? Unit.add(theme.shapes.scrollerThickness, m)
    : m;

  const header = {
    borderBottom: Bool.isTrue(props.headerWithoutHorizontalSeparator)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: v1 + ' ' + paddingRight + ' ' + v1 + ' ' + m,
    cursor: 'default',
    backgroundColor: Bool.isTrue(props.hasButtons)
      ? theme.palette.tableActionBackground
      : null,
  };

  const preHeader = {
    ...header,
    borderTop: Bool.isTrue(props.frame)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
  };

  const postHeader = {
    ...header,
    borderBottom: Bool.isTrue(props.frame)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
  };

  const body = {
    height: props.height,
    overflowY: props.height ? 'scroll' : 'hidden',
    cursor: 'default',
  };

  const verticalSeparator = {
    visibility: Bool.isTrue(props.frame) && props.height ? 'visible' : 'hidden',
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
    preHeader,
    postHeader,
    header,
    body,
    verticalSeparator,
    buttons,
  };
}

/******************************************************************************/
