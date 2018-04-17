import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

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
    backgroundColor: backgroundColor,
    cursor: 'default',
    ':hover': {backgroundColor: theme.palette.tableHoverBackground},
  };

  const rowSelectedStyle = {
    borderTop: borderTop,
    borderBottom: borderBottom,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
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
