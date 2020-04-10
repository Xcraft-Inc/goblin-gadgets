//T:2019-02-27

const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export const propNames = ['row', 'isExpanded'];

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
  const {backgroundColor, isExpanded} = props;

  const m = theme.shapes.containerMargin;

  const rowStyle = {
    'display': 'flex',
    'flexDirection': 'row',
    'padding': '0px ' + m + ' 0px 0px',
    'backgroundColor':
      TableHelpers.getBackgroundColor(theme, backgroundColor, 'none') +
      ' !important',
    'cursor': 'default',
    ':hover': {
      backgroundColor:
        TableHelpers.getBackgroundColor(theme, backgroundColor, 'main') +
        ' !important',
    },
  };

  const rowSelectedStyle = {
    'display': 'flex',
    'flexDirection': 'row',
    'padding': '0px ' + m + ' 0px 0px',
    'backgroundColor':
      TableHelpers.getSelectedBackgroundColor(theme, 'none') + ' !important',
    'color': theme.palette.tableSelectedText,
    'cursor': 'default',
    ':hover': {
      backgroundColor:
        TableHelpers.getSelectedBackgroundColor(theme, 'main') + ' !important',
    },
  };

  const expandButtonStyle = {
    width: theme.shapes.treeExpandButtonWidth,
    height: theme.shapes.treeExpandButtonWidth,
    transform: isExpanded ? 'rotate(90deg)' : null,
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
