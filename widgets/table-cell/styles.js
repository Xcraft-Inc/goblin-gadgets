import * as Bool from 'gadgets/boolean-helpers';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let minWidth,
    maxWidth,
    flexGrow,
    flexShrink,
    flexBasis,
    overflow,
    marginRight,
    fontWeight,
    textTransform;

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
  if (Bool.isFalse (props.isLast)) {
    marginRight = theme.shapes.tablePadding;
  }
  if (Bool.isTrue (props.isHeader)) {
    fontWeight = 'bold';
    textTransform = 'uppercase';
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
    padding: theme.shapes.tablePadding + ' 0px',
    fontSize: theme.shapes.tableTextSize,
    cursor: 'default',
  };

  return {
    cell: cellStyle,
  };
}

/******************************************************************************/
