const TableHelpers = require('gadgets/helpers/table-helpers');
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;

  const borderTop =
    props.horizontalSeparator === 'up' || props.horizontalSeparator === 'both'
      ? '1px solid ' + theme.palette.tableBorder
      : null;

  const borderBottom =
    props.horizontalSeparator === 'none' || props.horizontalSeparator === 'up'
      ? null
      : '1px solid ' + theme.palette.tableBorder;

  const paddingTop = '0px';
  const paddingBottom =
    props.level > 0 &&
    Bool.isTrue(props.verticalSpacingAfterLast) &&
    Bool.isTrue(props.isLast)
      ? theme.shapes.tablePadding
      : '0px';

  const rowStyle = {
    borderTop: borderTop,
    borderBottom: borderBottom,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    backgroundColor: TableHelpers.getBackgroundColor(theme, props, 'none'),
    cursor: 'default',
    ':hover': {
      backgroundColor: TableHelpers.getBackgroundColor(theme, props, 'main'),
    },
  };

  const rowSelectedStyle = {
    borderTop: borderTop,
    borderBottom: borderBottom,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    backgroundColor: TableHelpers.getSelectedBackgroundColor(
      theme,
      props,
      'none'
    ),
    color: theme.palette.tableSelectedText,
    cursor: 'default',
    ':hover': {
      backgroundColor: TableHelpers.getSelectedBackgroundColor(
        theme,
        props,
        'main'
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
