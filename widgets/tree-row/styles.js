import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

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
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor: backgroundColor,
    cursor: 'default',
    ':hover': {backgroundColor: theme.palette.tableHoverBackground},
  };

  const rowSelectedStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
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
