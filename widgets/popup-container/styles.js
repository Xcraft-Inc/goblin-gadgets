import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = [
  'visibility',
  'size',
  'origin',
  'attach',
  'width',
  'height',
  'heightStrategy',
  'marginTopBottom',
  'attachPoint',
  'transitionScope',
  'triangle',
  'triangleSize',
  'screenBackground',
];

export default function styles(theme, props) {
  const {
    visibility,
    size,
    origin,
    attach,
    width,
    height,
    heightStrategy,
    marginTopBottom,
    attachPoint,
    transitionScope = 'all',
    triangle,
    triangleSize = '16px',
    screenBackground = 'rgba(255,255,255,0.8)',
  } = props;

  const showed = visibility === 'show';
  const full = size === 'fullscreen';
  const fitToContent = heightStrategy === 'fit-to-content';

  let left = '0px';
  let right = '0px';
  let top = '0px';
  let bottom = fitToContent ? null : '0px';

  let marginLeft = 'calc(50% - 600px + 50px)';
  let marginRight = 'calc(50% - 600px + 50px)';
  let marginTop = '100px';
  let marginBottom = '100px';
  let maxHeight = fitToContent ? 'calc(100% - 200px)' : null;

  if (width) {
    const w = n(width);
    marginLeft = `calc(50% - ${px(w / 2)})`;
    marginRight = `calc(50% - ${px(w / 2)})`;
  }

  if (width && attach && attach.includes('left')) {
    left = 'calc(50% - 600px + 100px)';
    right = null;
    marginLeft = null;
    marginRight = null;
  }

  if (width && attach && attach.includes('right')) {
    left = null;
    right = 'calc(50% - 600px + 100px)';
    marginLeft = null;
    marginRight = null;
  }

  if (height && attach && attach.includes('top')) {
    bottom = null;
    marginTop = '100px';
    marginBottom = null;
  }

  if (height && attach && attach.includes('bottom')) {
    top = null;
    marginBottom = '100px';
    marginTop = null;
  }

  if (height && !attach) {
    const h = n(height);
    top = '50%';
    bottom = '50%';
    marginTop = px(-h / 2);
    marginBottom = null;
  }

  if (marginTopBottom) {
    marginTop = marginTopBottom;
    marginBottom = marginTopBottom;
  }

  if (attachPoint) {
    // Compute the attach point without overflow managment.
    const al = px(attachPoint.x - n(width) / 2);
    // Manages the overflow on the right.
    const x = `min(${al}, 100vw - ${width} - 10px)`;
    // Manages the overflow on the left.
    const ml = `max(${x}, 10px)`;

    // Cases where the popup goes out of the window are not handled.
    switch (triangle) {
      case 'bottom':
        marginLeft = ml;
        marginRight = null;
        marginTop = px(attachPoint.y - n(height) - n(triangleSize));
        marginBottom = null;
        break;
      case 'top':
        marginLeft = ml;
        marginRight = null;
        marginTop = px(attachPoint.y + n(triangleSize));
        marginBottom = null;
        break;
      case 'left':
        marginLeft = px(attachPoint.x + n(triangleSize));
        marginRight = null;
        marginTop = px(attachPoint.y - n(height) / 2);
        marginBottom = null;
        break;
      case 'right':
        marginLeft = px(attachPoint.x - n(width) - n(triangleSize));
        marginRight = null;
        marginTop = px(attachPoint.y - n(height) / 2);
        marginBottom = null;
        break;
      default:
        console.error(
          `popupContainer: triangle position '${triangle}' not supported`
        );
    }
  }

  if (full) {
    marginLeft = null;
    marginRight = null;
    marginTop = null;
    marginBottom = null;
  }

  const popupContainer = {
    position: 'absolute',
    inset: '0',
    overflow: 'hidden',
    backgroundColor: showed ? screenBackground : null,
    opacity: showed ? 1 : 0,
    pointerEvents: showed ? 'auto' : 'none',
  };

  const popupContainerTransition = {
    transition: theme.transitions.openClosePopup,
  };

  const window = {
    position: 'absolute',
    left,
    right,
    top,
    bottom,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    height,
    maxHeight,
    backgroundColor: '#fff',
    borderRadius: full ? null : theme.shapes.popupRadius,
    boxShadow: full ? null : '0px 0px 40px 0px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transformOrigin: origin || 'bottom',
    transform: showed ? null : 'scale(0.5)', // (*)
  };

  const windowTransition = {
    transition: `${transitionScope} ${theme.transitions.openClosePopup}`,
  };

  // (*)  Ne pas faire:
  //        transform: showed ? 'scale(1)' : 'scale(0.5)',
  //      Cela génère un bug étrange lors du drag dans ColorPicker et AnalogClock !

  /******************************************************************************/

  const windowTriangle = {
    ...window,
    backgroundColor: null,
    boxShadow: null,
    overflow: null,
    pointerEvents: 'none',
  };

  const triangleStyle = {
    position: 'absolute',
    width: '0px',
    height: '0px',
    boxSizing: 'border-box',
  };

  switch (triangle) {
    case 'bottom':
      triangleStyle.top = height;
      triangleStyle.left = `calc(50% - ${triangleSize})`;
      triangleStyle.borderTop = `${triangleSize} solid #fff`;
      triangleStyle.borderBottom = `${triangleSize} solid transparent`;
      triangleStyle.borderLeft = `${triangleSize} solid transparent`;
      triangleStyle.borderRight = `${triangleSize} solid transparent`;
      break;
    case 'top':
      triangleStyle.top = px(-2 * n(triangleSize));
      triangleStyle.left = `calc(50% - ${triangleSize})`;
      triangleStyle.borderTop = `${triangleSize} solid transparent`;
      triangleStyle.borderBottom = `${triangleSize} solid #fff`;
      triangleStyle.borderLeft = `${triangleSize} solid transparent`;
      triangleStyle.borderRight = `${triangleSize} solid transparent`;
      break;
    case 'left':
      triangleStyle.top = `calc(50% - ${triangleSize})`;
      triangleStyle.left = px(-2 * n(triangleSize));
      triangleStyle.borderTop = `${triangleSize} solid transparent`;
      triangleStyle.borderBottom = `${triangleSize} solid transparent`;
      triangleStyle.borderLeft = `${triangleSize} solid transparent`;
      triangleStyle.borderRight = `${triangleSize} solid #fff`;
      break;
    case 'right':
      triangleStyle.top = `calc(50% - ${triangleSize})`;
      triangleStyle.left = width;
      triangleStyle.borderTop = `${triangleSize} solid transparent`;
      triangleStyle.borderBottom = `${triangleSize} solid transparent`;
      triangleStyle.borderLeft = `${triangleSize} solid #fff`;
      triangleStyle.borderRight = `${triangleSize} solid transparent`;
      break;
  }

  /******************************************************************************/

  return {
    popupContainer,
    popupContainerTransition,
    window,
    windowTransition,
    windowTriangle,
    triangle: triangleStyle,
  };
}

/******************************************************************************/
