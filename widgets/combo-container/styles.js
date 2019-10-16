export const propNames = ['horizontalMargin'];

export default function styles(theme, props) {
  const {horizontalMargin} = props;

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
    'marginLeft': horizontalMargin,
    'marginRight': horizontalMargin,
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
    safeArea,
    horizontalPosition,
    fullScreen,
    triangleContainer,
  };
}

/******************************************************************************/
