import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

function convertJustify (justify) {
  switch (justify) {
    case 'start':
    case 'left':
      return 'flex-start';
    case 'end':
    case 'right':
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

  let boxWidth = props.width;
  let boxHeight = props.height;
  let boxMaxHeight = null;
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
  let boxOpacity = Bool.isFalse (props.visibility) ? 0 : null;
  let border = null;
  let borderTop = null;
  let borderBottom = null;
  let borderLeft = null;
  let borderRight = null;
  let boxSizing = null;
  let borderRadius = '0px';
  let backgroundColor = null;
  let textHoverColor = null;
  let glyphJustify = 'center';
  let glyphMinWidth = theme.shapes.lineHeight;
  let glyphHeight = theme.shapes.lineHeight;
  let glyphColor = null;
  let glyphSize = props.glyphSize;
  let glyphTransform = null;
  let glyphMargin = null;
  let textWidth = null;
  let textMarginTop = '0px';
  let textMarginRight = m;
  let textMarginBottom = '0px';
  let textMarginLeft = m;
  let textWeight = props.weight;
  let textWrap = props.wrap;
  let textTransform = props.textTransform ? props.textTransform : null;
  let textSize = props.fontSize ? props.fontSize : theme.shapes.labelTextSize;
  let boxAlignSelf = null;
  let textColor = null;
  let linesOverflow = null;
  let textOverflow = null;
  let textTextOverflow = null;
  let textWhiteSpace = null;
  let textWordBreak = null;
  let textAlign = null;
  let cursor = props.cursor ? props.cursor : 'default';
  let spacing = props.spacing;
  let specialDisabled = false;
  let specialHover = false;

  const disabled = Bool.isTrue (props.disabled) || Bool.isTrue (props.readonly);

  if (Bool.isTrue (props.insideButton)) {
    boxHeight = props.height ? props.height : theme.shapes.lineHeight;
    spacing = null;
    textWrap = textWrap ? textWrap : 'no';
  } else {
    textWrap = textWrap ? textWrap : 'yes';
  }

  if (!props.isDragged && props.hasHeLeft) {
    boxOpacity = 0.1;
  }

  // Initialise bottom margin according to bottom-spacing.
  if (props.bottomSpacing === 'large') {
    boxMarginBottom = m;
  }
  // Initialise right margin according to spacing.
  if (spacing) {
    const spacingType = {
      overlap: '-1px',
      tiny: '1px',
      compact: '5px',
      large: m,
      double: theme.shapes.containerMargin,
    };
    boxMarginRight = spacingType[spacing];
  }
  if (props.spacing === 'compact') {
    glyphMinWidth = null;
  }

  // Decrease space between glyph and text.
  if (props.glyph && props.text) {
    if (props.glyphPosition === 'right') {
      textMarginRight = '0px';
    } else {
      textMarginLeft = '0px';
    }
  }

  if (!Bool.isTrue (props.insideButton) && !props.glyph) {
    // Label without glyph ?
    if (boxJustifyContent === 'flex-end') {
      textMarginRight = '0px'; // push to right frame border
    } else if (!boxJustifyContent || boxJustifyContent === 'flex-start') {
      textMarginLeft = '0px'; // push to left frame border
    }
  }

  if (Bool.isTrue (props.shortcut)) {
    textMarginRight = '0px'; // push shortcut to right frame border
  }

  // Choice glyph position into his square.
  if (Bool.isTrue (props.insideButton)) {
    glyphJustify = 'center';
  } else {
    if (props.glyphPosition === 'right') {
      glyphJustify = 'flex-end'; // push to right frame border
    } else if (props.glyphPosition === 'center') {
      glyphJustify = 'center';
    } else {
      glyphJustify = 'flex-start'; // push to left frame border
    }
  }

  if (props.kind === 'compact') {
    textMarginLeft = '0px';
    textMarginRight = '0px';
  }

  if (props.kind === 'pane-header') {
    boxHeight = '50px';
    boxMaxHeight = '50px';
    textSize = theme.shapes.paneHeaderTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
    glyphColor = theme.palette.paneHeaderText;
    textColor = theme.palette.paneHeaderText;
  }

  if (props.kind === 'title') {
    textSize = theme.shapes.labelTitleTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (props.kind === 'title-recurrence') {
    boxPaddingTop = '0px';
    boxPaddingRight = theme.shapes.lineSpacing;
    boxPaddingBottom = '0px';
    boxPaddingLeft = theme.shapes.lineSpacing;
  }

  if (props.kind === 'big-center') {
    textSize = theme.shapes.labelBigTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
  }

  if (props.kind === 'floating-header') {
    glyphMinWidth = null;
    glyphHeight = theme.shapes.floatingHeaderGlyphHeight;
    glyphSize = theme.shapes.floatingHeaderGlyphSize;
    glyphColor = theme.palette.floatingBackground;
    textColor = theme.palette.floatingBackground;
  }

  if (props.kind === 'floating-footer') {
    glyphMinWidth = null;
    textSize = theme.shapes.floatingFooterTextSize;
    glyphColor = theme.palette.floatingSecondary;
    textColor = theme.palette.floatingSecondary;
  }

  if (props.kind === 'info') {
    backgroundColor = theme.palette.infoBackground;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
    boxPaddingTop = '0px';
    boxPaddingRight = '10px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '10px';
  }

  if (props.kind === 'footer') {
    glyphColor = theme.palette.footerText;
    textColor = theme.palette.footerText;
    boxPaddingTop = '0px';
    boxPaddingRight = '20px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '20px';
  }

  if (props.kind === 'notification') {
    boxMarginLeft = m;
    glyphColor = theme.palette.notificationMessage;
    textColor = theme.palette.notificationMessage;
  }

  if (props.kind === 'flying-balloon') {
    glyphColor = theme.palette.flyingBalloonText;
    textColor = theme.palette.flyingBalloonText;
    textSize = theme.shapes.flyingBalloonTextSize;
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
  }

  if (props.kind === 'task') {
    boxPaddingTop = theme.shapes.taskLabelTopMargin;
    boxPaddingRight = '0px';
    boxPaddingBottom = theme.shapes.taskLabelBottomMargin;
    boxPaddingLeft = theme.shapes.taskTabLeftMargin;
    glyphColor = theme.palette.taskLabelText;
    textColor = theme.palette.taskLabelText;
    textWeight = 'bold';
    textSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  if (props.kind === 'center-to-box') {
    glyphMinWidth = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'center';
    boxMarginTop = m;
    boxMarginRight = '0px';
    boxMarginBottom = m;
    boxMarginLeft = '0px';
  }

  if (props.kind === 'large-left') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = '0px';
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }
  if (props.kind === 'large-right') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = '0px';
  }
  if (props.kind === 'large-single') {
    const hm = Unit.multiply (m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }

  if (props.kind === 'ticket-warning') {
    boxMarginTop = '5px';
  }

  if (props.kind === 'one-line-height') {
    boxHeight = theme.shapes.lineHeight;
  }

  if (props.kind === 'markdown') {
    boxPaddingTop = '7px';
    boxPaddingRight = '10px';
    boxPaddingBottom = '7px';
    boxPaddingLeft = '10px';
    // borderTop = '1px solid ' + theme.palette.buttonBorder;
    // borderBottom = '1px solid ' + theme.palette.buttonBorder;
    // borderLeft = '4px double ' + theme.palette.buttonBorder;
    // borderRight = '4px double ' + theme.palette.buttonBorder;
    border = '1px solid ' + theme.palette.buttonBorder;
    backgroundColor = theme.palette.textFieldReadonlyBackground;
    boxSizing = 'border-box';
    boxHeight = Unit.add ('32px', '2px');
    boxAlignItems = 'flex-start';
    glyphHeight = null;
    glyphJustify = 'center';
  }

  if (props.kind === 'label-field') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    boxHeight = null;
    boxAlignItems = 'flex-start';
    if (disabled) {
      glyphColor = theme.palette.textFieldDisableText;
      textColor = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  if (props.kind === 'ticket-title') {
    boxPaddingTop = '7px';
    boxAlignItems = 'flex-start';
    glyphHeight = null;
    textWeight = 'bold';
  }

  if (props.kind === 'ticket-label') {
    boxPaddingTop = '7px';
    boxAlignItems = 'flex-start';
    glyphHeight = null;
  }

  if (props.kind === 'compact-glyph') {
    glyphMinWidth = null;
    boxMarginLeft = '5px';
  }

  /******************************************************************************/
  // Styles for Labels inside LabelTextFields.
  /******************************************************************************/

  if (props.kind === 'label-text-field') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    boxHeight = null;
    boxPaddingTop = '7px';
    boxAlignItems = 'flex-start';
    if (disabled) {
      glyphColor = theme.palette.textFieldDisableText;
      textColor = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  /******************************************************************************/
  // Styles for Labels inside Buttons.
  /******************************************************************************/

  // task-logo button (usual parent container with kind='task-bar').
  if (props.kind === 'task-logo') {
    boxFlexDirection = 'column';
    textWidth = theme.shapes.taskButtonWidth;
    textAlign = 'center';
    if (Bool.isTrue (props.active)) {
      textColor = theme.palette.taskTabActiveText;
    }
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.taskLogoTextSize;
    glyphSize = theme.shapes.taskLogoGlyphSize;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-bar') {
    boxFlexDirection = 'column';
    textWidth = theme.shapes.taskButtonWidth;
    textAlign = 'center';
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
    textSize = theme.shapes.taskTextSize;
    glyphSize = theme.shapes.taskGlyphSize;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (props.kind === 'main-tab') {
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.mainTabTextSize;
    textColor = theme.palette.mainTabText;
  }

  if (props.kind === 'main-tab-right') {
    textColor = theme.palette.mainTabText;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (props.kind === 'view-tab') {
    textSize = theme.shapes.viewTabTextSize;
    glyphColor = theme.palette.viewTabGlyph;
  }

  if (props.kind === 'view-tab-right') {
    textWeight = 'bold';
    textColor = theme.palette.viewTabRightText;
    glyphColor = theme.palette.viewTabRightText;
  }

  // task-tab button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-tab') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    if (Bool.isTrue (props.active)) {
      textColor = theme.palette.taskTabActiveText;
      textWeight = 'bold';
    } else {
      textColor = theme.palette.taskTabInactiveText;
    }
    const mm = props.glyph ? '0px' : theme.shapes.taskTabLeftMargin;
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = mm;
    textSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (props.kind === 'pane-navigator') {
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (Bool.isFalse (props.active)) {
      textColor = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (props.kind === 'pane-hnavigator') {
    textSize = theme.shapes.paneNavigatorTextSize;
    if (Bool.isFalse (props.active)) {
      textColor = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (props.kind === 'pane-vnavigator') {
    textSize = theme.shapes.paneNavigatorTextSize;
  }

  // Footer button (usual parent is container with kind='footer').
  if (props.kind === 'button-footer') {
    textSize = theme.shapes.footerTextSize;
    glyphSize = theme.shapes.footerGlyphSize;
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (props.kind === 'button-notification') {
    glyphHeight = null;
    textSize = theme.shapes.notificationButtonTextSize;
    glyphSize = theme.shapes.notificationButtonGlyphSize;
    glyphMargin = '10px 20px 10px 0px';
    glyphColor = theme.palette.notificationText;
    textColor = theme.palette.notificationText;
    textHoverColor = theme.palette.notificationTextHover;
    if (disabled) {
      glyphColor = ColorManipulator.darken (
        theme.palette.notificationText,
        0.4
      );
      textColor = ColorManipulator.darken (theme.palette.notificationText, 0.4);
    }
    specialDisabled = true;
  }
  if (props.kind === 'notification-close') {
    glyphColor = theme.palette.notificationText;
    textColor = theme.palette.notificationText;
    textHoverColor = theme.palette.notificationTextHover;
  }

  if (props.kind === 'check-button') {
    textHoverColor = theme.palette.checkButtonTextHover;
    if (disabled) {
      glyphColor = theme.palette.textFieldDisableText;
      textColor = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  if (props.kind === 'plugin-light') {
    glyphColor = theme.palette.pluginLightButtonGlyph;
    textColor = theme.palette.pluginLightButtonGlyph;
    textHoverColor = theme.palette.pluginLightButtonGlyphHover;
    specialHover = true;
  }
  if (props.kind === 'plugin-dark') {
    glyphColor = theme.palette.pluginDarkButtonGlyph;
    textColor = theme.palette.pluginDarkButtonGlyph;
    textHoverColor = theme.palette.pluginDarkButtonGlyphHover;
    specialHover = true;
  }

  // Warning button (usual parent is container with kind='footer').
  if (props.kind === 'warning') {
    textWeight = 'bold';
    textSize = theme.shapes.warningTextSize;
    glyphSize = theme.shapes.warningGlyphSize;
    textColor = theme.palette.warningText;
  }

  // Action button (usual parent is container with kind='actions').
  if (props.kind === 'action') {
    textSize = theme.shapes.actionTextSize;
    glyphSize = theme.shapes.actionGlyphSize;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
  }

  // Subaction button (usual parent is container with kind='row-pane' and subkind='box').
  if (props.kind === 'subaction') {
    textColor = theme.palette.subactionButtonText;
    textSize = theme.shapes.subactionTextSize;
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (props.kind === 'combo') {
    if (disabled) {
      glyphColor = theme.palette.textFieldDisableText;
      textColor = theme.palette.textFieldDisableText;
      specialDisabled = true;
    } else if (Bool.isTrue (props.active)) {
      glyphColor = theme.palette.comboActiveGlyph;
    }
  }

  if (props.kind === 'round') {
    textColor = theme.palette.roundButtonText;
    glyphColor = theme.palette.roundButtonGlyph;
  }

  if (props.kind === 'identity') {
    glyphSize = theme.shapes.identityGlyphSize;
    textColor = theme.palette.identityButtonText;
    glyphColor = theme.palette.identityButtonGlyph;
  }

  if (props.kind === 'menu-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = theme.shapes.containerMargin;
    textMarginBottom = '0px';
    textMarginLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform ? textTransform : 'uppercase';
    textWeight = 'bold';
    if (Bool.isTrue (props.active)) {
      glyphColor = theme.palette.menuText;
      textColor = theme.palette.menuText;
    } else if (props.active === 'focused') {
      glyphColor = theme.palette.menuFocusText;
      textColor = theme.palette.menuFocusText;
    } else {
      glyphColor = theme.palette.menuText;
      textColor = theme.palette.menuText;
    }
  }

  if (props.kind === 'combo-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = theme.shapes.containerMargin;
    textMarginBottom = '0px';
    textMarginLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform ? textTransform : 'uppercase';
  }

  if (props.kind === 'combo-wrap-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform ? textTransform : 'uppercase';
    glyphJustify = 'flex-start';
  }

  if (props.kind === 'glyph-item') {
    textWidth = 'max-content';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    glyphSize = '120%';
  }

  if (props.kind === 'tray-title') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    textColor = theme.palette.ticketGlueTitle;
    textWeight = 'bold';
    textSize = theme.shapes.ticketGlueTitleSize;
  }

  // Button with a day in Calendar component.
  if (
    props.kind === 'calendar' ||
    props.kind === 'calendar-navigator' ||
    props.kind === 'calendar-list' ||
    props.kind === 'calendar-title'
  ) {
    textMarginRight = '0px';
    textMarginLeft = '0px';
    textSize = theme.shapes.calendarTextSize;
    textColor = props.kind === 'calendar' ? theme.palette.calendarText : null;
    if (Bool.isTrue (props.active)) {
      if (props.subkind === 'add') {
        textColor = theme.palette.calendarActiveAddText;
        if (props.kind === 'calendar') {
          textWeight = 'bold';
        }
      } else if (props.subkind === 'sub') {
        textColor = theme.palette.calendarActiveSubText;
      } else {
        textColor = theme.palette.calendarActiveText;
        if (props.kind === 'calendar') {
          textWeight = 'bold';
        }
      }
    }
    if (Bool.isTrue (props.calendarDimmed)) {
      textColor = theme.palette.calendarDimmedText;
    }
    if (props.kind === 'calendar-navigator') {
      textHoverColor = theme.palette.calendarActiveBackground;
      if (disabled) {
        textColor = theme.palette.calendarDimmedText;
      }
      specialDisabled = true;
    }
    if (props.kind === 'calendar-title') {
      textSize = '100%';
      textWeight = 'bold';
      textTransform = 'uppercase';
    }
    glyphColor = textColor;
  }

  if (props.kind === 'container') {
    boxAlignItems = 'stretch';
  }

  if (props.kind === 'container-start') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxAlignItems = 'stretch';
  }

  if (props.kind === 'box') {
    boxAlignItems = 'stretch';
  }

  if (props.kind === 'chronos-navigator') {
    if (Bool.isFalse (props.active)) {
      glyphColor = theme.palette.chronoNavigatorText;
      textColor = theme.palette.chronoNavigatorText;
    }
  }

  if (props.kind === 'recurrence') {
    if (Bool.isTrue (props.active)) {
      glyphColor = theme.palette.calendarActiveText;
      textColor = theme.palette.calendarActiveText;
    }
  }

  if (props.kind === 'dynamic-toolbar') {
    glyphColor = theme.palette.dynamicToolbarButtonGlyph;
  }
  if (props.kind === 'toolbar') {
    if (Bool.isTrue (props.active)) {
      glyphColor = theme.palette.toolbarActiveText;
      textColor = theme.palette.toolbarActiveText;
    } else {
      glyphColor = theme.palette.toolbarInactiveText;
      textColor = theme.palette.toolbarInactiveText;
    }
  }

  if (Bool.isTrue (props.empty)) {
    border = '2px dotted #ccc';
    boxHeight = Unit.sub (theme.shapes.lineHeight, '2px');
    boxSizing = 'border-box';
    boxMarginTop = '2px';
  }

  if (!props.kind) {
    borderRadius = theme.shapes.smoothRadius;
    if (Bool.isTrue (props.active)) {
      backgroundColor = props.activeColor
        ? props.activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (props.vpos === 'top') {
    boxAlignSelf = 'flex-start';
  }

  if (textWrap === 'no') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
  } else if (textWrap === 'no-strict') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
    boxWidth = '0px';
    if (!boxFlexGrow) {
      boxFlexGrow = '1';
    }
  } else if (textWrap === 'yes-permissive') {
  } else if (textWrap === 'yes') {
    textWordBreak = 'break-word';
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

  // Force colors according to properties glyphColor, textColor and backgroundColor.
  if (props.glyphColor) {
    glyphColor = ColorHelpers.getMarkColor (theme, props.glyphColor);
  }
  if (props.textColor) {
    textColor = ColorHelpers.getMarkColor (theme, props.textColor);
  }
  if (props.backgroundColor) {
    backgroundColor = ColorHelpers.getMarkColor (theme, props.backgroundColor);
  }

  // Sets default colors if they are undefined
  if (!glyphColor) {
    glyphColor = ColorManipulator.emphasize (props.buttonBackgroundColor, 0.8);
  }
  if (!textColor) {
    textColor = ColorManipulator.emphasize (props.buttonBackgroundColor, 0.9);
  }

  // Alter colors if component is disable.
  if (disabled && !specialDisabled) {
    if (backgroundColor) {
      backgroundColor = theme.palette.buttonDisableBackground;
    }
    glyphColor = theme.palette.buttonDisableGlyph;
    textColor = theme.palette.buttonDisableText;
  }

  // If the Label is in a Button, it never has a backgroundColor.
  // Indeed, the background color is drawn by the Button.
  if (Bool.isTrue (props.insideButton)) {
    backgroundColor = null;
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (props.fontWeight) {
    textWeight = props.fontWeight;
  }

  if (!boxJustifyContent) {
    if (Bool.isTrue (props.insideButton)) {
      boxJustifyContent = 'center';
    } else {
      boxJustifyContent = 'flex-start';
    }
  }
  if (boxJustifyContent === 'none') {
    boxJustifyContent = null;
  }

  if (textTransform === 'none') {
    textTransform = null;
  }

  const boxStyle = {
    width: boxWidth,
    minWidth: boxWidth ? boxWidth : '0px',
    minHeight: boxHeight,
    maxHeight: boxMaxHeight,
    paddingTop: boxPaddingTop,
    paddingRight: boxPaddingRight,
    paddingBottom: boxPaddingBottom,
    paddingLeft: boxPaddingLeft,
    marginTop: boxMarginTop,
    marginRight: boxMarginRight,
    marginBottom: boxMarginBottom,
    marginLeft: boxMarginLeft,
    display: 'flex',
    flexDirection: boxFlexDirection,
    alignItems: boxAlignItems,
    justifyContent: boxJustifyContent,
    alignSelf: boxAlignSelf,
    flexGrow: boxFlexGrow,
    flexShrink: boxFlexShrink,
    flexBasis: boxFlexBasis,
    border: border,
    borderTop: borderTop,
    borderBottom: borderBottom,
    borderLeft: borderLeft,
    borderRight: borderRight,
    boxSizing: boxSizing,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    opacity: boxOpacity,
    zIndex: boxZIndex,
    userSelect: 'none',
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
  }

  const glyphStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: glyphJustify,
    alignItems: 'center',
    minWidth: glyphMinWidth,
    height: glyphHeight,
    padding: '0px',
    margin: glyphMargin,
    color: glyphColor,
    transform: glyphTransform,
    userSelect: 'none',
  };

  const linesStyle = {
    width: '100%',
    overflow: linesOverflow,
    userSelect: 'none',
  };

  const textStyle = {
    width: textWidth,
    marginTop: textMarginTop,
    marginRight: textMarginRight,
    marginBottom: textMarginBottom,
    marginLeft: textMarginLeft,
    fontSize: Unit.multiply (textSize, theme.typo.fontScale),
    fontWeight: textWeight,
    fontStyle: props.fontStyle,
    color: textColor,
    textTransform: textTransform,
    overflow: textOverflow,
    textOverflow: textTextOverflow,
    whiteSpace: textWhiteSpace,
    wordWrap: 'break-word',
    wordBreak: textWordBreak,
    textAlign: textAlign,
    userSelect: 'none',
  };

  const normalFragmentStyle = {
    color: textColor,
  };

  const hilitedFragmentStyle = {
    color: theme.palette.highlightedText,
    backgroundColor: theme.palette.highlightedTextBackground,
    padding: '1px',
  };

  if (!disabled && Bool.isTrue (props.insideButton) && boxOpacity !== 0) {
    if (specialHover) {
      glyphStyle[':hover'] = {
        color: textHoverColor,
      };
      textStyle[':hover'] = {
        color: textHoverColor,
      };
    } else {
      boxStyle[':hover'] = {
        color: textHoverColor, // (*)
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

    boxStyle[':active'] = {
      color: ColorManipulator.darken (textColor, 0.1),
    };
    textStyle[':active'] = {
      color: ColorManipulator.darken (textColor, 0.1),
    };
    glyphStyle[':active'] = {
      color: ColorManipulator.darken (glyphColor, 0.1),
    };
  }

  return {
    box: boxStyle,
    glyph: glyphStyle,
    lines: linesStyle,
    text: textStyle,
    normalFragment: normalFragmentStyle,
    hilitedFragment: hilitedFragmentStyle,
  };
}

/******************************************************************************/
