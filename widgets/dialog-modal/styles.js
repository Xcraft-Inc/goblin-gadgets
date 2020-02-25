/******************************************************************************/

export const propNames = [
  'subkind',
  'look',
  'zIndex',
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'center',
];

export default function styles(theme, props) {
  const {
    subkind,
    look = 'modern',
    zIndex,
    left,
    right,
    top,
    bottom,
    width,
    height,
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

  const dialogModal = {
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    padding: subkind === 'full' ? null : theme.shapes.floatingPadding,
    borderRadius: theme.shapes.floatingRadius,
    justifyContent: 'center',
    backgroundColor: theme.palette.flyingDialogBackground,
    boxShadow: theme.shapes.floatingShadow,
    zIndex: '10',
    cursor: 'default',
  };

  if (look === 'retro') {
    dialogModal.borderRadius = '20px';
    dialogModal.borderTop = '10px solid #666';
    dialogModal.borderBottom = '10px solid #ccc';
    dialogModal.borderLeft = '10px solid #888';
    dialogModal.borderRight = '10px solid #aaa';
    dialogModal.boxShadow = 'black 0px 5px 60px 10px';
  }

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

  /******************************************************************************/

  return {
    fullScreen,
    dialogModal,
    combo,
  };
}

/******************************************************************************/
