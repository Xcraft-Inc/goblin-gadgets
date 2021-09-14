import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
import {Unit} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'visibility',
  'horizontalSpacing',
  'shape',
  'width',
  'comboDirection',
];

export default function styles(theme, props) {
  const {
    grow,
    visibility,
    horizontalSpacing,
    shape,
    width,
    comboDirection,
  } = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = '0px';
  let borderRadius = '0px';
  let opacity = visibility === false ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  marginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );

  if (shape === 'rounded') {
    borderRadius = theme.shapes.actionRadius;
  }

  const translatableTextField = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width,
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

  const translatableTextFieldShadow = {...translatableTextField};
  translatableTextFieldShadow.boxShadow = theme.shapes.comboShadow;
  translatableTextFieldShadow.borderRadius = borderRadius;

  const translatableTextFieldFocused = {...translatableTextField};
  translatableTextFieldFocused.boxShadow =
    theme.shapes.focusedShadow + theme.palette.focused;
  translatableTextFieldFocused.borderRadius = borderRadius;

  const comboBox = {
    position: 'absolute',
    right: comboDirection === 'right' ? null : '0px',
    left: comboDirection === 'right' ? '0px' : null,
    top: Unit.add(theme.shapes.lineHeight, '1px'),
    marginTop: theme.shapes.lineSpacing,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shapes.calendarShadow,
  };

  const emptyCombo = {
    margin: theme.shapes.containerMargin,
  };

  const nabuTextField = {
    flexBasis: '0',
    flexShrink: '0',
    flexGrow: '1',
    width: '100%',
  };

  const toolbar = {
    marginLeft: '-1px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.textFieldBorderColor}`,
  };

  /******************************************************************************/

  const editBackground = {
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 10,
  };

  const edit = {
    position: 'fixed',
    left: '10vw',
    right: '10vw',
    top: '10vh',
    bottom: '10vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: theme.palette.light,
    boxShadow: 'rgba(0,0,0,0.5) 0px 10px 50px 25px',
    zIndex: 10,
  };

  const editTitle = {
    height: '40px',
    backgroundColor: theme.palette.base,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const editField = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '50px',
  };

  const editClose = {
    position: 'absolute',
    right: '4px',
    top: '4px',
  };

  /******************************************************************************/

  return {
    translatableTextField,
    translatableTextFieldShadow,
    translatableTextFieldFocused,
    comboBox,
    emptyCombo,
    nabuTextField,
    toolbar,

    editBackground,
    edit,
    editTitle,
    editField,
    editClose,
  };
}

/******************************************************************************/
