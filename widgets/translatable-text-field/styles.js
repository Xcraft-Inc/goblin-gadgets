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
  'rows',
];

export default function styles(theme, props) {
  const {
    grow,
    visibility,
    horizontalSpacing,
    shape,
    width,
    comboDirection,
    rows,
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

  const translatableTextFieldFocused = {
    ...translatableTextField,
    boxShadow: theme.shapes.focusedShadow + theme.palette.focused,
    borderRadius,
  };

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
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 1,
    width: '100%',
  };

  const toolbar = {
    marginLeft: '-1px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.textFieldBorderColor}`,
  };

  /******************************************************************************/

  const edit = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  };

  const editLocale = {
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 10px',
  };

  const editTitle = {
    height: '40px',
    borderRadius: '4px 4px 0px 0px',
    backgroundColor: theme.palette.textFieldBorderColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 4px',
  };

  const editField = {
    margin: '-1px 0px 10px 0px',
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
  };

  const editMarkdown = {
    flexGrow: 1,
    flexBasis: 0,
    overflowY: 'auto',
    padding: '10px',
    border: `1px solid ${theme.palette.textFieldBorderColor}`,
  };

  const editReadonly = {
    border: `1px solid ${theme.palette.textFieldBorderColor}`,
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 1,
    width: '100%',
    height: Unit.multiply('20px', rows || 10),
    fontSize: '75%',
    padding: '0px 10px',
    overflowY: 'auto',
  };

  /******************************************************************************/

  return {
    translatableTextField,
    translatableTextFieldFocused,
    comboBox,
    emptyCombo,
    nabuTextField,
    toolbar,

    edit,
    editLocale,
    editTitle,
    editField,
    editMarkdown,
    editReadonly,
  };
}

/******************************************************************************/
