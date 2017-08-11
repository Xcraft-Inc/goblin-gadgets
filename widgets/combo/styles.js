/******************************************************************************/

export default function styles (theme, props) {
  const fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 11,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'not-allowed',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const comboStyle = {
    visibility: 'visible',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
    zIndex: 11,
    left: props.center,
    right: props.right,
    top: props.top,
    bottom: props.bottom,
    opacity: 1.0,
    cursor: 'default',
    userSelect: 'none',
  };

  const insideStyle = {
    maxHeight: props.maxHeight,
    overflowY: 'auto',
    cursor: 'default',
    userSelect: 'none',
  };

  return {
    fullScreen: fullScreenStyle,
    combo: comboStyle,
    inside: insideStyle,
  };
}

/******************************************************************************/
