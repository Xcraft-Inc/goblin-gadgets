import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export default function styles(theme, props) {
  let margin = null;
  let padding = null;

  const m = theme.shapes.containerMargin;

  if (props.kind === 'panes') {
    padding = '0px ' + m + ' 0px ' + m;
  }

  const box = {
    flexGrow: '1',
    overflowY: 'auto',
    margin: margin,
    padding: padding,
  };

  return {
    box,
  };
}

/******************************************************************************/
