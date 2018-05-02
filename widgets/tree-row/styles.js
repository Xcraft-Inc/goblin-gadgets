const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  const m = theme.shapes.containerMargin;

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor: TableHelpers.getBackgroundColor(theme, props, props.hover),
    cursor: 'default',
  };

  const rowSelectedStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor: TableHelpers.getSelectedBackgroundColor(
      theme,
      props,
      props.hover
    ),
    color: theme.palette.tableSelectedText,
    cursor: 'default',
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
