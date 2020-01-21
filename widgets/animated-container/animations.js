/******************************************************************************/

const keyframesNone = {
  '0%': {},
};

/******************************************************************************/

const centerHorizontal = {
  transform: `translate(0)`,
};

function left(params) {
  const {pos = '100'} = params;
  return {
    transform: `translate(-${pos}%)`,
  };
}

function right(params) {
  const {pos = '100'} = params;
  return {
    transform: `translate(${pos}%)`,
  };
}

function keyframesRightToCenter(params) {
  return {
    '0%': {...right(params)},
    '100%': {...centerHorizontal},
  };
}

function keyframesCenterToRight(params) {
  return {
    '0%': {...centerHorizontal},
    '100%': {...right(params)},
  };
}

function keyframesCenterToLeft(params) {
  return {
    '0%': {...centerHorizontal},
    '100%': {...left(params)},
  };
}

function keyframesLeftToCenter(params) {
  return {
    '0%': {...left(params)},
    '100%': {...centerHorizontal},
  };
}

/******************************************************************************/

const centerVertical = {
  transform: `translate(0, 0)`,
};

function top(params) {
  const {pos = '100'} = params;
  return {
    transform: `translate(0, -${pos}%)`,
  };
}

function bottom(params) {
  const {pos = '100'} = params;
  return {
    transform: `translate(0, ${pos}%)`,
  };
}

function keyframesBottomToCenter(params) {
  return {
    '0%': {...bottom(params)},
    '100%': {...centerVertical},
  };
}

function keyframesCenterToBottom(params) {
  return {
    '0%': {...centerVertical},
    '100%': {...bottom(params)},
  };
}

function keyframesCenterToTop(params) {
  return {
    '0%': {...centerVertical},
    '100%': {...top(params)},
  };
}

function keyframesTopToCenter(params) {
  return {
    '0%': {...top(params)},
    '100%': {...centerVertical},
  };
}

/******************************************************************************/

const center = {
  transform: `translate(0, 0)`,
};

// Do not go to the edge to have a not too big movement
function topLeft(params) {
  const {posX = 100, posY = 100} = params;
  return {
    transform: `translate(-${posX}%, -${posY}%)`,
  };
}

function topRight(params) {
  const {posX = 100, posY = 100} = params;
  return {
    transform: `translate(${posX}%, -${posY}%)`,
  };
}

function bottomLeft(params) {
  const {posX = 100, posY = 100} = params;
  return {
    transform: `translate(-${posX}%, ${posY}%)`,
  };
}

function bottomRight(params) {
  const {posX = 100, posY = 100} = params;
  return {
    transform: `translate(${posX}%, ${posY}%)`,
  };
}

function keyframesBottomLeftToCenter(params) {
  return {
    '0%': {...bottomLeft(params)},
    '100%': {...center},
  };
}

function keyframesCenterToBottomLeft(params) {
  return {
    '0%': {...center},
    '100%': {...bottomLeft(params)},
  };
}

function keyframesBottomRightToCenter(params) {
  return {
    '0%': {...bottomRight(params)},
    '100%': {...center},
  };
}

function keyframesCenterToBottomRight(params) {
  return {
    '0%': {...center},
    '100%': {...bottomRight(params)},
  };
}

function keyframesCenterToTopLeft(params) {
  return {
    '0%': {...center},
    '100%': {...topLeft(params)},
  };
}

function keyframesTopLeftToCenter(params) {
  return {
    '0%': {...topLeft(params)},
    '100%': {...center},
  };
}

function keyframesCenterToTopRight(params) {
  return {
    '0%': {...center},
    '100%': {...topRight(params)},
  };
}

function keyframesTopRightToCenter(params) {
  return {
    '0%': {...topRight(params)},
    '100%': {...center},
  };
}

/******************************************************************************/

function keyframesFadeIn(params) {
  const {fadeIn = 0, fadeOut = 1} = params;
  return {
    '0%': {
      opacity: fadeIn,
    },
    '100%': {
      opacity: fadeOut,
    },
  };
}

function keyframesFadeOut(params) {
  const {fadeIn = 1, fadeOut = 0} = params;
  return {
    '0%': {
      opacity: fadeIn,
    },
    '100%': {
      opacity: fadeOut,
    },
  };
}

/******************************************************************************/

function keyframesZoomIn(params) {
  const {zoomIn = 0.5, zoomOut = 1} = params;
  return {
    '0%': {
      transform: `scale(${zoomIn})`,
      opacity: 0,
    },
    '75%': {
      opacity: 1,
    },
    '100%': {
      transform: `scale(${zoomOut})`,
      opacity: 1,
    },
  };
}

// For timingFunction, see https://cubic-bezier.com
function keyframesZoomInBounce(params) {
  const {zoomIn = 0, zoomOut = 1} = params;
  return {
    '0%': {
      animationTimingFunction: 'cubic-bezier(.4,0,0.2,1.6)',
      transform: `scale(${zoomIn})`,
    },
    '100%': {
      transform: `scale(${zoomOut})`,
    },
  };
}

function keyframesZoomOut(params) {
  const {zoomIn = 1, zoomOut = 0.5} = params;
  return {
    '0%': {
      transform: `scale(${zoomIn})`,
      opacity: 1,
    },
    '25%': {
      opacity: 1,
    },
    '100%': {
      transform: `scale(${zoomOut})`,
      opacity: 0,
    },
  };
}

function keyframesZoomInX(params) {
  const {zoomIn = 0.33, zoomOut = 1} = params;
  return {
    '0%': {
      transform: `scaleX(${zoomIn})`,
      opacity: 0,
    },
    '75%': {
      opacity: 1,
    },
    '100%': {
      transform: `scaleX(${zoomOut})`,
      opacity: 1,
    },
  };
}

function keyframesZoomOutX(params) {
  const {zoomIn = 1, zoomOut = 0.33} = params;
  return {
    '0%': {
      transform: `scaleX(${zoomIn})`,
      opacity: 1,
    },
    '25%': {
      opacity: 1,
    },
    '100%': {
      transform: `scaleX(${zoomOut})`,
      opacity: 0,
    },
  };
}

function keyframesZoomInY(params) {
  const {zoomIn = 0.33, zoomOut = 1} = params;
  return {
    '0%': {
      transform: `scaleY(${zoomIn})`,
      opacity: 0,
    },
    '75%': {
      opacity: 1,
    },
    '100%': {
      transform: `scaleY(${zoomOut})`,
      opacity: 1,
    },
  };
}

function keyframesZoomOutY(params) {
  const {zoomIn = 1, zoomOut = 0.33} = params;
  return {
    '0%': {
      transform: `scaleY(${zoomIn})`,
      opacity: 1,
    },
    '25%': {
      opacity: 1,
    },
    '100%': {
      transform: `scaleY(${zoomOut})`,
      opacity: 0,
    },
  };
}

/******************************************************************************/

const animations = {
  none: function() {
    return {
      name: keyframesNone,
      duration: '0s',
      timingFunction: 'ease',
    };
  },

  rightToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesRightToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToRight: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToRight(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToLeft: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToLeft(params),
      duration,
      timingFunction: 'ease',
    };
  },
  leftToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesLeftToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },

  bottomToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesBottomToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToBottom: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToBottom(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToTop: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToTop(params),
      duration,
      timingFunction: 'ease',
    };
  },
  topToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesTopToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },

  bottomLeftToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesBottomLeftToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToBottomLeft: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToBottomLeft(params),
      duration,
      timingFunction: 'ease',
    };
  },
  bottomRightToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesBottomRightToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToBottomRight: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToBottomRight(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToTopLeft: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToTopLeft(params),
      duration,
      timingFunction: 'ease',
    };
  },
  topLeftToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesTopLeftToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },
  centerToTopRight: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesCenterToTopRight(params),
      duration,
      timingFunction: 'ease',
    };
  },
  topRightToCenter: function(params) {
    const {duration = '0.5s'} = params;
    return {
      name: keyframesTopRightToCenter(params),
      duration,
      timingFunction: 'ease',
    };
  },

  fadeIn: function(params) {
    const {duration = '0.4s'} = params;
    return {
      name: keyframesFadeIn(params),
      duration,
      timingFunction: 'ease',
    };
  },
  fadeOut: function(params) {
    const {duration = '0.4s'} = params;
    return {
      name: keyframesFadeOut(params),
      duration,
      timingFunction: 'ease',
    };
  },

  zoomIn: function(params) {
    const {duration = '0.4s'} = params;
    return {
      name: keyframesZoomIn(params),
      duration,
      timingFunction: 'ease',
    };
  },
  zoomInBounce: function(params) {
    const {duration = '0.4s'} = params;
    return {
      name: keyframesZoomInBounce(params),
      duration,
      timingFunction: 'ease',
    };
  },
  zoomOut: function(params) {
    const {duration = '0.4s'} = params;
    return {
      name: keyframesZoomOut(params),
      duration,
      timingFunction: 'ease',
    };
  },

  zoomInX: function(params) {
    const {duration = '0.6s'} = params;
    return {
      name: keyframesZoomInX(params),
      duration,
      timingFunction: 'ease',
    };
  },
  zoomOutX: function(params) {
    const {duration = '0.6s'} = params;
    return {
      name: keyframesZoomOutX(params),
      duration,
      timingFunction: 'ease',
    };
  },

  zoomInY: function(params) {
    const {duration = '0.6s'} = params;
    return {
      name: keyframesZoomInY(params),
      duration,
      timingFunction: 'ease',
    };
  },
  zoomOutY: function(params) {
    const {duration = '0.6s'} = params;
    return {
      name: keyframesZoomOutY(params),
      duration,
      timingFunction: 'ease',
    };
  },
};

export default function getAnimation(animation, params = {}) {
  const f = animations[animation];
  if (f) {
    return f(params);
  } else {
    return null;
  }
}

/******************************************************************************/
