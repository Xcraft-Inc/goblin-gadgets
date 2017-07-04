/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const rowStyle = {
    borderBottom: '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m,
    cursor: 'default',
  };

  const rowHoverStyle = {
    borderBottom: '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m,
    backgroundColor: theme.palette.tableHoverBackground,
    cursor: 'default',
  };

  const rowSelectedStyle = {
    borderBottom: '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m,
    backgroundColor: theme.palette.tableSelectedBackground,
    color: theme.palette.tableSelectedText,
    cursor: 'default',
  };

  const cellStyle = {
    padding: theme.shapes.tablePadding + ' 0px',
    fontSize: theme.shapes.tableTextSize,
    cursor: 'default',
  };

  return {
    row: rowStyle,
    rowHover: rowHoverStyle,
    rowSelected: rowSelectedStyle,
    cell: cellStyle,
  };
}

/******************************************************************************/
