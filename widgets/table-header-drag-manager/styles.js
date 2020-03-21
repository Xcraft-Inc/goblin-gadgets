/******************************************************************************/

export const propNames = ['height'];

export default function styles(theme, props) {
  const {height} = props;

  const buttonWidth = 40;
  const markWidth = 8;

  const cw1 = theme.palette.tableDragHoverBackground1;
  const cw2 = theme.palette.tableDragHoverBackground2;

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
    'height': `calc(${height} - 4px)`,
    'width': buttonWidth + 'px',
    'minWidth': buttonWidth + 'px',
    'borderRadius': '100px 100px 0px 0px',
    'boxSizing': 'border-box',
    'borderLeft': '3px dashed transparent',
    'borderTop': '3px dashed transparent',
    'borderRight': '3px dashed transparent',
    'cursor': 'ew-resize',
    'transition': '0.2s ease-out',
    ':hover': {
      borderLeft: `3px dashed ${theme.palette.tableDragBorder}`,
      borderTop: `3px dashed ${theme.palette.tableDragBorder}`,
      borderRight: `3px dashed ${theme.palette.tableDragBorder}`,
      background: theme.palette.tableDragButtonColumnBackground,
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
    top: `calc(${height} - 2px)`,
    opacity: 0,
    bottom: '0px',
    boxSizing: 'border-box',
    borderLeft: `3px dashed ${theme.palette.tableDragBorder}`,
    borderTop: `3px dashed ${theme.palette.tableDragBorder}`,
    borderRight: `3px dashed ${theme.palette.tableDragBorder}`,
    background: theme.palette.tableDragHoverBackground1,
    transition: 'opacity 0.5s ease-out',
  };

  /******************************************************************************/

  const widthButton = {
    'zIndex': '8',
    'position': 'absolute',
    'top': '5px',
    'height': `calc(${height} - 4px)`,
    'width': buttonWidth + 'px',
    'minWidth': buttonWidth + 'px',
    'borderRadius': `${buttonWidth - 12}px 0px 0px 0px`,
    'boxSizing': 'border-box',
    'borderRight': `${markWidth}px solid transparent`,
    'cursor': 'col-resize',
    'transition': '0.2s ease-out',
    ':hover': {
      borderRight: `${markWidth}px solid ${theme.palette.tableDragBorder}`,
      background: theme.palette.tableDragButtonWidthBackground,
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
    borderRight: `${markWidth}px solid ${theme.palette.tableDragBorder}`,
    background: `linear-gradient(90deg, ${cw1}, ${cw2})`,
    transition: 'opacity 0.5s ease-out',
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
    borderRight: `${markWidth}px solid ${theme.palette.tableDragBorder}`,
  };

  /******************************************************************************/

  const travelingColumn = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} - 2px)`,
    bottom: '-100vh',
    backgroundColor: theme.palette.tableDragTravelingBackground,
    boxSizing: 'border-box',
    borderLeft: `3px dashed ${theme.palette.tableDragTravelingBorder}`,
    borderTop: `3px dashed ${theme.palette.tableDragTravelingBorder}`,
    borderRight: `3px dashed ${theme.palette.tableDragTravelingBorder}`,
  };

  const insertingColumn = {
    zIndex: '7',
    position: 'absolute',
    top: `calc(${height} + 1px)`,
    bottom: '-100vh',
    width: '20px',
    backgroundColor: theme.palette.tableDragBorder,
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
