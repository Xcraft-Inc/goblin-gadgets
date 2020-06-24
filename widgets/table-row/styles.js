import {Unit} from 'goblin-theme';
import TableHelpers from 'gadgets/helpers/table-helpers';

/******************************************************************************/

export const propNames = [
  'topSeparator',
  'bottomSeparator',
  'isLast',
  'row',
  'compactMargins',
  'selectionMode',
  'selected',
];

export function mapProps(props) {
  const {row, ...otherProps} = props;
  if (row) {
    return {
      ...otherProps,
      backgroundColor: row.get('backgroundColor'),
    };
  }
  return otherProps;
}

/******************************************************************************/

export default function styles(theme, props) {
  const {
    backgroundColor,
    topSeparator,
    bottomSeparator,
    isLast,
    compactMargins,
    selectionMode,
    selected,
  } = props;

  const m = compactMargins ? '0px' : theme.shapes.containerMargin;
  const v1 = Unit.multiply(theme.shapes.tablePadding, 0.75);
  const v2 = Unit.multiply(theme.shapes.tablePadding, 0.25);

  // When a row is drawn, it is always only its top separator that is drawn.
  const borderTop = topSeparator
    ? '1px solid ' + theme.palette.tableBorder
    : null;

  // Increases the corresponding margins if there is an upper or lower separator.
  const paddingTop = topSeparator ? v1 : v2;
  const paddingBottom = bottomSeparator || isLast ? v1 : v2;

  const row = {
    'borderTop': borderTop,
    'display': 'flex',
    'flexDirection': 'row',
    'padding': paddingTop + ' ' + m + ' ' + paddingBottom + ' ' + m,
    'color': selected ? theme.palette.tableSelectedText : null,
    'backgroundColor': selected
      ? TableHelpers.getSelectedBackgroundColor(theme, 'none')
      : TableHelpers.getBackgroundColor(theme, backgroundColor, 'none'),
    'cursor': 'default',
    ':hover': {
      backgroundColor:
        selectionMode === 'none'
          ? null
          : selected
          ? TableHelpers.getSelectedBackgroundColor(theme, 'main')
          : TableHelpers.getBackgroundColor(theme, backgroundColor, 'main'),
    },
  };

  /******************************************************************************/

  return {
    row,
  };
}

/******************************************************************************/
