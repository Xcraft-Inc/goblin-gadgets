/******************************************************************************/

export default function styles (theme, props) {
  const containerStyle = {
    display: 'flex',
    flexDirection: props.kind === 'vertical' ? 'row' : 'column',
    flexGrow: '1',
  };

  const firstPaneStyle = {
    display: 'flex',
    overflow: 'hidden',
  };

  const resizerStyle = {
    zIndex: 1,
    width: props.kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: props.kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: props.kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackground,
    ':hover': {backgroundColor: theme.palette.splitterBackgroundHover},
  };

  const resizerDraggingStyle = {
    zIndex: 1,
    width: props.kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: props.kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: props.kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackgroundHover,
  };

  const lastPaneStyle = {
    display: 'flex',
    overflow: 'hidden',
  };

  return {
    container: containerStyle,
    firstPane: firstPaneStyle,
    resizer: resizerStyle,
    resizerDragging: resizerDraggingStyle,
    lastPane: lastPaneStyle,
  };
}

/******************************************************************************/
