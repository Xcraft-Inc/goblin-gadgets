/******************************************************************************/

export default function styles (theme, props) {
  const fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 10,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'not-allowed',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  let top, right, bottom, left, transform;
  if (props.left || props.right) {
    transform = 'translate(0%, -50%)';
    left = props.left;
    right = props.right;
    top = props.center;
  } else {
    transform = 'translate(-50%, 0%)';
    left = props.center;
    top = props.top;
    bottom = props.bottom;
  }

  const comboStyle = {
    visibility: 'visible',
    position: 'absolute',
    width: props.width,
    height: props.height,
    transform: transform,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    opacity: 1.0,
    cursor: 'default',
    userSelect: 'none',
  };

  return {
    fullScreen: fullScreenStyle,
    combo: comboStyle,
  };
}

/******************************************************************************/
