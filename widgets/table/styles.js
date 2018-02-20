import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;
  const border = Bool.isTrue(props.frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const tableStyle = {
    flexGrow: props.grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
  };

  // If property 'height' is defined, vertical scroller is already visible,
  // for scrolling the body (without header). Header must have a right
  // padding with include the scroller width.
  const paddingRight = props.height
    ? Unit.add(theme.shapes.scrollerThickness, m)
    : m;

  const headerStyle = {
    borderBottom: '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + paddingRight + ' 0px ' + m,
    cursor: 'default',
  };

  const bodyStyle = {
    height: props.height,
    overflowY: props.height ? 'scroll' : 'hidden',
    cursor: 'default',
  };

  return {
    table: tableStyle,
    header: headerStyle,
    body: bodyStyle,
  };
}

/******************************************************************************/
