import {Unit} from 'electrum-theme';
const TableHelpers = require('gadgets/helpers/table-helpers');
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.75);
  const v2 = Unit.multiply(theme.shapes.tablePadding, 0.25);

  const borderTop = props.topSeparator
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const paddingTop = props.topSeparator ? v1 : v2;
  const paddingBottom = props.bottomSeparator || props.isLast ? v1 : v2;

  const rowStyle = {
    borderTop: borderTop,
    display: 'flex',
    flexDirection: 'row',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    backgroundColor: TableHelpers.getBackgroundColor(theme, props, 'none'),
    cursor: 'default',
    ':hover': {
      backgroundColor: TableHelpers.getBackgroundColor(theme, props, 'main'),
    },
  };

  const rowSelectedStyle = {
    borderTop: borderTop,
    display: 'flex',
    flexDirection: 'row',
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

  return {
    row: rowStyle,
    rowSelected: rowSelectedStyle,
  };
}

/******************************************************************************/
