import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const h = Unit.add (
    theme.shapes.dynamicToolbarButtonHeight,
    Unit.multiply (theme.shapes.dynamicToolbarMargin, 2)
  );

  const mainStyle = {
    position: 'absolute',
  };

  const hoverButtonStyle = {
    position: 'absolute',
    left: '0px',
    top: '0px',
  };

  const fullScreenStyle = {
    zIndex: 10,
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    //backgroundColor: 'rgba(255, 0, 0, 0.2)',
  };

  const boxVisibleStyle = {
    zIndex: 11,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: theme.shapes.dynamicToolbarMargin,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    transform: `translate(${theme.shapes.dynamicToolbarButtonWidth}, 0%)`,
    transition: theme.transitions.easeOut (700),
  };

  const boxHiddenStyle = {
    zIndex: 11,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: theme.shapes.dynamicToolbarMargin,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    transform: `translate(-100%, 0%)`,
    transition: theme.transitions.easeOut (700),
  };

  return {
    main: mainStyle,
    fullScreen: fullScreenStyle,
    boxVisible: boxVisibleStyle,
    boxHidden: boxHiddenStyle,
  };
}

/******************************************************************************/
