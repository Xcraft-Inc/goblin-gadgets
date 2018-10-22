/******************************************************************************/

export const propNames = [
  'trianglePosition',
  'left',
  'right',
  'top',
  'bottom',
  'maxHeight',
  'width',
];

export default function styles(theme, props) {
  const {trianglePosition, left, right, top, bottom, maxHeight, width} = props;

  const fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 11,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'default',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const comboStyle = {
    visibility: 'visible',
    position: 'absolute',
    transform: trianglePosition ? null : 'translate(-50%, 0%)',
    zIndex: 11,
    left,
    right,
    top,
    bottom,
    opacity: 1.0,
    cursor: 'default',
    userSelect: 'none',
  };

  const insideStyle = {
    maxHeight: maxHeight,
    overflowY: 'auto',
    cursor: 'default',
    userSelect: 'none',
  };

  const insideWrapStyle = {
    maxHeight: maxHeight,
    width: width,
    overflowY: 'auto',
    cursor: 'default',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  };

  return {
    fullScreen: fullScreenStyle,
    combo: comboStyle,
    inside: insideStyle,
    insideWrap: insideWrapStyle,
  };
}

/******************************************************************************/
