import {Unit} from 'electrum-theme';
import * as Bool from '../helpers/boolean-helpers.js';

/******************************************************************************/

export default function styles (theme, props) {
  const extended = Bool.isTrue (props.extended);

  const m = theme.shapes.containerMargin;
  const halfMargin = Unit.multiply (m, 0.5);

  let width = null;
  let backgroundColor = 'transparent';
  let color = theme.palette.recurrenceHeaderInfoCompactedText;
  let opacity = 1.0;
  let borderTopColor = theme.palette.paneNavigatorInactiveBorder;
  let borderTopWidth = '1px';
  let borderTopStyle = 'solid';
  let borderBottomColor = null;
  let borderBottomWidth = null;
  let borderBottomStyle = null;
  let borderLeftColor = null;
  let borderLeftWidth = null;
  let borderLeftStyle = null;
  let borderRightColor = null;
  let borderRightWidth = null;
  let borderRightStyle = null;

  if (extended) {
    backgroundColor = theme.palette.recurrenceExtendedBoxBackground;
    color = theme.palette.recurrenceHeaderInfoExtendedText;
  }
  if (!props.isDragged && props.hasHeLeft) {
    backgroundColor = theme.palette.paneBackground;
    opacity = 0.0;
  }
  if (props.isDragged) {
    width = '730px';
    borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
    borderBottomWidth = '1px';
    borderBottomStyle = 'solid';
    borderLeftColor = theme.palette.paneNavigatorInactiveBorder;
    borderLeftWidth = '1px';
    borderLeftStyle = 'solid';
    borderRightColor = theme.palette.paneNavigatorInactiveBorder;
    borderRightWidth = '1px';
    borderRightStyle = 'solid';
    if (!extended) {
      backgroundColor = theme.palette.paneBackground;
    }
  }

  const mainStyle = {
    width: width,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    padding: halfMargin + ' ' + m,
    borderTopColor: borderTopColor,
    borderTopWidth: borderTopWidth,
    borderTopStyle: borderTopStyle,
    borderBottomColor: borderBottomColor,
    borderBottomWidth: borderBottomWidth,
    borderBottomStyle: borderBottomStyle,
    borderLeftColor: borderLeftColor,
    borderLeftWidth: borderLeftWidth,
    borderLeftStyle: borderLeftStyle,
    borderRightColor: borderRightColor,
    borderRightWidth: borderRightWidth,
    borderRightStyle: borderRightStyle,
    backgroundColor: backgroundColor,
    color: color,
    transition: theme.transitions.easeOut (500, 'background-color', 0),
    cursor: 'default',
    userSelect: 'none',
  };

  const headerInfoStyle = {
    display: 'flex',
    flexDirection: 'row',
    opacity: opacity,
  };

  const headerDragStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    cursor: 'ns-resize',
  };

  const editorStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: halfMargin + ' 0px',
    opacity: opacity,
  };

  const calendarStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
    padding: '0px 0px ' + halfMargin + ' 0px',
    opacity: opacity,
  };

  return {
    main: mainStyle,
    headerInfo: headerInfoStyle,
    headerDrag: headerDragStyle,
    editor: editorStyle,
    calendar: calendarStyle,
  };
}

/******************************************************************************/
