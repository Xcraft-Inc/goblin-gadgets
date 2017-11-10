import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Unit.multiply (m, 0.5),
    marginBottom: Unit.sub (Unit.multiply (m, -0.5), '1px'),
    marginLeft: Unit.multiply (m, -1),
    marginRight: Unit.multiply (m, -1),
    padding: Unit.multiply (m, 0.5),
    borderTop: '1px solid ' + theme.palette.paneNavigatorInactiveBorder,
    borderBottom: '1px solid ' + theme.palette.paneNavigatorInactiveBorder,
    borderLeft: theme.shapes.markWidth + ' solid transparent',
    boxSizing: 'border-box',
  };
  boxStyle[':hover'] = {
    backgroundColor: theme.palette.textFieldReadonlyBackground,
  };

  const boxActiveStyle = Object.assign ({}, boxStyle); // clone
  boxActiveStyle.borderLeft =
    theme.shapes.markWidth +
    ' solid ' +
    ColorHelpers.getMarkColor (theme, 'base');

  return {
    box: boxStyle,
    boxActive: boxActiveStyle,
  };
}

/******************************************************************************/
