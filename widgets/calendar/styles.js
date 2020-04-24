import {Unit} from 'electrum-theme';

/******************************************************************************/

function add(result, n) {
  if (n) {
    result.value = Unit.add(result.value, n);
  }
}

function mul(result, n) {
  result.value = Unit.multiply(result.value, n);
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

  const m = theme.shapes.containerMargin;
  const halfMargin = Unit.multiply(m, 0.5);
  const border = frame ? '1px solid ' + theme.palette.tableBorder : null;

  const boxGrow = navigator ? '1' : null;

  // Compute total width.
  const w = {value: '0px'};
  add(w, Unit.multiply(itemWidth, 7));
  mul(w, monthCount);
  add(w, Unit.multiply(theme.shapes.calendarMargin, (monthCount - 1) * 2));
  add(w, frame ? Unit.multiply('1px', monthCount - 1) : null);

  // Compute total height.
  const h = {value: '0px'};
  add(h, Unit.multiply(theme.shapes.calendarButtonHeight, 2));
  add(h, Unit.multiply(itemHeight, 6));

  /******************************************************************************/

  const calendar = {
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

  /******************************************************************************/

  return {
    calendar,
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
  };
}

/******************************************************************************/
