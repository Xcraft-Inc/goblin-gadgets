import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'visibility',
  'spacing',
  'shape',
  'width',
  'comboDirection',
];

export default function styles(theme, props) {
  const {grow, visibility, spacing, shape, width, comboDirection} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let borderRadius = '0px';
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  // Initialise right margin according to spacing.
  if (spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
      double: theme.shapes.containerMargin,
    };
    marginRight = spacingType[spacing];
  }

  if (shape === 'rounded') {
    borderRadius = theme.shapes.actionRadius;
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width,
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

  const shadowBoxStyle = {...boxStyle};
  shadowBoxStyle.boxShadow = theme.shapes.comboShadow;
  shadowBoxStyle.borderRadius = borderRadius;

  const focusedBoxStyle = {...boxStyle};
  focusedBoxStyle.boxShadow =
    theme.shapes.focusedShadow + theme.palette.focused;
  focusedBoxStyle.borderRadius = borderRadius;

  const comboBoxStyle = {
    position: 'absolute',
    right: comboDirection === 'right' ? null : '0px',
    left: comboDirection === 'right' ? '0px' : null,
    top: Unit.add(theme.shapes.lineHeight, '1px'),
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
    focusedBox: focusedBoxStyle,
    comboBox: comboBoxStyle,
    emptyCombo: emptyComboStyle,
  };
}

/******************************************************************************/