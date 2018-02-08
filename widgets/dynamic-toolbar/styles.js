import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const padding = props.padding === 'large'
    ? theme.shapes.containerMargin
    : theme.shapes.dynamicToolbarMargin;

  const border = props.padding === 'large'
    ? theme.shapes.lineSpacing + ' solid ' + theme.palette.menuBackground
    : null;

  const boxShadow = props.padding === 'large'
    ? theme.shapes.floatingShadow
    : null;

  const mainStyle = {
    position: 'absolute',
    left: '0px',
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

  const visibleTransform = props.direction === 'top'
    ? 'translate(0%, 0%)'
    : `translate(${theme.shapes.dynamicToolbarButtonWidth}, 0%)`;
  const hiddenTransform = props.direction === 'top'
    ? 'translate(0%, -100%)'
    : 'translate(-100%, 0%)';
  const delay = props.direction === 'top' ? 400 : 700;

  const boxVisibleStyle = {
    zIndex: 11,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: padding,
    border: border,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    boxShadow: boxShadow,
    transform: visibleTransform,
    transition: theme.transitions.easeOut (delay),
  };

  const boxHiddenStyle = {
    zIndex: 11,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: padding,
    border: border,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    transform: hiddenTransform,
    transition: theme.transitions.easeOut (delay),
  };

  return {
    main: mainStyle,
    fullScreen: fullScreenStyle,
    boxVisible: boxVisibleStyle,
    boxHidden: boxHiddenStyle,
  };
}

/******************************************************************************/
