import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

function convertJustify (justify) {
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

export default function styles (theme, props) {
  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  // Initialize all variables for a standard button.
  let boxWidth = props.width;
  let boxHeight = props.height ? props.height : theme.shapes.lineHeight;
  let boxFlexDirection = 'row';
  let boxFlexGrow = props.grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify (props.justify);
  let boxAlignItems = 'center';
  let boxMarginTop = '0px';
  let boxMarginRight = '0px';
  let boxMarginBottom = '0px';
  let boxMarginLeft = '0px';
  let boxPaddingTop = '0px';
  let boxPaddingRight = '0px';
  let boxPaddingBottom = '0px';
  let boxPaddingLeft = '0px';
  let boxZIndex = props.zIndex;
  let boxOpacity = props.visibility === 'false' ? 0 : null;
  let borderWidth = '1px';
  let borderColor = theme.palette.buttonBorder;
  let borderStyle = 'solid';
  let borderRadius = '0px';
  let backgroundColor = theme.palette.buttonBackground;
  let textHoverColor = null;
  let borderHoverColor = null;
  let backgroundHoverColor = null;
  let textColor = null;
  let textSize = theme.shapes.buttonTextSize;
  let boxPosition = props.position ? props.position : 'relative';
  let cursor = props.cursor ? props.cursor : 'default';
  let transition = theme.transitions.easeOut ();
  let activeColor = props.activeColor
    ? ColorHelpers.getMarkColor (theme, props.activeColor)
    : null;
  let specialDisabled = false;

  // Initialize variables for button without border.
  if (props.border === 'none') {
    // Button without border must have same backgroundColor as parent !
    borderStyle = 'none';
    backgroundColor = null;
  }

  // Initialise right margin according to spacing.
  if (props.spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
    };
    boxMarginRight = spacingType[props.spacing];
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (props.kind === 'task-logo') {
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none';
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.taskTabActiveBackground;
      textColor = theme.palette.taskTabActiveText;
    } else {
      backgroundColor = theme.palette.taskLogoBackground;
    }
    textSize = theme.shapes.taskLogoTextSize;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-bar') {
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    backgroundColor = theme.palette.taskButtonBackground;
    textSize = theme.shapes.taskTextSize;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (props.kind === 'main-tab') {
    boxHeight = theme.shapes.mainTabHeight;
    boxMarginRight = '1px';
    borderStyle = 'none';
    textSize = theme.shapes.mainTabTextSize;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.mainTabButtonActiveBackground;
    } else {
      backgroundColor = theme.palette.mainTabButtonInactiveBackground;
    }
    textColor = theme.palette.mainTabText;
  }

  if (props.kind === 'main-tab-right') {
    boxHeight = theme.shapes.mainTabHeight;
    borderStyle = 'none';
    textColor = theme.palette.mainTabText;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.mainTabButtonActiveBackground;
    } else {
      backgroundColor = null;
    }
    backgroundHoverColor = theme.palette.mainTabButtonActiveBackground;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (props.kind === 'view-tab') {
    boxHeight = theme.shapes.viewTabHeight;
    if (props.text) {
      boxMarginTop = '1px';
      boxMarginRight = '1px';
    } else {
      // When a text button is followed by a glyph button, the glyph button must
      // be glued to the text button. Typically a close button: [Missions][x]
      boxMarginTop = '1px';
      boxMarginRight = '1px';
      boxMarginLeft = '-1px';
    }
    borderStyle = 'none';
    textSize = theme.shapes.viewTabTextSize;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.viewTabButtonActiveBackground;
    } else {
      backgroundColor = theme.palette.viewTabButtonInactiveBackground;
    }
  }

  if (props.kind === 'view-tab-right') {
    boxHeight = Unit.add (
      theme.shapes.containerMargin,
      theme.shapes.viewTabHeight
    );
    borderStyle = 'none';
    textColor = theme.palette.viewTabRightText;
    if (props.text) {
      backgroundColor = theme.palette.viewTabRightTextBackground;
    } else {
      backgroundColor = theme.palette.viewTabBackground;
    }
  }

  // task-tab button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-tab') {
    boxHeight = theme.shapes.taskTabHeight;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.taskTabActiveBackground;
      textColor = theme.palette.taskTabActiveText;
    } else {
      backgroundColor = theme.palette.taskTabInactiveBackground;
      textColor = theme.palette.taskTabInactiveText;
    }
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    textSize = theme.shapes.taskTabTextSize;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (props.kind === 'pane-navigator') {
    boxHeight = theme.shapes.paneNavigatorHeight;
    boxMarginBottom = '-1px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (props.active === 'false') {
      borderColor = theme.palette.paneNavigatorInactiveBorder;
      textColor = theme.palette.paneNavigatorInactiveText;
    } else if (props.active === 'true') {
      borderColor = activeColor
        ? activeColor
        : theme.palette.paneNavigatorActiveBorder;
    }
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (props.kind === 'pane-hnavigator') {
    boxHeight = theme.shapes.paneNavigatorHeight;
    boxMarginBottom = '-1px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (props.active === 'false') {
      borderColor = theme.palette.paneNavigatorInactiveBorder;
      textColor = theme.palette.paneNavigatorInactiveText;
    } else if (props.active === 'true') {
      borderColor = activeColor
        ? activeColor
        : theme.palette.paneNavigatorActiveBorder;
    }
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (props.kind === 'pane-vnavigator') {
    boxWidth = theme.shapes.vnavigatorButtonSize;
    boxHeight = theme.shapes.vnavigatorButtonSize;
    boxMarginBottom = '1px';
    borderStyle = 'none';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (props.active === 'false') {
      backgroundColor = theme.palette.vnavigatorButtonInactiveBackground;
    } else if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.vnavigatorButtonActiveBackground;
    }
  }

  // Footer button (usual parent is container with kind='footer').
  if (props.kind === 'button-footer') {
    boxHeight = theme.shapes.footerHeight;
    boxMarginRight = '1px';
    boxPaddingRight = m;
    boxPaddingLeft = m;
    textSize = theme.shapes.footerTextSize;
    if (props.text) {
      backgroundColor = theme.palette.footerTextBackground;
    } else {
      backgroundColor = theme.palette.footerBackground;
    }
    borderStyle = 'none';
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (props.kind === 'button-notification') {
    boxHeight = '32px';
    textSize = theme.shapes.notificationButtonTextSize;
    backgroundColor = 'transparent';
    textColor = theme.palette.notificationText;
    borderStyle = 'none';
    textHoverColor = theme.palette.notificationTextHover;
    backgroundHoverColor = 'transparent';
    if (props.disabled === 'true') {
      textColor = ColorManipulator.darken (theme.palette.notificationText, 0.4);
    }
    specialDisabled = true;
  }
  if (props.kind === 'notification-close') {
    boxMarginTop = Unit.multiply (theme.shapes.containerMargin, -1);
    textColor = theme.palette.notificationText;
    borderStyle = 'none';
    backgroundColor = 'transparent';
    textHoverColor = theme.palette.notificationTextHover;
    backgroundHoverColor = 'transparent';
  }

  // Warning button (usual parent is container with kind='footer').
  if (props.kind === 'warning') {
    boxHeight = theme.shapes.footerHeight;
    boxPaddingLeft = theme.shapes.warningLeftPadding;
    borderStyle = 'none';
    textSize = theme.shapes.warningTextSize;
    backgroundColor = theme.palette.warningBackground;
    textColor = theme.palette.warningText;
  }

  // Action button (usual parent is container with kind='actions').
  if (props.kind === 'action') {
    let place = props.place ? props.place : 'middle';
    if (place === '1/1') {
      place = 'single';
    } else if (place.indexOf ('/') !== -1) {
      const n = place.split ('/');
      if (n.length === 2) {
        if (n[0] === '1') {
          place = 'left';
        } else if (n[0] === n[1]) {
          place = 'right';
        } else {
          place = 'middle';
        }
      }
    }
    const h = Unit.multiply (theme.shapes.actionHeight, 0.1);
    const r = theme.shapes.actionRadius;
    boxHeight = theme.shapes.actionHeight;
    boxPaddingLeft = h;
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.actionButtonBackground;
    textSize = theme.shapes.actionTextSize;
    if (place === 'left') {
      boxMarginRight = '1px';
      borderRadius = r + ' 0px 0px ' + r;
    } else if (place === 'right') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
    } else if (place === 'single') {
      borderRadius = r;
    } else {
      boxMarginRight = '1px';
    }
  }

  // Subaction button (usual parent is container with kind='row-pane' and subkind='box').
  if (props.kind === 'subaction') {
    borderStyle = 'none';
    backgroundColor = theme.palette.subactionButtonBackground;
    textColor = theme.palette.subactionButtonText;
    textSize = theme.shapes.subactionTextSize;
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (props.kind === 'combo') {
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.comboActiveBackground;
    }
  }

  if (props.kind === 'round') {
    const r = theme.shapes.actionRadius;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
    textColor = theme.palette.roundButtonText;
  }

  if (props.kind === 'identity') {
    const r = theme.shapes.actionRadius;
    boxWidth = theme.shapes.identityHeight;
    boxHeight = theme.shapes.identityHeight;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
    textColor = theme.palette.identityButtonText;
  }

  if (props.kind === 'thin-left') {
    const r = theme.shapes.thinRadius;
    boxHeight = null;
    borderStyle = 'none solid none none';
    borderRadius = r + ' 0px 0px ' + r;
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }
  if (props.kind === 'thin-right') {
    const r = theme.shapes.thinRadius;
    boxHeight = null;
    borderStyle = 'none none none solid';
    borderRadius = '0px ' + r + ' ' + r + ' 0px';
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }

  if (props.kind === 'frameless') {
    borderStyle = 'none';
  }

  if (props.kind === 'menu-item') {
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginBottom = '1px';
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textSize = theme.shapes.menuTextSize;
    borderStyle = 'none';
    if (props.active === 'true') {
      textColor = theme.palette.menuText;
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.menuItemActiveBackground;
    } else if (props.active === 'focused') {
      textColor = theme.palette.menuFocusText;
      backgroundColor = theme.palette.menuItemFocusBackground;
    } else {
      textColor = theme.palette.menuText;
      backgroundColor = theme.palette.menuItemInactiveBackground;
    }
  }

  if (props.kind === 'glyph-item') {
    boxWidth = theme.shapes.glyphsDialogButtonWidth;
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginRight = theme.shapes.glyphsDialogButtonMargin;
    boxMarginBottom = theme.shapes.glyphsDialogButtonMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (props.kind === 'tray-title') {
    boxHeight = Unit.add (theme.shapes.lineHeight, '2px'); // same as TextField with 2px for borders
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textColor = theme.palette.ticketGlueTitle;
    textSize = theme.shapes.ticketGlueTitleSize;
    backgroundColor = null;
  }

  // Button with a day in Calendar component.
  if (props.kind === 'calendar') {
    borderStyle = 'none';
    boxWidth = theme.shapes.calendarButtonWidth;
    boxHeight = theme.shapes.calendarButtonHeight;
    textSize = theme.shapes.calendarTextSize;
    transition = null;
    backgroundColor = theme.palette.calendarBackground;
    textColor = theme.palette.calendarText;
    if (props.calendarWeekend === 'true') {
      backgroundColor = theme.palette.calendarWeekendBackground;
    }
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.calendarActiveBackground;
      textColor = theme.palette.calendarActiveText;
    }
    if (props.calendarDimmed === 'true') {
      backgroundColor = theme.palette.calendarBackground;
      backgroundHoverColor = theme.palette.calendarBackground; // no visible hover effect
      textColor = theme.palette.calendarDimmedText;
    }
  }
  // Button for month navigation in Calendar component.
  if (props.kind === 'calendar-navigation') {
    boxWidth = theme.shapes.calendarButtonWidth;
    boxHeight = theme.shapes.calendarButtonHeight;
    borderColor = 'transparent';
    backgroundColor = theme.palette.calendarBackground;
  }

  if (props.kind === 'container') {
    boxHeight = null;
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    } else {
      backgroundColor = null;
    }
  }

  if (props.kind === 'container-start') {
    boxHeight = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    backgroundColor = null;
  }

  if (props.kind === 'box') {
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxMarginRight = m;
    boxMarginBottom = m;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    } else {
      backgroundColor = theme.palette.boxBackground;
    }
  }

  if (props.kind === 'chronos-navigator') {
    boxMarginBottom = '1px';
    borderRadius = theme.shapes.smoothRadius;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    } else {
      textColor = theme.palette.chronoNavigatorText;
      backgroundHoverColor = ColorManipulator.fade (
        theme.palette.buttonBackground,
        0.3
      );
    }
  }

  if (props.kind === 'recurrence') {
    if (props.active === 'true') {
      textColor = theme.palette.calendarActiveText;
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.calendarActiveBackground;
      borderColor = activeColor
        ? activeColor
        : theme.palette.calendarActiveBackground;
    }
  }

  if (props.kind === 'hover') {
    boxOpacity = 0;
    borderWidth = theme.shapes.lineSpacing;
    borderColor = theme.palette.taskBackground;
    backgroundHoverColor = theme.palette.buttonBackground;
    boxZIndex = 3;
  }

  if (!props.kind) {
    borderRadius = theme.shapes.smoothRadius;
    if (props.active === 'true') {
      backgroundColor = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (props.badgePush === 'true') {
    boxPaddingRight = Unit.add (boxPaddingRight, theme.shapes.badgeHeight);
  }
  if (
    props.shortcut &&
    props.kind !== 'menu-item' &&
    props.kind !== 'task-bar' &&
    props.kind !== 'task-logo'
  ) {
    boxPaddingRight = Unit.add (boxPaddingRight, m);
  }

  if (props.shape) {
    const r = Unit.multiply (theme.shapes.lineHeight, 0.5);
    const s = theme.shapes.smoothRadius;
    if (props.shape === 'rounded') {
      borderRadius = r;
    } else if (props.shape === 'left-rounded') {
      borderRadius = r + ' 0px 0px ' + r;
    } else if (props.shape === 'right-rounded') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
    } else if (props.shape === 'left-smooth') {
      borderRadius = s + ' 0px 0px ' + s;
    } else if (props.shape === 'right-smooth') {
      borderRadius = '0px ' + s + ' ' + s + ' 0px';
    }
  }

  if (props.textColor) {
    textColor = ColorHelpers.getMarkColor (theme, props.textColor);
  }
  if (props.backgroundColor) {
    backgroundColor = ColorHelpers.getMarkColor (theme, props.backgroundColor);
  }

  // Compute colors for glyph, text and hover if necessary.
  let buttonBackgroundColor = backgroundColor;
  if (!buttonBackgroundColor) {
    buttonBackgroundColor = theme.palette.buttonBackground;
  }
  if (!backgroundHoverColor) {
    backgroundHoverColor = ColorManipulator.emphasize (
      buttonBackgroundColor,
      0.2
    );
  }
  if (!textColor && textColor !== 'none') {
    textColor = ColorManipulator.emphasize (buttonBackgroundColor, 0.9);
  }

  // Alter colors if component is disable.
  if (props.disabled === 'true' && !specialDisabled) {
    borderColor = theme.palette.buttonDisableBorder;
    if (backgroundColor) {
      backgroundColor = theme.palette.buttonDisableBackground;
    }
    textColor = theme.palette.buttonDisableText;
  }

  // If component has specific width and border, reduce the width to
  // take into account the thickness of the borders left and right.
  // Buttons without left or right border (with only bottom border) are
  // considered as without border (for example task button).
  if (boxWidth && boxWidth !== '0px' && !borderStyle.startsWith ('none')) {
    boxWidth = Unit.sub (boxWidth, Unit.multiply (borderWidth, 2));
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

  const boxStyle = {
    opacity: boxOpacity,
    overflow: 'hidden',
    width: boxWidth,
    minHeight: boxHeight,
    left: props.left,
    right: props.right,
    top: props.top,
    bottom: props.bottom,
    display: 'flex',
    flexDirection: boxFlexDirection,
    flexGrow: boxFlexGrow,
    flexShrink: boxFlexShrink,
    flexBasis: boxFlexBasis,
    justifyContent: boxJustifyContent,
    alignItems: boxAlignItems,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    paddingTop: boxPaddingTop,
    paddingRight: boxPaddingRight,
    paddingBottom: boxPaddingBottom,
    paddingLeft: boxPaddingLeft,
    marginTop: boxMarginTop,
    marginRight: boxMarginRight,
    marginBottom: boxMarginBottom,
    marginLeft: boxMarginLeft,
    backgroundColor: backgroundColor,
    position: boxPosition,
    transition: transition,
    zIndex: boxZIndex,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: cursor,
  };

  const shortcutStyle = {
    color: textColor,
    fontSize: Unit.multiply (textSize, theme.typo.fontScale * 0.9),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'break-word',
    userSelect: 'none',
  };

  if (props.disabled !== 'true' && boxOpacity !== 0) {
    boxStyle[':hover'] = {
      color: textHoverColor, // (*)
      borderColor: borderHoverColor,
      backgroundColor: backgroundHoverColor,
      opacity: 1.0,
    };
  }

  // Generate a triangle with subtle css, see:
  // https://css-tricks.com/snippets/css/css-triangle/
  const d = theme.shapes.mainTabTriangleSize;
  const triangleStyle = {
    position: 'absolute',
    right: '50%',
    bottom: '0px',
    borderLeft: d + ' solid transparent',
    borderRight: d + ' solid transparent',
    borderBottom: d + ' solid ' + theme.palette.viewTabBackground,
    margin: '0px -' + d + ' 0px 0px',
    userSelect: 'none',
  };

  const menuBoxStyle = {
    position: 'absolute',
    top: props.menuDirection === 'top' ? null : boxHeight,
    bottom: props.menuDirection === 'top' ? boxHeight : null,
    padding: '1px 0px 1px 0px',
    left: '0px',
    backgroundColor: theme.palette.menuBackground,
    zIndex: 2,
    userSelect: 'none',
  };

  return {
    box: boxStyle,
    shortcut: shortcutStyle,
    triangle: triangleStyle,
    menuBox: menuBoxStyle,
  };
}

/******************************************************************************/
