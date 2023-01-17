import {Unit} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';

function convertJustify(justify) {
  switch (justify) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'around':
      return 'space-around';
    case 'between':
      return 'space-between';
    default:
      return justify;
  }
}

/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'grow',
  'justify',
  'zIndex',
  'visibility',
  'position',
  'cursor',
  'disabled',
  'readonly',
  'active',
  'focused',
  'dimmed',
  'color',
  'selected',
  'subkind',
  'backgroundColor',
  'activeColor',
];

export function mapProps(props) {
  return {
    ...props,
    text: Boolean(props.text),
  };
}

export default function styles(theme, props) {
  let {
    width,
    height,
    grow,
    justify,
    zIndex,
    visibility,
    position,
    cursor,
    disabled,
    readonly,
    active,
    focused,
    dimmed,
    color,
    selected,
    subkind,
    backgroundColor: backgroundColorProp,
    activeColor: activeColorProp,
  } = props;

  // Initialize all variables for a standard button.
  let boxWidth = width;
  let boxMinWidth = null;
  let boxHeight = height ? height : theme.shapes.lineHeight;
  let boxMaxWidth = null;
  let boxMaxHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(justify);
  let boxAlignItems = 'center';
  let boxAlignSelf = null;
  let boxMarginTop = '0px';
  let boxMarginRight = '0px';
  let boxMarginBottom = '0px';
  let boxMarginLeft = '0px';
  let boxPaddingTop = theme.shapes.boxPaddingTop;
  let boxPaddingRight = theme.shapes.boxPaddingRight;
  let boxPaddingBottom = theme.shapes.boxPaddingBottom;
  let boxPaddingLeft = theme.shapes.boxPaddingLeft;
  let boxZIndex = zIndex;
  let boxOpacity = visibility === false ? 0 : null;
  let borderWidth = theme.shapes.buttonBorderWidth;
  let borderColor = theme.palette.buttonBorderColor;
  let borderColorForced = null;
  let borderActiveColor = theme.palette.buttonBorderColor;
  let borderStyle = 'solid';
  let borderRadius = '0px';
  let boxSizing = null;
  let backgroundColor = theme.palette.buttonBackground;
  let activeColor = theme.palette.boxActiveBackground;
  let borderHoverColor = null;
  let borderHoverStyle = null;
  let borderHoverWidth = null;
  let backgroundHoverColor = null;
  let boxPosition = position ? position : 'relative';
  cursor = cursor || 'default';
  let transition = theme.transitions.easeOut();
  let specialDisabled = false;

  disabled = disabled || readonly;

  // Button with a day in Calendar component.
  borderStyle = 'none';
  boxWidth = theme.shapes.calendarButtonWidth;
  boxHeight = theme.shapes.calendarButtonHeight;
  transition = null;
  backgroundColor = 'transparent';
  if (dimmed) {
    backgroundHoverColor = ColorManipulator.lighten(activeColor, 0.8);
    activeColor = theme.palette.calendarBackground;
  } else {
    backgroundHoverColor = ColorManipulator.lighten(activeColor, 0.3);
    if (color) {
      activeColor = color;
    } else {
      if (subkind === 'add') {
        activeColor = theme.palette.calendarActiveAddBackground;
      } else if (subkind === 'sub') {
        activeColor = theme.palette.calendarActiveSubBackground;
      } else {
        activeColor = theme.palette.calendarActiveBackground;
        backgroundHoverColor = theme.palette.calendarHoverBackground;
      }
    }
    if (selected) {
      borderRadius = '20px';
      borderWidth = '3px';
      borderColorForced = theme.palette.calendarActiveBackground;
      borderStyle = 'solid';
      boxSizing = 'border-box';
    } else {
      borderRadius = null;
    }
  }
  specialDisabled = true;

  if (backgroundColorProp) {
    backgroundColor = ColorHelpers.getMarkColor(theme, backgroundColorProp);
  }
  if (activeColorProp) {
    activeColor = ColorHelpers.getMarkColor(theme, activeColorProp);
  }

  if (active || focused) {
    backgroundColor = activeColor;
    borderColor = borderActiveColor;
  }

  // Compute colors for glyph, text and hover if necessary.
  let buttonBackgroundColor = backgroundColor;
  if (!buttonBackgroundColor || buttonBackgroundColor === 'transparent') {
    buttonBackgroundColor = theme.palette.buttonBackground;
  }
  if (!backgroundHoverColor) {
    backgroundHoverColor = ColorManipulator.emphasize(
      buttonBackgroundColor,
      0.2
    );
  }

  // Alter colors if component is disable.
  if (disabled && !specialDisabled) {
    borderColor = theme.palette.buttonDisableBorder;
    if (backgroundColor) {
      backgroundColor = theme.palette.buttonDisableBackground;
    }
  }

  if (borderColorForced) {
    borderColor = borderColorForced;
  }

  // If component has specific width and border, reduce the width to
  // take into account the thickness of the borders left and right.
  // Buttons without left or right border (with only bottom border) are
  // considered as without border (for example task button).
  if (
    boxWidth &&
    boxWidth !== '0px' &&
    !borderStyle.startsWith('none') &&
    boxSizing !== 'border-box'
  ) {
    boxWidth = Unit.sub(boxWidth, Unit.multiply(borderWidth, 2));
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (!boxJustifyContent) {
    boxJustifyContent = 'center';
  }
  if (boxJustifyContent === 'none') {
    boxJustifyContent = null;
  }

  const isGradient =
    backgroundColor && backgroundColor.startsWith('repeating-linear-gradient(');

  const calendarButton = {
    opacity: boxOpacity,
    overflow: 'hidden',
    width: boxWidth,
    minWidth: boxMinWidth,
    maxWidth: boxMaxWidth,
    height: boxHeight,
    minHeight: boxHeight,
    maxHeight: boxMaxHeight,
    display: 'flex',
    flexDirection: boxFlexDirection,
    flexGrow: boxFlexGrow,
    flexShrink: boxFlexShrink,
    flexBasis: boxFlexBasis,
    justifyContent: boxJustifyContent,
    alignItems: boxAlignItems,
    alignSelf: boxAlignSelf,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    boxSizing: boxSizing,
    paddingTop: boxPaddingTop,
    paddingRight: boxPaddingRight,
    paddingBottom: boxPaddingBottom,
    paddingLeft: boxPaddingLeft,
    marginTop: boxMarginTop,
    marginRight: boxMarginRight,
    marginBottom: boxMarginBottom,
    marginLeft: boxMarginLeft,
    backgroundColor: isGradient ? null : backgroundColor,
    background: isGradient ? backgroundColor : null,
    position: boxPosition,
    transition: transition,
    zIndex: boxZIndex,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: cursor,
    outline: 'none',
  };

  if (!disabled && boxOpacity !== 0) {
    calendarButton[':hover'] = {
      borderColor: borderHoverColor,
      borderStyle: borderHoverStyle,
      borderWidth: borderHoverWidth,
      backgroundColor: backgroundHoverColor,
      opacity: 1.0,
    };
    calendarButton[':active'] = {
      backgroundColor: ColorManipulator.darken(backgroundColor, 0.1),
    };
  }

  return {
    calendarButton,
  };
}

/******************************************************************************/
