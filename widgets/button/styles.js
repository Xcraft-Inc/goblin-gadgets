import {Unit} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';
import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';

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

function isColorGradient(color) {
  return (
    color &&
    (color.startsWith('linear-gradient(') ||
      color.startsWith('radial-gradient(') ||
      color.startsWith('repeating-linear-gradient('))
  );
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
  'border',
  'horizontalSpacing',
  'leftSpacing',
  'kind',
  'text',
  'heightStrategy',
  'place',
  'active',
  'focused',
  'subkind',
  'badgePush',
  'shortcut',
  'shape',
  'backgroundColor',
  'activeColor',
  'vpos',
  'left',
  'right',
  'top',
  'bottom',
  'busy',
  'focusable',
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
    border,
    horizontalSpacing,
    leftSpacing,
    kind,
    text,
    heightStrategy,
    place: placeProp,
    active,
    focused,
    subkind,
    badgePush,
    shortcut,
    shape,
    backgroundColor: backgroundColorProp,
    activeColor: activeColorProp,
    vpos,
    left,
    right,
    top,
    bottom,
    busy,
    focusable,
  } = props;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

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
  let boxShadow = null;
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
  let focusedShadow = theme.shapes.focusedShadow + theme.palette.focused;

  disabled = disabled || readonly;

  // Initialize variables for button without border.
  if (border === 'none') {
    // Button without border must have same backgroundColor as parent !
    borderStyle = 'none';
    backgroundColor = null;
  }

  boxMarginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );

  if (leftSpacing === 'overlap') {
    boxMarginLeft = '-1px';
  }

  if (kind === 'disabled-light') {
    specialDisabled = true;
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (kind === 'task-logo') {
    boxWidth = theme.shapes.taskButtonWidth;
    boxMaxWidth = theme.shapes.taskButtonWidth;
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none';
    backgroundColor = theme.palette.taskLogoBackground;
    activeColor = theme.palette.taskTabActiveBackground;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (kind === 'task-bar') {
    boxWidth = theme.shapes.taskButtonWidth;
    boxMaxWidth = theme.shapes.taskButtonWidth;
    boxHeight = theme.shapes.taskButtonHeight;
    boxFlexDirection = 'column';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    backgroundColor = theme.palette.taskButtonBackground;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (kind === 'main-tab') {
    boxMinWidth = 'fit-content';
    boxHeight = theme.shapes.mainTabHeight;
    boxPaddingLeft = Unit.multiply(m, 5.0);
    boxPaddingRight = Unit.multiply(m, 5.0);
    boxPaddingTop = Unit.multiply(m, 0.5);
    boxPaddingBottom = Unit.multiply(m, 0.5);
    boxMarginRight = '1px';
    borderStyle = 'none';
    backgroundColor = theme.palette.mainTabButtonInactiveBackground;
    activeColor = theme.palette.mainTabButtonActiveBackground;

    if (theme.look.name === 'retro') {
      borderRadius = '25px 25px 0px 0px';
      boxMarginTop = '5px';
      boxMarginRight = '0px';
      boxMarginBottom = '0px';
      boxMarginLeft = '5px';
      boxShadow = '3px 5px 21px 2px rgba(0,0,0,0.7)';
    }
  }

  if (kind === 'main-tab-right') {
    boxHeight = theme.shapes.mainTabHeight;
    borderStyle = 'none';
    backgroundColor = null;
    activeColor = theme.palette.mainTabButtonActiveBackground;
    backgroundHoverColor = theme.palette.mainTabButtonActiveBackground;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (
    kind === 'view-tab' ||
    kind === 'view-tab-first' ||
    kind === 'view-tab-last' ||
    kind === 'view-tab-single'
  ) {
    boxMaxWidth = '250px';
    boxHeight = theme.shapes.viewTabHeight;
    if (text) {
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

    if (theme.look.name === 'retro') {
      if (kind === 'view-tab-first') {
        boxMarginLeft = '5px';
        borderRadius = '15px 0px 0px 0px';
      }
      if (kind === 'view-tab-last') {
        borderRadius = '0px 15px 0px 0px';
      }
      if (kind === 'view-tab-single') {
        boxMarginLeft = '5px';
        borderRadius = '15px 15px 0px 0px';
      }
    }
  }

  if (kind === 'view-tab-right') {
    boxHeight = Unit.add(
      theme.shapes.containerMargin,
      theme.shapes.viewTabHeight
    );
    borderStyle = 'none';
    if (text) {
      backgroundColor = theme.palette.viewTabRightTextBackground;
    } else {
      backgroundColor = theme.palette.viewTabBackground;
    }
  }

  // task-tab button (usual parent is container with kind='task-bar').
  if (kind === 'task-tab') {
    boxHeight = theme.shapes.taskTabHeight;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    backgroundColor = theme.palette.taskTabInactiveBackground;
    activeColor = theme.palette.taskTabActiveBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (kind === 'pane-navigator') {
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
  if (kind === 'pane-hnavigator') {
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
  if (kind === 'pane-vnavigator') {
    boxWidth = theme.shapes.vnavigatorButtonSize;
    boxHeight = theme.shapes.vnavigatorButtonSize;
    boxMarginBottom = '1px';
    backgroundColor = theme.palette.vnavigatorButtonInactiveBackground;
    borderStyle = 'none';
    activeColor = theme.palette.vnavigatorButtonActiveBackground;
  }

  // Footer button (usual parent is container with kind='footer').
  if (kind === 'button-footer') {
    boxHeight = theme.shapes.footerHeight;
    boxMarginRight = '1px';
    boxPaddingRight = m;
    boxPaddingLeft = m;
    if (text) {
      backgroundColor = theme.palette.footerTextBackground;
    } else {
      backgroundColor = theme.palette.footerBackground;
    }
    borderStyle = 'none';
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (kind === 'button-notification') {
    boxHeight = '32px';
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = 'transparent';
    specialDisabled = true;
  }
  if (kind === 'notification-close') {
    boxMarginTop = Unit.multiply(theme.shapes.containerMargin, -1);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }
  if (kind === 'notification-extend') {
    boxMarginBottom = Unit.multiply(theme.shapes.containerMargin, -1);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }

  if (kind === 'check-button') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = 'transparent';
    focusedShadow = null;
    if (heightStrategy === 'compact') {
      boxHeight = '22px';
    }
    specialDisabled = true;
  }

  if (kind === 'plugin-light') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = theme.palette.pluginLightButtonBackgroundHover;
    focusedShadow = null;
  }
  if (kind === 'plugin-dark') {
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = theme.palette.pluginDarkButtonBackgroundHover;
    focusedShadow = null;
  }

  // Warning button (usual parent is container with kind='footer').
  if (kind === 'warning') {
    boxHeight = theme.shapes.footerHeight;
    boxPaddingLeft = theme.shapes.warningLeftPadding;
    borderStyle = 'none';
    backgroundColor = theme.palette.warningBackground;
  }

  // Action button (usual parent is container with kind='actions').
  if (kind === 'action') {
    let place = placeProp || 'middle';
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
  if (kind === 'secondary-action') {
    let place = placeProp || 'middle';
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
  if (kind === 'subaction') {
    borderStyle = 'none';
    backgroundColor = theme.palette.subactionButtonBackground;
  }

  if (kind === 'table-action-frame') {
    let place = placeProp || 'middle';
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
    if (grow === '0') {
      borderStyle = 'none';
    }
    transition = null;
  }
  if (kind === 'table-action') {
    boxHeight = theme.shapes.tableActionHeight;
    borderStyle = 'none solid solid solid';
    borderColor = theme.palette.tableBorder;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.tableActionBackground;
    borderStyle = 'none';
    transition = null;
  }

  if (kind === 'tree-expand') {
    boxWidth = theme.shapes.treeExpandButtonWidth;
    boxMaxWidth = theme.shapes.treeExpandButtonWidth;
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (kind === 'combo') {
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
    backgroundHoverColor = theme.palette.comboButtonBackgroundHover;
  }

  if (kind === 'round') {
    const r = theme.shapes.actionRadius;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
  }

  if (kind === 'identity') {
    const r = theme.shapes.actionRadius;
    boxWidth = theme.shapes.identityHeight;
    boxHeight = theme.shapes.identityHeight;
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
  }

  if (kind === 'thin-left') {
    const r = theme.shapes.thinRadius;
    boxHeight = null;
    borderStyle = 'none solid none none';
    borderRadius = r + ' 0px 0px ' + r;
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }
  if (kind === 'thin-right') {
    const r = theme.shapes.thinRadius;
    boxHeight = null;
    borderStyle = 'none none none solid';
    borderRadius = '0px ' + r + ' ' + r + ' 0px';
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }

  if (kind === 'menu-item') {
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginBottom = '1px';
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.menuItemInactiveBackground;
    if (focused) {
      activeColor = theme.palette.menuItemFocusBackground;
    } else {
      activeColor = theme.palette.menuItemActiveBackground;
    }
  }

  if (kind === 'combo-item') {
    boxHeight = theme.shapes.menuButtonHeight;
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.comboItemBackground;
    if (focused) {
      activeColor = theme.palette.comboItemFocused;
    } else {
      activeColor = theme.palette.comboItemActive;
    }
    backgroundHoverColor = theme.palette.comboItemHover;
  }
  if (kind === 'flat-list-combo-item') {
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.comboItemBackground;
    if (focused) {
      activeColor = theme.palette.comboItemFocused;
    } else {
      activeColor = theme.palette.comboItemActive;
    }
    borderRadius = Unit.multiply(theme.shapes.smoothRadius, 0.5);
    backgroundHoverColor = theme.palette.comboItemHover;
  }

  if (kind === 'combo-wrap-item') {
    boxMaxWidth = boxWidth ? boxWidth : null;
    boxHeight = theme.shapes.menuButtonHeight;
    boxMaxHeight = theme.shapes.menuButtonHeight;
    boxPaddingRight = theme.shapes.containerMargin;
    boxPaddingLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    borderStyle = 'none';
    backgroundColor = theme.palette.comboItemBackground;
    if (focused) {
      activeColor = theme.palette.comboItemFocused;
    } else {
      activeColor = theme.palette.comboItemActive;
    }
    backgroundHoverColor = theme.palette.comboItemHover;
  }

  if (kind === 'glyph-item') {
    boxWidth = theme.shapes.glyphsDialogButtonWidth;
    boxHeight = theme.shapes.menuButtonHeight;
    boxMarginRight = theme.shapes.glyphsDialogButtonMargin;
    boxMarginBottom = theme.shapes.glyphsDialogButtonMargin;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'desk-title') {
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

  if (kind === 'task-show-footer') {
    boxHeight = Unit.multiply(theme.shapes.lineHeight, 1.2);
    borderStyle = 'solid';
    borderColor = 'transparent';
    borderWidth = theme.shapes.ticketHoverThickness;
    borderRadius = Unit.multiply(theme.shapes.lineHeight, 0.25);
    boxSizing = 'border-box';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-end';
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
    kind === 'calendar' ||
    kind === 'calendar-navigator' ||
    kind === 'calendar-list' ||
    kind === 'calendar-title'
  ) {
    borderStyle = 'none';
    if (kind === 'calendar' || kind === 'calendar-navigator') {
      boxWidth = theme.shapes.calendarButtonWidth;
    }
    boxHeight = theme.shapes.calendarButtonHeight;
    transition = null;
    backgroundColor = 'transparent';
    backgroundHoverColor = ColorManipulator.lighten(activeColor, 0.3);
    if (subkind === 'add') {
      activeColor = theme.palette.calendarActiveAddBackground;
    } else if (subkind === 'sub') {
      activeColor = theme.palette.calendarActiveSubBackground;
    } else {
      activeColor = theme.palette.calendarActiveBackground;
      backgroundHoverColor = theme.palette.calendarHoverBackground;
    }
    if (kind === 'calendar-title') {
      boxPaddingLeft = '5px';
      boxPaddingRight = '5px';
    }
    specialDisabled = true;
  }

  if (kind === 'container') {
    boxHeight = null;
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    backgroundColor = null;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'container-start') {
    boxHeight = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    boxPaddingBottom = Unit.multiply(theme.shapes.lineSpacing, 0.5);
    backgroundColor = null;
  }

  if (kind === 'box') {
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxMarginRight = m;
    boxMarginBottom = m;
    backgroundColor = theme.palette.boxBackground;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'chronos-navigator') {
    boxMarginBottom = '1px';
    borderRadius = theme.shapes.smoothRadius;
    backgroundHoverColor = ColorManipulator.fade(
      theme.palette.buttonBackground,
      0.3
    );
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'recurrence') {
    boxMinWidth = theme.shapes.lineHeight;
    boxMaxHeight = theme.shapes.lineHeight;
    activeColor = theme.palette.calendarActiveBackground;
    borderActiveColor = theme.palette.calendarActiveText;
  }

  if (kind === 'hover') {
    boxOpacity = active ? 1 : 0.00001;
    borderWidth = '4px';
    borderColor = theme.palette.taskBackground;
    backgroundHoverColor = theme.palette.buttonBackground;
    borderActiveColor = theme.palette.taskBackground;
  }

  if (kind === 'dynamic-toolbar-left') {
    borderStyle = 'none';
    backgroundColor = 'transparent';
    activeColor = theme.palette.dynamicToolbarBackground;
  }
  if (kind === 'dynamic-toolbar-top-left') {
    borderStyle = 'none solid solid none';
    backgroundColor = theme.palette.paneBackground;
  }
  if (kind === 'dynamic-toolbar-top-right') {
    borderStyle = 'none none solid solid';
    backgroundColor = theme.palette.paneBackground;
  }
  if (kind === 'dynamic-toolbar') {
    boxMinWidth = theme.shapes.toolbarButtonWidth;
    boxHeight = theme.shapes.toolbarButtonHeight;
    borderStyle = 'none';
    backgroundColor = ColorManipulator.emphasize(
      theme.palette.toolbarInactiveBackground,
      0.1
    );
    activeColor = theme.palette.toolbarActiveBackground;
  }
  if (kind === 'toolbar') {
    boxMinWidth = theme.shapes.toolbarButtonWidth;
    boxHeight = theme.shapes.toolbarButtonHeight;
    borderStyle = 'none';
    backgroundColor = theme.palette.toolbarInactiveBackground;
    activeColor = theme.palette.toolbarActiveBackground;
  }

  if (kind === 'flat-combo') {
    backgroundColor = disabled
      ? theme.palette.flatComboDisableInactiveBackground
      : theme.palette.flatComboInactiveBackground;
    activeColor = disabled
      ? theme.palette.flatComboDisableActiveBackground
      : theme.palette.flatComboActiveBackground;
    specialDisabled = true;
  }

  if (kind === 'pane-warning') {
    boxWidth = '40px';
    boxHeight = '40px';
    backgroundColor = 'transparent';
    borderStyle = 'none';
  }

  if (!kind) {
    borderRadius = theme.shapes.smoothRadius;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (theme.look.name === 'retro' && (!kind || kind === 'combo')) {
    backgroundColor = '#ccc';
    borderColor =
      kind === 'combo' ? '#aaa #888 #666 #999' : '#eee #666 #444 #ddd';
    borderWidth = '1px';
    borderStyle = 'solid';
    boxShadow = 'rgba(0, 0, 0, 0.4) 2px 3px 10px 0px';

    if (disabled) {
      backgroundColor = theme.palette.buttonDisableBackground;
      specialDisabled = true;
    }
  }

  if (badgePush) {
    boxPaddingRight = Unit.add(boxPaddingRight, theme.shapes.badgeHeight);
  }
  if (
    shortcut &&
    kind !== 'menu-item' &&
    kind !== 'combo-item' &&
    kind !== 'flat-list-combo-item' &&
    kind !== 'task-bar' &&
    kind !== 'task-logo'
  ) {
    boxPaddingRight = Unit.add(boxPaddingRight, m);
  }

  if (shape) {
    const r = Unit.multiply(theme.shapes.lineHeight, 0.5);
    const s = theme.shapes.smoothRadius;
    if (shape === 'rounded') {
      borderRadius = r;
    } else if (shape === 'left-rounded') {
      borderRadius = r + ' 0px 0px ' + r;
    } else if (shape === 'right-rounded') {
      borderRadius = '0px ' + r + ' ' + r + ' 0px';
    } else if (shape === 'smooth') {
      borderRadius = s;
    } else if (shape === 'left-smooth') {
      borderRadius = s + ' 0px 0px ' + s;
    } else if (shape === 'right-smooth') {
      borderRadius = '0px ' + s + ' ' + s + ' 0px';
    }
  }

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

  if (vpos === 'top') {
    boxAlignSelf = 'flex-start';
  } else if (vpos === 'first-line') {
    boxAlignSelf = 'flex-start';
    boxMarginTop = '3px';
  }

  if (!boxJustifyContent) {
    boxJustifyContent = 'center';
  }
  if (boxJustifyContent === 'none') {
    boxJustifyContent = null;
  }

  const isGradient = isColorGradient(backgroundColor);

  const boxStyle = {
    opacity: boxOpacity,
    overflow: 'hidden',
    width: boxWidth,
    minWidth: boxMinWidth,
    maxWidth: boxMaxWidth,
    height: boxHeight,
    minHeight: boxHeight,
    maxHeight: boxMaxHeight,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
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
    boxShadow: boxShadow,
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
  };

  if (!disabled && !busy && boxOpacity !== 0) {
    const isGradient = isColorGradient(backgroundHoverColor);
    boxStyle[':hover'] = {
      borderColor: borderHoverColor,
      borderStyle: borderHoverStyle,
      borderWidth: borderHoverWidth,
      backgroundColor: isGradient ? null : backgroundHoverColor,
      background: isGradient ? backgroundHoverColor : null,
      opacity: 1.0,
    };
    boxStyle[':active'] = {
      backgroundColor: ColorManipulator.darken(backgroundColor, 0.1),
    };
  }

  if (focusable) {
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
