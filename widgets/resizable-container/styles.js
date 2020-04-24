import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['style'];

export default function styles(theme, props) {
  const {style} = props;

  const resizableContainer = {
    position: 'relative',
    display: 'content',
    width: '100%',
    height: '100%',
  };

  const borderColor = ColorManipulator.lighten(theme.palette.buttonBorder, 0.4);
  const box = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    borderLeft: `1px solid ${borderColor}`,
    borderTop: `1px solid ${borderColor}`,
    borderRight: `2px dashed ${borderColor}`,
    borderBottom: `2px dashed ${borderColor}`,
    padding: '10px',
    display: 'flex',
  };

  const children = {
    position: 'absolute',
    top: '10px',
    bottom: '10px',
    left: '10px',
    right: '10px',
    display: 'flex',
    ...style,
  };

  const borderColorDragging = 'red';
  const boxDragging = {
    ...box,
    borderRight: `2px dashed ${borderColorDragging}`,
    borderBottom: `2px dashed ${borderColorDragging}`,
  };

  const _button = {
    'position': 'absolute',
    'width': '20px',
    'height': '20px',
    'boxSizing': 'border-box',
    'border': `1px solid ${borderColor}`,
    'borderRadius': '10px',
    'background': theme.palette.buttonBackground,
    'transform': 'rotate(90deg) scale(1)',
    'transition':
      'border-radius 0.2s ease-out, border 0.2s ease-out, transform 0.2s ease-out',
    ':hover': {
      borderRadius: '0px',
      border: `2px solid ${theme.palette.buttonBorder}`,
      transform: 'rotate(0deg) scale(1.5)',
    },
  };

  // Button at bottom right, for resizing width and height.
  const buttonCorner = {
    ..._button,
    cursor: 'move',
  };

  // Button at bottom left, for resizing height.
  const buttonHeight = {
    ..._button,
    cursor: 'ns-resize',
  };

  // Button at top right, for resizing width.
  const buttonWidth = {
    ..._button,
    cursor: 'ew-resize',
  };

  const size = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    padding: '5px 10px',
    border: '1px solid black',
    backgroundColor: 'red',
    color: 'white',
    fontSize: '80%',
  };

  /******************************************************************************/

  return {
    resizableContainer,
    box,
    children,
    boxDragging,
    buttonCorner,
    buttonHeight,
    buttonWidth,
    size,
  };
}

/******************************************************************************/
