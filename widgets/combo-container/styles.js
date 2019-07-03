/******************************************************************************/

export default function styles() {
  const childrenDiv = {
    position: 'absolute',
    visibility: 'hidden',
  };
  const safeArea = {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    pointerEvents: 'none',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    // Put combo over sidebar in westeros
    zIndex: 3,
  };

  const horizontalPosition = {
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'center',
    'maxHeight': '100%',
    '& > *': {
      pointerEvents: 'initial',
    },
  };

  const fullScreen = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  };

  return {
    childrenDiv,
    safeArea,
    horizontalPosition,
    fullScreen,
  };
}

/******************************************************************************/
