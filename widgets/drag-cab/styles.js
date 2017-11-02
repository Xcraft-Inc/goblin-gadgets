import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  const overlapX = '0px'; // overlap for hover
  const overlapY = '1px'; // overlap for hover

  let width = '100%';
  let height = '100%';
  let cursor = 'move';
  if (props.direction === 'horizontal') {
    height = props.dragHandleHeight || theme.shapes.containerMargin;
    cursor = 'ew-resize';
  }
  if (props.direction === 'vertical') {
    width = props.dragHandleWidth || theme.shapes.containerMargin;
    cursor = 'ns-resize';
  }

  const detectStyle = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: width,
    height: height,
    cursor: cursor,
  };
  detectStyle[':hover'] = {
    top: '0px',
    left: '0px',
    width: `calc(100% + ${Unit.multiply (overlapX, 2)})`,
    height: `calc(100% + ${Unit.multiply (overlapY, 2)} - 2px)`,
    margin: Unit.multiply (overlapY, -1) + ' ' + Unit.multiply (overlapX, -1),
    borderLeft: '6px solid ' + theme.palette.dragAndDropHover,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0,0,0, 0.05)',
  };

  const handleStyle = {
    position: 'absolute',
    left: '4px',
    top: '4px',
    width: '2px',
    height: 'calc(100% - 8px - 2px)',
    borderLeft: '2px dotted #bbb',
    boxSizing: 'border-box',
  };

  return {
    detect: detectStyle,
    handle: handleStyle,
  };
}

/******************************************************************************/
