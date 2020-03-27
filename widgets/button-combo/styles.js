import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
import {Unit} from 'electrum-theme';

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
  let borderRadius = theme.shapes.smoothRadius;
  let opacity = Bool.isFalse(visibility) ? 0 : null;

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

  const box = {
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

  const shadowBox = {...box};
  shadowBox.boxShadow = theme.shapes.comboShadow;
  shadowBox.borderRadius = borderRadius;

  const focusedBox = {...box};
  focusedBox.boxShadow = theme.shapes.focusedShadow + theme.palette.focused;
  focusedBox.borderRadius = borderRadius;

  const comboBox = {
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

  const emptyCombo = {
    margin: theme.shapes.containerMargin,
  };

  return {
    box,
    shadowBox,
    focusedBox,
    comboBox,
    emptyCombo,
  };
}

/******************************************************************************/
