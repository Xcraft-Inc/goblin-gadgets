import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const hasHeLeft = props.hasHeLeft;
  const isDragged = props.isDragged;
  const x = hasHeLeft && !isDragged;

  const m = theme.shapes.containerMargin;
  const mm = Unit.multiply (m, 0.5);

  const bc = x
    ? theme.palette.roadbookDragAndDropBackground
    : theme.palette.roadbookBackground;
  const mw = x ? theme.shapes.dispatchTicketWidth : null;

  const border =
    theme.shapes.viewSpacing + ' solid ' + theme.palette.rootBackground;
  const borderRight = border;
  const borderOther = isDragged ? border : 'none';

  const extendedBoxStyle = {
    padding: '0px ' + mm + ' 0px ' + mm,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: bc,
    borderRight: borderRight,
    borderLeft: borderOther,
    borderTop: borderOther,
    borderBottom: borderOther,
    minWidth: mw,
  };

  const compactedBoxStyle = {
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: bc,
    borderRight: borderRight,
    borderLeft: borderOther,
    borderTop: borderOther,
    borderBottom: borderOther,
    minWidth: mw ? theme.shapes.dispatchTicketCompactedWidth : null,
  };

  return {
    extendedBox: extendedBoxStyle,
    compactedBox: compactedBoxStyle,
  };
}

/******************************************************************************/
