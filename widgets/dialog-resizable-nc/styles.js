import {Unit} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'position',
  'zIndex',
  'horizontal',
  'vertical',
  'width',
  'height',
  'margin',
  'borderSize',
  'borderRadius',
  'borderColor',
  'titleBarText',
  'titleBarHeight',
  'opacity',
];

export default function styles(theme, props) {
  const retro = theme.look.name === 'retro';
  const hasTitleBar = !!props.titleBarText;

  const {
    position = 'fixed',
    zIndex,
    horizontal = '0px',
    vertical = '0px',
    width = '100px',
    height = '100px',
    margin,
    borderSize = retro ? '15px' : '8px',
    borderRadius = retro ? '15px' : '3px',
    borderColor = ColorManipulator.emphasize(
      theme.palette.flyingDialogBackground,
      0.1
    ),
    titleBarHeight = hasTitleBar ? (retro ? '60px' : '40px') : null,
    opacity = 1,
  } = props;

  const look = theme.look.name;

  const b1 = borderSize;
  const b2 = Unit.multiply(borderSize, 2);
  const r = borderRadius;
  const hbc = ColorManipulator.lighten(theme.palette.base, 0.5);

  /******************************************************************************/

  const dialogResizable = {
    position: position,
    zIndex: zIndex,
    left: `calc(50% - ${Unit.multiply(width, 0.5)} + ${horizontal})`,
    top: `calc(50% - ${Unit.multiply(height, 0.5)} + ${vertical})`,
    width: width,
    height: height,
    backgroundColor: borderColor,
    borderRadius: r,
    boxShadow:
      look === 'retro'
        ? '0px 0px 50px 25px rgba(0,0,0,1)'
        : '0px 10px 100px rgba(0,0,0,0.5)',
    opacity: opacity,
  };

  const inside = {
    position: 'absolute',
    left: borderSize,
    right: borderSize,
    top: titleBarHeight || borderSize,
    bottom: borderSize,
    padding: margin,
    backgroundColor: theme.palette.flyingDialogBackground,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'default',
  };

  const fullscreen = {
    position: 'fixed',
    zIndex: zIndex,
    display: 'flex',
    visibility: 'visible',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    cursor: 'move',
    // backgroundColor: 'rgba(255,0,0,0.5)',
  };

  /******************************************************************************/

  const titleBar = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    height: titleBarHeight,
    margin: `0px ${b1}`,
    backgroundColor: borderColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'move',
    transition: '0.2s ease-out',
  };

  const titleBarLabel = {
    'height': titleBarHeight,
    'flexGrow': 1,
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'center',
    'alignItems': 'center',
    ':hover': {
      backgroundColor: hbc,
    },
  };

  /******************************************************************************/

  const _border = {
    'position': 'absolute',
    'transition': 'background-color 0.2s ease-out',
    ':hover': {
      backgroundColor: hbc,
    },
  };

  const borderTopLeft = {
    ..._border,
    'top': '0px',
    'left': '0px',
    'width': b1,
    'height': b1,
    'borderRadius': `${r} 0px 0px 0px`,
    'cursor': 'nwse-resize',
    ':hover ~ .left-hover': {
      backgroundColor: hbc,
    },
    ':hover ~ .top-hover': {
      backgroundColor: hbc,
    },
  };

  const borderTopRight = {
    ..._border,
    'top': '0px',
    'right': '0px',
    'width': b1,
    'height': b1,
    'borderRadius': `0px ${r} 0px 0px`,
    'cursor': 'nesw-resize',
    ':hover ~ .right-hover': {
      backgroundColor: hbc,
    },
    ':hover ~ .top-hover': {
      backgroundColor: hbc,
    },
  };

  const borderBottomLeft = {
    ..._border,
    'bottom': '0px',
    'left': '0px',
    'width': b1,
    'height': b1,
    'borderRadius': `0px 0px 0px ${r}`,
    'cursor': 'nesw-resize',
    ':hover ~ .left-hover': {
      backgroundColor: hbc,
    },
    ':hover ~ .bottom-hover': {
      backgroundColor: hbc,
    },
  };

  const borderBottomRight = {
    ..._border,
    'bottom': '0px',
    'right': '0px',
    'width': b1,
    'height': b1,
    'borderRadius': `0px 0px ${r} 0px`,
    'cursor': 'nwse-resize',
    ':hover ~ .right-hover': {
      backgroundColor: hbc,
    },
    ':hover ~ .bottom-hover': {
      backgroundColor: hbc,
    },
  };

  /******************************************************************************/

  const borderLeft = {
    ..._border,
    left: '0px',
    top: b1,
    width: borderSize,
    height: Unit.sub(height, b2),
    cursor: 'ew-resize',
  };

  const borderRight = {
    ..._border,
    right: '0px',
    top: b1,
    width: borderSize,
    height: Unit.sub(height, b2),
    cursor: 'ew-resize',
  };

  const borderTop = {
    ..._border,
    left: b1,
    top: '0px',
    width: Unit.sub(width, b2),
    height: borderSize,
    cursor: 'ns-resize',
  };

  const borderBottom = {
    ..._border,
    left: b1,
    bottom: '0px',
    width: Unit.sub(width, b2),
    height: borderSize,
    cursor: 'ns-resize',
  };

  /******************************************************************************/

  return {
    dialogResizable,
    inside,
    fullscreen,

    titleBar,
    titleBarLabel,

    borderTopLeft,
    borderTopRight,
    borderBottomLeft,
    borderBottomRight,

    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
  };
}

/******************************************************************************/
