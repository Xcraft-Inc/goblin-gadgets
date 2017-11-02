import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  const hoverOverlapX = '0px'; // overlap for hover
  const hoverOverlapY = '1px'; // overlap for hover
  const hoverBottomSpace = '2px'; // margin between two rows

  const handleSpace = '4px'; // top/bottom space
  const handleShift = '4px'; // shift from left
  const handleThickness = '2px';

  let detectWidth = '100%';
  let deltectHeight = '100%';
  let cursor = 'move';
  let handleLeft = '0px';
  let handleTop = '0px';
  let handleWidth = '100%';
  let handleHeight = '100%';

  if (props.direction === 'horizontal') {
    deltectHeight = props.dragHandleHeight || theme.shapes.containerMargin;
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
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: detectWidth,
    height: deltectHeight,
    cursor: cursor,
  };
  detectStyle[':hover'] = {
    top: '0px',
    left: '0px',
    width: `calc(100% + ${Unit.multiply (hoverOverlapX, 2)})`,
    height: `calc(100% + ${Unit.multiply (hoverOverlapY, 2)} - ${hoverBottomSpace})`,
    margin: Unit.multiply (hoverOverlapY, -1) +
      ' ' +
      Unit.multiply (hoverOverlapX, -1),
    borderLeft: '6px solid ' + theme.palette.dragAndDropHover,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0, 0.05)',
  };

  const handleStyle = {
    position: 'absolute',
    left: handleLeft,
    top: handleTop,
    width: handleWidth,
    height: handleHeight,
    borderLeft: `${handleThickness} dotted #bbb`,
    boxSizing: 'border-box',
  };

  return {
    detect: detectStyle,
    handle: handleStyle,
  };
}

/******************************************************************************/
