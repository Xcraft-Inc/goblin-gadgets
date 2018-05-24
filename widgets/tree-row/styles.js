const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor:
      TableHelpers.getBackgroundColor(theme, props, 'none') + ' !important',
    cursor: 'default',
    ':hover': {
      backgroundColor:
        TableHelpers.getBackgroundColor(theme, props, 'main') + ' !important',
    },
  };

  const rowSelectedStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor:
      TableHelpers.getSelectedBackgroundColor(theme, props, 'none') +
      ' !important',
    color: theme.palette.tableSelectedText,
    cursor: 'default',
    ':hover': {
      backgroundColor:
        TableHelpers.getSelectedBackgroundColor(theme, props, 'main') +
        ' !important',
    },
  };

  const expandButtonStyle = {
    width: theme.shapes.treeExpandButtonWidth,
    height: theme.shapes.treeExpandButtonWidth,
    transform: props.isExpanded ? 'rotate(90deg)' : null,
    transition: theme.transitions.easeOut(),
  };

  const cellStyle = {
    padding: theme.shapes.tablePadding + ' 0px',
    fontSize: theme.shapes.treeTextSize,
    cursor: 'default',
  };

  return {
    row: rowStyle,
    rowSelected: rowSelectedStyle,
    expandButton: expandButtonStyle,
    cell: cellStyle,
  };
}

/******************************************************************************/
