import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const lineWidth = props.lineWidth;
  const notesCount = props.notesCount;

  const h = Unit.sub (theme.shapes.chronosLineHeight, '1px');

  const lineStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
    borderBottom: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.eventBackground,
    transition: theme.transitions.easeOut (),
  };

  const lineHoverStyle = Object.assign ({}, lineStyle); // clone
  lineHoverStyle.backgroundColor = theme.palette.ticketBackgroundHover;

  const hb =
    theme.shapes.ticketHoverThickness + ' solid ' + theme.palette.ticketHover;

  const lineShapeStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    userSelect: 'none',
    cursor: 'default',
    borderTop: props.hoverShape === 'last' ? null : hb,
    borderBottom: props.hoverShape === 'first' ? null : hb,
    borderLeft: hb,
    borderRight: hb,
    borderRadius: props.hoverShape === 'first'
      ? '10px 10px 0px 0px'
      : props.hoverShape === 'last'
          ? '0px 0px 10px 10px'
          : '10px 10px 10px 10px',
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
    cursor: 'default',
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
    cursor: 'default',
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
    cursor: 'default',
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
