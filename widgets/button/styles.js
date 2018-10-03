import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

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

export default function styles(theme, props) {
  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  // Initialize all variables for a standard button.
  let boxWidth = props.width;
  let boxMinWidth = null;
  let boxHeight = props.height ? props.height : theme.shapes.lineHeight;
  let boxMaxWidth = null;
  let boxMaxHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = props.grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(props.justify);
  let boxAlignItems = 'center';
  let boxAlignSelf = null;
  let boxMarginTop = '0px';
  let boxMarginRight = '0px';
  let boxMarginBottom = '0px';
  let boxMarginLeft = '0px';
  let boxPaddingTop = '0px';
  let boxPaddingRight = '0px';
  let boxPaddingBottom = '0px';
  let boxPaddingLeft = '0px';
  let boxZIndex = props.zIndex;
  let boxOpacity = Bool.isFalse(props.visibility) ? 0 : null;
  let borderWidth = '1px';
  let borderColor = theme.palette.buttonBorder;
  let borderActiveColor = theme.palette.buttonBorder;
  let borderStyle = 'solid';
  let borderRadius = '0px';
  let boxSizing = null;
  let backgroundColor = theme.palette.buttonBackground;
  let activeColor = theme.palette.boxActiveBackground;
  let borderHoverColor = null;
  let borderHoverStyle = null;
  let borderHoverWidth = null;
  let backgroundHoverColor = null;
  let boxPosition = props.position ? props.position : 'relative';
  let cursor = props.cursor ? props.cursor : 'default';
  let transition = theme.transitions.easeOut();
  let specialDisabled = false;
  let focusedShadow = theme.shapes.focusedShadow + theme.palette.focused;

  const disabled = Bool.isTrue(props.disabled) || Bool.isTrue(props.readonly);

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
      big: Unit.multiply(m, 2),
      double: theme.shapes.containerMargin,
    };
    boxMarginRight = spacingType[props.spacing];
  }
  if (props.leftSpacing === 'overlap') {
    boxMarginLeft = '-1px';
  }

  if (props.kind === 'disabled-light') {
    specialDisabled = true;
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (props.kind === 'task-logo') {
    boxWidth = theme.shapes.taskButtonWidth;
    boxMaxWidth = theme.shapes.taskButtonWidth;
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none';
    backgroundColor = theme.palette.taskLogoBackground;
    activeColor = theme.palette.taskTabActiveBackground;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (props.kind === 'task-bar') {
    boxWidth = theme.shapes.taskButtonWidth;
    boxMaxWidth = theme.shapes.taskButtonWidth;
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    backgroundColor = theme.palette.taskButtonBackground;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (props.kind === 'main-tab') {
    boxHeight = theme.shapes.mainTabHeight;
    boxMarginRight = '1px';
    borderStyle = 'none';
    backgroundColor = theme.palette.mainTabButtonInactiveBackground;
    activeColor = theme.palette.mainTabButtonActiveBackground;
  }

  if (props.kind === 'main-tab-right') {
    boxHeight = theme.shapes.mainTabHeight;
    borderStyle = 'none';
    backgroundColor = null;
    activeColor = theme.palette.mainTabButtonActiveBackground;
    backgroundHoverColor = theme.palette.mainTabButtonActiveBackground;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (props.kind === 'view-tab') {
    boxMaxWidth = '250px';
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
    backgroundColor = theme.palette.viewTabButtonInactiveBackground;
    activeColor = theme.palette.viewTabButtonActiveBackground;
  }

  if (props.kind === 'view-tab-right') {
    boxHeight = Unit.add(
      theme.shapes.containerMargin,
      theme.shapes.viewTabHeight
    );
    borderStyle = 'none';
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
    backgroundColor = theme.palette.taskTabInactiveBackground;
    activeColor = theme.palette.taskTabActiveBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (props.kind === 'pane-navigator') {
    boxHeight = theme.shapes.paneNavigatorHeight;
    boxMarginBottom = '-1px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    borderActiveColor = theme.palette.paneNavigatorActiveBorder;
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (props.kind === 'pane-hnavigator') {
    boxHeight = theme.shapes.paneNavigatorHeight;
    boxMarginBottom = '-1px';
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    borderActiveColor = theme.palette.paneNavigatorActiveBorder;
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (props.kind === 'pane-vnavigator') {
    boxWidth = theme.shapes.vnavigatorButtonSize;
    boxHeight = theme.shapes.vnavigatorButtonSize;
    boxMarginBottom = '1px';
    backgroundColor = theme.palette.vnavigatorButtonInactiveBackground;
    borderStyle = 'none';
    activeColor = theme.palette.vnavigatorButtonActiveBackground;
  }

  // Footer button (usual parent is container with kind='footer').
  if (props.kind === 'button-footer') {
    boxHeight = theme.shapes.footerHeight;
    boxMarginRight = '1px';
    boxPaddingRight = m;
    boxPaddingLeft = m;
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
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = 'transparent';
    specialDisabled = true;
  }
  if (props.kind === 'notification-close') {
    boxMarginTop = Unit.multiply(theme.shapes.containerMargin, -1);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }
  if (props.kind === 'notification-extend') {
    boxMarginBottom = Unit.multiply(theme.shapes.containerMargin, -1);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }

  if (props.kind === 'check-button') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = 'transparent';
    focusedShadow = null;
    if (props.heightStrategy === 'compact') {
      boxHeight = '22px';
    }
    specialDisabled = true;
  }

  if (props.kind === 'plugin-light') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = theme.palette.pluginLightButtonBackgroundHover;
    focusedShadow = null;
  }
  if (props.kind === 'plugin-dark') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = theme.palette.pluginDarkButtonBackgroundHover;
    focusedShadow = null;
  }

  // Warning button (usual parent is container with kind='footer').
  if (props.kind === 'warning') {
    boxHeight = theme.shapes.footerHeight;
    boxPaddingLeft = theme.shapes.warningLeftPadding;
    borderStyle = 'none';
    backgroundColor = theme.palette.warningBackground;
  }

  // Action button (usual parent is container with kind='actions').
  if (props.kind === 'action') {
    let place = props.place ? props.place : 'middle';
    if (place === '1/1') {
      place = 'single';
    } else if (place.indexOf('/') !== -1) {
      const n = place.split('/');
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
    const r = theme.shapes.actionRadius;
    boxHeight = theme.shapes.actionHeight;
    boxPaddingLeft = Unit.multiply(theme.shapes.actionHeight, 0.1);
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.actionButtonBackground;
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

  // Action button (usual parent is container with kind='actions-line-secondary').
  if (props.kind === 'secondary-action') {
    let place = props.place ? props.place : 'middle';
    if (place === '1/1') {
      place = 'single';
    } else if (place.indexOf('/') !== -1) {
      const n = place.split('/');
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
    const r = theme.shapes.secondaryActionRadius;
    boxHeight = theme.shapes.secondaryActionHeight;
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.actionButtonBackground;
    boxPaddingRight = theme.shapes.secondaryActionPadding;
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
  }

  if (props.kind === 'table-action-frame') {
    let place = props.place ? props.place : 'middle';
    if (place === '1/1') {
      place = 'single';
    } else if (place.indexOf('/') !== -1) {
      const n = place.split('/');
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
    const r = theme.shapes.tableActionRadius;
    boxHeight = theme.shapes.tableActionHeight;
    borderStyle = 'none solid solid solid';
    borderColor = theme.palette.tableBorder;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.tableActionBackground;
    if (place === 'left') {
      borderRadius = '0px 0px 0px ' + r;
    } else if (place === 'right') {
      borderRadius = '0px 0px ' + r + ' 0px';
    } else if (place === 'single') {
      borderRadius = '0px 0px ' + r + ' ' + r;
    }
    if (props.grow === '0') {
      borderStyle = 'none';
    }
    transition = null;
  }
  if (props.kind === 'table-action') {
    boxHeight = theme.shapes.tableActionHeight;
    borderStyle = 'none solid solid solid';
    borderColor = theme.palette.tableBorder;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.tableActionBackground;
    borderStyle = 'none';
    transition = null;
  }

  if (props.kind === 'tree-expand') {
    boxWidth = theme.shapes.treeExpandButtonWidth;
    boxMaxWidth = theme.shapes.treeExpandButtonWidth;
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (props.kind === 'combo') {
    const w = Unit.multiply(theme.shapes.lineHeight, 0.8);
    boxWidth = w;
    boxMinWidth = w;
    activeColor = theme.palette.comboActiveBackground;
    borderActiveColor = theme.palette.comboActiveBackground;
    if (disabled) {
      borderColor = theme.palette.textFieldDisableText;
      backgroundColor = theme.palette.textFieldDisableBackground;
      specialDisabled = true;
    }
  }

  if (props.kind === 'round') {
    const r = theme.shapes.actionRadius;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
  }

  if (props.kind === 'identity') {
    const r = theme.shapes.actionRadius;
    boxWidth = theme.shapes.identityHeight;
    boxHeight = theme.shapes.identityHeight;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
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

  if (props.kind === 'menu-item') {
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginBottom = '1px';
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.menuItemInactiveBackground;
    if (props.active === 'focused') {
      activeColor = theme.palette.menuItemFocusBackground;
    } else {
      activeColor = theme.palette.menuItemActiveBackground;
    }
  }

  if (props.kind === 'combo-item') {
    boxHeight = theme.shapes.menuButtonHeight;
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.comboItemBackground;
    if (props.active === 'focused') {
      activeColor = theme.palette.comboItemFocused;
    } else {
      activeColor = theme.palette.comboItemActive;
    }
    backgroundHoverColor = theme.palette.comboItemHover;
  }

  if (props.kind === 'combo-wrap-item') {
    boxMaxWidth = boxWidth ? boxWidth : null;
    boxHeight = theme.shapes.menuButtonHeight;
    boxMaxHeight = theme.shapes.menuButtonHeight;
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.comboItemBackground;
    if (props.active === 'focused') {
      activeColor = theme.palette.comboItemFocused;
    } else {
      activeColor = theme.palette.comboItemActive;
    }
    backgroundHoverColor = theme.palette.comboItemHover;
  }

  if (props.kind === 'glyph-item') {
    boxWidth = theme.shapes.glyphsDialogButtonWidth;
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginRight = theme.shapes.glyphsDialogButtonMargin;
    boxMarginBottom = theme.shapes.glyphsDialogButtonMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    activeColor = theme.palette.boxActiveBackground;
  }

  if (props.kind === 'desk-title') {
    boxHeight = Unit.multiply(theme.shapes.lineHeight, 1.2);
    borderStyle = 'solid';
    borderColor = 'transparent';
    borderWidth = theme.shapes.ticketHoverThickness;
    borderRadius = Unit.multiply(theme.shapes.lineHeight, 0.25);
    boxSizing = 'border-box';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxMarginBottom = '3px';
    backgroundColor = null;
    backgroundHoverColor = theme.palette.ticketGlueHilitedBackground;
    borderHoverStyle = 'solid';
    borderHoverColor = theme.palette.ticketHover;
    borderHoverWidth = theme.shapes.ticketHoverThickness;
    activeColor = theme.palette.ticketHilitedBackground;
    borderActiveColor = theme.palette.ticketHilitedBackground;
  }

  // Button with a day in Calendar component.
  if (
    props.kind === 'calendar' ||
    props.kind === 'calendar-navigator' ||
    props.kind === 'calendar-list' ||
    props.kind === 'calendar-title'
  ) {
    borderStyle = 'none';
    if (props.kind === 'calendar' || props.kind === 'calendar-navigator') {
      boxWidth = theme.shapes.calendarButtonWidth;
    }
    boxHeight = theme.shapes.calendarButtonHeight;
    transition = null;
    backgroundColor = 'transparent';
    if (props.kind === 'calendar-navigator') {
      backgroundHoverColor = 'transparent';
    }
    if (Bool.isTrue(props.calendarWeekend)) {
      backgroundColor = theme.palette.calendarWeekendBackground;
    }
    if (Bool.isTrue(props.calendarDimmed)) {
      backgroundColor = theme.palette.calendarBackground;
      activeColor = theme.palette.calendarBackground;
      backgroundHoverColor = theme.palette.calendarBackground; // no visible hover effect
    } else {
      if (props.subkind === 'add') {
        activeColor = theme.palette.calendarActiveAddBackground;
      } else if (props.subkind === 'sub') {
        activeColor = theme.palette.calendarActiveSubBackground;
      } else {
        activeColor = theme.palette.calendarActiveBackground;
      }
    }
    specialDisabled = true;
  }

  if (props.kind === 'container') {
    boxHeight = null;
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    backgroundColor = null;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (props.kind === 'container-start') {
    boxHeight = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    backgroundColor = null;
  }

  if (props.kind === 'box') {
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxMarginRight = m;
    boxMarginBottom = m;
    backgroundColor = theme.palette.boxBackground;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (props.kind === 'chronos-navigator') {
    boxMarginBottom = '1px';
    borderRadius = theme.shapes.smoothRadius;
    backgroundHoverColor = ColorManipulator.fade(
      theme.palette.buttonBackground,
      0.3
    );
    activeColor = theme.palette.boxActiveBackground;
  }

  if (props.kind === 'recurrence') {
    boxMinWidth = theme.shapes.lineHeight;
    boxMaxHeight = theme.shapes.lineHeight;
    activeColor = theme.palette.calendarActiveBackground;
    borderActiveColor = theme.palette.calendarActiveText;
  }

  if (props.kind === 'hover') {
    boxOpacity = Bool.isTrue(props.active) ? 1 : 0.00001;
    borderWidth = '4px';
    borderColor = theme.palette.taskBackground;
    backgroundHoverColor = theme.palette.buttonBackground;
    borderActiveColor = theme.palette.taskBackground;
  }

  if (props.kind === 'dynamic-toolbar-left') {
    borderStyle = 'none';
    backgroundColor = 'transparent';
    activeColor = theme.palette.dynamicToolbarBackground;
  }
  if (props.kind === 'dynamic-toolbar-top-left') {
    borderStyle = 'none solid solid none';
    backgroundColor = theme.palette.paneBackground;
  }
  if (props.kind === 'dynamic-toolbar-top-right') {
    borderStyle = 'none none solid solid';
    backgroundColor = theme.palette.paneBackground;
  }
  if (props.kind === 'dynamic-toolbar') {
    boxMinWidth = theme.shapes.toolbarButtonWidth;
    boxHeight = theme.shapes.toolbarButtonHeight;
    borderStyle = 'none';
    backgroundColor = ColorManipulator.emphasize(
      theme.palette.toolbarInactiveBackground,
      0.1
    );
    activeColor = theme.palette.toolbarActiveBackground;
  }
  if (props.kind === 'toolbar') {
    boxMinWidth = theme.shapes.toolbarButtonWidth;
    boxHeight = theme.shapes.toolbarButtonHeight;
    borderStyle = 'none';
    backgroundColor = theme.palette.toolbarInactiveBackground;
    activeColor = theme.palette.toolbarActiveBackground;
  }

  if (!props.kind) {
    borderRadius = theme.shapes.smoothRadius;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (Bool.isTrue(props.badgePush)) {
    boxPaddingRight = Unit.add(boxPaddingRight, theme.shapes.badgeHeight);
  }
  if (
    props.shortcut &&
    props.kind !== 'menu-item' &&
    props.kind !== 'combo-item' &&
    props.kind !== 'task-bar' &&
    props.kind !== 'task-logo'
  ) {
    boxPaddingRight = Unit.add(boxPaddingRight, m);
  }

  if (props.shape) {
    const r = Unit.multiply(theme.shapes.lineHeight, 0.5);
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
    backgroundColor = ColorHelpers.getMarkColor(theme, props.backgroundColor);
  }
  if (props.activeColor) {
    activeColor = ColorHelpers.getMarkColor(theme, props.activeColor);
  }

  if (Bool.isTrue(props.active) || props.active === 'focused') {
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

  // If component has specific width and border, reduce the width to
  // take into account the thickness of the borders left and right.
  // Buttons without left or right border (with only bottom border) are
  // considered as without border (for example task button).
  if (boxWidth && boxWidth !== '0px' && !borderStyle.startsWith('none')) {
    boxWidth = Unit.sub(boxWidth, Unit.multiply(borderWidth, 2));
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (props.vpos === 'top') {
    boxAlignSelf = 'flex-start';
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
    minWidth: boxMinWidth,
    maxWidth: boxMaxWidth,
    height: boxHeight,
    minHeight: boxHeight,
    maxHeight: boxMaxHeight,
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
    backgroundColor: backgroundColor,
    position: boxPosition,
    transition: transition,
    zIndex: boxZIndex,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: cursor,
  };

  if (!disabled && !Bool.isTrue(props.busy) && boxOpacity !== 0) {
    boxStyle[':hover'] = {
      borderColor: borderHoverColor,
      borderStyle: borderHoverStyle,
      borderWidth: borderHoverWidth,
      backgroundColor: backgroundHoverColor,
      opacity: 1.0,
    };
    boxStyle[':active'] = {
      backgroundColor: ColorManipulator.darken(backgroundColor, 0.1),
    };
  }

  if (Bool.isTrue(props.focusable)) {
    boxStyle[':focus'] = {
      outline: 'none',
      boxShadow: focusedShadow,
    };
  } else {
    boxStyle[':focus'] = {
      outline: 'none',
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

  const busyBoxStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.busyBackground,
  };

  const busyGlyphStyle = {
    margin: 'auto',
    color: theme.palette.busyForeground,
  };

  const focusedForegroundStyle = {
    position: 'absolute',
    left: '8px',
    width: 'calc(100% - 14px)',
    height: 'calc(100% - 14px)',
    backgroundColor: ColorManipulator.fade(theme.palette.focused, 0.2),
    boxShadow: theme.shapes.focusedShadow + theme.palette.focused,
    borderRadius: m,
  };

  return {
    box: boxStyle,
    triangle: triangleStyle,
    busyBox: busyBoxStyle,
    busyGlyph: busyGlyphStyle,
    focusedForeground: focusedForegroundStyle,
  };
}

/******************************************************************************/
