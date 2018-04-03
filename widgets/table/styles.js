import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;

  const border = Bool.isTrue(props.frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const boxStyle = {
    flexGrow: props.grow,
  };

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

  const verticalSeparatorStyle = {
    visibility: Bool.isTrue(props.frame) && props.height ? 'visible' : 'hidden',
    position: 'absolute',
    height: '100%',
    top: '0px',
    right: Unit.add(theme.shapes.scrollerThickness, '1px'),
    borderRight: '1px solid ' + theme.palette.tableBorder,
  };

  const buttonsStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    marginTop: '-1px',
  };

  return {
    box: boxStyle,
    table: tableStyle,
    header: headerStyle,
    body: bodyStyle,
    verticalSeparator: verticalSeparatorStyle,
    buttons: buttonsStyle,
  };
}

/******************************************************************************/
