import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
import {Unit} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'visibility',
  'horizontalSpacing',
  'shape',
  'width',
  'comboDirection',
];

export default function styles(theme, props) {
  const {
    grow,
    visibility,
    horizontalSpacing,
    shape,
    width,
    comboDirection,
  } = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let borderRadius = '0px';
  let opacity = visibility === false ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  marginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );

  if (shape === 'rounded') {
    borderRadius = theme.shapes.actionRadius;
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

  const nabuTextFieldStyle = {
    flexBasis: '0',
    flexShrink: '0',
    flexGrow: '1',
    width: '100%',
  };

  return {
    box: boxStyle,
    shadowBox: shadowBoxStyle,
    focusedBox: focusedBoxStyle,
    comboBox: comboBoxStyle,
    emptyCombo: emptyComboStyle,
    nabuTextField: nabuTextFieldStyle,
  };
}

/******************************************************************************/
