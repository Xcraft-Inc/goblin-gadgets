/******************************************************************************/

export const propNames = ['kind'];

export default function styles(theme, props) {
  const {kind} = props;

  const containerStyle = {
    display: 'flex',
    flexDirection: kind === 'vertical' ? 'row' : 'column',
    flexGrow: '1',
    //???? width: kind === 'vertical' ? '100%' : null,
    //???? height: kind === 'vertical' ? null : '100%',
    width: '100%',
    height: '100%',
  };

  const firstPaneStyle = {
    display: 'flex',
    overflow: 'hidden',
  };

  const resizerStyle = {
    'zIndex': 1,
    'width': kind === 'vertical' ? theme.shapes.splitterSize : null,
    'height': kind === 'horizontal' ? theme.shapes.splitterSize : null,
    'cursor': kind === 'vertical' ? 'col-resize' : 'row-resize',
    'backgroundColor': theme.palette.splitterBackground,
    ':hover': {backgroundColor: theme.palette.splitterBackgroundHover},
  };

  const resizerDraggingStyle = {
    zIndex: 1,
    width: kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: kind === 'vertical' ? 'col-resize' : 'row-resize',
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
