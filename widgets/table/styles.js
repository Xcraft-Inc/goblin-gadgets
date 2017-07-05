import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const tableStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    margin: '0px ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1),
    cursor: 'default',
    overflowX: 'auto',
    overflowY: 'hidden',
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
