import * as Bool from 'gadgets/boolean-helpers';
import {isImmutable} from 'immutable';

/******************************************************************************/

export default function styles(theme, props) {
  let minWidth = null;
  let maxWidth = null;
  let flexGrow = null;
  let flexShrink = null;
  let flexBasis = null;
  let overflow = null;
  let verticalPadding = theme.shapes.tablePadding;
  let marginRight = null;
  let fontWeight = null;
  let textTransform = null;
  let backgroundColor = null;

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

  const cellStyle = {
    minWidth: minWidth,
    maxWidth: maxWidth,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    overflow: overflow,
    marginRight: marginRight,
    textAlign: props.textAlign,
    fontWeight: fontWeight,
    textTransform: textTransform,
    padding: verticalPadding + ' 0px',
    //- fontSize: theme.shapes.tableTextSize,
    fontSize: (props.level === 0 ? 90 : 90 - 20 * props.level) + '%',
    backgroundColor: backgroundColor,
    cursor: 'default',
  };

  return {
    cell: cellStyle,
  };
}

/******************************************************************************/
