import {ColorManipulator} from 'electrum-theme';

//-----------------------------------------------------------------------------

function lighten(theme, color, coefficient) {
  if (theme.palette.isDarkTheme) {
    return ColorManipulator.darken(color, coefficient);
  } else {
    return ColorManipulator.lighten(color, coefficient);
  }
}

function darken(theme, color, coefficient) {
  if (theme.isDarkTheme) {
    return ColorManipulator.lighten(color, coefficient);
  } else {
    return ColorManipulator.darken(color, coefficient);
  }
}

//-----------------------------------------------------------------------------

function getBackgroundColor(theme, props, hover) {
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

  if (hover === 'main') {
    backgroundColor = theme.palette.tableHoverBackground;
  } else if (hover === 'children') {
    if (backgroundColor) {
      backgroundColor = lighten(theme, backgroundColor, 0.5);
    } else {
      backgroundColor = lighten(theme, theme.palette.tableHoverBackground, 0.6);
    }
  }

  return backgroundColor;
}

function getSelectedBackgroundColor(theme, props, hover) {
  let backgroundColor = theme.palette.tableSelectedBackground;

  if (hover === 'main') {
    backgroundColor = darken(theme, backgroundColor, 0.3);
  } else if (hover === 'children') {
    backgroundColor = darken(theme, backgroundColor, 0.6);
  }

  return backgroundColor;
}

//-----------------------------------------------------------------------------

module.exports = {
  getBackgroundColor,
  getSelectedBackgroundColor,
};
