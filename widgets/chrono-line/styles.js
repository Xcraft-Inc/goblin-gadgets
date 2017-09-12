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

  const lineHoverStyle = {
    position: 'relative',
    minHeight: h,
    maxHeight: h,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
    borderBottom: '1px solid ' + theme.palette.chronoLineSeparator,
    backgroundColor: theme.palette.chronoHover,
    transition: theme.transitions.easeOut (),
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
    border: theme.shapes.chronosSeparatorWidth +
      ' solid ' +
      theme.palette.chronoLabelSeparator,
    backgroundColor: theme.palette.eventBackground,
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
    lineDragged: lineDraggedStyle,
    lineLabel: lineLabelStyle,
    lineEvent: lineEventStyle,
  };
}

/******************************************************************************/
