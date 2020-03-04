import {Unit} from 'electrum-theme';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export const propNames = [
  'frame',
  'grow',
  'hasButtons',
  'height',
  'headerWithoutHorizontalSeparator',
  'row',
];

export function mapProps(props) {
  const {row, ...otherProps} = props;
  if (row) {
    return {
      ...otherProps,
      backgroundColor: row.get('backgroundColor'),
    };
  }
  return otherProps;
}

export default function styles(theme, props) {
  const {
    backgroundColor,
    frame,
    grow,
    hasButtons,
    height,
    headerWithoutHorizontalSeparator,
  } = props;

  const m = theme.shapes.containerMargin;

  const border = Bool.isTrue(frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const boxStyle = {
    flexGrow: grow,
  };

  const treeStyle = {
    flexGrow: grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
    borderRadius: Bool.isTrue(hasButtons)
      ? theme.shapes.tableActionRadius +
        ' ' +
        theme.shapes.tableActionRadius +
        ' 0px 0px'
      : null,
  };

  // If property 'height' is defined, vertical scroller is already visible,
  // for scrolling the body (without header). Header must have a right
  // padding with include the scroller width.
  const paddingRight = height ? Unit.add(theme.shapes.scrollerThickness, m) : m;

  const headerStyle = {
    borderBottom: Bool.isTrue(headerWithoutHorizontalSeparator)
      ? null
      : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + paddingRight + ' 0px ' + m,
    cursor: 'default',
    backgroundColor:
      Bool.isTrue(hasButtons) && Bool.isTrue(frame)
        ? theme.palette.tableActionBackground
        : null,
  };

  const bodyStyle = {
    height: height,
    overflowY: height ? 'scroll' : 'hidden',
    marginLeft: Unit.multiply(theme.shapes.treeLevelSpacing, -1),
    cursor: 'default',
  };

  // The transition isn't ideal, but I can't do any better!
  // Transition from hidden to expanded:
  //  - height has not transition (immediate expansion)
  //  - scaleY has transition
  const indentExpandedStyle = {
    marginLeft: theme.shapes.treeLevelSpacing,
    maxHeight: '10000px',
    transformOrigin: 'top',
    transform: 'scaleY(1)',
    transition: theme.transitions.easeOut(),
    //- ':hover': {
    //-   backgroundColor: 'rgba(0, 0, 0, 0.05)',
    //- },
  };

  // The transition isn't ideal, but I can't do any better!
  // Transition from expanded to hidden:
  //  - scaleY has transition
  //  - height has transition after scaleY, when its value reaches zero
  const indentHiddenStyle = {
    marginLeft: theme.shapes.treeLevelSpacing,
    maxHeight: '0px',
    overflow: 'hidden',
    transformOrigin: 'top',
    transform: 'scaleY(0)',
    transition: theme.transitions.easeOut(),
  };

  const verticalSeparatorStyle = {
    visibility: Bool.isTrue(frame) && height ? 'visible' : 'hidden',
    position: 'absolute',
    height: '100%',
    top: '0px',
    right: Unit.add(theme.shapes.scrollerThickness, '1px'),
    borderRight: '1px solid ' + theme.palette.tableBorder,
  };

  const buttonsStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  const hoverStyle = {
    ':hover + .tree-hover': {
      backgroundColor: TableHelpers.getBackgroundColor(
        theme,
        backgroundColor,
        'children'
      ),
    },
  };

  return {
    box: boxStyle,
    tree: treeStyle,
    header: headerStyle,
    body: bodyStyle,
    indentExpanded: indentExpandedStyle,
    indentHidden: indentHiddenStyle,
    verticalSeparator: verticalSeparatorStyle,
    buttons: buttonsStyle,
    hover: hoverStyle,
  };
}

/******************************************************************************/
