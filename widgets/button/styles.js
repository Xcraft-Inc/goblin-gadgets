import {Unit} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';
import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
const to = Unit.to;

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
  'triangleSize',
  'triangleColor',
  'cssUnit',
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
    triangleSize,
    triangleColor,
    cssUnit = 'px',
  } = props;

  const m = Unit.multiply(to(theme.shapes.containerMargin, cssUnit), 0.5);

  // Initialize all variables for a standard button.
  let boxWidth = width;
  let boxMinWidth = null;
  let boxHeight = height ? height : to(theme.shapes.lineHeight, cssUnit);
  let boxMaxWidth = null;
  let boxMaxHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(justify);
  let boxAlignItems = 'center';
  let boxAlignSelf = null;
  let boxMarginTop = to(0, cssUnit);
  let boxMarginRight = to(0, cssUnit);
  let boxMarginBottom = to(0, cssUnit);
  let boxMarginLeft = to(0, cssUnit);
  let boxPaddingTop = to(theme.shapes.boxPaddingTop, cssUnit);
  let boxPaddingRight = to(theme.shapes.boxPaddingRight, cssUnit);
  let boxPaddingBottom = to(theme.shapes.boxPaddingBottom, cssUnit);
  let boxPaddingLeft = to(theme.shapes.boxPaddingLeft, cssUnit);
  let boxZIndex = zIndex;
  let boxOpacity = visibility === false ? 0 : null;
  let borderWidth = to(theme.shapes.buttonBorderWidth, cssUnit);
  let borderColor = theme.palette.buttonBorderColor;
  let borderColorForced = null;
  let borderActiveColor = theme.palette.buttonBorderColor;
  let borderStyle = 'solid';
  let borderRadius = to(0, cssUnit);
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
  let transition =
    (cssUnit === 'px' || cssUnit.unit === 'px') && theme.transitions.easeOut();
  let specialDisabled = false;
  let focusedShadow = theme.shapes.focusedShadow + theme.palette.focused; // FIXME: use 'to' with cssUnit

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
    boxMarginLeft = to(-1, cssUnit);
  }

  if (kind === 'disabled-light') {
    specialDisabled = true;
  }

  // task-logo button (usual parent container with kind='task-bar').
  if (kind === 'task-logo') {
    boxWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    boxMaxWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    boxHeight = to(theme.shapes.taskButtonHeight, cssUnit);
    boxFlexDirection = 'column';
    borderStyle = 'none';
    backgroundColor = theme.palette.taskLogoBackground;
    activeColor = theme.palette.taskTabActiveBackground;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (kind === 'task-bar') {
    boxWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    boxMaxWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    boxHeight = to(theme.shapes.taskButtonHeight, cssUnit);
    boxFlexDirection = 'column';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
    backgroundColor = theme.palette.taskButtonBackground;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (kind === 'main-tab') {
    boxWidth = to(200, cssUnit);
    boxHeight = to(theme.shapes.mainTabHeight, cssUnit);
    boxPaddingLeft = Unit.multiply(m, 1.0);
    boxPaddingRight = Unit.multiply(m, 1.0);
    boxPaddingTop = Unit.multiply(m, 0.5);
    boxPaddingBottom = Unit.multiply(m, 0.5);
    boxMarginRight = to(1, cssUnit);
    borderStyle = 'none';
    backgroundColor = theme.palette.mainTabButtonInactiveBackground;
    activeColor = theme.palette.mainTabButtonActiveBackground;

    if (theme.look.name === 'retro') {
      borderRadius =
        `${to(25, cssUnit)} ${to(25, cssUnit)} ` +
        `${to(0, cssUnit)} ${to(0, cssUnit)}`;
      boxMarginTop = to(5, cssUnit);
      boxMarginRight = to(0, cssUnit);
      boxMarginBottom = to(0, cssUnit);
      boxMarginLeft = to(5, cssUnit);
      boxShadow =
        `${to(3, cssUnit)} ${to(5, cssUnit)} ` +
        `${to(21, cssUnit)} ${to(2, cssUnit)} rgba(0,0,0,0.7)`;
    }
  }

  if (kind === 'main-tab-right') {
    boxHeight = to(theme.shapes.mainTabHeight, cssUnit);
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
    boxMaxWidth = to(250, cssUnit);
    boxHeight = to(theme.shapes.viewTabHeight, cssUnit);
    if (text) {
      boxMarginTop = to(1, cssUnit);
      boxMarginRight = to(1, cssUnit);
    } else {
      // When a text button is followed by a glyph button, the glyph button must
      // be glued to the text button. Typically a close button: [Missions][x]
      boxMarginTop = to(1, cssUnit);
      boxMarginRight = to(1, cssUnit);
      boxMarginLeft = to(-1, cssUnit);
    }
    borderStyle = 'none';
    backgroundColor = theme.palette.viewTabButtonInactiveBackground;
    activeColor = theme.palette.viewTabButtonActiveBackground;

    if (theme.look.name === 'retro') {
      if (kind === 'view-tab-first') {
        boxMarginLeft = to(5, cssUnit);
        borderRadius =
          `${to(15, cssUnit)} ${to(0, cssUnit)} ` +
          `${to(0, cssUnit)} ${to(0, cssUnit)}`;
      }
      if (kind === 'view-tab-last') {
        borderRadius =
          `${to(0, cssUnit)} ${to(15, cssUnit)} ` +
          `${to(0, cssUnit)} ${to(0, cssUnit)}`;
      }
      if (kind === 'view-tab-single') {
        boxMarginLeft = to(5, cssUnit);
        borderRadius =
          `${to(15, cssUnit)} ${to(15, cssUnit)} ` +
          `${to(0, cssUnit)} ${to(0, cssUnit)}`;
      }
    }
  }

  if (kind === 'view-tab-right') {
    boxHeight = Unit.add(
      to(theme.shapes.containerMargin, cssUnit),
      to(theme.shapes.viewTabHeight, cssUnit)
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
    boxHeight = to(theme.shapes.taskTabHeight, cssUnit);
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    backgroundColor = theme.palette.taskTabInactiveBackground;
    activeColor = theme.palette.taskTabActiveBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.taskButtonBorder;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (kind === 'pane-navigator') {
    boxHeight = to(theme.shapes.paneNavigatorHeight, cssUnit);
    boxMarginBottom = to(-1, cssUnit);
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    borderActiveColor = theme.palette.paneNavigatorActiveBorder;
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (kind === 'pane-hnavigator') {
    boxHeight = to(theme.shapes.paneNavigatorHeight, cssUnit);
    boxMarginBottom = to(-1, cssUnit);
    backgroundColor = theme.palette.paneNavigatorBackground;
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    borderActiveColor = theme.palette.paneNavigatorActiveBorder;
    borderHoverColor = theme.palette.paneNavigatorBorderHover;
    backgroundHoverColor = '#ffffff00'; // transparent
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (kind === 'pane-vnavigator') {
    boxWidth = to(theme.shapes.vnavigatorButtonSize, cssUnit);
    boxHeight = to(theme.shapes.vnavigatorButtonSize, cssUnit);
    boxMarginBottom = to(1, cssUnit);
    backgroundColor = theme.palette.vnavigatorButtonInactiveBackground;
    borderStyle = 'none';
    activeColor = theme.palette.vnavigatorButtonActiveBackground;
  }

  // Footer button (usual parent is container with kind='footer').
  if (kind === 'button-footer') {
    boxHeight = to(theme.shapes.footerHeight, cssUnit);
    boxMarginRight = to(1, cssUnit);
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
    boxHeight = to(32, cssUnit);
    backgroundColor = 'transparent';
    borderStyle = 'none';
    backgroundHoverColor = 'transparent';
    specialDisabled = true;
  }
  if (kind === 'notification-close') {
    boxMarginTop = Unit.multiply(to(theme.shapes.containerMargin, cssUnit), -1);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }
  if (kind === 'notification-extend') {
    boxMarginBottom = Unit.multiply(
      to(theme.shapes.containerMargin, cssUnit),
      -1
    );
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
      boxHeight = to(22, cssUnit);
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
    boxHeight = to(theme.shapes.footerHeight, cssUnit);
    boxPaddingLeft = to(theme.shapes.warningLeftPadding, cssUnit);
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
    const r = to(theme.shapes.actionRadius, cssUnit);
    boxHeight = to(theme.shapes.actionHeight, cssUnit);
    boxPaddingLeft = Unit.multiply(to(theme.shapes.actionHeight, cssUnit), 0.1);
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.actionButtonBackground;
    if (place === 'left') {
      boxMarginRight = to(1, cssUnit);
      borderRadius = r + ` ${to(0, cssUnit)} ${to(0, cssUnit)} ` + r;
    } else if (place === 'right') {
      borderRadius = `${to(0, cssUnit)} ` + r + ' ' + r + ` ${to(0, cssUnit)}`;
    } else if (place === 'single') {
      borderRadius = r;
    } else {
      boxMarginRight = to(1, cssUnit);
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
    const r = to(theme.shapes.secondaryActionRadius, cssUnit);
    boxHeight = to(theme.shapes.secondaryActionHeight, cssUnit);
    borderStyle = 'none';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.actionButtonBackground;
    boxPaddingRight = to(theme.shapes.secondaryActionPadding, cssUnit);
    if (place === 'left') {
      boxMarginRight = to(1, cssUnit);
      borderRadius = r + ` ${to(0, cssUnit)} ${to(0, cssUnit)} ` + r;
    } else if (place === 'right') {
      borderRadius = `${to(0, cssUnit)} ` + r + ' ' + r + ` ${to(0, cssUnit)}`;
    } else if (place === 'single') {
      borderRadius = r;
    } else {
      boxMarginRight = to(1, cssUnit);
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
    const r = to(theme.shapes.tableActionRadius, cssUnit);
    boxHeight = to(theme.shapes.tableActionHeight, cssUnit);
    borderStyle = 'none solid solid solid';
    borderColor = theme.palette.tableBorder;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.tableActionBackground;
    if (place === 'left') {
      borderRadius =
        `${to(0, cssUnit)} ${to(0, cssUnit)} ${to(0, cssUnit)} ` + r;
    } else if (place === 'right') {
      borderRadius =
        `${to(0, cssUnit)} ${to(0, cssUnit)} ` + r + ` ${to(0, cssUnit)}`;
    } else if (place === 'single') {
      borderRadius = `${to(0, cssUnit)} ${to(0, cssUnit)} ` + r + ' ' + r;
    }
    if (grow === '0') {
      borderStyle = 'none';
    }
    transition = null;
  }
  if (kind === 'table-action') {
    boxHeight = to(theme.shapes.tableActionHeight, cssUnit);
    borderStyle = 'none solid solid solid';
    borderColor = theme.palette.tableBorder;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';
    backgroundColor = theme.palette.tableActionBackground;
    borderStyle = 'none';
    transition = null;
  }

  if (kind === 'tree-expand') {
    boxWidth = to(theme.shapes.treeExpandButtonWidth, cssUnit);
    boxMaxWidth = to(theme.shapes.treeExpandButtonWidth, cssUnit);
    borderStyle = 'none';
    backgroundColor = 'transparent';
    backgroundHoverColor = 'transparent';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (kind === 'combo') {
    const w = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 0.8);
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
    const r = to(theme.shapes.actionRadius, cssUnit);
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.roundButtonBackground;
  }

  if (kind === 'identity') {
    const r = to(theme.shapes.actionRadius, cssUnit);
    boxWidth = to(theme.shapes.identityHeight, cssUnit);
    boxHeight = to(theme.shapes.identityHeight, cssUnit);
    borderRadius = r;
    borderStyle = 'none';
    backgroundColor = theme.palette.identityButtonBackground;
  }

  if (kind === 'thin-left') {
    const r = to(theme.shapes.thinRadius, cssUnit);
    boxHeight = null;
    borderStyle = 'none solid none none';
    borderRadius = r + ` ${to(0, cssUnit)} ${to(0, cssUnit)} ` + r;
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }
  if (kind === 'thin-right') {
    const r = to(theme.shapes.thinRadius, cssUnit);
    boxHeight = null;
    borderStyle = 'none none none solid';
    borderRadius = `${to(0, cssUnit)} ` + r + ' ' + r + ` ${to(0, cssUnit)}`;
    borderColor = theme.palette.buttonBorder;
    backgroundColor = null;
  }

  if (kind === 'menu-item') {
    boxHeight = to(theme.shapes.menuButtonHeight, cssUnit);
    boxMarginBottom = to(1, cssUnit);
    boxPaddingRight = to(theme.shapes.containerMargin, cssUnit);
    boxPaddingLeft = to(theme.shapes.containerMargin, cssUnit);
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
    boxHeight = to(theme.shapes.menuButtonHeight, cssUnit);
    boxPaddingRight = to(theme.shapes.containerMargin, cssUnit);
    boxPaddingLeft = to(theme.shapes.containerMargin, cssUnit);
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
    borderRadius = Unit.multiply(to(theme.shapes.smoothRadius, cssUnit), 0.5);
    backgroundHoverColor = theme.palette.comboItemHover;
  }

  if (kind === 'combo-wrap-item') {
    boxMaxWidth = boxWidth ? boxWidth : null;
    boxHeight = to(theme.shapes.menuButtonHeight, cssUnit);
    boxMaxHeight = to(theme.shapes.menuButtonHeight, cssUnit);
    boxPaddingRight = to(theme.shapes.containerMargin, cssUnit);
    boxPaddingLeft = to(theme.shapes.containerMargin, cssUnit);
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
    boxWidth = to(theme.shapes.glyphsDialogButtonWidth, cssUnit);
    boxHeight = to(theme.shapes.menuButtonHeight, cssUnit);
    boxMarginRight = to(theme.shapes.glyphsDialogButtonMargin, cssUnit);
    boxMarginBottom = to(theme.shapes.glyphsDialogButtonMargin, cssUnit);
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'desk-title') {
    boxHeight = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 1.2);
    borderStyle = 'solid';
    borderColor = 'transparent';
    borderWidth = to(theme.shapes.ticketHoverThickness, cssUnit);
    borderRadius = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 0.25);
    boxSizing = 'border-box';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxMarginBottom = to(3, cssUnit);
    backgroundColor = null;
    backgroundHoverColor = theme.palette.ticketGlueHilitedBackground;
    borderHoverStyle = 'solid';
    borderHoverColor = theme.palette.ticketHover;
    borderHoverWidth = to(theme.shapes.ticketHoverThickness, cssUnit);
    activeColor = theme.palette.ticketHilitedBackground;
    borderActiveColor = theme.palette.ticketHilitedBackground;
  }

  if (kind === 'task-show-footer') {
    boxHeight = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 1.2);
    borderStyle = 'solid';
    borderColor = 'transparent';
    borderWidth = to(theme.shapes.ticketHoverThickness, cssUnit);
    borderRadius = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 0.25);
    boxSizing = 'border-box';
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-end';
    boxMarginBottom = to(3, cssUnit);
    backgroundColor = null;
    backgroundHoverColor = theme.palette.ticketGlueHilitedBackground;
    borderHoverStyle = 'solid';
    borderHoverColor = theme.palette.ticketHover;
    borderHoverWidth = to(theme.shapes.ticketHoverThickness, cssUnit);
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
      boxWidth = to(theme.shapes.calendarButtonWidth, cssUnit);
    }
    boxHeight = to(theme.shapes.calendarButtonHeight, cssUnit);
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
      boxPaddingLeft = to(5, cssUnit);
      boxPaddingRight = to(5, cssUnit);
    }
    specialDisabled = true;
  }

  if (kind === 'container') {
    boxHeight = null;
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(to(theme.shapes.lineSpacing, cssUnit), 0.5);
    boxPaddingBottom = Unit.multiply(
      to(theme.shapes.lineSpacing, cssUnit),
      0.5
    );
    backgroundColor = null;
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'container-start') {
    boxHeight = null;
    boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'flex-start';
    boxAlignItems = 'stretch';
    borderStyle = 'none';
    boxPaddingTop = Unit.multiply(to(theme.shapes.lineSpacing, cssUnit), 0.5);
    boxPaddingBottom = Unit.multiply(
      to(theme.shapes.lineSpacing, cssUnit),
      0.5
    );
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
    boxMarginBottom = to(1, cssUnit);
    borderRadius = to(theme.shapes.smoothRadius, cssUnit);
    backgroundHoverColor = ColorManipulator.fade(
      theme.palette.buttonBackground,
      0.3
    );
    activeColor = theme.palette.boxActiveBackground;
  }

  if (kind === 'recurrence') {
    boxMinWidth = to(theme.shapes.lineHeight, cssUnit);
    boxMaxHeight = to(theme.shapes.lineHeight, cssUnit);
    activeColor = theme.palette.calendarActiveBackground;
    borderActiveColor = theme.palette.calendarActiveText;
  }

  if (kind === 'hover') {
    boxOpacity = active ? 1 : 0.00001;
    borderWidth = to(4, cssUnit);
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
    boxMinWidth = to(theme.shapes.toolbarButtonWidth, cssUnit);
    boxHeight = to(theme.shapes.toolbarButtonHeight, cssUnit);
    borderStyle = 'none';
    backgroundColor = ColorManipulator.emphasize(
      theme.palette.toolbarInactiveBackground,
      0.1
    );
    activeColor = theme.palette.toolbarActiveBackground;
  }
  if (kind === 'toolbar') {
    boxMinWidth = to(theme.shapes.toolbarButtonWidth, cssUnit);
    boxHeight = to(theme.shapes.toolbarButtonHeight, cssUnit);
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
    boxWidth = to(40, cssUnit);
    boxHeight = to(40, cssUnit);
    backgroundColor = 'transparent';
    borderStyle = 'none';
  }

  if (!kind) {
    borderRadius = to(theme.shapes.smoothRadius, cssUnit);
    activeColor = theme.palette.boxActiveBackground;
  }

  if (theme.look.name === 'retro' && (!kind || kind === 'combo')) {
    backgroundColor = '#ccc';
    borderColor =
      kind === 'combo' ? '#aaa #888 #666 #999' : '#eee #666 #444 #ddd';
    borderWidth = to(1, cssUnit);
    borderStyle = 'solid';
    boxShadow =
      `rgba(0, 0, 0, 0.4) ` +
      `${to(2, cssUnit)} ${to(3, cssUnit)} ` +
      `${to(10, cssUnit)} ${to(0, cssUnit)}`;

    if (disabled) {
      backgroundColor = theme.palette.buttonDisableBackground;
      specialDisabled = true;
    }
  }

  if (badgePush) {
    boxPaddingRight = Unit.add(
      to(boxPaddingRight, cssUnit),
      to(theme.shapes.badgeHeight, cssUnit)
    );
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
    const r = Unit.multiply(to(theme.shapes.lineHeight, cssUnit), 0.5);
    const s = to(theme.shapes.smoothRadius, cssUnit);
    if (shape === 'rounded') {
      borderRadius = r;
    } else if (shape === 'left-rounded') {
      borderRadius = r + ` ${to(0, cssUnit)} ${to(0, cssUnit)} ` + r;
    } else if (shape === 'right-rounded') {
      borderRadius = `${to(0, cssUnit)} ` + r + ' ' + r + ` ${to(0, cssUnit)}`;
    } else if (shape === 'smooth') {
      borderRadius = s;
    } else if (shape === 'left-smooth') {
      borderRadius = s + ` ${to(0, cssUnit)} ${to(0, cssUnit)} ` + s;
    } else if (shape === 'right-smooth') {
      borderRadius = `${to(0, cssUnit)} ` + s + ' ' + s + ` ${to(0, cssUnit)}`;
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
    boxWidth !== to(0, cssUnit) &&
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
    boxMarginTop = to(3, cssUnit);
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
      backgroundColor: backgroundColor
        ? ColorManipulator.darken(backgroundColor, 0.1)
        : 'rgba(0, 0, 0, 0.1)',
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
  const d = to(triangleSize || theme.shapes.mainTabTriangleSize, cssUnit);
  const triangleStyle = {
    position: 'absolute',
    right: '50%',
    bottom: to(0, cssUnit),
    borderLeft: `${d} solid transparent`,
    borderRight: `${d} solid transparent`,
    borderBottom: `${d} solid ${
      triangleColor || theme.palette.viewTabBackground
    }`,
    margin: `${to(0, cssUnit)} -${d} ${to(0, cssUnit)} ${to(0, cssUnit)}`,
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
    left: to(8, cssUnit),
    width: `calc(100% - ${to(14, cssUnit)})`,
    height: `calc(100% - ${to(14, cssUnit)})`,
    backgroundColor: ColorManipulator.fade(theme.palette.focused, 0.2),
    boxShadow: theme.shapes.focusedShadow + theme.palette.focused, // FIXME
    borderRadius: m,
  };

  return {
    button: boxStyle,
    triangle: triangleStyle,
    busyBox: busyBoxStyle,
    busyGlyph: busyGlyphStyle,
    focusedForeground: focusedForegroundStyle,
  };
}

/******************************************************************************/
