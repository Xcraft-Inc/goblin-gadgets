import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let opacity = props.visibility === 'false' ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  if (props.spacing === 'overlap') {
    marginRight = '-1px';
  } else if (props.spacing === 'large') {
    marginRight = theme.shapes.lineSpacing;
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    position: 'relative',
    opacity: opacity,
  };

  const comboBoxStyle = {
    position: 'absolute',
    right: props.comboDirection === 'right' ? null : '0px',
    left: props.comboDirection === 'right' ? '0px' : null,
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
