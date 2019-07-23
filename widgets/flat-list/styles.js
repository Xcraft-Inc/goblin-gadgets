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
    padding: '10px',
    borderRadius: '1px',
  };

  return {
    box,
  };
}

/******************************************************************************/
