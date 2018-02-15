import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const h = Unit.sub (theme.shapes.chronosLineHeight, '1px');
  const r = Unit.multiply (theme.shapes.chronosLineHeight, 0.5);
  const br = props.hoverShape === 'first'
    ? r + ' ' + r + ' 0px 0px'
    : props.hoverShape === 'last' ? '0px 0px ' + r + ' ' + r : r;
  const hb =
    theme.shapes.ticketHoverThickness + ' solid ' + theme.palette.ticketHover;

  const boxStyle = {
    cursor: props.cursor,
  };

  const lineStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    borderBottom: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.eventBackground,
    transition: theme.transitions.easeOut (),
  };

  const lineHoverStyle = Object.assign ({}, lineStyle); // clone
  lineHoverStyle.backgroundColor = theme.palette.ticketBackgroundHover;
  lineHoverStyle.borderRadius = br;

  const lineFrontStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    userSelect: 'none',
    zIndex: 3,
  };

  const lineFrontHoverStyle = Object.assign ({}, lineFrontStyle); // clone
  lineFrontHoverStyle.borderTop = props.hoverShape === 'last' ? null : hb;
  lineFrontHoverStyle.borderBottom = props.hoverShape === 'first' ? null : hb;
  lineFrontHoverStyle.borderLeft = hb;
  lineFrontHoverStyle.borderRight = hb;
  lineFrontHoverStyle.borderRadius = br;

  const lineDraggedStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    border: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.eventBackground,
    boxShadow: theme.palette.dragAndDropShadow,
    opacity: 0.9,
    transition: theme.transitions.easeOut (),
  };

  const lineLabelStyle = {
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
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
  };

  return {
    box: boxStyle,
    line: lineStyle,
    lineHover: lineHoverStyle,
    lineFront: lineFrontStyle,
    lineFrontHover: lineFrontHoverStyle,
    lineDragged: lineDraggedStyle,
    lineLabel: lineLabelStyle,
    lineEvent: lineEventStyle,
  };
}

/******************************************************************************/
