import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  const radius2 = '4px'; // half radius of dot
  const overlap = '1px'; // overlap for hover

  const handleWidth = props.dragHandleWidth || theme.shapes.containerMargin;
  const handleHeight = props.dragHandleHeight || theme.shapes.containerMargin;

  let left = `calc(50% - ${radius2})`;
  let top = `calc(50% - ${radius2})`;
  let cursor = 'move';
  if (props.direction === 'horizontal') {
    top = Unit.sub (Unit.multiply (handleHeight, 0.5), radius2);
    cursor = 'ew-resize';
  }
  if (props.direction === 'vertical') {
    left = Unit.sub (Unit.multiply (handleWidth, 0.5), radius2);
    cursor = 'ns-resize';
  }

  const handleStyle = {
    position: 'absolute',
    left: left,
    top: top,
    width: Unit.multiply (radius2, 2),
    height: Unit.multiply (radius2, 2),
    cursor: cursor,
    borderRadius: radius2,
    backgroundColor: '#ccc',
  };
  handleStyle[':hover'] = {
    top: '0px',
    left: '0px',
    width: `calc(100% + ${Unit.multiply (overlap, 2)})`,
    height: `calc(100% + ${Unit.multiply (overlap, 2)} - 2px)`,
    borderRadius: '20px',
    backgroundColor: theme.palette.actionButtonBackground,
    margin: Unit.multiply (overlap, -1),
    opacity: 0.2,
  };

  return {
    handle: handleStyle,
  };
}

/******************************************************************************/
