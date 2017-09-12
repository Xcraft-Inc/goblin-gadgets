/******************************************************************************/

export default function styles (theme, props) {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: theme.palette.chronoNavigatorBackground,
  };

  const navigationStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.shapes.chronosNavigatorMargin,
    overflowX: 'hidden',
    overflowY: 'auto',
  };

  const topStyle = {
    minHeight: theme.shapes.chronosTopHeight,
    maxHeight: theme.shapes.chronosTopHeight,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.chronoDayBackground,
    userSelect: 'none',
    cursor: 'default',
  };

  const topLabelStyle = {
    minHeight: theme.shapes.chronosTopHeight,
    maxHeight: theme.shapes.chronosTopHeight,
    paddingLeft: theme.shapes.chronosLabelMargin,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    userSelect: 'none',
    cursor: 'default',
  };

  const topEventStyle = {
    position: 'relative',
    minHeight: theme.shapes.chronosTopHeight,
    maxHeight: theme.shapes.chronosTopHeight,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'default',
  };

  const sepStyle = {
    minHeight: theme.shapes.chronosSeparatorHeight,
    maxHeight: theme.shapes.chronosSeparatorHeight,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
  };

  return {
    main: mainStyle,
    navigation: navigationStyle,
    top: topStyle,
    topLabel: topLabelStyle,
    topEvent: topEventStyle,
    sep: sepStyle,
  };
}

/******************************************************************************/
