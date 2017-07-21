import {ColorManipulator} from 'electrum-theme';
import {Unit} from 'electrum-theme';

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
  let boxMinHeight = null;
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
  let glyphWidth = theme.shapes.lineHeight;
  let glyphHeight = theme.shapes.lineHeight;
  let glyphColor = props.glyphColor;
  let glyphSize = null;
  let glyphTransform = null;
  let glyphMargin = null;
  let textWidth = null;
  let textGrow = null;
  let textColor = props.textColor;
  let textMargin = '0px ' + m + ' 0px ' + m;
  let textWeight = null;
  let textTransform = props.textTransform;
  let textSize = theme.shapes.buttonTextSize;
  let actif = true;
  let boxPosition = props.position ? props.position : 'relative';
  let cursor = props.cursor;
  let transition = theme.transitions.easeOut ();
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

  // Decrease space between glyph and text.
  if (props.glyph && props.text) {
    if (props.glyphPosition === 'right') {
      textMargin = '0px 0px 0px ' + m;
    } else {
      textMargin = '0px ' + m + ' 0px 0px';
    }
  }

  if (props.kind === 'label') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    boxHeight = null;
    backgroundColor = theme.palette.labelButtonBackground;
    actif = false;
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (props.kind === 'task-logo') {
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none';
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.taskTabActiveBackground;
      textColor = theme.palette.taskTabActiveText;
    } else {
      backgroundColor = theme.palette.taskLogoBackground;
    }
    textMargin = '0px';
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.taskLogoTextSize;
    glyphSize = theme.shapes.taskLogoGlyphSize;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-bar') {
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    backgroundColor = theme.palette.taskButtonBackground;
    textMargin = '0px';
    textSize = theme.shapes.taskTextSize;
    glyphSize = theme.shapes.taskGlyphSize;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (props.kind === 'main-tab') {
    boxHeight = theme.shapes.mainTabHeight;
    boxMarginRight = '1px';
    borderStyle = 'none';
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.mainTabTextSize;
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
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
      backgroundColor = props.activeColor
        ? props.activeColor
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
    glyphColor = theme.palette.viewTabGlyph;
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
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
    textWeight = 'bold';
    textColor = theme.palette.viewTabRightText;
    glyphColor = theme.palette.viewTabRightText;
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
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.taskTabActiveBackground;
      textColor = theme.palette.taskTabActiveText;
      textWeight = 'bold';
    } else {
      backgroundColor = theme.palette.taskTabInactiveBackground;
      textColor = theme.palette.taskTabInactiveText;
    }
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    const mm = props.glyph ? '0px' : theme.shapes.taskTabLeftMargin;
    textMargin = '0px 0px 0px ' + mm;
    textSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (props.kind === 'pane-navigator') {
    boxHeight = theme.shapes.paneNavigatorHeight;
    boxMarginBottom = '-1px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    borderStyle = 'none none solid none';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (props.active === 'false') {
      borderColor = theme.palette.paneNavigatorInactiveBorder;
      textColor = theme.palette.paneNavigatorInactiveText;
    } else if (props.active === 'true') {
      borderColor = props.activeColor
        ? props.activeColor
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
      borderColor = props.activeColor
        ? props.activeColor
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
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.vnavigatorButtonActiveBackground;
    }
  }

  // Footer button (usual parent is container with kind='footer').
  if (props.kind === 'footer') {
    boxHeight = theme.shapes.footerHeight;
    boxMarginRight = '1px';
    boxPaddingRight = m;
    boxPaddingLeft = m;
    textSize = theme.shapes.footerTextSize;
    glyphSize = theme.shapes.footerGlyphSize;
    if (props.text) {
      backgroundColor = theme.palette.footerTextBackground;
    } else {
      backgroundColor = theme.palette.footerBackground;
    }
    borderStyle = 'none';
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (props.kind === 'notification') {
    boxHeight = '32px';
    glyphHeight = null;
    textSize = theme.shapes.notificationButtonTextSize;
    glyphSize = theme.shapes.notificationButtonGlyphSize;
    glyphMargin = '10px 20px 10px 0px';
    backgroundColor = 'transparent';
    glyphColor = theme.palette.notificationText;
    textColor = theme.palette.notificationText;
    borderStyle = 'none';
    textHoverColor = theme.palette.notificationTextHover;
    backgroundHoverColor = 'transparent';
    if (props.disabled === 'true') {
      glyphColor = ColorManipulator.darken (
        theme.palette.notificationText,
        0.4
      );
      textColor = ColorManipulator.darken (theme.palette.notificationText, 0.4);
    }
    specialDisabled = true;
  }
  if (props.kind === 'notification-close') {
    boxMarginTop = Unit.multiply (theme.shapes.containerMargin, -1);
    glyphColor = theme.palette.notificationText;
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
    textWeight = 'bold';
    borderStyle = 'none';
    textSize = theme.shapes.warningTextSize;
    glyphSize = theme.shapes.warningGlyphSize;
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
    glyphSize = theme.shapes.actionGlyphSize;
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
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (props.kind === 'combo') {
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.comboActiveBackground;
      glyphColor = theme.palette.comboActiveGlyph;
    }
  }

  if (props.kind === 'round') {
    const r = theme.shapes.actionRadius;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
    textColor = theme.palette.roundButtonText;
    glyphColor = theme.palette.roundButtonGlyph;
  }

  if (props.kind === 'identity') {
    const r = theme.shapes.actionRadius;
    boxWidth = theme.shapes.identityHeight;
    boxHeight = theme.shapes.identityHeight;
    borderRadius = r;
    glyphSize = theme.shapes.identityGlyphSize;
    borderStyle = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
    textColor = theme.palette.identityButtonText;
    glyphColor = theme.palette.identityButtonGlyph;
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
    textWidth = 'max-content';
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginBottom = '1px';
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    textMargin =
      '0px ' +
      theme.shapes.containerMargin +
      ' 0px ' +
      theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    borderStyle = 'none';
    if (props.active === 'true') {
      glyphColor = props.glyphColor ? props.glyphColor : theme.palette.menuText;
      textColor = theme.palette.menuText;
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.menuItemActiveBackground;
    } else if (props.active === 'focused') {
      glyphColor = props.glyphColor
        ? props.glyphColor
        : theme.palette.menuFocusText;
      textColor = theme.palette.menuFocusText;
      backgroundColor = theme.palette.menuItemFocusBackground;
    } else {
      glyphColor = props.glyphColor ? props.glyphColor : theme.palette.menuText;
      textColor = theme.palette.menuText;
      backgroundColor = theme.palette.menuItemInactiveBackground;
    }
  }

  if (props.kind === 'glyph-item') {
    boxWidth = theme.shapes.glyphsDialogButtonWidth;
    textWidth = 'max-content';
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginRight = theme.shapes.glyphsDialogButtonMargin;
    boxMarginBottom = theme.shapes.glyphsDialogButtonMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    glyphSize = '120%';
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (props.kind === 'tray-title') {
    boxHeight = Unit.add (theme.shapes.lineHeight, '2px'); // same as TextField with 2px for borders
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textColor = theme.palette.ticketGlueTitle;
    textWeight = 'bold';
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
      backgroundColor = props.activeColor
        ? props.activeColor
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
    glyphColor = theme.palette.calendarHeaderText;
    glyphSize = theme.palette.calendarGlyphSize;
  }

  if (props.kind === 'container') {
    boxHeight = null;
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply (theme.shapes.lineSpacing, 0.5);
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
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
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.boxActiveBackground;
    } else {
      backgroundColor = theme.palette.boxBackground;
    }
  }

  if (props.kind === 'chronos-navigator') {
    boxMinHeight = boxHeight;
    boxMarginBottom = '1px';
    borderRadius = theme.shapes.smoothRadius;
    if (props.active === 'true') {
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.boxActiveBackground;
    } else {
      glyphColor = theme.palette.chronoNavigatorText;
      textColor = theme.palette.chronoNavigatorText;
      backgroundHoverColor = ColorManipulator.fade (
        theme.palette.buttonBackground,
        0.3
      );
    }
  }

  if (props.kind === 'recurrence') {
    if (props.active === 'true') {
      glyphColor = theme.palette.calendarActiveText;
      textColor = theme.palette.calendarActiveText;
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.calendarActiveBackground;
      borderColor = props.activeColor
        ? props.activeColor
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
      backgroundColor = props.activeColor
        ? props.activeColor
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

  if (props.backgroundColor) {
    backgroundColor = props.backgroundColor;
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
  if (!glyphColor && glyphColor !== 'none') {
    glyphColor = ColorManipulator.emphasize (buttonBackgroundColor, 0.8);
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
    glyphColor = theme.palette.buttonDisableGlyph;
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

  if (textTransform === 'none') {
    textTransform = null;
  }

  const boxStyle = {
    opacity: boxOpacity,
    width: boxWidth,
    height: boxHeight,
    minHeight: boxMinHeight,
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
    cursor: cursor,
  };

  if (glyphSize) {
    const s = Unit.parse (glyphSize);
    if (s.unit !== '%') {
      throw new Error (`GlyphSize '${glyphSize}' has an unexpected format`);
    }
    const ss = s.value / 100;
    if (!glyphTransform) {
      glyphTransform = 'scale(' + ss + ')';
    }
    if (!glyphMargin) {
      const mm = Unit.multiply (m, ss);
      glyphMargin = '0px ' + mm + ' 0px ' + mm;
    }
  } else if (
    props.glyphPosition === 'right' &&
    props.badgeValue &&
    !glyphMargin
  ) {
    glyphMargin = '0px 10px 0px 0px';
  }

  const glyphStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: glyphWidth,
    height: glyphHeight,
    padding: '0px',
    margin: glyphMargin,
    color: glyphColor,
    transform: glyphTransform,
  };

  const textStyle = {
    width: textWidth,
    margin: textMargin,
    flexGrow: props.shortcut ? '1' : textGrow,
    color: textColor,
    fontWeight: textWeight,
    textTransform: textTransform,
    fontSize: Unit.multiply (textSize, theme.typo.fontScale),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'break-word',
  };

  const shortcutStyle = {
    width: textWidth,
    flexGrow: textGrow,
    color: textColor,
    fontSize: Unit.multiply (textSize, theme.typo.fontScale * 0.9),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'break-word',
  };

  if (props.disabled !== 'true' && actif && boxOpacity !== 0) {
    boxStyle[':hover'] = {
      color: textHoverColor, // (*)
      borderColor: borderHoverColor,
      backgroundColor: backgroundHoverColor,
      opacity: 1.0,
    };

    if (textHoverColor) {
      textStyle.color = null; // (*)
      glyphStyle.color = null; // (*)
    }
    // (*) If hover change the color of glyph and text, it is necessary to change
    //     the color of parent (and not the glyph/text children). This system
    //     causes the change simultaneously for the two children.
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
  };

  const menuBoxStyle = {
    position: 'absolute',
    top: props.menuDirection === 'top' ? null : boxHeight,
    bottom: props.menuDirection === 'top' ? boxHeight : null,
    padding: '1px 0px 1px 0px',
    left: '0px',
    backgroundColor: theme.palette.menuBackground,
    zIndex: 2,
  };

  return {
    box: boxStyle,
    glyph: glyphStyle,
    text: textStyle,
    shortcut: shortcutStyle,
    triangle: triangleStyle,
    menuBox: menuBoxStyle,
  };
}

/******************************************************************************/
