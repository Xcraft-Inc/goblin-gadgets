import {Unit} from 'electrum-theme';
import {isImmutable} from 'immutable';
import * as Bool from 'gadgets/helpers/bool-helpers';

/******************************************************************************/

export default function styles(theme, props) {
  let minWidth = null;
  let maxWidth = null;
  let flexGrow = null;
  let flexShrink = null;
  let flexBasis = null;
  let overflow = null;
  let verticalPadding = theme.shapes.treePadding;
  let paddingLeft = '0px';
  let paddingRight = '0px';
  let marginLeft = '0px';
  let marginRight = '0px';
  let fontWeight = null;
  let textTransform = null;
  let backgroundColor = null;
  let fontSize = theme.shapes.treeTextSize;

  if (props.width) {
    minWidth = props.width;
    maxWidth = props.width;
  }
  if (props.grow) {
    flexGrow = props.grow;
    flexShrink = '0';
    flexBasis = '0%';
    minWidth = '0px';
    overflow = 'hidden';
  }
  if (Bool.isFalse(props.isLast)) {
    // All cells have a right margin, except the last.
    marginRight = theme.shapes.tablePadding;
  }
  if (Bool.isTrue(props.isHeader)) {
    fontWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (isImmutable(props.text)) {
    backgroundColor = props.text.get('backgroundColor');
  }

  if (props.verticalSpacing === 'compact') {
    verticalPadding = '0px';
  }

  if (props.level && props.level > 0) {
    //- // level = 0  ->  fontSize = 90%
    //- // level = 1  ->  fontSize = 90% * 0.8 = 72%
    //- // level = 2  ->  fontSize = 90% * 0.7 = 63%
    //- // level = 3  ->  fontSize = 90% * 0.6 = 54%
    //- fontSize = Unit.multiply(
    //-   theme.shapes.treeTextSize,
    //-   0.9 - props.level * 0.1
    //- );

    if (props.indent === 'space') {
      if (props.textAlign === 'right') {
        paddingRight = Unit.multiply(theme.shapes.tablePadding, props.level);
      } else {
        paddingLeft = Unit.multiply(theme.shapes.tablePadding, props.level);
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

  const cellStyle = {
    minWidth: minWidth,
    maxWidth: maxWidth,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    overflow: overflow,
    marginLeft: marginLeft,
    marginRight: marginRight,
    textAlign: props.textAlign,
    fontWeight: fontWeight,
    textTransform: textTransform,
    padding:
      verticalPadding +
      ' ' +
      paddingRight +
      ' ' +
      verticalPadding +
      ' ' +
      paddingLeft,
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    cursor: 'default',
  };

  return {
    cell: cellStyle,
  };
}

/******************************************************************************/
