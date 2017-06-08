import {ColorManipulator} from 'electrum-theme';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const inputGlyph           = props.glyph;
  const inputGlyphColor      = props.glyphColor;
  const inputText            = props.text;
  const inputTextColor       = props.textColor;
  const inputShortcut        = props.shortcut;
  const inputBorder          = props.border;
  const inputGlyphPosition   = props.glyphPosition;
  const inputSpacing         = props.spacing;
  const inputGrow            = props.grow;
  const inputWidth           = props.width;
  const inputHeight          = props.height;
  const inputLeft            = props.left;
  const inputRight           = props.right;
  const inputTop             = props.top;
  const inputBottom          = props.bottom;
  const inputKind            = props.kind;
  const inputSubkind         = props.subkind;
  const inputDimmed          = props.dimmed;
  const inputWeekend         = props.weekend;
  const inputPlace           = props.place;
  const inputActive          = props.active;
  const inputActiveColor     = props.activeColor;
  const inputBadgeValue      = props.badgeValue;
  const inputShape           = props.shape;
  const inputMenuDirection   = props.menuDirection;
  const inputTextTransform   = props.textTransform;
  const inputBackgroundColor = props.backgroundColor;
  const inputZIndex          = props.zIndex;
  const inputCursor          = props.cursor;
  const inputPosition        = props.position;
  const inputDisabled        = props.disabled === 'true';
  const inputJustify         = props.justify;
  const inputVisibility      = props.visibility;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  // Initialize all variables for a standard button.
  let boxWidth             = inputWidth;
  let boxHeight            = inputHeight ? inputHeight : theme.shapes.lineHeight;
  let boxMinHeight         = null;
  let boxFlexDirection     = 'row';
  let boxFlexGrow          = inputGrow;
  let boxFlexShrink        = null;
  let boxFlexBasis         = null;
  let boxJustifyContent    = inputJustify ? inputJustify : 'center';
  let boxAlignItems        = 'center';
  let boxMargin            = '0px';
  let boxPadding           = '0px';
  let boxZIndex            = inputZIndex;
  let boxOpacity           = inputVisibility === 'false' ? 0 : null;
  let borderWidth          = '1px';
  let borderColor          = theme.palette.buttonBorder;
  let borderStyle          = 'solid';
  let borderRadius         = '0px';
  let backgroundColor      = theme.palette.buttonBackground;
  let textHoverColor       = null;
  let borderHoverColor     = null;
  let backgroundHoverColor = null;
  let glyphWidth           = theme.shapes.lineHeight;
  let glyphHeight          = theme.shapes.lineHeight;
  let glyphColor           = inputGlyphColor;
  let glyphSize            = null;
  let glyphTransform       = null;
  let glyphMargin          = null;
  let textWidth            = null;
  let textGrow             = null;
  let textColor            = inputTextColor;
  let textMargin           = '0px ' + m + ' 0px ' + m;
  let textWeight           = null;
  let textTransform        = inputTextTransform;
  let textSize             = theme.shapes.buttonTextSize;
  let actif                = true;
  let boxPosition          = inputPosition ? inputPosition : 'relative';
  let cursor               = inputCursor;
  let transition           = theme.transitions.easeOut ();

  // Initialize variables for button without border.
  if (inputBorder === 'none') {
    // Button without border must have same backgroundColor as parent !
    borderStyle = 'none';
    backgroundColor = null;
  }

  // Initialise right margin according to spacing.
  if (inputSpacing) {
    let spacingType = {
      overlap: '0px -1px 0px 0px',
      tiny:    '0px 1px 0px 0px',
      large:   '0px ' + m + ' 0px 0px',
    };
    boxMargin = spacingType[inputSpacing];
  }

  // Decrease space between glyph and text.
  if (inputGlyph && inputText) {
    if (inputGlyphPosition === 'right') {
      textMargin = '0px 0px 0px ' + m;
      if (inputWidth) {
        // A button with text and glyph (in this order) and a specific width must
        // have a text push to left border and glyph push to right border:
        // |text........glyph|
        // |<-----width----->|
        textGrow = '1';
      }
    } else {
      textMargin = '0px ' + m + ' 0px 0px';
    }
  }

  if (inputKind === 'label') {
    boxJustifyContent = null;
    boxHeight         = null;
    backgroundColor   = theme.palette.labelButtonBackground;
    actif             = false;
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (inputKind === 'task-logo') {
    boxHeight        = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    boxMargin        = '0px';
    borderStyle      = 'none';
    if (inputActive === 'true') {
      backgroundColor = theme.palette.taskTabActiveBackground;
      textColor       = theme.palette.taskTabActiveText;
    } else {
      backgroundColor = theme.palette.taskLogoBackground;
    }
    textMargin    = '0px';
    textTransform = inputTextTransform ? inputTextTransform : 'uppercase';
    textWeight    = 'bold';
    textSize      = theme.shapes.taskLogoTextSize;
    glyphSize     = theme.shapes.taskLogoGlyphSize;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (inputKind === 'task-bar') {
    boxHeight        = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    boxMargin        = '0px';
    borderStyle      = 'none none solid none';
    borderColor      = theme.palette.taskButtonBorder;
    backgroundColor  = theme.palette.taskButtonBackground;
    textMargin       = '0px';
    textSize         = theme.shapes.taskTextSize;
    glyphSize        = theme.shapes.taskGlyphSize;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (inputKind === 'main-tab') {
    boxHeight       = theme.shapes.mainTabHeight;
    boxMargin       = '0px 1px 0px 0px';
    borderStyle     = 'none';
    textTransform   = 'uppercase';
    textWeight      = 'bold';
    textSize        = theme.shapes.mainTabTextSize;
    if (inputActive === 'true') {
      backgroundColor = theme.palette.mainTabButtonActiveBackground;
    } else {
      backgroundColor = theme.palette.mainTabButtonInactiveBackground;
    }
    textColor = theme.palette.mainTabText;
  }

  if (inputKind === 'main-tab-right') {
    boxHeight            = theme.shapes.mainTabHeight;
    borderStyle          = 'none';
    textColor            = theme.palette.mainTabText;
    if (inputActive === 'true') {
      backgroundColor = theme.palette.mainTabButtonActiveBackground;
    } else {
      backgroundColor = null;
    }
    backgroundHoverColor = theme.palette.mainTabButtonActiveBackground;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (inputKind === 'view-tab') {
    boxHeight = theme.shapes.viewTabHeight;
    if (inputText) {
      boxMargin = '0px 1px 0px 0px';
    } else {
      // When a text button is followed by a glyph button, the glyph button must
      // be glued to the text button. Typically a close button: [Missions][x]
      boxMargin = '0px 1px 0px -1px';
    }
    borderStyle = 'none';
    textSize    = theme.shapes.viewTabTextSize;
    glyphColor  = theme.palette.viewTabGlyph;
    if (inputActive === 'true') {
      backgroundColor = theme.palette.viewTabButtonActiveBackground;
    } else {
      backgroundColor = theme.palette.viewTabButtonInactiveBackground;
    }
  }

  if (inputKind === 'view-tab-right') {
    boxHeight       = Unit.add (
      theme.shapes.containerMargin,
      theme.shapes.viewTabHeight
    );
    borderStyle     = 'none';
    textWeight      = 'bold';
    textColor       = theme.palette.viewTabRightText;
    glyphColor      = theme.palette.viewTabRightText;
    if (inputText) {
      backgroundColor = theme.palette.viewTabRightTextBackground;
    } else {
      backgroundColor = theme.palette.viewTabBackground;
    }
  }

  // task-tab button (usual parent is container with kind='task-bar').
  if (inputKind === 'task-tab') {
    boxHeight         = theme.shapes.taskTabHeight;
    boxJustifyContent = 'flex-start';
    if (inputActive === 'true') {
      backgroundColor = theme.palette.taskTabActiveBackground;
      textColor       = theme.palette.taskTabActiveText;
      textWeight      = 'bold';
    } else {
      backgroundColor = theme.palette.taskTabInactiveBackground;
      textColor       = theme.palette.taskTabInactiveText;
    }
    boxMargin       = '0px';
    borderStyle     = 'none none solid none';
    borderColor     = theme.palette.taskButtonBorder;
    const mm = inputGlyph ? '0px' : theme.shapes.taskTabLeftMargin;
    textMargin      = '0px 0px 0px ' + mm;
    textSize        = theme.shapes.taskTabTextSize;
    glyphSize       = theme.shapes.taskTabGlyphSize;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (inputKind === 'pane-navigator') {
    boxHeight       = theme.shapes.paneNavigatorHeight;
    boxMargin       = '0px 0px -1px 0px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    textTransform   = 'uppercase';
    textWeight      = 'bold';
    borderStyle     = 'none none solid none';
    textSize        = theme.shapes.paneNavigatorTextSize;
    if (inputActive === 'false') {
      borderColor   = theme.palette.paneNavigatorInactiveBorder;
      textColor     = theme.palette.paneNavigatorInactiveText;
    } else if (inputActive === 'true') {
      borderColor   = theme.palette.paneNavigatorActiveBorder;
    }
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00';  // transparent
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (inputKind === 'pane-hnavigator') {
    boxHeight       = theme.shapes.paneNavigatorHeight;
    boxMargin       = '0px 0px -1px 0px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle     = 'none none solid none';
    textSize        = theme.shapes.paneNavigatorTextSize;
    if (inputActive === 'false') {
      borderColor   = theme.palette.paneNavigatorInactiveBorder;
      textColor     = theme.palette.paneNavigatorInactiveText;
    } else if (inputActive === 'true') {
      borderColor   = theme.palette.paneNavigatorActiveBorder;
    }
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00';  // transparent
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (inputKind === 'pane-vnavigator') {
    boxWidth        = theme.shapes.vnavigatorButtonSize;
    boxHeight       = theme.shapes.vnavigatorButtonSize;
    boxMargin       = '0px 0px 1px 0px';
    borderStyle     = 'none';
    textSize        = theme.shapes.paneNavigatorTextSize;
    if (inputActive === 'false') {
      backgroundColor = theme.palette.vnavigatorButtonInactiveBackground;
    } else if (inputActive === 'true') {
      backgroundColor = theme.palette.vnavigatorButtonActiveBackground;
    }
  }

  // Footer button (usual parent is container with kind='footer').
  if (inputKind === 'footer') {
    boxHeight  = theme.shapes.footerHeight;
    boxMargin  = '0px 1px 0px 0px';
    boxPadding = '0px ' + m + ' 0px ' + m;
    textSize   = theme.shapes.footerTextSize;
    glyphSize  = theme.shapes.footerGlyphSize;
    if (inputText) {
      backgroundColor = theme.palette.footerTextBackground;
    } else {
      backgroundColor = theme.palette.footerBackground;
    }
    borderStyle = 'none';
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (inputKind === 'notification') {
    boxHeight            = '32px';
    glyphHeight          = null;
    textSize             = theme.shapes.notificationButtonTextSize;
    glyphSize            = theme.shapes.notificationButtonGlyphSize;
    glyphMargin          = '10px 20px 10px 0px';
    backgroundColor      = 'transparent';
    glyphColor           = theme.palette.notificationText;
    textColor            = theme.palette.notificationText;
    borderStyle          = 'none';
    textHoverColor       = theme.palette.notificationTextHover;
    backgroundHoverColor = 'transparent';
  }
  if (inputKind === 'notification-close') {
    boxMargin            = Unit.multiply (theme.shapes.containerMargin, -1) + ' 0px 0px 0px';
    glyphColor           = theme.palette.notificationText;
    textColor            = theme.palette.notificationText;
    borderStyle          = 'none';
    backgroundColor      = 'transparent';
    textHoverColor       = theme.palette.notificationTextHover;
    backgroundHoverColor = 'transparent';
  }

  // Warning button (usual parent is container with kind='footer').
  if (inputKind === 'warning') {
    boxHeight       = theme.shapes.footerHeight;
    boxPadding      = '0px 0px 0px ' + theme.shapes.warningLeftPadding;
    textWeight      = 'bold';
    borderStyle     = 'none';
    textSize        = theme.shapes.warningTextSize;
    glyphSize       = theme.shapes.warningGlyphSize;
    backgroundColor = theme.palette.warningBackground;
    textColor       = theme.palette.warningText;
  }

  // Action button (usual parent is container with kind='actions').
  if (inputKind === 'action') {
    let place = inputPlace;
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
    boxHeight         = theme.shapes.actionHeight;
    boxPadding        = '0px 0px 0px ' + h;
    borderStyle       = 'none';
    boxJustifyContent = null;
    backgroundColor   = theme.palette.actionButtonBackground;
    textSize          = theme.shapes.actionTextSize;
    glyphSize         = theme.shapes.actionGlyphSize;
    if (place === 'left') {
      boxMargin = '0px 1px 0px 0px';
      borderRadius = r + ' 0px 0px ' + r;
    } else if (place === 'right') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
    } else if (place === 'single') {
      borderRadius = r;
    } else {
      boxMargin = '0px 1px 0px 0px';
    }
  }

  // Subaction button (usual parent is container with kind='row-pane' and subkind='box').
  if (inputKind === 'subaction') {
    borderStyle     = 'none';
    backgroundColor = theme.palette.subactionButtonBackground;
    textColor       = theme.palette.subactionButtonText;
    textSize        = theme.shapes.subactionTextSize;
    textTransform   = 'uppercase';
    textWeight      = 'bold';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (inputKind === 'combo') {
    if (inputActive === 'true') {
      backgroundColor = theme.palette.comboActiveBackground;
      glyphColor      = theme.palette.comboActiveGlyph;
    }
  }

  if (inputKind === 'round') {
    const r = theme.shapes.actionRadius;
    borderRadius    = r;
    borderStyle     = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
    textColor       = theme.palette.roundButtonText;
    glyphColor      = theme.palette.roundButtonGlyph;
  }

  if (inputKind === 'identity') {
    const r = theme.shapes.actionRadius;
    boxWidth        = theme.shapes.identityHeight;
    boxHeight       = theme.shapes.identityHeight;
    borderRadius    = r;
    glyphSize       = theme.shapes.identityGlyphSize;
    borderStyle     = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
    textColor       = theme.palette.identityButtonText;
    glyphColor      = theme.palette.identityButtonGlyph;
  }

  if (inputKind === 'thin-left') {
    const r = theme.shapes.thinRadius;
    boxHeight       = null;
    borderStyle     = 'none solid none none';
    borderRadius    = r + ' 0px 0px ' + r;
    borderColor     = theme.palette.buttonBorder;
    backgroundColor = null;
  }
  if (inputKind === 'thin-right') {
    const r = theme.shapes.thinRadius;
    boxHeight       = null;
    borderStyle     = 'none none none solid';
    borderRadius    = '0px ' + r + ' ' + r + ' 0px';
    borderColor     = theme.palette.buttonBorder;
    backgroundColor = null;
  }

  if (inputKind === 'frameless') {
    borderStyle = 'none';
  }

  if (inputKind === 'menu-item') {
    textWidth         = 'max-content';
    boxHeight         = theme.shapes.menuButtonHeight;
    boxMargin         = '0px 0px 1px 0px';
    boxPadding        = '0px ' + theme.shapes.containerMargin + ' 0px ' + theme.shapes.containerMargin;
    textMargin        = '0px ' + theme.shapes.containerMargin + ' 0px ' + theme.shapes.containerMargin;
    boxJustifyContent = 'flex-start';
    textSize          = theme.shapes.menuTextSize;
    textTransform     = 'uppercase';
    textWeight        = 'bold';
    borderStyle       = 'none';
    if (inputActive === 'true') {
      glyphColor      = inputGlyphColor ? inputGlyphColor : theme.palette.menuText;
      textColor       = theme.palette.menuText;
      backgroundColor = theme.palette.menuItemActiveBackground;
    } else if (inputActive === 'focused') {
      glyphColor      = inputGlyphColor ? inputGlyphColor : theme.palette.menuFocusText;
      textColor       = theme.palette.menuFocusText;
      backgroundColor = theme.palette.menuItemFocusBackground;
    } else {
      glyphColor      = inputGlyphColor ? inputGlyphColor : theme.palette.menuText;
      textColor       = theme.palette.menuText;
      backgroundColor = theme.palette.menuItemInactiveBackground;
    }
  }

  if (inputKind === 'glyph-item') {
    boxWidth          = theme.shapes.glyphsDialogButtonWidth;
    textWidth         = 'max-content';
    boxHeight         = theme.shapes.menuButtonHeight;
    boxMargin         = '0px ' + theme.shapes.glyphsDialogButtonMargin + ' ' + theme.shapes.glyphsDialogButtonMargin + ' 0px';
    boxJustifyContent = 'flex-start';
    glyphSize         = '120%';
    if (inputActive === 'true') {
      backgroundColor = theme.palette.boxActiveBackground;
    }
  }

  if (inputKind === 'tray-title') {
    boxHeight         = Unit.add (theme.shapes.lineHeight, '2px');  // same as TextField with 2px for borders
    borderStyle       = 'none';
    boxJustifyContent = 'flex-start';
    textColor         = theme.palette.ticketGlueTitle;
    textWeight        = 'bold';
    textSize          = theme.shapes.ticketGlueTitleSize;
    backgroundColor   = null;
  }

  // Button with a day in Calendar component.
  if (inputKind === 'calendar') {
    borderStyle     = 'none';
    boxWidth        = theme.shapes.calendarButtonWidth;
    boxHeight       = theme.shapes.calendarButtonHeight;
    textSize        = theme.shapes.calendarTextSize;
    transition      = null;
    backgroundColor = theme.palette.calendarBackground;
    textColor       = theme.palette.calendarText;
    if (inputWeekend === 'true') {
      backgroundColor = theme.palette.calendarWeekendBackground;
    }
    if (inputActive === 'true') {
      backgroundColor = theme.palette.calendarActiveBackground;
      textColor       = theme.palette.calendarActiveText;
    }
    if (inputDimmed === 'true') {
      backgroundColor      = theme.palette.calendarBackground;
      backgroundHoverColor = theme.palette.calendarBackground;  // no visible hover effect
      textColor            = theme.palette.calendarDimmedText;
    }
  }
  // Button for month navigation in Calendar component.
  if (inputKind === 'calendar-navigation') {
    boxWidth        = theme.shapes.calendarButtonWidth;
    boxHeight       = theme.shapes.calendarButtonHeight;
    borderColor     = 'transparent';
    backgroundColor = theme.palette.calendarBackground;
    glyphColor      = theme.palette.calendarHeaderText;
    glyphSize       = theme.palette.calendarGlyphSize;
  }

  if (inputKind === 'container') {
    boxHeight       = null;
    boxAlignItems   = 'stretch';
    borderStyle     = 'none';
    boxPadding      = Unit.multiply (theme.shapes.lineSpacing, 0.5) + ' 0px';
    backgroundColor = null;
  }

  if (inputKind === 'container-start') {
    boxHeight         = null;
    boxJustifyContent = 'flex-start';
    boxAlignItems     = 'stretch';
    borderStyle       = 'none';
    boxPadding        = Unit.multiply (theme.shapes.lineSpacing, 0.5) + ' 0px';
    backgroundColor   = null;
  }

  if (inputKind === 'box') {
    boxAlignItems   = 'stretch';
    borderStyle     = 'none';
    boxMargin       = '0px ' + m + ' ' + m + ' ' + ' 0px';
    if (inputActive === 'true') {
      backgroundColor = theme.palette.boxActiveBackground;
    } else {
      backgroundColor = theme.palette.boxBackground;
    }
  }

  if (inputKind === 'chronos-navigator') {
    boxMinHeight = boxHeight;
    boxMargin    = '0px 0px 1px 0px';
    if (inputSubkind === 'with-badge') {
      boxJustifyContent = 'flex-start';
      textGrow          = '1';
    }
    borderRadius = theme.shapes.smoothRadius;
    if (inputActive === 'true') {
      backgroundColor = theme.palette.boxActiveBackground;
    } else {
      glyphColor           = theme.palette.chronoNavigatorText;
      textColor            = theme.palette.chronoNavigatorText;
      backgroundHoverColor = ColorManipulator.fade (theme.palette.buttonBackground, 0.3);
    }
  }

  if (inputKind === 'recurrence') {
    if (inputActive === 'true') {
      glyphColor = theme.palette.calendarActiveText;
      textColor  = theme.palette.calendarActiveText;
      if (inputActiveColor) {
        backgroundColor = inputActiveColor;
        borderColor     = inputActiveColor;
      } else {
        backgroundColor = theme.palette.calendarActiveBackground;
        borderColor     = theme.palette.calendarActiveBackground;
      }
    }
  }

  if (inputKind === 'hover') {
    boxOpacity           = 0;
    borderWidth          = theme.shapes.lineSpacing;
    borderColor          = theme.palette.taskBackground;
    backgroundHoverColor = theme.palette.buttonBackground;
    boxZIndex            = 3;
  }

  if (!inputKind) {
    borderRadius = theme.shapes.smoothRadius;
    if (inputActive === 'true') {
      backgroundColor = theme.palette.boxActiveBackground;
    }
  }

  if (inputShape) {
    const r = Unit.multiply (theme.shapes.lineHeight, 0.5);
    const s = theme.shapes.smoothRadius;
    if (inputShape === 'left-rounded') {
      borderRadius = r + ' 0px 0px ' + r;
    } else if (inputShape === 'right-rounded') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
    } else if (inputShape === 'left-smooth') {
      borderRadius = s + ' 0px 0px ' + s;
    } else if (inputShape === 'right-smooth') {
      borderRadius = '0px ' + s + ' ' + s + ' 0px';
    }
  }

  if (inputBackgroundColor) {
    backgroundColor = inputBackgroundColor;
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
  if (inputDisabled) {
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

  const boxStyle = {
    opacity:         boxOpacity,
    width:           boxWidth,
    height:          boxHeight,
    minHeight:       boxMinHeight,
    left:            inputLeft,
    right:           inputRight,
    top:             inputTop,
    bottom:          inputBottom,
    display:         'flex',
    flexDirection:   boxFlexDirection,
    flexGrow:        boxFlexGrow,
    flexShrink:      boxFlexShrink,
    flexBasis:       boxFlexBasis,
    justifyContent:  boxJustifyContent,
    alignItems:      boxAlignItems,
    borderWidth:     borderWidth,
    borderColor:     borderColor,
    borderStyle:     borderStyle,
    borderRadius:    borderRadius,
    padding:         boxPadding,
    margin:          boxMargin,
    backgroundColor: backgroundColor,
    position:        boxPosition,
    transition:      transition,
    zIndex:          boxZIndex,
    textDecoration:  'none',
    cursor:          cursor,
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
    inputGlyphPosition === 'right' &&
    inputBadgeValue &&
    !glyphMargin
  ) {
    glyphMargin = '0px 10px 0px 0px';
  }

  const glyphStyle = {
    display:        'flex',
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    width:          glyphWidth,
    height:         glyphHeight,
    padding:        '0px',
    margin:         glyphMargin,
    color:          glyphColor,
    transform:      glyphTransform,
  };

  const textStyle = {
    width:         textWidth,
    margin:        textMargin,
    flexGrow:      inputShortcut ? '1' : textGrow,
    color:         textColor,
    fontWeight:    textWeight,
    textTransform: textTransform,
    fontSize:      Unit.multiply (textSize, theme.typo.fontScale),
    overflow:      'hidden',
    textOverflow:  'ellipsis',
    whiteSpace:    'nowrap',
    wordWrap:      'break-word',
  };

  const shortcutStyle = {
    width:        textWidth,
    flexGrow:     textGrow,
    color:        textColor,
    fontSize:     Unit.multiply (textSize, theme.typo.fontScale * 0.9),
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    whiteSpace:   'nowrap',
    wordWrap:     'break-word',
  };

  if (!inputDisabled && actif && boxOpacity !== 0) {
    boxStyle[':hover'] = {
      color:           textHoverColor,  // (*)
      borderColor:     borderHoverColor,
      backgroundColor: backgroundHoverColor,
      opacity:         1.0,
    };
    if (textHoverColor) {
      textStyle.color  = null; // (*)
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
    position:     'absolute',
    right:        '50%',
    bottom:       '0px',
    borderLeft:   d + ' solid transparent',
    borderRight:  d + ' solid transparent',
    borderBottom: d + ' solid ' + theme.palette.viewTabBackground,
    margin:       '0px -' + d + ' 0px 0px',
  };

  const menuBoxStyle = {
    position:        'absolute',
    top:             (inputMenuDirection === 'top') ? null : boxHeight,
    bottom:          (inputMenuDirection === 'top') ? boxHeight : null,
    padding:         '1px 0px 1px 0px',
    left:            '0px',
    backgroundColor: theme.palette.menuBackground,
    zIndex:          2,
  };

  return {
    box:      boxStyle,
    glyph:    glyphStyle,
    text:     textStyle,
    shortcut: shortcutStyle,
    triangle: triangleStyle,
    menuBox:  menuBoxStyle,
  };
}

/******************************************************************************/
