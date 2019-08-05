/******************************************************************************/

export default function styles(theme) {
  const box = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    boxSizing: 'content-box',
    boxShadow: theme.shapes.calendarShadow,
    overflowX: 'overlay',
    cursor: 'default',
    userSelect: 'none',
    borderRadius: '1px',
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
