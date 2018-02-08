import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let padding = theme.shapes.dynamicToolbarMargin;
  let borderRight = null;
  let borderBottom = null;
  let boxShadow = null;
  let borderRadius = null;

  if (props.padding === 'large') {
    padding = theme.shapes.containerMargin;
    const b =
      Unit.multiply (theme.shapes.lineSpacing, 0.5) +
      ' solid ' +
      theme.palette.menuBackground;
    borderRight = b;
    borderBottom = b;
    boxShadow = theme.shapes.floatingShadow;
    borderRadius = props.padding === 'large'
      ? '0px 0px ' + padding + ' 0px'
      : null;
  }

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

  let visibleTransform = `translate(${theme.shapes.dynamicToolbarButtonWidth}, 0%)`;
  let hiddenTransform = 'translate(-100%, 0%)';

  if (props.direction === 'top') {
    visibleTransform = 'translate(0%, 0%)';
    hiddenTransform = 'translate(0%, -100%)';
  }
  if (props.direction === 'corner') {
    visibleTransform = 'translate(0%, 0%)';
    hiddenTransform = 'translate(-100%, -100%)';
  }

  const delay = props.direction === 'top' ? 400 : 700;

  const boxVisibleStyle = {
    zIndex: 11,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: padding,
    borderRight: borderRight,
    borderBottom: borderBottom,
    borderRadius: borderRadius,
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
    borderRight: borderRight,
    borderBottom: borderBottom,
    borderRadius: borderRadius,
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
