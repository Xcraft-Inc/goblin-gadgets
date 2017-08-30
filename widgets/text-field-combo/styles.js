import * as Bool from '../helpers/boolean-helpers.js';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let borderRadius = '0px';
  let opacity = Bool.isFalse (props.visibility) ? 0 : null;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  // Initialise right margin according to spacing.
  if (props.spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
      double: theme.shapes.containerMargin,
    };
    marginRight = spacingType[props.spacing];
  }

  if (props.shape === 'rounded') {
    borderRadius = theme.shapes.actionRadius;
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    position: 'relative',
    opacity: opacity,
  };

  const shadowBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    position: 'relative',
    opacity: opacity,
    boxShadow: theme.shapes.comboShadow,
    borderRadius: borderRadius,
  };

  const comboBoxStyle = {
    position: 'absolute',
    right: props.comboDirection === 'right' ? null : '0px',
    left: props.comboDirection === 'right' ? '0px' : null,
    top: Unit.add (theme.shapes.lineHeight, '1px'),
    marginTop: theme.shapes.lineSpacing,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shapes.calendarShadow,
  };

  const emptyComboStyle = {
    margin: theme.shapes.containerMargin,
  };

  return {
    box: boxStyle,
    shadowBox: shadowBoxStyle,
    comboBox: comboBoxStyle,
    emptyCombo: emptyComboStyle,
  };
}

/******************************************************************************/
