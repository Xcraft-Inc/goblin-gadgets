import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  const hoverOverlapX = '0px'; // overlap for hover
  const hoverOverlapY = '1px'; // overlap for hover
  const hoverBottomSpace = '0px'; // margin between two rows

  const handleSpace = '4px'; // top/bottom space
  const handleShift = '4px'; // shift from left
  const handleThickness = '2px';

  let detectWidth = '100%';
  let detectHeight = '100%';
  let cursor = 'move';
  let handleLeft = '0px';
  let handleTop = '0px';
  let handleWidth = '100%';
  let handleHeight = '100%';

  if (props.direction === 'horizontal') {
    detectHeight = props.dragHandleHeight || theme.shapes.containerMargin;
    cursor = 'ew-resize';
    handleLeft = handleSpace;
    handleTop = handleShift;
    handleWidth = `calc(100% - ${Unit.multiply (handleSpace, 2)} - ${hoverBottomSpace})`;
    handleHeight = handleThickness;
  }
  if (props.direction === 'vertical') {
    detectWidth = props.dragHandleWidth || theme.shapes.containerMargin;
    cursor = 'ns-resize';
    handleLeft = handleShift;
    handleTop = handleSpace;
    handleWidth = handleThickness;
    handleHeight = `calc(100% - ${Unit.multiply (handleSpace, 2)} - ${hoverBottomSpace})`;
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
    margin: Unit.multiply (hoverOverlapY, -1) +
      ' ' +
      Unit.multiply (hoverOverlapX, -1),
    borderLeft: '10px solid ' + theme.palette.dragAndDropHover,
    boxSizing: 'border-box',
  };

  const handleStyle = {
    position: 'absolute',
    left: handleLeft,
    top: handleTop,
    width: handleWidth,
    height: handleHeight,
    borderLeft: `${handleThickness} solid #bbb`,
    boxSizing: 'border-box',
  };

  const handleCircleStyle = {
    position: 'absolute',
    left: '-15px',
    top: 'calc(50% - 5px)',
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  };

  const handleCircleLittleStyle = {
    position: 'absolute',
    left: '-10px',
    top: 'calc(50% - 5px)',
    width: '6px',
    height: '6px',
    borderRadius: '6px',
    backgroundColor: '#ccc',
  };

  const handleTriangleRightStyle = {
    position: 'absolute',
    left: '0px',
    top: 'calc(50% - 10px)',
    width: '0px',
    height: '0px',
    border: '10px solid transparent',
    borderLeft: '10px solid #eee',
  };

  const handleTriangleLeftStyle = {
    position: 'absolute',
    left: '-20px',
    top: 'calc(50% - 10px)',
    width: '0px',
    height: '0px',
    border: '10px solid transparent',
    borderRight: '10px solid #fff',
  };

  const handleRectStyle = {
    position: 'absolute',
    left: '5px',
    top: 'calc(50% - 15px)',
    width: '4px',
    height: '30px',
    borderRadius: '4px',
    backgroundColor: '#eee',
  };

  return {
    detect: detectStyle,
    handle: handleRectStyle,
  };
}

/******************************************************************************/
