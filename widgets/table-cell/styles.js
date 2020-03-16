import {Unit} from 'electrum-theme';
import {isImmutable} from 'immutable';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';

/******************************************************************************/

export const propNames = [
  'width',
  'grow',
  'maxHeight',
  'isLast',
  'isHeader',
  'isSortable',
  'text',
  'level',
  'fontSizeStrategy',
  'indent',
  'textAlign',
  'simpleHeader',
];

export function mapProps(props) {
  const {text, ...otherProps} = props;
  if (isImmutable(text)) {
    return {
      ...otherProps,
      backgroundColor: text.get('backgroundColor'),
    };
  }
  return otherProps;
}

export default function styles(theme, props) {
  const {
    backgroundColor,
    width,
    grow,
    maxHeight,
    isLast,
    isHeader,
    isSortable,
    level,
    fontSizeStrategy,
    indent,
    textAlign,
    simpleHeader,
  } = props;

  let minWidth = null;
  let maxWidth = null;
  let flexGrow = null;
  let flexShrink = null;
  let flexBasis = null;
  let overflow = null;
  let paddingLeft = '0px';
  let paddingRight = '0px';
  let paddingTop = '0px';
  let paddingBottom = '0px';
  let marginLeft = '0px';
  let marginRight = '0px';
  let marginTop = '0px';
  let marginBottom = '0px';
  let borderRight = null;
  let fontWeight = null;
  let textTransform = null;
  let fontSize = theme.shapes.tableTextSize;
  let hoverColor = null;

  if (width) {
    minWidth = width;
    maxWidth = width;
  }
  if (grow) {
    flexGrow = grow;
    flexShrink = '0';
    flexBasis = '0%';
    minWidth = '0px';
    overflow = 'hidden';
  }
  if (Bool.isFalse(isLast)) {
    // All cells have a right margin, except the last.
    marginRight = theme.shapes.tablePadding;
  }
  if (Bool.isTrue(isHeader) && !Bool.isTrue(simpleHeader)) {
    fontWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (level && level > 0) {
    if (fontSizeStrategy === 'decrease') {
      // level = 0  ->  fontSize = 90%
      // level = 1  ->  fontSize = 90% * 0.8 = 72%
      // level = 2  ->  fontSize = 90% * 0.7 = 63%
      // level = 3  ->  fontSize = 90% * 0.6 = 54%
      fontSize = Unit.multiply(theme.shapes.tableTextSize, 0.9 - level * 0.1);
    }

    if (indent === 'space') {
      if (textAlign === 'right') {
        paddingRight = Unit.multiply(theme.shapes.tablePadding, level);
      } else {
        paddingLeft = Unit.multiply(theme.shapes.tablePadding, level);
      }

      if (minWidth && minWidth !== '0px') {
        minWidth = Unit.sub(minWidth, paddingLeft);
        minWidth = Unit.sub(minWidth, paddingRight);
      }

      if (maxWidth && maxWidth !== '0px') {
        maxWidth = Unit.sub(maxWidth, paddingLeft);
        maxWidth = Unit.sub(maxWidth, paddingRight);
      }
    }
  }

  if (Bool.isTrue(isSortable)) {
    hoverColor = theme.palette.actionButtonBackground;
  }

  const tableCell = {
    'position': 'relative',
    'minWidth': minWidth,
    'maxWidth': maxWidth,
    'maxHeight': maxHeight,
    'flexGrow': flexGrow,
    'flexShrink': flexShrink,
    'flexBasis': flexBasis,
    'overflow': overflow,
    'marginLeft': marginLeft,
    'marginRight': marginRight,
    'marginTop': marginTop,
    'marginBottom': marginBottom,
    'paddingLeft': paddingLeft,
    'paddingRight': paddingRight,
    'paddingTop': paddingTop,
    'paddingBottom': paddingBottom,
    'borderRight': borderRight,
    'textAlign': textAlign,
    'fontWeight': fontWeight,
    'textTransform': textTransform,
    'fontSize': fontSize,
    'backgroundColor': backgroundColor,
    ':hover': {
      color: hoverColor,
    },
  };

  /******************************************************************************/

  return {
    tableCell,
  };
}

/******************************************************************************/
