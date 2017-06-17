/******************************************************************************/

export default function styles (theme, props) {
  const containerStyle = {
    display: 'flex',
    flexDirection: props.kind === 'vertical' ? 'row' : 'column',
    flexGrow: '1',
  };

  const firstPaneStyle = {
    display: 'flex',
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
  };

  const resizerStyle = {
    zIndex: 1,
    width: props.kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: props.kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: props.kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackground,
  };

  const lastPaneStyle = {
    display: 'flex',
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
  };

  return {
    container: containerStyle,
    firstPane: firstPaneStyle,
    resizer: resizerStyle,
    lastPane: lastPaneStyle,
  };
}

/******************************************************************************/
