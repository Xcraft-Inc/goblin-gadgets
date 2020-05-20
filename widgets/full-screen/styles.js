/******************************************************************************/

export const propNames = ['backgroundColor', 'zIndex'];

export default function styles(theme, props) {
  const {
    backgroundColor = theme.palette.flyingDialogFullScreenBackground,
    zIndex = 10,
  } = props;

  const fullScreen = {
    position: 'fixed',
    display: 'flex',
    visibility: 'visible',
    zIndex: zIndex,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    userSelect: 'none',
    cursor: 'default',
  };

  /******************************************************************************/

  return {
    fullScreen,
  };
}

/******************************************************************************/
