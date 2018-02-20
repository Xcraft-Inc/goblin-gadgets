/******************************************************************************/

export default function styles(theme, props) {
  let fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 10,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    // backgroundColor: 'rgba(100, 0, 0, 0.2)',
  };

  return {
    fullScreen: fullScreenStyle,
  };
}

/******************************************************************************/
