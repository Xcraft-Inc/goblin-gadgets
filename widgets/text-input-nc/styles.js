import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
import {Unit} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'width',
  'stretchHeight',
  'visibility',
  'horizontalSpacing',
  'shape',
  'disabled',
  'active',
  'readonly',
  'required',
  'wrong',
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

/******************************************************************************/

export default function styles(theme, props) {
  const {
    grow,
    width,
    stretchHeight,
    visibility,
    horizontalSpacing,
    shape,
    disabled,
    active,
    readonly,
    required,
    wrong,
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
  let opacity = visibility === false ? 0 : null;

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
    if (shape === 'rounded') {
      borderRadius = r;
      padding = `0px ${r}`;
    } else if (shape === 'left-rounded') {
      borderRadius = `${r} 0px 0px ${r}`;
      padding = `0px 0px 0px ${r}`;
    } else if (shape === 'right-rounded') {
      borderRadius = `0px ${r} ${r} 0px`;
      padding = `0px ${r} 0px 0px`;
    } else if (shape === 'smooth') {
      borderRadius = s;
      padding = `0px ${s}`;
    } else if (shape === 'left-smooth') {
      borderRadius = `${s} 0px 0px ${s}`;
      padding = `0px 0px 0px ${s}`;
    } else if (shape === 'right-smooth') {
      borderRadius = `0px ${s} ${s} 0px`;
      padding = `0px ${s} 0px 0px`;
    } else {
      borderRadius = `${r} 0px 0px ${r}`;
      padding = `0px 0px 0px ${r}`;
    }
  }

  let color = theme.palette.textColor;
  let backgroundColor = theme.palette.textFieldBackground;
  if (disabled) {
    color = theme.palette.textFieldDisableText;
    backgroundColor = theme.palette.textFieldDisableBackground;
  } else if (active) {
    color = theme.palette.comboActiveGlyph;
    backgroundColor = theme.palette.comboActiveBackground;
    borderColor = theme.palette.comboActiveBackground;
  } else if (readonly) {
    backgroundColor = theme.palette.textFieldReadonlyBackground;
  }

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  const textInputNC = {
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

  if (required && !value && !disabled && !active && !readonly) {
    // Change backgroundColor if required text-field is not empty.
    textInputNC.backgroundColor = theme.palette.textFieldRequiredBackground;
  }

  if (wrong) {
    // Change backgroundColor if wrong content of text-field.
    textInputNC.backgroundColor = theme.palette.textFieldWrongBackground;
  }

  // Use + for dispatch the style to next brother (only one).
  // Use ~ for dispatch the style to all the following brothers.
  const input = {
    ':focus + .foreground-focus': {
      boxShadow:
        theme.look.name === 'retro'
          ? '0px 0px 14px 5px ' + theme.palette.focused
          : theme.shapes.focusedShadow + theme.palette.focused,
      zIndex: 1,
    },
    // Show the flying-balloon when text-input has the focus.
    // Hide the flying-balloon when text-input does not have the focus.
    ':focus ~ .flying-balloon': {
      visibility: 'visible',
    },
    ':placeholder': {
      color: theme.palette.hintTextColor,
    },
  };

  const focus = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
    boxShadow:
      theme.look.name === 'retro'
        ? '2px 3px 10px 0px rgba(0, 0, 0, 0.4)'
        : null,
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
    height: stretchHeight ? 'calc(100% - 16px)' : null,
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

  const readonlyStyle = {
    ...field,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    userSelect: 'text',
  };

  /******************************************************************************/

  return {
    textInputNC,
    focus,
    field,
    textarea,
    input,
    readonly: readonlyStyle,
  };
}

/******************************************************************************/
