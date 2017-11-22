import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let topMargin = '0px';
  let rightMargin = '0px';
  let bottomMargin = '0px';
  let leftMargin = '0px';

  let topPadding = '0px';
  let rightPadding = '0px';
  let bottomPadding = '0px';
  let leftPadding = '0px';

  if (props.verticalSpacing === 'compact') {
    bottomMargin = '0px';
  } else if (props.verticalSpacing === 'large') {
    bottomMargin = '10px';
  } else if (props.verticalSpacing === 'overlap') {
    bottomMargin = '-1px';
  }

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: props.grow,
    width: props.width,
    minHeight: theme.shapes.lineHeight,
    alignItems: props.verticalJustify === 'top' ? 'flex-start' : 'center',
    margin: topMargin +
      ' ' +
      rightMargin +
      ' ' +
      bottomMargin +
      ' ' +
      leftMargin,
    padding: topPadding +
      ' ' +
      rightPadding +
      ' ' +
      bottomPadding +
      ' ' +
      leftPadding,
  };

  const compactRowStyle = Object.assign ({}, rowStyle); // clone
  compactRowStyle.minHeight = null;

  return {
    row: rowStyle,
    compactRow: compactRowStyle,
  };
}

/******************************************************************************/
