/******************************************************************************/

export default function styles (theme, props) {
  const containerStyle = {
    display: 'flex',
    flexDirection: props.kind === 'vertical' ? 'row' : 'column',
    flexGrow: '1',
  };

  const leftPaneStyle = {
    display: 'flex',
    width: props.kind === 'vertical' ? '200px' : null,
    height: props.kind === 'horizontal' ? '200px' : null,
  };

  const resizerStyle = {
    zIndex: 1,
    width: props.kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: props.kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: props.kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackground,
  };

  const rightPaneStyle = {
    display: 'flex',
    flexGrow: '1',
  };

  return {
    container: containerStyle,
    leftPane: leftPaneStyle,
    resizer: resizerStyle,
    rightPane: rightPaneStyle,
  };
}

/******************************************************************************/
