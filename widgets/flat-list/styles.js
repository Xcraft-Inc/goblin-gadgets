/******************************************************************************/

export default function styles(theme) {
  const box = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.comboItemBackground,
    boxSizing: 'content-box',
    boxShadow: theme.shapes.calendarShadow,
    overflowX: 'overlay',
    cursor: 'default',
    userSelect: 'none',
    borderRadius: theme.shapes.smoothRadius,
    padding: theme.shapes.menuPadding,
  };

  const hidden = {
    position: 'absolute',
    visibility: 'hidden',
    overflow: 'auto',
  };

  return {
    box,
    hidden,
  };
}

/******************************************************************************/
