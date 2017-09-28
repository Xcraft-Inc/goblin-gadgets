import * as Bool from '../helpers/boolean-helpers.js';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let width = props.width;
  let marginLeft = '0px';
  let marginRight = '0px';
  let padding = '0px';
  let borderRadius = '0px';
  let borderColor = theme.palette.buttonBorder;
  let fieldPaddingLeft = '10px';
  let fieldPaddingRight = '10px';
  let opacity = Bool.isFalse (props.visibility) ? 0 : null;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

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

  if (props.shape) {
    const r = Unit.multiply (theme.shapes.lineHeight, 0.5);
    const s = theme.shapes.smoothRadius;
    borderRadius = r + ' 0px 0px ' + r;
    if (props.shape === 'rounded') {
      borderRadius = r;
      padding = '0px ' + r;
    } else if (props.shape === 'left-rounded') {
      borderRadius = r + ' 0px 0px ' + r;
      padding = '0px 0px 0px ' + r;
    } else if (props.shape === 'right-rounded') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
      padding = '0px ' + r + ' 0px 0px';
    } else if (props.shape === 'left-smooth') {
      borderRadius = s + ' 0px 0px ' + s;
      padding = '0px 0px 0px ' + s;
    } else if (props.shape === 'right-smooth') {
      borderRadius = '0px ' + s + ' ' + s + ' 0px';
      padding = '0px ' + s + ' 0px 0px';
    }
  }

  let color = theme.palette.textColor;
  let backgroundColor = theme.palette.textFieldBackground;
  if (Bool.isTrue (props.active)) {
    color = theme.palette.comboActiveGlyph;
    backgroundColor = theme.palette.comboActiveBackground;
    borderColor = theme.palette.comboActiveBackground;
  } else if (Bool.isTrue (props.readonly)) {
    backgroundColor = theme.palette.textFieldReadonlyBackground;
  } else {
    backgroundColor = theme.palette.textFieldBackground;
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
    border: '1px solid ' + borderColor,
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

  const focusedBoxStyle = {...boxStyle};
  focusedBoxStyle.boxShadow =
    theme.shapes.focusedShadow + theme.palette.focused;

  const fieldStyle = {
    width: '100%',
    flexGrow: 1,
    height: theme.shapes.lineHeight,
    paddingTop: '0px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '0px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    color: color,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  };

  const textareaStyle = {
    width: '100%',
    flexGrow: 1,
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

  return {
    box: boxStyle,
    focusedBox: focusedBoxStyle,
    field: fieldStyle,
    textarea: textareaStyle,
  };
}

/******************************************************************************/
