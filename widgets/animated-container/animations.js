/******************************************************************************/

const keyframesNone = {
  '0%': {},
};

/******************************************************************************/

const centerHorizontal = {
  left: '0vw',
  right: '0vw',
};

const left = {
  left: '-100vw',
  right: '100vw',
};

const right = {
  left: '100vw',
  right: '-100vw',
};

const keyframesRightToCenter = {
  '0%': {...right},
  '100%': {...centerHorizontal},
};

const keyframesCenterToRight = {
  '0%': {...centerHorizontal},
  '100%': {...right},
};

const keyframesCenterToLeft = {
  '0%': {...centerHorizontal},
  '100%': {...left},
};

const keyframesLeftToCenter = {
  '0%': {...left},
  '100%': {...centerHorizontal},
};

/******************************************************************************/

const centerVertical = {
  top: '0vh',
  bottom: '0vh',
};

const top = {
  top: '-100vh',
  bottom: '100vh',
};

const bottom = {
  top: '100vh',
  bottom: '-100vh',
};

const keyframesBottomToCenter = {
  '0%': {...bottom},
  '100%': {...centerVertical},
};

const keyframesCenterToBottom = {
  '0%': {...centerVertical},
  '100%': {...bottom},
};

const keyframesCenterToTop = {
  '0%': {...centerVertical},
  '100%': {...top},
};

const keyframesTopToCenter = {
  '0%': {...top},
  '100%': {...centerVertical},
};

/******************************************************************************/

const center = {
  ...centerHorizontal,
  ...centerVertical,
};

// Do not go to the edge to have a not too big movement (100vw/vh replaced by 30vw/vh).
const topLeft = {
  left: '-30vw',
  right: '30vw',
  top: '-30vh',
  bottom: '30vh',
};

const topRight = {
  left: '30vw',
  right: '-30vw',
  top: '-30vh',
  bottom: '30vh',
};

const bottomLeft = {
  left: '-30vw',
  right: '30vw',
  top: '30vh',
  bottom: '-30vh',
};

const bottomRight = {
  left: '30vw',
  right: '-30vw',
  top: '30vh',
  bottom: '-30vh',
};

const keyframesBottomLeftToCenter = {
  '0%': {...bottomLeft},
  '100%': {...center},
};

const keyframesCenterToBottomLeft = {
  '0%': {...center},
  '100%': {...bottomLeft},
};

const keyframesBottomRightToCenter = {
  '0%': {...bottomRight},
  '100%': {...center},
};

const keyframesCenterToBottomRight = {
  '0%': {...center},
  '100%': {...bottomRight},
};

const keyframesCenterToTopLeft = {
  '0%': {...center},
  '100%': {...topLeft},
};

const keyframesTopLeftToCenter = {
  '0%': {...topLeft},
  '100%': {...center},
};

const keyframesCenterToTopRight = {
  '0%': {...center},
  '100%': {...topRight},
};

const keyframesTopRightToCenter = {
  '0%': {...topRight},
  '100%': {...center},
};

/******************************************************************************/

const keyframesFadeIn = {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
};

const keyframesFadeOut = {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
};

/******************************************************************************/

const keyframesZoomIn = {
  '0%': {
    transform: 'scale(0.5)',
    opacity: 0,
  },
  '75%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
};

// For timingFunction, see https://cubic-bezier.com
const keyframesZoomInBounce = {
  '0%': {
    animationTimingFunction: 'cubic-bezier(.4,0,0.2,1.6)',
    transform: 'scale(0)',
  },
  '100%': {
    transform: 'scale(1)',
  },
};

const keyframesZoomOut = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '25%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scale(0.5)',
    opacity: 0,
  },
};

const keyframesZoomInX = {
  '0%': {
    transform: 'scaleX(0.33)',
    opacity: 0,
  },
  '75%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scaleX(1)',
    opacity: 1,
  },
};

const keyframesZoomOutX = {
  '0%': {
    transform: 'scaleX(1)',
    opacity: 1,
  },
  '25%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scaleX(0.33)',
    opacity: 0,
  },
};

const keyframesZoomInY = {
  '0%': {
    transform: 'scaleY(0.33)',
    opacity: 0,
  },
  '75%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scaleY(1)',
    opacity: 1,
  },
};

const keyframesZoomOutY = {
  '0%': {
    transform: 'scaleY(1)',
    opacity: 1,
  },
  '25%': {
    opacity: 1,
  },
  '100%': {
    transform: 'scaleY(0.33)',
    opacity: 0,
  },
};

/******************************************************************************/

const animations = {
  none: {
    name: keyframesNone,
    duration: '0s',
    timingFunction: 'ease',
  },

  rightToCenter: {
    name: keyframesRightToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToRight: {
    name: keyframesCenterToRight,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToLeft: {
    name: keyframesCenterToLeft,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  leftToCenter: {
    name: keyframesLeftToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },

  bottomToCenter: {
    name: keyframesBottomToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToBottom: {
    name: keyframesCenterToBottom,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToTop: {
    name: keyframesCenterToTop,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  topToCenter: {
    name: keyframesTopToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },

  bottomLeftToCenter: {
    name: keyframesBottomLeftToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToBottomLeft: {
    name: keyframesCenterToBottomLeft,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  bottomRightToCenter: {
    name: keyframesBottomRightToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToBottomRight: {
    name: keyframesCenterToBottomRight,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToTopLeft: {
    name: keyframesCenterToTopLeft,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  topLeftToCenter: {
    name: keyframesTopLeftToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  centerToTopRight: {
    name: keyframesCenterToTopRight,
    duration: '0.5s',
    timingFunction: 'ease',
  },
  topRightToCenter: {
    name: keyframesTopRightToCenter,
    duration: '0.5s',
    timingFunction: 'ease',
  },

  fadeIn: {
    name: keyframesFadeIn,
    duration: '0.4s',
    timingFunction: 'ease',
  },
  fadeOut: {
    name: keyframesFadeOut,
    duration: '0.4s',
    timingFunction: 'ease',
  },

  zoomIn: {
    name: keyframesZoomIn,
    duration: '0.4s',
    timingFunction: 'ease',
  },
  zoomInBounce: {
    name: keyframesZoomInBounce,
    duration: '0.4s',
    timingFunction: 'ease',
  },
  zoomOut: {
    name: keyframesZoomOut,
    duration: '0.4s',
    timingFunction: 'ease',
  },

  zoomInX: {
    name: keyframesZoomInX,
    duration: '0.6s',
    timingFunction: 'ease',
  },
  zoomOutX: {
    name: keyframesZoomOutX,
    duration: '0.6s',
    timingFunction: 'ease',
  },

  zoomInY: {
    name: keyframesZoomInY,
    duration: '0.6s',
    timingFunction: 'ease',
  },
  zoomOutY: {
    name: keyframesZoomOutY,
    duration: '0.6s',
    timingFunction: 'ease',
  },
};

export default function getAnimation(animation) {
  return animations[animation];
}

/******************************************************************************/
