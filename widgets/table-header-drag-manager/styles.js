import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['height'];

export default function styles(theme, props) {
  const {height} = props;

  const buttonWidth = 40;
  const markWidth = 8;

  const cw1 = ColorManipulator.fade(theme.palette.base, 0.1);
  const cw2 = ColorManipulator.fade(theme.palette.base, 0.3);

  const tableHeaderDragManager = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    display: 'flex',
    flexDirection: 'row',
  };

  const sortButton = {
    zIndex: '8',
    position: 'absolute',
    top: '0px',
    height: height + 'px',
  };

  /******************************************************************************/

  const columnButton = {
    'zIndex': '8',
    'position': 'absolute',
    'top': '5px',
    'height': `calc(${height} - 5px)`,
    'width': buttonWidth + 'px',
    'minWidth': buttonWidth + 'px',
    'borderRadius': '100px 100px 0px 0px',
    'cursor': 'ew-resize',
    'transition': '0.2s ease-out',
    ':hover': {
      background: ColorManipulator.fade(theme.palette.base, 0.3),
    },
    // Use + for dispatch the style to next brother (only one).
    // Use ~ for dispatch the style to all the following brothers.
    // Use nothing for dispatch the style to children.
    ':hover + .column-mark-hover': {
      opacity: 1,
      bottom: '-100vh',
    },
  };

  const columnMarkHover = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    opacity: 0,
    bottom: '0px',
    boxSizing: 'border-box',
    borderLeft: `3px dashed ${theme.palette.base}`,
    borderRight: `3px dashed ${theme.palette.base}`,
    background: ColorManipulator.fade(theme.palette.base, 0.1),
    transition: 'opacity 1s ease-out',
  };

  /******************************************************************************/

  const widthButton = {
    'zIndex': '8',
    'position': 'absolute',
    'top': '5px',
    'height': `calc(${height} - 5px)`,
    'width': buttonWidth + 'px',
    'minWidth': buttonWidth + 'px',
    'borderRadius': `0px ${buttonWidth - 12}px 0px 0px`,
    'cursor': 'col-resize',
    'transition': '0.2s ease-out',
    ':hover': {
      background: ColorManipulator.fade(theme.palette.base, 0.3),
    },
    // Use + for dispatch the style to next brother (only one).
    // Use ~ for dispatch the style to all the following brothers.
    // Use nothing for dispatch the style to children.
    ':hover + .width-mark-hover': {
      opacity: 1,
      bottom: '-100vh',
    },
  };

  const widthMarkHover = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    opacity: 0,
    bottom: '0px',
    boxSizing: 'border-box',
    borderRight: `${markWidth}px solid ${theme.palette.base}`,
    background: `linear-gradient(90deg, ${cw1}, ${cw2})`,
    transition: 'opacity 1s ease-out',
  };

  /******************************************************************************/

  const fullscreen = {
    zIndex: '9',
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    cursor: 'ew-resize',
  };

  /******************************************************************************/

  const widthDragged = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    bottom: '-100vh',
    background: `linear-gradient(90deg, ${cw1}, ${cw2})`,
    boxSizing: 'border-box',
    borderRight: `${markWidth}px solid ${ColorManipulator.fade(
      theme.palette.base,
      0.8
    )}`,
  };

  /******************************************************************************/

  const travelingColumn = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    bottom: '-100vh',
    backgroundColor: ColorManipulator.darken(theme.palette.light, 0.05),
    boxSizing: 'border-box',
    borderLeft: `3px dashed ${theme.palette.dark}`,
    borderRight: `3px dashed ${theme.palette.dark}`,
  };

  const insertingColumn = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    bottom: '-100vh',
    width: '20px',
    backgroundColor: ColorManipulator.fade(theme.palette.base, 0.8),
    transition: 'all 0.5s ease-out',
  };

  /******************************************************************************/

  return {
    tableHeaderDragManager,

    sortButton,
    columnButton,
    columnMarkHover,
    widthButton,
    widthMarkHover,

    fullscreen,
    widthDragged,
    travelingColumn,
    insertingColumn,
  };
}

/******************************************************************************/
