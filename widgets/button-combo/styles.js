import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';

/******************************************************************************/

export const propNames = [
  'grow',
  'visibility',
  'horizontalSpacing',
  'shape',
  'width',
];

export default function styles(theme, props) {
  const {grow, visibility, horizontalSpacing, shape, width} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let borderRadius = theme.shapes.smoothRadius;
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

  const buttonCombo = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width,
    flexGrow: width ? null : flexGrow,
    flexShrink: width ? null : flexShrink,
    flexBasis: width ? null : flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    position: 'relative',
    opacity: opacity,
  };

  const buttonComboShadow = {...buttonCombo};
  buttonComboShadow.boxShadow = theme.shapes.comboShadow;
  buttonComboShadow.borderRadius = borderRadius;

  const buttonComboFocused = {...buttonCombo};
  buttonComboFocused.boxShadow =
    theme.shapes.focusedShadow + theme.palette.focused;
  buttonComboFocused.borderRadius = borderRadius;

  /******************************************************************************/

  return {
    buttonCombo,
    buttonComboShadow,
    buttonComboFocused,
  };
}

/******************************************************************************/
