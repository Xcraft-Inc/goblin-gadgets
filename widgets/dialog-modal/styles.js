import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'subkind',
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
    zIndex,
    left,
    right,
    top,
    bottom,
    width,
    height,
    center,
  } = props;

  const look = theme.look.name;

  const shadowKeyframes = {
    '0%': {
      backgroundColor: 'transparent',
      boxShadow: 'inset 0px 0px 23vh 5vh transparent',
    },
    '100%': {
      backgroundColor: theme.palette.flyingDialogFullScreenBackground,
      boxShadow: 'inset 0px 0px 23vh 5vh black',
    },
  };

  const fullScreen1 = {
    position: 'fixed',
    display: 'flex',
    visibility: 'visible',
    zIndex: zIndex || 10,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'default',
  };

  const fullScreen2 = {
    position: 'fixed',
    display: 'flex',
    visibility: 'visible',
    zIndex: zIndex || 10,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'default',
    backgroundColor: theme.palette.flyingDialogFullScreenBackground,
  };

  if (look === 'retro') {
    fullScreen2.animationName = shadowKeyframes;
    fullScreen2.animationDuration = '0.8s';
    fullScreen2.animationIterationCount = 1;
    fullScreen2.backgroundColor =
      theme.palette.flyingDialogFullScreenBackground;
    fullScreen2.boxShadow = 'inset 0px 0px 20vh 6vh black';
  }

  /******************************************************************************/

  const dialogModal = {
    position: 'relative',
    maxHeight: '80%',
    margin: 'auto',
    borderRadius: theme.shapes.floatingRadius,
    backgroundColor: theme.palette.flyingDialogBackground,
    boxShadow: theme.shapes.floatingShadow,
    zIndex: '10',
    cursor: 'default',
  };

  if (look === 'retro') {
    dialogModal.borderRadius = '20px';
    dialogModal.borderTop = `10px solid ${ColorManipulator.lighten(
      theme.palette.actionButtonBackground,
      0.4
    )}`;
    dialogModal.borderBottom = `10px solid ${ColorManipulator.darken(
      theme.palette.actionButtonBackground,
      0.5
    )}`;
    dialogModal.borderLeft = `10px solid ${ColorManipulator.lighten(
      theme.palette.actionButtonBackground,
      0.2
    )}`;
    dialogModal.borderRight = `10px solid ${ColorManipulator.darken(
      theme.palette.actionButtonBackground,
      0.3
    )}`;
    dialogModal.boxShadow = 'black 0px 5px 60px 10px';
  }

  const dialogModalInside = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: subkind === 'full' ? null : theme.shapes.floatingPadding,
    borderRadius: '10px',
    boxShadow:
      look === 'retro' ? 'inset 4px 12px 100px 0px rgba(0,0,0,0.4)' : null,
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

  const gear1 = {
    position: 'absolute',
    left: 'calc(50% - 150px)',
    bottom: '0px',
    width: '0px',
    height: '0px',
  };

  const gear2 = {
    position: 'absolute',
    left: 'calc(50% + 512px)',
    bottom: '85px',
    width: '0px',
    height: '0px',
  };

  /******************************************************************************/

  return {
    fullScreen1,
    fullScreen2,

    dialogModal,
    dialogModalInside,
    combo,

    gear1,
    gear2,
  };
}

/******************************************************************************/
