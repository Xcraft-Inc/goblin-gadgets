import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

function lighten(theme, color, value) {
  if (theme.palette.isDarkTheme) {
    return ColorManipulator.darken(color, value);
  } else {
    return ColorManipulator.lighten(color, value);
  }
}

function darken(theme, color, value) {
  if (theme.isDarkTheme) {
    return ColorManipulator.lighten(color, value);
  } else {
    return ColorManipulator.darken(color, value);
  }
}

function getBackgroundColor(theme, props) {
  let backgroundColor = props.row.get('backgroundColor');
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

  if (props.hover === 'main') {
    backgroundColor = theme.palette.tableHoverBackground;
  } else if (props.hover === 'children') {
    if (backgroundColor) {
      backgroundColor = lighten(theme, backgroundColor, 0.5);
    } else {
      backgroundColor = lighten(theme, theme.palette.tableHoverBackground, 0.6);
    }
  }

  return backgroundColor;
}

function getSelectedBackgroundColor(theme, props) {
  let backgroundColor = theme.palette.tableSelectedBackground;

  if (props.hover === 'main') {
    backgroundColor = darken(theme, backgroundColor, 0.3);
  } else if (props.hover === 'children') {
    backgroundColor = darken(theme, backgroundColor, 0.6);
  }

  return backgroundColor;
}

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
    backgroundColor: getBackgroundColor(theme, props),
    cursor: 'default',
  };

  const rowSelectedStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + m + ' 0px 0px',
    backgroundColor: getSelectedBackgroundColor(theme, props),
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
