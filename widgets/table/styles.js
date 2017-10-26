import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;
  const border = Bool.isTrue (props.frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const tableStyle = {
    height: props.height,
    cursor: 'default',
    overflowY: 'auto',
    border: border,
  };

  const headerStyle = {
    borderBottom: '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m,
    cursor: 'default',
  };

  return {
    table: tableStyle,
    header: headerStyle,
  };
}

/******************************************************************************/
