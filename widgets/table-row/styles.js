import {Unit} from 'electrum-theme';
const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export const propNames = ['topSeparator', 'bottomSeparator', 'isLast', 'row'];

export function mapProps(props) {
  const {row, ...otherProps} = props;
  if (row) {
    return {
      ...otherProps,
      backgroundColor: row.get('backgroundColor'),
    };
  }
  return otherProps;
}

export default function styles(theme, props) {
  const {backgroundColor, topSeparator, bottomSeparator, isLast} = props;

  const m = theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.75);
  const v2 = Unit.multiply(theme.shapes.tablePadding, 0.25);

  // When a row is drawn, it is always only its top separator that is drawn.
  const borderTop = topSeparator
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  // Increases the corresponding margins if there is an upper or lower separator.
  const paddingTop = topSeparator ? v1 : v2;
  const paddingBottom = bottomSeparator || isLast ? v1 : v2;

  const rowStyle = {
    borderTop: borderTop,
    display: 'flex',
    flexDirection: 'row',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    backgroundColor: TableHelpers.getBackgroundColor(
      theme,
      backgroundColor,
      'none'
    ),
    cursor: 'default',
    ':hover': {
      backgroundColor: TableHelpers.getBackgroundColor(
        theme,
        backgroundColor,
        'main'
      ),
    },
  };

  const rowSelectedStyle = {
    borderTop: borderTop,
    display: 'flex',
    flexDirection: 'row',
    padding: paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    backgroundColor: TableHelpers.getSelectedBackgroundColor(theme, 'none'),
    color: theme.palette.tableSelectedText,
    cursor: 'default',
    ':hover': {
      backgroundColor: TableHelpers.getSelectedBackgroundColor(theme, 'main'),
    },
  };

  return {
    row: rowStyle,
    rowSelected: rowSelectedStyle,
  };
}

/******************************************************************************/
