import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

function getMainColor (theme, props) {
  const color = ColorHelpers.getMarkColor (theme, props.color);
  return color ? color : theme.palette.chronoEventMainBackground;
}

export default function styles (theme, props) {
  const a = props.startFrom;
  const b = props.endFrom;
  const c = props.startTo;
  const d = props.endTo;

  const mainColor = getMainColor (theme, props);

  const abWidth = Unit.sub (b, a);
  const bcWidth = Unit.sub (c, b);
  const cdWidth = Unit.sub (d, c);
  const adWidth = Unit.sub (d, a);

  const s = theme.shapes.eventSeparator;
  const top = s;
  const middle = '50%';
  const height = `calc(100% - ${Unit.multiply (s, 2)})`;
  const half = `calc(50% - ${s})`;

  const startDistinctStyle = {
    position: 'absolute',
    left: a,
    width: abWidth,
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventStartBackground,
    userSelect: 'none',
  };

  const mainDistinctStyle = {
    position: 'absolute',
    left: a,
    width: adWidth,
    top: top,
    height: height,
    backgroundColor: mainColor,
    userSelect: 'none',
  };

  const middleDistinctStyle = {
    position: 'absolute',
    left: b,
    width: bcWidth,
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventMiddleBackground,
    userSelect: 'none',
  };

  const endDistinctStyle = {
    position: 'absolute',
    left: c,
    width: cdWidth,
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventEndBackground,
    userSelect: 'none',
  };

  const acWidth = Unit.sub (c, a);
  const cbWidth = Unit.sub (b, c);
  const bdWidth = Unit.sub (d, b);

  const startOverlapStyle = {
    position: 'absolute',
    left: a,
    width: acWidth,
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventStartBackground,
    userSelect: 'none',
  };

  const topOverlapStyle = {
    position: 'absolute',
    left: c,
    width: cbWidth,
    top: top,
    height: half,
    backgroundColor: theme.palette.chronoEventStartBackground,
    userSelect: 'none',
  };

  const bottomOverlapStyle = {
    position: 'absolute',
    left: c,
    width: cbWidth,
    top: middle,
    height: half,
    backgroundColor: theme.palette.chronoEventEndBackground,
    userSelect: 'none',
  };

  const endOverlapStyle = {
    position: 'absolute',
    left: b,
    width: bdWidth,
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventEndBackground,
    userSelect: 'none',
  };

  const leftTooltipStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: '100%',
    height: '100%',
    padding: '0px 10px',
    userSelect: 'none',
    backgroundColor: theme.palette.chronoLabelTooltipBackground,
    zIndex: 2,
  };

  const rightTooltipStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    left: '100%',
    height: '100%',
    padding: '0px 10px',
    userSelect: 'none',
    backgroundColor: theme.palette.chronoLabelTooltipBackground,
    zIndex: 2,
  };

  const r = theme.shapes.chronosBarRadius;

  const dotStyle = {
    position: 'absolute',
    left: `calc(${a} - ${r})`,
    width: Unit.multiply (r, 2),
    top: `calc(50% - ${r})`,
    height: Unit.multiply (r, 2),
    borderRadius: r,
    backgroundColor: mainColor,
    zIndex: 2,
  };

  const fromDotStyle = {
    position: 'absolute',
    left: `calc(${a} - ${r})`,
    width: Unit.multiply (r, 2),
    top: `calc(50% - ${r})`,
    height: Unit.multiply (r, 2),
    borderRadius: r,
    backgroundColor: theme.palette.chronoEventStartBackground,
    zIndex: 2,
  };

  const toDotStyle = {
    position: 'absolute',
    left: `calc(${c} - ${r})`,
    width: Unit.multiply (r, 2),
    top: `calc(50% - ${r})`,
    height: Unit.multiply (r, 2),
    borderRadius: r,
    backgroundColor: theme.palette.chronoEventEndBackground,
    zIndex: 2,
  };

  const lineStyle = {
    position: 'absolute',
    left: `calc(${a} - 1px)`,
    width: '2px',
    top: top,
    height: height,
    backgroundColor: mainColor,
    zIndex: 2,
  };

  const fromLineStyle = {
    position: 'absolute',
    left: `calc(${a} - 1px)`,
    width: '2px',
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventStartBackground,
    zIndex: 2,
  };

  const toLineStyle = {
    position: 'absolute',
    left: `calc(${c} - 1px)`,
    width: '2px',
    top: top,
    height: height,
    backgroundColor: theme.palette.chronoEventEndBackground,
    zIndex: 2,
  };

  return {
    startDistinct: startDistinctStyle,
    mainDistinct: mainDistinctStyle,
    middleDistinct: middleDistinctStyle,
    endDistinct: endDistinctStyle,
    startOverlap: startOverlapStyle,
    topOverlap: topOverlapStyle,
    bottomOverlap: bottomOverlapStyle,
    endOverlap: endOverlapStyle,
    leftTooltip: leftTooltipStyle,
    rightTooltip: rightTooltipStyle,
    dot: dotStyle,
    fromDot: fromDotStyle,
    toDot: toDotStyle,
    line: lineStyle,
    fromLine: fromLineStyle,
    toLine: toLineStyle,
  };
}

/******************************************************************************/
