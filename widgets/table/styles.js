import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const tableStyle = {
    height: props.height,
    margin: '0px ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1),
    cursor: 'default',
    overflowY: 'auto',
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
