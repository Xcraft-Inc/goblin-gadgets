import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const boxStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Unit.multiply (m, 0.5),
    marginBottom: Unit.sub (Unit.multiply (m, -0.5), '1px'),
    marginLeft: Unit.multiply (m, -1),
    marginRight: Unit.multiply (m, -1),
    paddingTop: Unit.multiply (m, 0.5),
    paddingBottom: Unit.multiply (m, 0.5),
    paddingLeft: Unit.multiply (m, 0.5),
    paddingRight: Unit.multiply (m, 0.5),
    borderTop: '1px solid ' + theme.palette.paneNavigatorInactiveBorder,
    borderBottom: '1px solid ' + theme.palette.paneNavigatorInactiveBorder,
    boxSizing: 'border-box',
    transition: 'background-color 200ms cubic-bezier(0.42, 0, 0.58, 1) 0ms',
  };
  boxStyle[':hover'] = {
    backgroundColor: theme.palette.textFieldReadonlyBackground,
  };

  const boxActiveStyle = Object.assign ({}, boxStyle); // clone
  boxActiveStyle.paddingLeft = Unit.sub (
    Unit.multiply (m, 0.5),
    theme.shapes.markWidth
  );
  boxActiveStyle.borderLeft =
    theme.shapes.markWidth +
    ' solid ' +
    ColorHelpers.getMarkColor (theme, 'base');

  const infoVisibleStyle = {
    zIndex: 2,
    position: 'absolute',
    bottom: '-5px',
    right: '-10px',
    padding: '5px',
    backgroundColor: theme.palette.textFieldReadonlyBackground,
    boxShadow: '0px 3px 10px 0px rgba(0,0,0, 0.3)',
    border: '1px solid ' + theme.palette.paneNavigatorInactiveBorder,
    opacity: 1,
    transition: 'opacity 200ms cubic-bezier(0.42, 0, 0.58, 1) 500ms',
  };

  const infoHiddenStyle = Object.assign ({}, infoVisibleStyle); // clone
  infoHiddenStyle.opacity = 0;
  infoHiddenStyle.transition =
    'opacity 100ms cubic-bezier(0.42, 0, 0.58, 1) 0s';

  return {
    box: boxStyle,
    boxActive: boxActiveStyle,
    infoVisible: infoVisibleStyle,
    infoHidden: infoHiddenStyle,
  };
}

/******************************************************************************/
