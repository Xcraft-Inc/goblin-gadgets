/******************************************************************************/

export const propNames = [
  'zIndex',
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'center',
];

export default function styles(theme, props) {
  const {
    zIndex,
    left,
    right,
    top,
    bottom,
    width,
    height,
    minWidth,
    minHeight,
    center,
  } = props;

  const fullScreen = {
    display: 'flex',
    visibility: 'visible',
    position: 'fixed',
    zIndex: zIndex || 10,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'default',
    backgroundColor: theme.palette.flyingDialogFullScreenBackground,
  };

  let comboTop, comboRight, comboBottom, comboLeft, transform;
  if (left || right) {
    transform = 'translate(0%, -50%)';
    comboLeft = left;
    comboRight = right;
    comboTop = center;
  } else {
    transform = 'translate(-50%, 0%)';
    comboLeft = center;
    comboTop = top;
    comboBottom = bottom;
  }

  const combo = {
    visibility: 'visible',
    position: 'absolute',
    width: width,
    height: height,
    minWidth: minWidth,
    minHeight: minHeight,
    transform: transform,
    zIndex: zIndex || 10,
    display: 'flex',
    flexDirection: 'column',
    left: comboLeft,
    right: comboRight,
    top: comboTop,
    bottom: comboBottom,
    opacity: 1.0,
    cursor: 'default',
    userSelect: 'none',
  };

  return {
    fullScreen,
    combo,
  };
}

/******************************************************************************/
