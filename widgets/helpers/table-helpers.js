const {ColorManipulator} = require('goblin-theme');

//-----------------------------------------------------------------------------

function lighten(theme, color, coefficient, props) {
  if ((props && !props.darkTheme) || theme.palette.isDarkTheme) {
    return ColorManipulator.darken(color, coefficient);
  } else {
    return ColorManipulator.lighten(color, coefficient);
  }
}

function darken(theme, color, coefficient, props) {
  if ((props && !props.darkTheme) || theme.isDarkTheme) {
    return ColorManipulator.lighten(color, coefficient);
  } else {
    return ColorManipulator.darken(color, coefficient);
  }
}

//-----------------------------------------------------------------------------

function getBackgroundColor(theme, backgroundColor, hover, props) {
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

  const hoverBackgroundColor =
    props && props.hoverBackgroundColor
      ? props.hoverBackgroundColor
      : theme.palette.tableHoverBackground;

  if (hover === 'main') {
    backgroundColor = hoverBackgroundColor;
  } else if (hover === 'children') {
    if (backgroundColor) {
      backgroundColor = lighten(theme, backgroundColor, 0.5, props);
    } else {
      backgroundColor = lighten(theme, hoverBackgroundColor, 0.6, props);
    }
  }

  return backgroundColor;
}

function getSelectedBackgroundColor(theme, hover, props) {
  let backgroundColor =
    props && props.selectedBackgroundColor
      ? props.selectedBackgroundColor
      : theme.palette.tableSelectedBackground;

  if (hover === 'main') {
    backgroundColor = darken(theme, backgroundColor, 0.3, props);
  } else if (hover === 'children') {
    backgroundColor = darken(theme, backgroundColor, 0.6, props);
  }

  return backgroundColor;
}

//-----------------------------------------------------------------------------

module.exports = {
  getBackgroundColor,
  getSelectedBackgroundColor,
};
