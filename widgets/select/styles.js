import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const fullScreenStyle = {
    visibility: 'visible',
    position: 'fixed',
    zIndex: 11,
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    cursor: 'not-allowed',
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
    maxHeight: '45vh',
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
    padding: '10px 20px',
    borderBottom: '1px solid ' + theme.palette.flyingBalloonBackground,
    color: theme.palette.menuText,
    backgroundColor: theme.palette.menuItemInactiveBackground,
  };
  optionStyle[':hover'] = {
    backgroundColor: ColorManipulator.emphasize (
      theme.palette.menuItemInactiveBackground,
      0.2
    ),
  };
  //? optionStyle[':active'] = {
  //?   backgroundColor: '#f00',
  //? };
  //? optionStyle[':after'] = {
  //?   backgroundColor: '#0f0',
  //? };
  //? optionStyle[':focus'] = {
  //?   backgroundColor: '#ff0',
  //? };
  //? optionStyle[':select'] = {
  //?   backgroundColor: '#0ff',
  //? };
  //? optionStyle[':checked'] = {
  //?   backgroundColor: '#0ff',
  //? };

  return {
    fullScreen: fullScreenStyle,
    combo: comboStyle,
    inside: insideStyle,
    select: selectStyle,
    option: optionStyle,
  };
}

/******************************************************************************/
