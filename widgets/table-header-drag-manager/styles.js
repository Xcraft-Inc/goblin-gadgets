import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['marginLeft', 'height'];

export default function styles(theme, props) {
  const {marginLeft, height} = props;

  const halfButtonWidthPx = '10px';
  const halfMarkWidthPx = '4px';
  const markWidthPx = Unit.multiply(halfMarkWidthPx, 2);

  const c1 = ColorManipulator.fade(theme.palette.base, 0.1);
  const c2 = ColorManipulator.fade(theme.palette.base, 0.3);

  const tableHeaderDragManager = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: marginLeft,
    right: '0px',
    display: 'flex',
    flexDirection: 'row',
  };

  /******************************************************************************/

  const columnButton = {
    'position': 'relative',
    'zIndex': '8',
    'height': '100%',
    'cursor': 'ew-resize',
    // Use + for dispatch the style to next brother (only one).
    // Use ~ for dispatch the style to all the following brothers.
    // Use nothing for dispatch the style to children.
    ':hover .column-mark-hover': {
      opacity: 1,
      bottom: '-100vh',
    },
  };

  const columnButtonFixed = {
    ...columnButton,
    cursor: 'default',
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
    'position': 'relative',
    'zIndex': '8',
    'width': Unit.multiply(halfButtonWidthPx, 2),
    'minWidth': Unit.multiply(halfButtonWidthPx, 2),
    'height': '100%',
    'cursor': 'col-resize',
    'transition': '0.2s ease-out',
    // Use + for dispatch the style to next brother (only one).
    // Use ~ for dispatch the style to all the following brothers.
    // Use nothing for dispatch the style to children.
    ':hover .width-mark-hover': {
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
    borderRight: `${markWidthPx} solid ${theme.palette.base}`,
    //? background: ColorManipulator.fade(theme.palette.base, 0.1),
    background: `linear-gradient(90deg, ${c1}, ${c2})`,
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

  const columnDragged = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    bottom: '-100vh',
    //? backgroundColor: ColorManipulator.fade(theme.palette.base, 0.1),
    background: `linear-gradient(90deg, ${c1}, ${c2})`,
    boxSizing: 'border-box',
    borderRight: `${markWidthPx} solid ${ColorManipulator.fade(
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
    columnButton,
    columnButtonFixed,
    columnMarkHover,
    widthButton,
    widthMarkHover,
    fullscreen,
    columnDragged,
    travelingColumn,
    insertingColumn,
  };
}

/******************************************************************************/
