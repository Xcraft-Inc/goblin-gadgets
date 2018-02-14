/******************************************************************************/

export default function styles (theme, props) {
  const lineStyle = {
    position: 'relative',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
    cursor: 'default',
  };

  const emptyStyle = {
    position: 'relative',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
    cursor: 'default',
    backgroundColor: theme.palette.ticketDragAndDropShadow,
  };

  const frontStyle = {
    position: 'absolute',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
    cursor: 'default',
    zIndex: 4,
    // backgroundColor: 'rgba(100, 0, 0, 0.2)',
  };

  return {
    line: lineStyle,
    empty: emptyStyle,
    front: frontStyle,
  };
}

/******************************************************************************/
