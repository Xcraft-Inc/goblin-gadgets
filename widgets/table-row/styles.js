import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;
  const last = props.index >= props.count - 1;
  const border = last ? null : '1px solid ' + theme.palette.tableBorder;

  const rowStyle = {
    borderBottom: border,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m,
    backgroundColor: props.row.get('backgroundColor'),
    cursor: 'default',
    ':hover': {backgroundColor: theme.palette.tableHoverBackground},
  };

  const rowSelectedStyle = {
    borderBottom: border,
    display: 'flex',
    flexDirection: 'row',
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
