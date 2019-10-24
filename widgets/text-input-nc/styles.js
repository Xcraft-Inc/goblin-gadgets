import * as Bool from 'gadgets/helpers/bool-helpers';
import * as SpacingHelpers from 'gadgets/helpers/spacing-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'width',
  'visibility',
  'horizontalSpacing',
  'shape',
  'disabled',
  'active',
  'readonly',
  'required',
  'justify',
  'border',
  'value',
];

export function mapProps(props) {
  return {
    ...props,
    value: Boolean(props.value),
  };
}

export default function styles(theme, props) {
  const {
    grow,
    width,
    visibility,
    horizontalSpacing,
    shape,
    disabled,
    active,
    readonly,
    required,
    justify,
    border,
    value,
  } = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginLeft = '0px';
  let marginRight = '0px';
  let padding = theme.shapes.textFieldPadding;
  let borderRadius = theme.shapes.textFieldBorderRadius;
  let borderColor = theme.palette.textFieldBorderColor;
  let borderWidth = theme.shapes.textFieldBorderWidth;
  let borderStyle = 'solid';
  let fieldPaddingLeft = '10px';
  let fieldPaddingRight = '10px';
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  // Initialize variables for field without border.
  if (border === 'none') {
    borderStyle = 'none';
  }

  marginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );

  if (shape) {
    const r = Unit.multiply(theme.shapes.lineHeight, 0.5);
    const s = theme.shapes.smoothRadius;
    borderRadius = r + ' 0px 0px ' + r;
    if (shape === 'rounded') {
      borderRadius = r;
      padding = '0px ' + r;
    } else if (shape === 'left-rounded') {
      borderRadius = r + ' 0px 0px ' + r;
      padding = '0px 0px 0px ' + r;
    } else if (shape === 'right-rounded') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
      padding = '0px ' + r + ' 0px 0px';
    } else if (shape === 'smooth') {
      borderRadius = s;
      padding = '0px ' + s;
    } else if (shape === 'left-smooth') {
      borderRadius = s + ' 0px 0px ' + s;
      padding = '0px 0px 0px ' + s;
    } else if (shape === 'right-smooth') {
      borderRadius = '0px ' + s + ' ' + s + ' 0px';
      padding = '0px ' + s + ' 0px 0px';
    }
  }

  let color = theme.palette.textColor;
  let backgroundColor = theme.palette.textFieldBackground;
  if (Bool.isTrue(disabled)) {
    color = theme.palette.textFieldDisableText;
    backgroundColor = theme.palette.textFieldDisableBackground;
  } else if (Bool.isTrue(active)) {
    color = theme.palette.comboActiveGlyph;
    backgroundColor = theme.palette.comboActiveBackground;
    borderColor = theme.palette.comboActiveBackground;
  } else if (Bool.isTrue(readonly)) {
    backgroundColor = theme.palette.textFieldReadonlyBackground;
  }

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  const box = {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    border: borderWidth + ' ' + borderStyle + ' ' + borderColor,
    borderRadius: borderRadius,
    color: color,
    backgroundColor: backgroundColor,
    padding: padding,
    marginTop: '0px',
    marginRight: marginRight,
    marginBottom: '0px',
    marginLeft: marginLeft,
    position: 'relative',
    opacity: opacity,
  };

  if (
    Bool.isTrue(required) &&
    !Bool.isTrue(value) &&
    !Bool.isTrue(disabled) &&
    !Bool.isTrue(active) &&
    !Bool.isTrue(readonly)
  ) {
    // Change backgroundColor if required text-field is not empty.
    box.backgroundColor = theme.palette.textFieldRequiredBackground;
  }

  // Use + for dispatch the style to next brother (only one).
  // Use ~ for dispatch the style to all the following brothers.
  const input = {
    ':focus + .toto': {
      borderRadius: borderRadius,
      boxShadow: theme.shapes.focusedShadow + theme.palette.focused,
      pointerEvents: 'none',
      zIndex: 1,
    },
    // Show the flying-balloon when text-input has the focus.
    // Hide the flying-balloon when text-input does not have the focus.
    ':focus ~ .flying-balloon': {
      visibility: 'visible',
    },
  };

  const focus = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
    pointerEvents: 'none',
  };

  const field = {
    width: '100%',
    flexGrow: 1,
    height: theme.shapes.lineHeight,
    fontSize: '100%',
    paddingTop: '0px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '0px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    textAlign: justify,
    color: color,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    pointerEvents: 'all',
  };

  const textarea = {
    width: '100%',
    flexGrow: 1,
    fontSize: '100%',
    paddingTop: '8px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '8px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    textAlign: justify,
    color: color,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    resize: 'none',
    fontFamily: 'sans-serif',
  };

  input['::placeholder'] = {
    color: theme.palette.hintTextColor,
  };

  return {
    box,
    focus,
    field,
    textarea,
    input,
  };
}

/******************************************************************************/
