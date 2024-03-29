/******************************************************************************/

export const propNames = ['kind', 'hide'];

export default function styles(theme, props) {
  const {kind, hide} = props;

  const container = {
    display: 'flex',
    flexDirection: kind === 'vertical' ? 'row' : 'column',
    flexGrow: 1,
    width: '100%',
    height: '100%',
  };

  const resizerDragging = {
    zIndex: 1,
    minWidth: kind === 'vertical' ? theme.shapes.splitterSize : null,
    minHeight: kind === 'horizontal' ? theme.shapes.splitterSize : null,
    cursor: kind === 'vertical' ? 'col-resize' : 'row-resize',
    backgroundColor: theme.palette.splitterBackgroundHover,
  };

  if (hide) {
    resizerDragging.display = 'none';
  }

  const resizer = {
    ...resizerDragging,
    'backgroundColor': theme.palette.splitterBackground,
    ':hover': {backgroundColor: theme.palette.splitterBackgroundHover},
  };

  return {
    container,
    resizer,
    resizerDragging,
  };
}

/******************************************************************************/
