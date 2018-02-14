import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const lineWidth = props.lineWidth;
  const notesCount = props.notesCount;

  const h = Unit.sub (theme.shapes.chronosLineHeight, '1px');
  const r = Unit.multiply (theme.shapes.chronosLineHeight, 0.5);
  const br = props.hoverShape === 'first'
    ? r + ' ' + r + ' 0px 0px'
    : props.hoverShape === 'last' ? '0px 0px ' + r + ' ' + r : r;
  const hb =
    theme.shapes.ticketHoverThickness + ' solid ' + theme.palette.ticketHover;
  const cursor = props.cursor;

  const lineStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: cursor,
    borderBottom: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.eventBackground,
    transition: theme.transitions.easeOut (),
  };

  const lineHoverStyle = Object.assign ({}, lineStyle); // clone
  lineHoverStyle.backgroundColor = theme.palette.ticketBackgroundHover;
  lineHoverStyle.borderRadius = br;

  const lineShapeStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    userSelect: 'none',
    cursor: cursor,
    borderTop: props.hoverShape === 'last' ? null : hb,
    borderBottom: props.hoverShape === 'first' ? null : hb,
    borderLeft: hb,
    borderRight: hb,
    borderRadius: br,
    transition: theme.transitions.easeOut (),
    zIndex: 3,
  };

  const lineDraggedStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    width: Unit.multiply (lineWidth, notesCount + 1),
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: cursor,
    border: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.eventBackground,
    boxShadow: theme.palette.dragAndDropShadow,
    transition: theme.transitions.easeOut (),
  };

  const lineLabelStyle = {
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: cursor,
  };

  const lineEventStyle = {
    position: 'relative',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: cursor,
  };

  return {
    line: lineStyle,
    lineHover: lineHoverStyle,
    lineShape: lineShapeStyle,
    lineDragged: lineDraggedStyle,
    lineLabel: lineLabelStyle,
    lineEvent: lineEventStyle,
  };
}

/******************************************************************************/
