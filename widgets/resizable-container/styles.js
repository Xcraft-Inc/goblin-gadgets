/******************************************************************************/

export const propNames = ['flexGrow', 'flexDirection', 'flexWrap'];

export default function styles(theme, props) {
  const {flexGrow, flexDirection, flexWrap} = props;

  const resizableContainer = {
    position: 'relative',
    display: 'content',
    width: '100%',
    height: '100%',
  };

  const box = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    border: '2px dashed #888',
    display: 'flex',
    flexGrow,
    flexDirection,
    flexWrap,
  };

  const _button = {
    'position': 'absolute',
    'width': '20px',
    'height': '20px',
    'boxSizing': 'border-box',
    'border': `1px solid ${theme.palette.buttonBorder}`,
    'borderRadius': '10px',
    'background': theme.palette.buttonBackground,
    'transform': 'rotate(45deg) scale(1)',
    'transition': 'all 0.2s ease-out',
    ':hover': {
      borderRadius: '0px',
      border: `2px solid ${theme.palette.buttonBorder}`,
      transform: 'rotate(45deg) scale(1.5)',
    },
  };

  // Button at bottom right, for resizing width and height.
  const buttonCorner = {
    ..._button,
    bottom: '-10px',
    right: '-10px',
    cursor: 'move',
  };

  // Button at bottom left, for resizing height.
  const buttonHeight = {
    ..._button,
    bottom: '-10px',
    left: '-10px',
    cursor: 'ns-resize',
  };

  // Button at top right, for resizing width.
  const buttonWidth = {
    ..._button,
    top: '-10px',
    right: '-10px',
    cursor: 'ew-resize',
  };

  /******************************************************************************/

  return {
    resizableContainer,
    box,
    buttonCorner,
    buttonHeight,
    buttonWidth,
  };
}

/******************************************************************************/
