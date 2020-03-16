import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['marginLeft'];

export default function styles(theme, props) {
  const {marginLeft} = props;

  const halfButtonWidthPx = '10px';
  const halfMarkWidthPx = '2px';
  const markWidthPx = Unit.multiply(halfMarkWidthPx, 2);

  const tableHeaderDragManager = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: marginLeft,
    right: '0px',
    display: 'flex',
    flexDirection: 'row',
  };

  const columnButton = {
    zIndex: '8',
    height: '100%',
    //? 'opacity': 0.5,
    //? 'backgroundColor': 'yellow',
    //? ':hover': {
    //?   backgroundColor: ColorManipulator.fade(theme.palette.base, 0.1),
    //? },
  };

  const widthButton = {
    'position': 'relative',
    'zIndex': '8',
    'width': Unit.multiply(halfButtonWidthPx, 2),
    'height': '100%',
    'cursor': 'ew-resize',
    //? 'opacity': 0.5,
    //? 'backgroundColor': 'red',
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
    top: '0px',
    right: Unit.sub(halfButtonWidthPx, halfMarkWidthPx),
    width: markWidthPx,
    opacity: 0,
    bottom: '0px',
    backgroundColor: ColorManipulator.fade(theme.palette.base, 0.8),
  };

  const fullscreen = {
    zIndex: '9',
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    cursor: 'ew-resize',
  };

  const columnDragged = {
    zIndex: '7',
    position: 'absolute',
    top: '0px',
    bottom: '-100vh',
    backgroundColor: ColorManipulator.fade(theme.palette.base, 0.1),
    boxSizing: 'border-box',
    borderRight: `${markWidthPx} solid ${ColorManipulator.fade(
      theme.palette.base,
      0.8
    )}`,
  };

  /******************************************************************************/

  return {
    tableHeaderDragManager,
    columnButton,
    widthButton,
    widthMarkHover,
    fullscreen,
    columnDragged,
  };
}

/******************************************************************************/
