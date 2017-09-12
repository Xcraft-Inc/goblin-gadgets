import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const lineWidth = props.lineWidth;
  const glyphWidth = props.glyphWidth;

  const lineStyle = {
    position: 'relative',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    width: Unit.sub (lineWidth, theme.shapes.chronosLabelMargin),
    paddingLeft: theme.shapes.chronosLabelMargin,
    borderRight: theme.shapes.chronosSeparatorWidth +
      ' solid ' +
      theme.palette.chronoLabelSeparator,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
  };

  const emptyStyle = {
    position: 'relative',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    width: Unit.sub (lineWidth, theme.shapes.chronosLabelMargin),
    paddingLeft: theme.shapes.chronosLabelMargin,
    borderRight: theme.shapes.chronosSeparatorWidth +
      ' solid ' +
      theme.palette.chronoLabelSeparator,
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
    backgroundColor: theme.palette.ticketDragAndDropShadow,
  };

  const glyphsStyle = {
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    width: glyphWidth,
    display: 'flex',
    flexDirection: 'row',
  };

  const m = '10px';
  const tooltipStyle = {
    position: 'absolute',
    left: Unit.sub (Unit.add (theme.shapes.chronosLabelMargin, glyphWidth), m),
    height: theme.shapes.chronosLineHeight,
    padding: '0px ' + m,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.chronoLabelTooltipBackground,
    zIndex: 2,
  };

  const frontStyle = {
    position: 'absolute',
    minHeight: theme.shapes.chronosLineHeight,
    maxHeight: theme.shapes.chronosLineHeight,
    width: Unit.add (lineWidth, theme.shapes.chronosSeparatorWidth),
    marginLeft: Unit.multiply (theme.shapes.chronosLabelMargin, -1),
    userSelect: 'none',
    cursor: 'default',
    zIndex: 3,
    // backgroundColor: 'rgba(100, 0, 0, 0.2)',
  };

  return {
    line: lineStyle,
    empty: emptyStyle,
    glyphs: glyphsStyle,
    tooltip: tooltipStyle,
    front: frontStyle,
  };
}

/******************************************************************************/
