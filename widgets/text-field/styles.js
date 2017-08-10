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
  let fieldPaddingLeft = '10px';
  let fieldPaddingRight = '10px';
  let opacity = props.visibility === 'false' ? 0 : null;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  // Initialise right margin according to spacing.
  if (props.spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
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
  if (props.active === 'true') {
    color = theme.palette.comboActiveGlyph;
    backgroundColor = theme.palette.comboActiveBackground;
  } else if (props.readonly === 'true') {
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
    border: '1px solid ' + theme.palette.buttonBorder,
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

  let fieldWidth = '100%';
  if (width) {
    fieldWidth = width;
    fieldWidth = Unit.sub (fieldWidth, '2px');
    fieldWidth = Unit.sub (fieldWidth, fieldPaddingLeft);
    fieldWidth = Unit.sub (fieldWidth, fieldPaddingRight);
  }

  const fieldStyle = {
    width: fieldWidth,
    flexGrow: 1,
    height: theme.shapes.lineHeight,
    paddingTop: '0px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '0px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    color: color,
    backgroundColor: backgroundColor,
    border: 'none',
  };

  const textareaStyle = {
    width: fieldWidth,
    flexGrow: 1,
    paddingTop: '0px',
    paddingRight: fieldPaddingRight,
    paddingBottom: '0px',
    paddingLeft: fieldPaddingLeft,
    margin: '0px',
    color: color,
    backgroundColor: backgroundColor,
    resize: 'none',
    border: 'none',
  };

  return {
    box: boxStyle,
    field: fieldStyle,
    textarea: textareaStyle,
  };
}

/******************************************************************************/
