/******************************************************************************/

export const propNames = ['kind'];

export default function styles(theme, props) {
  const {kind} = props;

  const container = {
    display: 'flex',
    flexDirection: kind === 'vertical' ? 'row' : 'column',
    flexGrow: 1,
    width: '100%',
    height: '100%',
  };

  const firstPane = {
    display: 'flex',
    overflow: 'hidden',
  };

  const resizer = {
    'zIndex': 1,
    'width': kind === 'vertical' ? theme.shapes.splitterSize : null,
    'height': kind === 'horizontal' ? theme.shapes.splitterSize : null,
    'cursor': kind === 'vertical' ? 'col-resize' : 'row-resize',
    'backgroundColor': theme.palette.splitterBackground,
    ':hover': {backgroundColor: theme.palette.splitterBackgroundHover},
  };

  const resizerDragging = {
    zIndex: 1,
    width: kind === 'vertical' ? theme.shapes.splitterSize : null,
    height: kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackgroundHover,
  };

  const lastPane = {
    display: 'flex',
    overflow: 'hidden',
  };

  return {
    container,
    firstPane,
    resizer,
    resizerDragging,
    lastPane,
  };
}

/******************************************************************************/
