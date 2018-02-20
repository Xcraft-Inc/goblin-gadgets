import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const hoverOverlapX = '0px'; // overlap for hover
  const hoverOverlapY = '-1px'; // overlap for hover

  let detectWidth = '100%';
  let detectHeight = '100%';
  let cursor = 'move';

  if (props.direction === 'horizontal') {
    detectHeight = props.dragHandleHeight || theme.shapes.containerMargin;
    cursor = 'ew-resize';
  }
  if (props.direction === 'vertical') {
    detectWidth = props.dragHandleWidth || theme.shapes.containerMargin;
    cursor = 'ns-resize';
  }

  const detectStyle = {
    zIndex: 2,
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: detectWidth,
    height: detectHeight,
    cursor: cursor,
  };
  detectStyle[':hover'] = {
    margin: hoverOverlapY + ' ' + hoverOverlapX,
    borderLeft: '10px solid ' + theme.palette.dragAndDropHandleHover,
    boxSizing: 'border-box',
  };

  // FIXME: Gros refactoring nécessaire, direction horizontale cassée, etc.
  const handleRectStyle = {
    position: 'absolute',
    left: '5px',
    top: 'calc(50% - 15px)',
    width: '4px',
    height: '30px',
    borderRadius: '4px',
    backgroundColor: theme.palette.ticketDragAndDropHandle,
  };

  return {
    detect: detectStyle,
    handle: handleRectStyle,
  };
}

/******************************************************************************/
