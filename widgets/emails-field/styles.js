/******************************************************************************/

export const propNames = ['grow', 'width', 'disabled', 'readonly'];

export default function styles(theme, props) {
  const field = {
    boxSizing: 'border-box',
    width: props.width,
    minHeight: theme.shapes.lineHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexGrow: props.grow,
    gap: '4px',
    padding: '3px 6px',
    color: theme.palette.textColor,
    backgroundColor: theme.palette.textFieldBackground,
    border:
      theme.shapes.textFieldBorderWidth +
      ' solid ' +
      theme.palette.textFieldBorderColor,
    borderRadius: theme.shapes.textFieldBorderRadius,
    cursor: props.readonly || props.disabled ? 'default' : 'text',
  };

  const readonly = {
    backgroundColor: theme.palette.textFieldReadonlyBackground,
  };

  const wrong = {
    backgroundColor: theme.palette.textFieldWrongBackground,
  };

  const tag = {
    maxWidth: '100%',
    height: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid ' + theme.palette.textFieldBorderColor,
    borderRadius: '12px',
    backgroundColor: theme.palette.textFieldReadonlyBackground,
    overflow: 'hidden',
  };

  const tagText = {
    padding: '0 8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    userSelect: 'text',
  };

  const removeButton = {
    'width': '24px',
    'height': '24px',
    'padding': '0',
    'color': theme.palette.textColor,
    'backgroundColor': 'transparent',
    'border': 'none',
    'borderLeft': '1px solid ' + theme.palette.textFieldBorderColor,
    'cursor': 'pointer',
    'fontSize': '18px',
    'lineHeight': '20px',
    ':hover': {
      backgroundColor: theme.palette.textFieldWrongBackground,
    },
  };

  const input = {
    minWidth: '180px',
    height: '24px',
    flexGrow: 1,
    padding: '0 4px',
    color: theme.palette.textColor,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '100%',
  };

  return {
    field,
    readonly,
    wrong,
    tag,
    tagText,
    removeButton,
    input,
  };
}
