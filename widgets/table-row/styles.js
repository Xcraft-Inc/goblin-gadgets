import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;

  let backgroundColor = props.row.get('backgroundColor');
  // Map symbolic colors from mission-checker (or other).
  switch (backgroundColor) {
    case 'warning':
      backgroundColor = theme.palette.tableWarningBackground;
      break;
    case 'error':
      backgroundColor = theme.palette.tableErrorBackground;
      break;
    case 'success':
      backgroundColor = theme.palette.tableSuccessBackground;
      break;
  }

  const rowStyle = {
    borderBottom:
      props.horizontalSeparator === 'none'
        ? null
        : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
    padding: '0px ' + m,
    backgroundColor: backgroundColor,
    cursor: 'default',
    ':hover': {backgroundColor: theme.palette.tableHoverBackground},
  };

  const rowSelectedStyle = {
    borderBottom:
      props.horizontalSeparator === 'none'
        ? null
        : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
    padding: '0px ' + m,
    backgroundColor: theme.palette.tableSelectedBackground,
    color: theme.palette.tableSelectedText,
    cursor: 'default',
    ':hover': {
      backgroundColor: ColorManipulator.emphasize(
        theme.palette.tableSelectedBackground,
        0.2
      ),
    },
  };

  const cellStyle = {
    padding: theme.shapes.tablePadding + ' 0px',
    fontSize: theme.shapes.tableTextSize,
    cursor: 'default',
  };

  return {
    row: rowStyle,
    rowSelected: rowSelectedStyle,
    cell: cellStyle,
  };
}

/******************************************************************************/
