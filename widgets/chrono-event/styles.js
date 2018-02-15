/******************************************************************************/

export default function styles (theme, props) {
  const lineStyle = {
    position: 'relative',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
  };

  const emptyStyle = {
    position: 'relative',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
    backgroundColor: theme.palette.ticketDragAndDropShadow,
  };

  const frontStyle = {
    position: 'absolute',
    width: '100%',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    userSelect: 'none',
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
