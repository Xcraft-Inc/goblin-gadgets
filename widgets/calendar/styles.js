import {Unit} from 'electrum-theme';

/******************************************************************************/

// result += n*f
function cum(result, n, f = 1) {
  n = Unit.multiply(n, f);
  result.value = Unit.add(result.value, n);
}

// result *= f
function mul(result, f) {
  result.value = Unit.multiply(result.value, f);
}

/******************************************************************************/

export const propNames = [
  'frame',
  'navigator',
  'shadow',
  'itemWidth',
  'itemHeight',
  'margin',
  'monthCount',
];

export default function styles(theme, props) {
  const {
    frame,
    navigator,
    shadow,
    itemWidth = theme.shapes.calendarButtonWidth,
    itemHeight = theme.shapes.calendarButtonHeight,
    margin = '0px',
    monthCount = 1,
  } = props;

  const tipsHeight = '55px';

  const m = theme.shapes.containerMargin;
  const halfMargin = Unit.multiply(m, 0.5);
  const border = frame ? '1px solid ' + theme.palette.tableBorder : null;

  const boxGrow = navigator ? '1' : null;

  // Compute total width.
  const w = {value: '0px'};
  cum(w, itemWidth, 7);
  mul(w, monthCount);
  cum(w, theme.shapes.calendarMargin, (monthCount - 1) * 2);
  cum(w, frame ? '1px' : '0px', monthCount - 1);

  // Compute total height.
  const h = {value: '0px'};
  cum(h, theme.shapes.calendarButtonHeight, 2); // rows for navigation and dow
  cum(h, itemHeight, 6); // rows for days

  /******************************************************************************/

  const calendar = {
    position: 'relative',
    width: w.value,
    height: h.value,
    padding: margin,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: boxGrow,
    backgroundColor: theme.palette.calendarBackground,
    border: border,
    boxShadow: shadow ? theme.shapes.calendarShadow : null,
  };

  const calendarTips = {
    ...calendar,
    height: Unit.add(h.value, tipsHeight),
  };

  const singleMonth = {
    display: 'flex',
    flexDirection: 'column',
  };

  const month = {
    ...singleMonth,
    paddingRight: theme.shapes.calendarMargin,
  };

  const separator = {
    paddingRight: theme.shapes.calendarMargin,
    borderLeft: border,
  };

  const header = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.palette.calendarHeaderText,
  };

  const headerTitleSajex = {
    flexGrow: '1',
  };

  const dowText = {
    width: itemWidth,
    textAlign: 'center',
    lineHeight: theme.shapes.calendarButtonHeight,
    color: theme.palette.calendarHeaderText,
    fontSize: Unit.multiply(
      theme.shapes.calendarDOWTextSize,
      theme.typo.fontScale
    ),
  };

  const dowLine = {
    display: 'flex',
    flexDirection: 'row',
  };

  const line = {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px',
  };

  const column = {
    display: 'flex',
    flexDirection: 'column',
  };

  const navigatorStyle = {
    maxWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    padding: '0px 0px 0px ' + halfMargin,
  };

  const double = {
    display: 'flex',
    flexDirection: 'row',
  };

  const button = {
    width: itemWidth,
    height: itemHeight,
  };

  const buttonWeekend = {
    ...button,
    backgroundColor: theme.palette.calendarWeekendBackground,
  };

  const tipsShowed = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: '0px',
    height: tipsHeight,
    padding: `0px ${margin}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const tipsHidden = {
    ...tipsShowed,
    height: '0px',
  };

  /******************************************************************************/

  return {
    calendar,
    calendarTips,
    month,
    singleMonth,
    separator,
    header,
    headerTitleSajex,
    dowText,
    dowLine,
    line,
    column,
    navigator: navigatorStyle,
    double,
    button,
    buttonWeekend,
    tipsShowed,
    tipsHidden,
  };
}

/******************************************************************************/
