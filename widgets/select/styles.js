import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 11,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'default',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const comboStyle = {
    visibility: 'visible',
    position: 'absolute',
    zIndex: 11,
    left: props.left,
    top: props.top,
    bottom: props.bottom,
    opacity: 1.0,
    cursor: 'default',
    userSelect: 'none',
  };

  const insideStyle = {
    display: 'flex',
    maxHeight: props.maxHeight,
    cursor: 'default',
    userSelect: 'none',
  };

  const selectStyle = {
    width: '100%',
    border: 'none',
    padding: '0px',
    backgroundColor: theme.palette.menuItemInactiveBackground,
    overflowY: 'auto',
  };

  const optionStyle = {
    padding:
      theme.shapes.selectVerticalPadding +
      ' ' +
      theme.shapes.selectHorizontalPadding,
    backgroundColor: theme.palette.comboItemBackground,
  };
  optionStyle[':hover'] = {
    backgroundColor: theme.palette.comboItemHover,
  };

  return {
    fullScreen: fullScreenStyle,
    combo: comboStyle,
    inside: insideStyle,
    select: selectStyle,
    option: optionStyle,
  };
}

/******************************************************************************/
