export default function styles() {
  const childrenDiv = {
    position: 'absolute',
    visibility: 'hidden',
    overflow: 'auto',
  };
  const safeArea = {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    pointerEvents: 'none',
    left: 0,
    right: 0,
    bottom: 5,
    top: 5,
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
    zIndex: 2,
  };

  const triangleContainer = {
    position: 'fixed',
    width: '0px',
    height: '0px',
    zIndex: 3,
  };

  return {
    childrenDiv,
    safeArea,
    horizontalPosition,
    fullScreen,
    triangleContainer,
  };
}

/******************************************************************************/
