import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  const handleStyle = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '20px',
    height: '100%',
    cursor: 'move',
  };
  handleStyle[':hover'] = {
    backgroundColor: theme.palette.actionButtonBackground,
    opacity: 0.2,
  };

  return {
    handle: handleStyle,
  };
}

/******************************************************************************/
