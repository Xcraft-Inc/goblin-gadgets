import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/helpers/bool-helpers';

/******************************************************************************/

export const propNames = [
  'frame',
  'navigator',
  'shadow',
  'itemWidth',
  'itemHeight',
];

export default function styles(theme, props) {
  const {frame, navigator, shadow, itemWidth, itemHeight} = props;

  const m = theme.shapes.containerMargin;
  const halfMargin = Unit.multiply(m, 0.5);
  const border = Bool.isTrue(frame)
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  const boxGrow = navigator ? '1' : null;

  const box = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: boxGrow,
    border: border,
    boxShadow: shadow ? theme.shapes.calendarShadow : null,
  };

  const month = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.calendarBackground,
    marginRight: theme.shapes.lineSpacing,
  };

  const singleMonth = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.calendarBackground,
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
    width: itemWidth || theme.shapes.calendarButtonWidth,
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
    margin: '0px 0px 2px 0px',
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
    width: itemWidth || theme.shapes.calendarButtonWidth,
    height: itemHeight || theme.shapes.calendarButtonHeight,
    backgroundColor: theme.palette.calendarBackground,
  };

  const buttonWeekend = {
    ...button,
    backgroundColor: theme.palette.calendarWeekendBackground,
  };

  return {
    box,
    month,
    singleMonth,
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
