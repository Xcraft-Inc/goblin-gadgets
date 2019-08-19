/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'grow',
  'color',
  'hoverColor',
  'hoverChildrenFontSize',
  'hoverChildrenOpacity',
  'transition',
];

export default function styles(theme, props) {
  const {
    width,
    height,
    grow,
    color = 'white',
    hoverColor = 'white',
    hoverChildrenFontSize = null,
    hoverChildrenOpacity = null,
    transition = theme.transitions.hover,
  } = props;

  // Use + for dispatch the style to next brother (only one).
  // Use ~ for dispatch the style to all the following brothers.
  // Use nothing for dispatch the style to children.
  const documentContainer = {
    'position': 'relative',
    'width': width,
    'height': height,
    'flexGrow': grow,
    'display': 'flex',
    'flexDirection': 'row',
    'fontSize': '100%',
    'transition': transition,
    ':hover .children-hover': {
      fontSize: hoverChildrenFontSize,
      opacity: hoverChildrenOpacity,
    },
    ':hover .color-hover': {
      fill: hoverColor,
    },
  };

  const pathColor = {
    transition: transition,
    fill: color,
  };

  const foreground = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    display: 'flex',
  };

  return {
    documentContainer,
    pathColor,
    foreground,
  };
}

/******************************************************************************/
