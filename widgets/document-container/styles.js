/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'grow',
  'hoverChildrenFontSize',
  'hoverChildrenOpacity',
];

export default function styles(theme, props) {
  let {
    width,
    height,
    grow,
    hoverChildrenFontSize = null,
    hoverChildrenOpacity = null,
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
    ':hover .children-hover': {
      fontSize: hoverChildrenFontSize,
      opacity: hoverChildrenOpacity,
    },
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
    foreground,
  };
}

/******************************************************************************/
