import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'width',
  'visibility',
  'spacing',
  'shape',
  'disabled',
  'active',
  'readonly',
  'justify',
  'border',
];

export default function styles(theme, props) {
  const {
    grow,
    width,
    visibility,
    spacing,
    shape,
    disabled,
    active,
    readonly,
    justify,
    border,
  } = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginLeft = '0px';
  let marginRight = '0px';
  let padding = '0px';
  let borderRadius = '0px';
  let borderColor = theme.palette.buttonBorder;
  let borderStyle = 'solid';
  let fieldPaddingLeft = '10px';
  let fieldPaddingRight = '10px';
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  // Initialize variables for field without border.
  if (border === 'none') {
    borderStyle = 'none';
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

  const boxStyle = {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    border: '1px ' + borderStyle + ' ' + borderColor,
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

  const boxRequiredStyle = Object.assign({}, boxStyle); // clone
  if (
    !Bool.isTrue(disabled) &&
    !Bool.isTrue(active) &&
    !Bool.isTrue(readonly)
  ) {
    // Change backgroundColor if required text-field is not empty.
    boxRequiredStyle.backgroundColor =
      theme.palette.textFieldRequiredBackground;
  }

  const inputStyle = {
    ':focus + .toto': {
      borderRadius: borderRadius,
      boxShadow: theme.shapes.focusedShadow + theme.palette.focused,
      pointerEvents: 'none',
      zIndex: 1,
    },
  };

  const focusStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
    pointerEvents: 'none',
  };

  const fieldStyle = {
    width: '100%',
    flexGrow: 1,
    height: theme.shapes.lineHeight,
    fontSize: '100%',
    paddingTop: '0px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '0px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    textAlign: justify === 'right' ? 'right' : null,
    color: color,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    pointerEvents: 'all',
  };

  const textareaStyle = {
    width: '100%',
    flexGrow: 1,
    fontSize: '100%',
    paddingTop: '8px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '8px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    color: color,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    resize: 'none',
    fontFamily: 'sans-serif',
  };

  inputStyle['::placeholder'] = {
    color: theme.palette.hintTextColor,
  };

  return {
    box: boxStyle,
    boxRequired: boxRequiredStyle,
    focus: focusStyle,
    field: fieldStyle,
    textarea: textareaStyle,
    input: inputStyle,
  };
}

/******************************************************************************/
