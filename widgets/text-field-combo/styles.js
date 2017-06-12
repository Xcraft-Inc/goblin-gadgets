import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const inputGrow = props.grow;
  const inputWidth = props.width;
  const inputSpacing = props.spacing;
  const comboDirection = props.comboDirection;

  let flexGrow = inputGrow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  if (inputSpacing === 'overlap') {
    marginRight = '-1px';
  } else if (inputSpacing === 'large') {
    marginRight = theme.shapes.lineSpacing;
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: inputWidth,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    position: 'relative',
  };

  const comboBoxStyle = {
    position: 'absolute',
    right: comboDirection === 'right' ? null : '0px',
    left: comboDirection === 'right' ? '0px' : null,
    top: Unit.add (theme.shapes.lineHeight, '1px'),
    marginTop: theme.shapes.lineSpacing,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shapes.calendarShadow,
  };

  const emptyComboStyle = {
    margin: theme.shapes.containerMargin,
  };

  return {
    box: boxStyle,
    comboBox: comboBoxStyle,
    emptyCombo: emptyComboStyle,
  };
}

/******************************************************************************/
