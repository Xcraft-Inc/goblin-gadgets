import {Unit} from 'electrum-theme';
import {isImmutable} from 'immutable';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles(theme, props) {
  let minWidth = null;
  let maxWidth = null;
  let flexGrow = null;
  let flexShrink = null;
  let flexBasis = null;
  let overflow = null;
  let verticalPadding = theme.shapes.tablePadding;
  let marginLeft = null;
  let marginRight = null;
  let fontWeight = null;
  let textTransform = null;
  let backgroundColor = null;
  let fontSize = theme.shapes.tableTextSize;

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
    verticalPadding = null;
  }

  if (props.level && props.level > 0) {
    // level = 0  ->  fontSize = 90%
    // level = 1  ->  fontSize = 90% * 0.8 = 72%
    // level = 2  ->  fontSize = 90% * 0.7 = 63%
    // level = 3  ->  fontSize = 90% * 0.6 = 54%
    fontSize = Unit.multiply(
      theme.shapes.tableTextSize,
      0.9 - props.level * 0.1
    );

    if (props.indent === 'space') {
      marginLeft = Unit.multiply(theme.shapes.tablePadding, props.level);
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
    padding: verticalPadding + ' 0px',
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    cursor: 'default',
  };

  return {
    cell: cellStyle,
  };
}

/******************************************************************************/
