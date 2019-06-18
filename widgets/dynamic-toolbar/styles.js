import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['padding', 'position'];

export default function styles(theme, props) {
  const {padding, position} = props;

  let boxPadding = theme.shapes.dynamicToolbarMargin;
  let borderLeft = null;
  let borderRight = null;
  let borderBottom = null;
  let boxShadow = null;
  let borderRadius = null;

  if (padding === 'large') {
    boxPadding = theme.shapes.containerMargin;
    const b =
      Unit.multiply(theme.shapes.lineSpacing, 0.5) +
      ' solid ' +
      theme.palette.menuBackground;
    if (position === 'top-right') {
      borderLeft = b;
      borderBottom = b;
      borderRadius = '0px 0px 0px ' + boxPadding;
    } else {
      borderRight = b;
      borderBottom = b;
      borderRadius = '0px 0px ' + boxPadding + ' 0px';
    }
    boxShadow = theme.shapes.floatingShadow;
  }

  let visibleTransform, hiddenTransform;
  if (position === 'top-right') {
    visibleTransform = 'translate(-100%, 0%)';
    hiddenTransform = 'translate(0%, 0%)';
  } else {
    visibleTransform = 'translate(0%, 0%)';
    hiddenTransform = 'translate(-100%, 0%)';
  }

  const delay = 700;

  /******************************************************************************/

  const main = {
    position: 'absolute',
    left: position === 'top-right' ? null : '0px',
    right: position === 'top-right' ? '0px' : null,
  };

  const fullScreen = {
    zIndex: 8,
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    //backgroundColor: 'rgba(255, 0, 0, 0.2)',
  };

  const hoverButton = {
    position: 'absolute',
    right: position === 'top-right' ? '0px' : null,
  };

  const boxVisible = {
    zIndex: 9,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: boxPadding,
    borderLeft: borderLeft,
    borderRight: borderRight,
    borderBottom: borderBottom,
    borderRadius: borderRadius,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    boxShadow: boxShadow,
    transform: visibleTransform,
    transition: theme.transitions.easeOut(delay),
  };

  const boxHidden = {
    zIndex: 9,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: boxPadding,
    borderLeft: borderLeft,
    borderRight: borderRight,
    borderBottom: borderBottom,
    borderRadius: borderRadius,
    backgroundColor: theme.palette.dynamicToolbarBackground,
    transform: hiddenTransform,
    transition: theme.transitions.easeOut(delay),
  };

  return {
    main,
    fullScreen,
    hoverButton,
    boxVisible,
    boxHidden,
  };
}

/******************************************************************************/
