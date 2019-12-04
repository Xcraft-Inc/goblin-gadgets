//T:2019-02-27

import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/helpers/bool-helpers';
import * as SpacingHelpers from 'gadgets/helpers/spacing-helpers';

function convertJustify(justify) {
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

export const propNames = [
  'width',
  'height',
  'grow',
  'justify',
  'zIndex',
  'visibility',
  'glyphSize',
  'weight',
  'wrap',
  'textTransform',
  'fontSize',
  'cursor',
  'horizontalSpacing',
  'disabled',
  'readonly',
  'insideButton',
  'isDragged',
  'hasHeLeft',
  'bottomSpacing',
  'glyph',
  'text',
  'glyphPosition',
  'shortcut',
  'kind',
  'active',
  'subkind',
  'calendarDimmed',
  'empty',
  'activeColor',
  'vpos',
  'shape',
  'glyphColor',
  'textColor',
  'backgroundColor',
  'buttonBackgroundColor',
  'fontWeight',
  'fontStyle',
];

export function mapProps(props) {
  return {
    ...props,
    text: Boolean(props.text),
    glyph: Boolean(props.glyph),
    shortcut: Boolean(props.shortcut),
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
    glyphSize,
    weight,
    wrap,
    textTransform,
    fontSize,
    cursor,
    horizontalSpacing,
    disabled,
    readonly,
    insideButton,
    isDragged,
    hasHeLeft,
    bottomSpacing,
    glyph,
    text,
    glyphPosition,
    shortcut,
    kind,
    active,
    subkind,
    calendarDimmed,
    empty,
    activeColor,
    vpos,
    shape,
    glyphColor,
    textColor,
    backgroundColor,
    buttonBackgroundColor,
    fontWeight,
    fontStyle,
  } = props;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  let boxWidth = width;
  let boxHeight = height;
  let boxMaxHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(justify);
  let boxAlignItems = 'center';
  let boxMarginTop = '0px';
  let boxMarginRight = '0px';
  let boxMarginBottom = '0px';
  let boxMarginLeft = '0px';
  let boxPaddingTop = '0px';
  let boxPaddingRight = '0px';
  let boxPaddingBottom = '0px';
  let boxPaddingLeft = '0px';
  let boxZIndex = zIndex;
  let boxOpacity = Bool.isFalse(visibility) ? 0 : null;
  let border = null;
  let borderTop = null;
  let borderBottom = null;
  let borderLeft = null;
  let borderRight = null;
  let boxSizing = null;
  let borderRadius = '0px';
  let backgroundColorFromKind = null;
  let textHoverColor = null;
  let glyphPaddingTop = '0px';
  let glyphPaddingRight = '0px';
  let glyphPaddingBottom = '0px';
  let glyphPaddingLeft = '0px';
  let glyphJustify = 'center';
  let glyphMinWidth = theme.shapes.lineHeight;
  let glyphHeight = theme.shapes.lineHeight;
  let glyphColorFromKind = null;
  let glyphTransform = null;
  let glyphMargin = null;
  let textWidth = null;
  let textMarginTop = '0px';
  let textMarginRight = m;
  let textMarginBottom = '0px';
  let textMarginLeft = m;
  let textPaddingTop = '0px';
  let textPaddingRight = '0px';
  let textPaddingBottom = '0px';
  let textPaddingLeft = '0px';
  let textWeight = weight;
  let textWrap = wrap;
  let textSize = fontSize ? fontSize : theme.shapes.labelTextSize;
  let boxAlignSelf = null;
  let textColorFromKind = null;
  let linesOverflow = null;
  let textOverflow = null;
  let textTextOverflow = null;
  let textWhiteSpace = null;
  let textWordBreak = null;
  let textAlign = null;
  let textDirection = null;
  cursor = cursor || 'default';
  let specialDisabled = false;
  let specialHover = false;

  disabled = Bool.isTrue(disabled) || Bool.isTrue(readonly);

  if (Bool.isTrue(insideButton)) {
    boxHeight = height ? height : theme.shapes.lineHeight;
    horizontalSpacing = null;
    textWrap = textWrap ? textWrap : 'no';
  } else {
    textWrap = textWrap ? textWrap : 'yes';
  }

  if (!isDragged && hasHeLeft) {
    boxOpacity = 0.1;
  }

  // Initialise bottom margin according to bottom-spacing.
  if (bottomSpacing === 'large') {
    boxMarginBottom = m;
  }
  // Initialise right margin according to horizontalSpacing.
  boxMarginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );
  if (horizontalSpacing === 'compact' || horizontalSpacing === 'zero') {
    glyphMinWidth = null;
  }

  // Decrease space between glyph and text.
  if (glyph && text) {
    if (glyphPosition === 'right') {
      textMarginRight = '0px';
    } else {
      textMarginLeft = '0px';
    }
  }

  if (!Bool.isTrue(insideButton) && !glyph) {
    // Label without glyph ?
    if (boxJustifyContent === 'flex-end') {
      textMarginRight = '0px'; // push to right frame border
    } else if (!boxJustifyContent || boxJustifyContent === 'flex-start') {
      textMarginLeft = '0px'; // push to left frame border
    }
  }

  if (Bool.isTrue(shortcut)) {
    textMarginRight = '0px'; // push shortcut to right frame border
  }

  // Choice glyph position into his square.
  if (Bool.isTrue(insideButton)) {
    glyphJustify = 'center';
  } else {
    if (glyphPosition === 'right') {
      glyphJustify = 'flex-end'; // push to right frame border
    } else if (glyphPosition === 'center') {
      glyphJustify = 'center';
    } else {
      glyphJustify = 'flex-start'; // push to left frame border
    }
  }

  if (kind === 'compact') {
    textMarginLeft = '0px';
    textMarginRight = '0px';
  }

  if (kind === 'table-cell-sorting-header') {
    glyphMinWidth = '15px';
    boxMarginRight = '0px';
    textMarginLeft = '0px';
    textMarginRight = '0px';
    glyphHeight = null;
  }

  if (kind === 'table-cell') {
    boxMarginRight = '0px';
    textMarginLeft = '0px';
    textMarginRight = '0px';
    glyphHeight = null;
  }

  if (kind === 'table-action-frame' || kind === 'table-action') {
    textSize = theme.shapes.tableActionTextSize;
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
  }

  if (kind === 'tree-expand') {
    textHoverColor = theme.palette.treeExpandButtonHover;
    specialDisabled = true;
    glyphColorFromKind = textColorFromKind;
    glyphSize = glyphSize || theme.shapes.treeExpandButtonGlyphSize;
  }

  if (kind === 'pane-header') {
    boxHeight = '50px';
    boxMaxHeight = '50px';
    textSize = theme.shapes.paneHeaderTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
    glyphColorFromKind = theme.palette.paneHeaderText;
    textColorFromKind = theme.palette.paneHeaderText;
  }

  if (kind === 'pane-warning') {
    textWeight = 'bold';
    textTransform = 'uppercase';
    glyphColorFromKind = theme.palette.paneHeaderText;
    textColorFromKind = theme.palette.paneHeaderText;
  }

  if (kind === 'title') {
    textSize = theme.shapes.labelTitleTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (kind === 'title-recurrence') {
    boxPaddingTop = '0px';
    boxPaddingRight = theme.shapes.lineSpacing;
    boxPaddingBottom = '0px';
    boxPaddingLeft = theme.shapes.lineSpacing;
  }

  if (kind === 'big-center') {
    textSize = theme.shapes.labelBigTextSize;
    textWeight = 'bold';
    textTransform = 'uppercase';
    boxJustifyContent = boxJustifyContent || 'center';
  }

  if (kind === 'floating-header') {
    glyphMinWidth = null;
    glyphHeight = theme.shapes.floatingHeaderGlyphHeight;
    glyphSize = theme.shapes.floatingHeaderGlyphSize;
    glyphColorFromKind = theme.palette.floatingBackground;
    textColorFromKind = theme.palette.floatingBackground;
  }

  if (kind === 'floating-footer') {
    glyphMinWidth = null;
    textSize = theme.shapes.floatingFooterTextSize;
    glyphColorFromKind = theme.palette.floatingSecondary;
    textColorFromKind = theme.palette.floatingSecondary;
  }

  if (kind === 'info') {
    backgroundColorFromKind = theme.palette.infoBackground;
    boxJustifyContent = boxJustifyContent || 'center';
    boxPaddingTop = '0px';
    boxPaddingRight = '10px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '10px';
  }

  if (kind === 'footer') {
    glyphColorFromKind = theme.palette.footerText;
    textColorFromKind = theme.palette.footerText;
    boxPaddingTop = '0px';
    boxPaddingRight = '20px';
    boxPaddingBottom = '0px';
    boxPaddingLeft = '20px';
  }

  if (kind === 'notification') {
    boxMarginLeft = m;
    glyphColorFromKind = theme.palette.notificationMessage;
    textColorFromKind = theme.palette.notificationMessage;
  }

  if (kind === 'flying-balloon') {
    glyphColorFromKind = theme.palette.flyingBalloonText;
    textColorFromKind = theme.palette.flyingBalloonText;
    textSize = theme.shapes.flyingBalloonTextSize;
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
  }

  if (kind === 'task') {
    boxPaddingTop = theme.shapes.taskLabelTopMargin;
    boxPaddingRight = '0px';
    boxPaddingBottom = theme.shapes.taskLabelBottomMargin;
    boxPaddingLeft = theme.shapes.taskTabLeftMargin;
    glyphColorFromKind = theme.palette.taskLabelText;
    textColorFromKind = theme.palette.taskLabelText;
    textWeight = 'bold';
    textSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  if (kind === 'center-to-box') {
    glyphMinWidth = null;
    boxJustifyContent = boxJustifyContent || 'center';
    boxMarginTop = m;
    boxMarginRight = '0px';
    boxMarginBottom = m;
    boxMarginLeft = '0px';
  }

  if (kind === 'large-left') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = '0px';
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }
  if (kind === 'large-right') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = '0px';
  }
  if (kind === 'large-single') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }

  if (kind === 'ticket-warning') {
    boxMarginTop = '5px';
  }

  if (kind === 'mission-top') {
    boxAlignSelf = 'flex-start';
    textMarginTop = '7px';
    textMarginLeft = '0px';
    textMarginRight = '0px';
  }

  if (kind === 'one-line-height') {
    boxHeight = theme.shapes.lineHeight;
  }

  if (kind === 'markdown') {
    boxPaddingTop = '6px';
    boxPaddingRight = '10px';
    boxPaddingBottom = '7px';
    boxPaddingLeft = '10px';
    // borderTop = '1px solid ' + theme.palette.buttonBorder;
    // borderBottom = '1px solid ' + theme.palette.buttonBorder;
    // borderLeft = '4px double ' + theme.palette.buttonBorder;
    // borderRight = '4px double ' + theme.palette.buttonBorder;
    border = '1px solid ' + theme.palette.buttonBorder;
    backgroundColorFromKind = theme.palette.textFieldReadonlyBackground;
    boxSizing = 'border-box';
    boxHeight = Unit.add('32px', '2px');
    boxAlignItems = 'flex-start';
    glyphPaddingTop = '2px';
    glyphHeight = null;
    glyphJustify = 'center';
  }

  if (kind === 'field-combo') {
    boxHeight = theme.shapes.lineHeight;
    textMarginLeft = m;
    textMarginRight = m;
    border = '1px solid ' + theme.palette.buttonBorder;
    backgroundColorFromKind = theme.palette.textFieldReadonlyBackground;
    glyphJustify = 'flex-end';
  }

  if (kind === 'label-field') {
    boxJustifyContent = boxJustifyContent || 'none';
    boxHeight = null;
    boxAlignItems = 'flex-start';
    if (disabled) {
      glyphColorFromKind = theme.palette.textFieldDisableText;
      textColorFromKind = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  if (kind === 'note-hidden') {
    textMarginLeft = theme.spacing.lineSpacing;
    glyphColorFromKind = theme.palette.textFieldDisableText;
    textColorFromKind = theme.palette.textFieldDisableText;
    specialDisabled = true;
  }

  if (kind === 'ticket-title') {
    boxPaddingTop = '7px';
    boxAlignItems = 'flex-start';
    glyphHeight = null;
    textWeight = 'bold';
  }

  if (kind === 'ticket-label') {
    boxPaddingTop = '7px';
    boxAlignItems = 'flex-start';
    glyphHeight = null;
  }

  if (kind === 'compact-glyph') {
    glyphMinWidth = null;
    boxMarginLeft = '5px';
  }

  if (kind === 'ticket-hud') {
    boxJustifyContent = 'center';
    glyphJustify = 'center';
    glyphSize = '120%';
    glyphColorFromKind = theme.palette.ticketHudContent;
    textWeight = 'bold';
  }

  if (kind === 'text-field-combo-glyph') {
    glyphPaddingLeft = '10px';
    boxJustifyContent = 'center';
    glyphJustify = 'center';
  }

  /******************************************************************************/
  // Styles for Labels inside LabelTextFields.
  /******************************************************************************/

  if (kind === 'label-text-field') {
    boxJustifyContent = boxJustifyContent || 'none';
    boxHeight = null;
    textPaddingTop = '8px';
    boxAlignItems = 'flex-start';
    if (disabled) {
      glyphColorFromKind = theme.palette.textFieldDisableText;
      textColorFromKind = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  /******************************************************************************/
  // Styles for Labels inside Buttons.
  /******************************************************************************/

  // task-logo button (usual parent container with kind='task-bar').
  if (kind === 'task-logo') {
    boxFlexDirection = 'column';
    textWidth = theme.shapes.taskButtonWidth;
    textAlign = 'center';
    if (Bool.isTrue(active)) {
      textColorFromKind = theme.palette.taskTabActiveText;
    }
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.taskLogoTextSize;
    glyphSize = theme.shapes.taskLogoGlyphSize;
  }

  // Task button (usual parent is container with kind='task-bar').
  if (kind === 'task-bar') {
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
  if (kind === 'main-tab') {
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.mainTabTextSize;
    textColorFromKind = theme.palette.mainTabText;
  }

  if (kind === 'main-tab-right') {
    textColorFromKind = theme.palette.mainTabText;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (kind === 'view-tab') {
    textSize = theme.shapes.viewTabTextSize;
    glyphColorFromKind = theme.palette.viewTabGlyph;
  }

  if (kind === 'view-tab-right') {
    textWeight = 'bold';
    textColorFromKind = theme.palette.viewTabRightText;
    glyphColorFromKind = theme.palette.viewTabRightText;
  }

  // task-tab button (usual parent is container with kind='task-bar').
  if (kind === 'task-tab') {
    boxJustifyContent = boxJustifyContent || 'flex-start';
    if (Bool.isTrue(active)) {
      textColorFromKind = theme.palette.taskTabActiveText;
      textWeight = 'bold';
    } else {
      textColorFromKind = theme.palette.taskTabInactiveText;
    }
    const mm = glyph ? '0px' : theme.shapes.taskTabLeftMargin;
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = mm;
    textSize = theme.shapes.taskTabTextSize;
    glyphSize = theme.shapes.taskTabGlyphSize;
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (kind === 'pane-navigator') {
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = theme.shapes.paneNavigatorTextSize;
    if (Bool.isFalse(active)) {
      textColorFromKind = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (kind === 'pane-hnavigator') {
    textSize = theme.shapes.paneNavigatorTextSize;
    if (Bool.isFalse(active)) {
      textColorFromKind = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (kind === 'pane-vnavigator') {
    textSize = theme.shapes.paneNavigatorTextSize;
  }

  // Footer button (usual parent is container with kind='footer').
  if (kind === 'button-footer') {
    textSize = theme.shapes.footerTextSize;
    glyphSize = theme.shapes.footerGlyphSize;
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (kind === 'button-notification') {
    glyphHeight = null;
    textSize = theme.shapes.notificationButtonTextSize;
    glyphSize = theme.shapes.notificationButtonGlyphSize;
    glyphMargin = '10px 20px 10px 0px';
    glyphColorFromKind = theme.palette.notificationText;
    textColorFromKind = theme.palette.notificationText;
    textHoverColor = theme.palette.notificationTextHover;
    if (disabled) {
      glyphColorFromKind = ColorManipulator.darken(
        theme.palette.notificationText,
        0.4
      );
      textColorFromKind = ColorManipulator.darken(
        theme.palette.notificationText,
        0.4
      );
    }
    specialDisabled = true;
  }
  if (kind === 'notification-close' || kind === 'notification-extend') {
    glyphColorFromKind = theme.palette.notificationText;
    textColorFromKind = theme.palette.notificationText;
    textHoverColor = theme.palette.notificationTextHover;
  }

  if (kind === 'check-button') {
    textHoverColor = theme.palette.checkButtonTextHover;
    if (disabled) {
      glyphColorFromKind = theme.palette.textFieldDisableText;
      textColorFromKind = theme.palette.textFieldDisableText;
      specialDisabled = true;
    }
  }

  if (kind === 'plugin-light') {
    glyphColorFromKind = theme.palette.pluginLightButtonGlyph;
    textColorFromKind = theme.palette.pluginLightButtonGlyph;
    textHoverColor = theme.palette.pluginLightButtonGlyphHover;
    specialHover = true;
  }
  if (kind === 'plugin-dark') {
    glyphColorFromKind = theme.palette.pluginDarkButtonGlyph;
    textColorFromKind = theme.palette.pluginDarkButtonGlyph;
    textHoverColor = theme.palette.pluginDarkButtonGlyphHover;
    specialHover = true;
  }

  // Warning button (usual parent is container with kind='footer').
  if (kind === 'warning') {
    textWeight = 'bold';
    textSize = theme.shapes.warningTextSize;
    glyphSize = theme.shapes.warningGlyphSize;
    textColorFromKind = theme.palette.warningText;
  }

  // Action button (usual parent is container with kind='actions').
  if (kind === 'action') {
    textSize = theme.shapes.actionTextSize;
    glyphSize = theme.shapes.actionGlyphSize;
    boxJustifyContent = boxJustifyContent || 'none';
  }

  // Action button (usual parent is container with kind='actions-line-secondary').
  if (kind === 'secondary-action') {
    textSize = theme.shapes.secondaryActionTextSize;
    glyphSize = theme.shapes.secondaryActionGlyphSize;
    boxJustifyContent = boxJustifyContent || 'none';
  }

  // Subaction button (usual parent is container with kind='row-pane' and subkind='box').
  if (kind === 'subaction') {
    textColorFromKind = theme.palette.subactionButtonText;
    glyphColorFromKind = theme.palette.subactionButtonText;
    textSize = theme.shapes.subactionTextSize;
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (kind === 'combo') {
    if (disabled) {
      glyphColorFromKind = theme.palette.textFieldDisableText;
      textColorFromKind = theme.palette.textFieldDisableText;
      specialDisabled = true;
    } else if (Bool.isTrue(active)) {
      glyphColorFromKind = theme.palette.comboActiveGlyph;
    }
  }

  if (kind === 'round') {
    textColorFromKind = theme.palette.roundButtonText;
    glyphColorFromKind = theme.palette.roundButtonGlyph;
  }

  if (kind === 'identity') {
    glyphSize = theme.shapes.identityGlyphSize;
    textColorFromKind = theme.palette.identityButtonText;
    glyphColorFromKind = theme.palette.identityButtonGlyph;
  }

  if (kind === 'menu-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = theme.shapes.containerMargin;
    textMarginBottom = '0px';
    textMarginLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    if (Bool.isTrue(active)) {
      glyphColorFromKind = theme.palette.menuText;
      textColorFromKind = theme.palette.menuText;
    } else if (active === 'focused') {
      glyphColorFromKind = theme.palette.menuFocusText;
      textColorFromKind = theme.palette.menuFocusText;
    } else {
      glyphColorFromKind = theme.palette.menuText;
      textColorFromKind = theme.palette.menuText;
    }
  }

  if (kind === 'combo-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = theme.shapes.containerMargin;
    textMarginBottom = '0px';
    textMarginLeft = theme.shapes.containerMargin;
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform || 'uppercase';
  }
  if (kind === 'flat-list-combo-item') {
    textSize = theme.shapes.menuTextSize;
    textColor = theme.palette.comboItemText;
    glyphColor = theme.palette.comboItemText;
  }

  if (kind === 'combo-wrap-item') {
    textWidth = 'max-content';
    textMarginTop = '0px';
    textMarginRight = '0px';
    textMarginBottom = '0px';
    textMarginLeft = '0px';
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = theme.shapes.menuTextSize;
    textTransform = textTransform || 'uppercase';
    glyphJustify = 'flex-start';
  }

  if (kind === 'glyph-item') {
    textWidth = 'max-content';
    boxJustifyContent = boxJustifyContent || 'flex-start';
    glyphSize = '120%';
  }

  if (kind === 'desk-title') {
    boxJustifyContent = boxJustifyContent || 'flex-start';
    glyphColorFromKind = theme.palette.ticketGlueTitle;
    textColorFromKind = theme.palette.ticketGlueTitle;
    textWeight = 'bold';
    textSize = theme.shapes.ticketGlueTitleSize;
  }

  if (kind === 'task-show-footer') {
    boxJustifyContent = boxJustifyContent || 'flex-end';
    glyphColorFromKind = theme.palette.ticketGlueTitle;
    textColorFromKind = theme.palette.ticketGlueTitle;
    textWeight = 'bold';
    textSize = theme.shapes.ticketGlueTitleSize;
  }

  // Button with a day in Calendar component.
  if (
    kind === 'calendar' ||
    kind === 'calendar-navigator' ||
    kind === 'calendar-list' ||
    kind === 'calendar-title'
  ) {
    textMarginRight = '0px';
    textMarginLeft = '0px';
    textSize = theme.shapes.calendarTextSize;
    textColorFromKind = kind === 'calendar' ? theme.palette.calendarText : null;
    if (Bool.isTrue(active)) {
      if (subkind === 'add') {
        textColorFromKind = theme.palette.calendarActiveAddText;
        if (kind === 'calendar') {
          textWeight = 'bold';
        }
      } else if (subkind === 'sub') {
        textColorFromKind = theme.palette.calendarActiveSubText;
      } else {
        textColorFromKind = theme.palette.calendarActiveText;
        if (kind === 'calendar') {
          textWeight = 'bold';
        }
      }
    }
    if (Bool.isTrue(calendarDimmed)) {
      textColorFromKind = theme.palette.calendarDimmedText;
    }
    if (kind === 'calendar-navigator') {
      if (disabled) {
        textColorFromKind = theme.palette.calendarDimmedText;
      }
      specialDisabled = true;
    }
    if (kind === 'calendar-title') {
      textSize = '100%';
      textWeight = 'bold';
      textTransform = 'uppercase';
    }
    glyphColorFromKind = textColorFromKind;
  }

  if (kind === 'container') {
    boxAlignItems = 'stretch';
  }

  if (kind === 'container-start') {
    boxJustifyContent = boxJustifyContent || 'flex-start';
    boxAlignItems = 'stretch';
  }

  if (kind === 'box') {
    boxAlignItems = 'stretch';
  }

  if (kind === 'chronos-navigator') {
    if (Bool.isFalse(active)) {
      glyphColorFromKind = theme.palette.chronoNavigatorText;
      textColorFromKind = theme.palette.chronoNavigatorText;
    }
  }

  if (kind === 'recurrence') {
    if (Bool.isTrue(active)) {
      glyphColorFromKind = theme.palette.calendarActiveText;
      textColorFromKind = theme.palette.calendarActiveText;
    }
  }

  if (kind === 'dynamic-toolbar') {
    glyphColorFromKind = theme.palette.dynamicToolbarButtonGlyph;
    textColorFromKind = theme.palette.dynamicToolbarButtonGlyph;
    if (Bool.isTrue(active)) {
      glyphColorFromKind = theme.palette.dynamicToolbarButtonActiveGlyph;
      textColorFromKind = theme.palette.dynamicToolbarButtonActiveGlyph;
    }
  }

  if (kind === 'toolbar') {
    if (Bool.isTrue(active)) {
      glyphColorFromKind = theme.palette.toolbarActiveText;
      textColorFromKind = theme.palette.toolbarActiveText;
    } else {
      glyphColorFromKind = theme.palette.toolbarInactiveText;
      textColorFromKind = theme.palette.toolbarInactiveText;
    }
  }

  if (kind === 'flat-combo') {
    if (Bool.isTrue(active)) {
      textColorFromKind = disabled
        ? theme.palette.flatComboDisableActiveText
        : theme.palette.flatComboActiveText;
    } else {
      textColorFromKind = disabled
        ? theme.palette.flatComboDisableInactiveText
        : theme.palette.flatComboInactiveText;
    }
    glyphColorFromKind = textColorFromKind;
    specialDisabled = true;
  }

  if (Bool.isTrue(empty)) {
    border = '2px dotted #ccc';
    boxHeight = Unit.sub(theme.shapes.lineHeight, '2px');
    boxSizing = 'border-box';
    boxMarginTop = '2px';
  }

  if (!kind) {
    borderRadius = theme.shapes.smoothRadius;
    if (Bool.isTrue(active)) {
      backgroundColorFromKind = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (vpos === 'top') {
    boxAlignSelf = 'flex-start';
  } else if (vpos === 'first-line') {
    boxAlignSelf = 'flex-start';
    boxMarginTop = '3px';
  }

  if (textWrap === 'no') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
  } else if (textWrap === 'no-end') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
    textAlign = 'left';
    textDirection = 'rtl';
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
    // Intentionally empty.
  } else if (textWrap === 'yes') {
    textWordBreak = 'break-word';
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

  // Force colors according to properties glyphColor, textColor and backgroundColor.
  if (glyphColor) {
    glyphColor = ColorHelpers.getMarkColor(theme, glyphColor);
  } else {
    glyphColor = glyphColorFromKind;
  }
  if (textColor) {
    textColor = ColorHelpers.getMarkColor(theme, textColor);
  } else {
    textColor = textColorFromKind;
  }
  if (backgroundColor) {
    backgroundColor = ColorHelpers.getMarkColor(theme, backgroundColor);
  } else {
    backgroundColor = backgroundColorFromKind;
  }

  // Sets default colors if they are undefined
  if (!glyphColor) {
    glyphColor = ColorManipulator.emphasize(buttonBackgroundColor, 0.8);
  }
  if (!textColor) {
    textColor = ColorManipulator.emphasize(buttonBackgroundColor, 0.9);
  }

  // Alter colors if component is disable.
  if (disabled && !specialDisabled) {
    if (backgroundColor) {
      backgroundColor = theme.palette.buttonDisableBackground;
    }
    if (glyphColor !== 'transparent') {
      glyphColor = theme.palette.buttonDisableGlyph;
    }
    textColor = theme.palette.buttonDisableText;
  }

  // If the Label is in a Button, it never has a backgroundColor.
  // Indeed, the background color is drawn by the Button.
  if (Bool.isTrue(insideButton)) {
    backgroundColor = null;
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (fontWeight) {
    textWeight = fontWeight;
  }

  if (!boxJustifyContent) {
    if (Bool.isTrue(insideButton)) {
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
    const s = Unit.parse(glyphSize);
    if (s.unit !== '%') {
      throw new Error(`GlyphSize '${glyphSize}' has an unexpected format`);
    }
    const ss = s.value / 100;
    if (!glyphTransform) {
      glyphTransform = 'scale(' + ss + ')';
    }
    if (!glyphMargin) {
      const mm = Unit.multiply(m, ss);
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
    paddingTop: glyphPaddingTop,
    paddingRight: glyphPaddingRight,
    paddingBottom: glyphPaddingBottom,
    paddingLeft: glyphPaddingLeft,
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
    display: 'block', // required because <T/> use a 'span' (previously, all the styling was planned for a 'div')
    width: textWidth,
    marginTop: textMarginTop,
    marginRight: textMarginRight,
    marginBottom: textMarginBottom,
    marginLeft: textMarginLeft,
    paddingTop: textPaddingTop,
    paddingRight: textPaddingRight,
    paddingBottom: textPaddingBottom,
    paddingLeft: textPaddingLeft,
    fontSize: Unit.multiply(textSize, theme.typo.fontScale),
    fontWeight: textWeight,
    fontStyle: fontStyle,
    color: textColor,
    textTransform: textTransform,
    overflow: textOverflow,
    textOverflow: textTextOverflow,
    whiteSpace: textWhiteSpace,
    wordWrap: 'break-word',
    wordBreak: textWordBreak,
    textAlign: textAlign,
    direction: textDirection,
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

  if (!disabled && Bool.isTrue(insideButton) && boxOpacity !== 0) {
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
      color: ColorManipulator.darken(textColor, 0.1),
    };
    textStyle[':active'] = {
      color: ColorManipulator.darken(textColor, 0.1),
    };
    glyphStyle[':active'] = {
      color: ColorManipulator.darken(glyphColor, 0.1),
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
