import {Unit} from 'goblin-theme';
const px = Unit.toPx;

export const propNames = ['horizontalMargin', 'parentRect'];

export default function styles(theme, props) {
  const {horizontalMargin, parentRect} = props;

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

  let left = 0;
  let top = 0;

  if (parentRect) {
    left = -parentRect.left;
    top = -parentRect.top;
  }

  const fullScreen = {
    position: 'fixed',
    left: px(left),
    top: px(top),
    width: '100vw',
    height: '100vh',
    zIndex: 2,
  };

  const triangleContainer = {
    position: 'fixed',
    width: '0px',
    height: '0px',
    zIndex: 3,
    pointerEvents: 'none',
  };

  return {
    safeArea,
    horizontalPosition,
    fullScreen,
    triangleContainer,
  };
}

/******************************************************************************/
