import {Unit} from 'electrum-theme';
const TableHelpers = require('gadgets/helpers/table-helpers');

/******************************************************************************/

export const propNames = [
  'frame',
  'grow',
  'hasButtons',
  'height',
  'headerWithoutHorizontalSeparator',
  'row',
  'darkTheme',
  'hoverBackgroundColor',
  'selectedBackgroundColor',
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

  const border = frame ? '1px solid ' + theme.palette.tableBorder : null;

  const box = {
    flexGrow: grow,
  };

  const tree = {
    flexGrow: grow,
    cursor: 'default',
    overflowY: 'hidden',
    border: border,
    borderRadius: hasButtons
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

  const header = {
    borderBottom: headerWithoutHorizontalSeparator
      ? null
      : '1px solid ' + theme.palette.tableBorder,
    display: 'flex',
    flexDirection: 'row',
    padding: '0px ' + paddingRight + ' 0px ' + m,
    cursor: 'default',
    backgroundColor:
      hasButtons && frame ? theme.palette.tableActionBackground : null,
  };

  const body = {
    height: height,
    overflowY: height ? 'scroll' : 'hidden',
    marginLeft: Unit.multiply(theme.shapes.treeLevelSpacing, -1),
    cursor: 'default',
  };

  // The transition isn't ideal, but I can't do any better!
  // Transition from hidden to expanded:
  //  - height has not transition (immediate expansion)
  //  - scaleY has transition
  const indentExpanded = {
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
  const indentHidden = {
    marginLeft: theme.shapes.treeLevelSpacing,
    maxHeight: '0px',
    overflow: 'hidden',
    transformOrigin: 'top',
    transform: 'scaleY(0)',
    transition: theme.transitions.easeOut(),
  };

  const verticalSeparator = {
    visibility: frame && height ? 'visible' : 'hidden',
    position: 'absolute',
    height: '100%',
    top: '0px',
    right: Unit.add(theme.shapes.scrollerThickness, '1px'),
    borderRight: '1px solid ' + theme.palette.tableBorder,
  };

  const buttons = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  const hover = {
    ':hover + .tree-hover': {
      backgroundColor: TableHelpers.getBackgroundColor(
        theme,
        backgroundColor,
        'children',
        props
      ),
    },
  };

  return {
    box,
    tree,
    header,
    body,
    indentExpanded,
    indentHidden,
    verticalSeparator,
    buttons,
    hover,
  };
}

/******************************************************************************/
