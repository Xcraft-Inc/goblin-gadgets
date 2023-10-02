//T:2019-02-27

import {Unit} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';
import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
const to = Unit.to;

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
  'focused',
  'subkind',
  'dimmed',
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
  'fontFamily',
  'userSelect',
  'cssUnit',
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
    focused,
    subkind,
    dimmed,
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
    fontFamily,
    userSelect,
    cssUnit = 'px',
  } = props;

  const m = Unit.multiply(to(theme.shapes.containerMargin, cssUnit), 0.5);

  let boxWidth = width;
  let boxHeight = height;
  let boxMaxHeight = null;
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(justify);
  let boxAlignItems = 'center';
  let boxMarginTop = to(0, cssUnit);
  let boxMarginRight = to(0, cssUnit);
  let boxMarginBottom = to(0, cssUnit);
  let boxMarginLeft = to(0, cssUnit);
  let boxPaddingTop = to(0, cssUnit);
  let boxPaddingRight = to(0, cssUnit);
  let boxPaddingBottom = to(0, cssUnit);
  let boxPaddingLeft = to(0, cssUnit);
  let boxShadow = null;
  let boxZIndex = zIndex;
  let boxOpacity = visibility === false ? 0 : null;
  let border = null;
  let borderTop = null;
  let borderBottom = null;
  let borderLeft = null;
  let borderRight = null;
  let boxSizing = null;
  let borderRadius = to(0, cssUnit);
  let backgroundColorFromKind = null;
  let textHoverColor = null;
  let glyphPaddingTop = to(0, cssUnit);
  let glyphPaddingRight = to(0, cssUnit);
  let glyphPaddingBottom = to(0, cssUnit);
  let glyphPaddingLeft = to(0, cssUnit);
  let glyphJustify = 'center';
  let glyphMinWidth = to(theme.shapes.lineHeight, cssUnit);
  let glyphHeight = to(theme.shapes.lineHeight, cssUnit);
  let glyphColorFromKind = null;
  let glyphTransform = null;
  let glyphMargin = null;
  let textWidth = null;
  let textMarginTop = to(0, cssUnit);
  let textMarginRight = m;
  let textMarginBottom = to(0, cssUnit);
  let textMarginLeft = m;
  let textPaddingTop = to(0, cssUnit);
  let textPaddingRight = to(0, cssUnit);
  let textPaddingBottom = to(0, cssUnit);
  let textPaddingLeft = to(0, cssUnit);
  let textWeight = weight;
  let textWrap = wrap;
  let textSize = fontSize ? fontSize : to(theme.shapes.labelTextSize, cssUnit);
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

  disabled = disabled || readonly;

  if (insideButton) {
    boxHeight = height ? height : to(theme.shapes.lineHeight, cssUnit);
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
      textMarginRight = to(0, cssUnit);
    } else {
      textMarginLeft = to(0, cssUnit);
    }
  }

  if (!insideButton && !glyph) {
    // Label without glyph ?
    if (boxJustifyContent === 'flex-end') {
      textMarginRight = to(0, cssUnit); // push to right frame border
    } else if (!boxJustifyContent || boxJustifyContent === 'flex-start') {
      textMarginLeft = to(0, cssUnit); // push to left frame border
    }
  }

  if (shortcut) {
    textMarginRight = to(0, cssUnit); // push shortcut to right frame border
  }

  // Choice glyph position into his square.
  if (insideButton) {
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
    textMarginLeft = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
  }

  if (kind === 'table-cell-sorting-header') {
    glyphMinWidth = to(15, cssUnit);
    boxMarginRight = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    glyphHeight = null;
  }

  if (kind === 'table-cell') {
    boxMarginRight = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    glyphHeight = null;
  }

  if (kind === 'table-action-frame' || kind === 'table-action') {
    textSize = to(theme.shapes.tableActionTextSize, cssUnit);
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
  }

  if (kind === 'tree-expand') {
    textHoverColor = theme.palette.treeExpandButtonHover;
    specialDisabled = true;
    glyphColorFromKind = textColorFromKind;
    glyphSize =
      glyphSize || to(theme.shapes.treeExpandButtonGlyphSize, cssUnit);
  }

  if (kind === 'pane-header') {
    boxHeight = to(50, cssUnit);
    boxMaxHeight = to(50, cssUnit);
    textSize = to(theme.shapes.paneHeaderTextSize, cssUnit);
    textWeight = 'bold';
    textTransform = 'uppercase';
    glyphColorFromKind = theme.palette.paneHeaderText;
    textColorFromKind = theme.palette.paneHeaderText;
  }

  if (kind === 'pane-warning') {
    textWeight = 'bold';
    textTransform = 'uppercase';
    glyphColorFromKind = theme.palette.statusText;
    textColorFromKind = theme.palette.statusText;
  }

  if (kind === 'title') {
    textSize = to(theme.shapes.labelTitleTextSize, cssUnit);
    textWeight = 'bold';
    textTransform = 'uppercase';
  }

  if (kind === 'title-recurrence') {
    boxPaddingTop = to(0, cssUnit);
    boxPaddingRight = to(theme.shapes.lineSpacing, cssUnit);
    boxPaddingBottom = to(0, cssUnit);
    boxPaddingLeft = to(theme.shapes.lineSpacing, cssUnit);
  }

  if (kind === 'big-center') {
    textSize = to(theme.shapes.labelBigTextSize, cssUnit);
    textWeight = 'bold';
    textTransform = 'uppercase';
    boxJustifyContent = boxJustifyContent || 'center';
  }

  if (kind === 'floating-header') {
    glyphMinWidth = null;
    glyphHeight = to(theme.shapes.floatingHeaderGlyphHeight, cssUnit);
    glyphSize = to(theme.shapes.floatingHeaderGlyphSize, cssUnit);
    glyphColorFromKind = theme.palette.floatingBackground;
    textColorFromKind = theme.palette.floatingBackground;
  }

  if (kind === 'floating-footer') {
    glyphMinWidth = null;
    textSize = to(theme.shapes.floatingFooterTextSize, cssUnit);
    glyphColorFromKind = theme.palette.floatingSecondary;
    textColorFromKind = theme.palette.floatingSecondary;
  }

  if (kind === 'info') {
    backgroundColorFromKind = theme.palette.infoBackground;
    boxJustifyContent = boxJustifyContent || 'center';
    boxPaddingTop = to(0, cssUnit);
    boxPaddingRight = to(10, cssUnit);
    boxPaddingBottom = to(0, cssUnit);
    boxPaddingLeft = to(10, cssUnit);
  }

  if (kind === 'footer') {
    glyphColorFromKind = theme.palette.footerText;
    textColorFromKind = theme.palette.footerText;
    boxPaddingTop = to(0, cssUnit);
    boxPaddingRight = to(20, cssUnit);
    boxPaddingBottom = to(0, cssUnit);
    boxPaddingLeft = to(20, cssUnit);
  }

  if (kind === 'notification') {
    boxMarginLeft = m;
    glyphColorFromKind = theme.palette.notificationMessage;
    textColorFromKind = theme.palette.notificationMessage;
  }

  if (kind === 'flying-balloon') {
    glyphColorFromKind = theme.palette.flyingBalloonText;
    textColorFromKind = theme.palette.flyingBalloonText;
    textSize = to(theme.shapes.flyingBalloonTextSize, cssUnit);
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
  }

  if (kind === 'task') {
    boxPaddingTop = to(theme.shapes.taskLabelTopMargin, cssUnit);
    boxPaddingRight = to(0, cssUnit);
    boxPaddingBottom = to(theme.shapes.taskLabelBottomMargin, cssUnit);
    boxPaddingLeft = to(theme.shapes.taskTabLeftMargin, cssUnit);
    glyphColorFromKind = theme.palette.taskLabelText;
    textColorFromKind = theme.palette.taskLabelText;
    textWeight = 'bold';
    textSize = to(theme.shapes.taskTabTextSize, cssUnit);
    glyphSize = to(theme.shapes.taskTabGlyphSize, cssUnit);
  }

  if (kind === 'center-to-box') {
    glyphMinWidth = null;
    boxJustifyContent = boxJustifyContent || 'center';
    boxMarginTop = m;
    boxMarginRight = to(0, cssUnit);
    boxMarginBottom = m;
    boxMarginLeft = to(0, cssUnit);
  }

  if (kind === 'large-left') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = to(0, cssUnit);
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }
  if (kind === 'large-right') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = to(0, cssUnit);
  }
  if (kind === 'large-single') {
    const hm = Unit.multiply(m, 0.5);
    boxMarginTop = hm;
    boxMarginRight = m;
    boxMarginBottom = hm;
    boxMarginLeft = m;
  }

  if (kind === 'ticket-warning') {
    boxMarginTop = to(5, cssUnit);
  }

  if (kind === 'mission-top') {
    boxAlignSelf = 'flex-start';
    textMarginTop = to(7, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
  }

  if (kind === 'one-line-height') {
    boxHeight = to(theme.shapes.lineHeight, cssUnit);
  }

  if (kind === 'combo-text-markdown') {
    const s = to(theme.shapes.smoothRadius, cssUnit);
    boxPaddingTop = to(6, cssUnit);
    boxPaddingRight = to(10, cssUnit);
    boxPaddingBottom = to(7, cssUnit);
    boxPaddingLeft = to(10, cssUnit);
    border = `${to(1, cssUnit)} solid ${theme.palette.buttonBorder}`;
    borderRadius = `${s} ${to(0, cssUnit)} ${to(0, cssUnit)} ${s}`;
    backgroundColorFromKind = theme.palette.textFieldReadonlyBackground;
    boxSizing = 'border-box';
    boxHeight = Unit.add(to(32, cssUnit), to(2, cssUnit));
    boxAlignItems = 'flex-start';
    glyphPaddingTop = to(2, cssUnit);
    glyphHeight = null;
    glyphJustify = 'center';
    if (theme.look.name === 'retro') {
      boxShadow =
        `${to(2, cssUnit)} ${to(3, cssUnit)} ` +
        `${to(10, cssUnit)} ${to(0, cssUnit)} ` +
        `rgba(0, 0, 0, 0.4)`;
    }
  }

  if (kind === 'field-combo') {
    boxHeight = to(theme.shapes.lineHeight, cssUnit);
    textMarginLeft = m;
    textMarginRight = m;
    border = `${to(1, cssUnit)} solid ` + theme.palette.buttonBorder;
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
    boxPaddingTop = to(7, cssUnit);
    boxAlignItems = 'flex-start';
    glyphHeight = null;
    textWeight = 'bold';
  }

  if (kind === 'ticket-label') {
    boxPaddingTop = to(7, cssUnit);
    boxAlignItems = 'flex-start';
    glyphHeight = null;
  }

  if (kind === 'compact-glyph') {
    glyphMinWidth = null;
    boxMarginLeft = to(5, cssUnit);
  }

  if (kind === 'ticket-hud') {
    boxJustifyContent = 'center';
    glyphJustify = 'center';
    glyphSize = '120%';
    glyphColorFromKind = theme.palette.ticketHudContent;
    textWeight = 'bold';
  }

  if (kind === 'text-field-combo-glyph') {
    glyphPaddingLeft = to(10, cssUnit);
    boxJustifyContent = 'center';
    glyphJustify = 'center';
  }

  /******************************************************************************/
  // Styles for Labels inside LabelTextFields.
  /******************************************************************************/

  if (kind === 'label-text-field') {
    boxJustifyContent = boxJustifyContent || 'none';
    boxHeight = null;
    textPaddingTop = to(8, cssUnit);
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
    textWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    textAlign = 'center';
    if (active) {
      textColorFromKind = theme.palette.taskTabActiveText;
    }
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = to(theme.shapes.taskLogoTextSize, cssUnit);
    glyphSize = to(theme.shapes.taskLogoGlyphSize, cssUnit);
  }

  // Task button (usual parent is container with kind='task-bar').
  if (kind === 'task-bar') {
    boxFlexDirection = 'column';
    textWidth = to(theme.shapes.taskButtonWidth, cssUnit);
    textAlign = 'center';
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textSize = to(theme.shapes.taskTextSize, cssUnit);
    textColorFromKind = theme.palette.taskButtonText;
    glyphSize = to(theme.shapes.taskGlyphSize, cssUnit);
    glyphColorFromKind = theme.palette.taskButtonText;
  }

  // main-tab button (usual parent is container with kind='main-tab').
  if (kind === 'main-tab') {
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = to(theme.shapes.mainTabTextSize, cssUnit);
    textColorFromKind = theme.palette.mainTabText;
  }

  if (kind === 'main-tab-right') {
    textColorFromKind = theme.palette.mainTabText;
  }

  // view-tab button (usual parent is container with kind='view-tab').
  if (
    kind === 'view-tab' ||
    kind === 'view-tab-first' ||
    kind === 'view-tab-last' ||
    kind === 'view-tab-single'
  ) {
    textSize = to(theme.shapes.viewTabTextSize, cssUnit);
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
    if (active) {
      textColorFromKind = theme.palette.taskTabActiveText;
      textWeight = 'bold';
    } else {
      textColorFromKind = theme.palette.taskTabInactiveText;
    }
    const mm = glyph
      ? to(0, cssUnit)
      : to(theme.shapes.taskTabLeftMargin, cssUnit);
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = mm;
    textSize = to(theme.shapes.taskTabTextSize, cssUnit);
    glyphSize = to(theme.shapes.taskTabGlyphSize, cssUnit);
  }

  // pane-navigator button (usual parent is container with kind='pane-navigator').
  if (kind === 'pane-navigator') {
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    textSize = to(theme.shapes.paneNavigatorTextSize, cssUnit);
    if (active === false) {
      textColorFromKind = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-hnavigator button (usual parent is container with kind='pane-hnavigator').
  if (kind === 'pane-hnavigator') {
    textSize = to(theme.shapes.paneNavigatorTextSize, cssUnit);
    if (active === false) {
      textColorFromKind = theme.palette.paneNavigatorInactiveText;
    }
  }

  // pane-vnavigator button (usual parent is container with kind='pane-vnavigator').
  if (kind === 'pane-vnavigator') {
    textSize = to(theme.shapes.paneNavigatorTextSize, cssUnit);
  }

  // Footer button (usual parent is container with kind='footer').
  if (kind === 'button-footer') {
    textSize = to(theme.shapes.footerTextSize, cssUnit);
    glyphSize = to(theme.shapes.footerGlyphSize, cssUnit);
  }

  // Notification button (usual parent is container with kind='notification-header').
  if (kind === 'button-notification') {
    glyphHeight = null;
    textSize = to(theme.shapes.notificationButtonTextSize, cssUnit);
    glyphSize = to(theme.shapes.notificationButtonGlyphSize, cssUnit);
    glyphMargin =
      `${to(10, cssUnit)} ${to(20, cssUnit)} ` +
      `${to(10, cssUnit)} ${to(0, cssUnit)}`;
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
    textSize = to(theme.shapes.warningTextSize, cssUnit);
    glyphSize = to(theme.shapes.warningGlyphSize, cssUnit);
    textColorFromKind = theme.palette.warningText;
  }

  // Action button (usual parent is container with kind='actions').
  if (kind === 'action') {
    textSize = to(theme.shapes.actionTextSize, cssUnit);
    glyphSize = to(theme.shapes.actionGlyphSize, cssUnit);
    boxJustifyContent = boxJustifyContent || 'none';
  }

  // Action button (usual parent is container with kind='actions-line-secondary').
  if (kind === 'secondary-action') {
    textSize = to(theme.shapes.secondaryActionTextSize, cssUnit);
    glyphSize = to(theme.shapes.secondaryActionGlyphSize, cssUnit);
    boxJustifyContent = boxJustifyContent || 'none';
  }

  // Subaction button (usual parent is container with kind='row-pane' and subkind='box').
  if (kind === 'subaction') {
    textColorFromKind = theme.palette.subactionButtonText;
    glyphColorFromKind = theme.palette.subactionButtonText;
    textSize = to(theme.shapes.subactionTextSize, cssUnit);
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
  }

  // Combo button, place to the right of a TextFieldCombo component.
  if (kind === 'combo') {
    if (disabled) {
      glyphColorFromKind = theme.palette.textFieldDisableText;
      textColorFromKind = theme.palette.textFieldDisableText;
      specialDisabled = true;
    } else if (active) {
      glyphColorFromKind = theme.palette.comboActiveGlyph;
    }
  }

  if (kind === 'round') {
    textColorFromKind = theme.palette.roundButtonText;
    glyphColorFromKind = theme.palette.roundButtonGlyph;
  }

  if (kind === 'identity') {
    glyphSize = to(theme.shapes.identityGlyphSize, cssUnit);
    textColorFromKind = theme.palette.identityButtonText;
    glyphColorFromKind = theme.palette.identityButtonGlyph;
  }

  if (kind === 'menu-item') {
    textWidth = 'max-content';
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(theme.shapes.containerMargin, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(theme.shapes.containerMargin, cssUnit);
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = to(theme.shapes.menuTextSize, cssUnit);
    textTransform = textTransform || 'uppercase';
    textWeight = 'bold';
    if (active) {
      glyphColorFromKind = theme.palette.menuText;
      textColorFromKind = theme.palette.menuText;
    } else if (focused) {
      glyphColorFromKind = theme.palette.menuFocusText;
      textColorFromKind = theme.palette.menuFocusText;
    } else {
      glyphColorFromKind = theme.palette.menuText;
      textColorFromKind = theme.palette.menuText;
    }
  }

  if (kind === 'combo-item') {
    textWidth = 'max-content';
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(theme.shapes.containerMargin, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(theme.shapes.containerMargin, cssUnit);
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = to(theme.shapes.menuTextSize, cssUnit);
    textTransform = textTransform || 'uppercase';
  }
  if (kind === 'flat-list-combo-item') {
    textSize = to(theme.shapes.menuTextSize, cssUnit);
    textColor = theme.palette.comboItemText;
    glyphColor = glyphColor || theme.palette.comboItemText;
  }

  if (kind === 'combo-wrap-item') {
    textWidth = 'max-content';
    textMarginTop = to(0, cssUnit);
    textMarginRight = to(0, cssUnit);
    textMarginBottom = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    boxJustifyContent = boxJustifyContent || 'flex-start';
    textSize = to(theme.shapes.menuTextSize, cssUnit);
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
    textSize = to(theme.shapes.ticketGlueTitleSize, cssUnit);
  }

  if (kind === 'task-show-footer') {
    boxJustifyContent = boxJustifyContent || 'flex-end';
    glyphColorFromKind = theme.palette.ticketGlueTitle;
    textColorFromKind = theme.palette.ticketGlueTitle;
    textWeight = 'bold';
    textSize = to(theme.shapes.ticketGlueTitleSize, cssUnit);
  }

  // Button with a day in Calendar component.
  if (
    kind === 'calendar' ||
    kind === 'calendar-navigator' ||
    kind === 'calendar-list' ||
    kind === 'calendar-title'
  ) {
    textMarginRight = to(0, cssUnit);
    textMarginLeft = to(0, cssUnit);
    textSize = to(theme.shapes.calendarTextSize, cssUnit);
    textColorFromKind = kind === 'calendar' ? theme.palette.calendarText : null;
    if (active) {
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
    if (dimmed) {
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
    if (active === false) {
      glyphColorFromKind = theme.palette.chronoNavigatorText;
      textColorFromKind = theme.palette.chronoNavigatorText;
    }
  }

  if (kind === 'recurrence') {
    if (active) {
      glyphColorFromKind = theme.palette.calendarActiveText;
      textColorFromKind = theme.palette.calendarActiveText;
    }
  }

  if (kind === 'dynamic-toolbar') {
    glyphColorFromKind = theme.palette.dynamicToolbarButtonGlyph;
    textColorFromKind = theme.palette.dynamicToolbarButtonGlyph;
    if (active) {
      glyphColorFromKind = theme.palette.dynamicToolbarButtonActiveGlyph;
      textColorFromKind = theme.palette.dynamicToolbarButtonActiveGlyph;
    }
  }

  if (kind === 'toolbar') {
    if (active) {
      glyphColorFromKind = theme.palette.toolbarActiveText;
      textColorFromKind = theme.palette.toolbarActiveText;
    } else {
      glyphColorFromKind = theme.palette.toolbarInactiveText;
      textColorFromKind = theme.palette.toolbarInactiveText;
    }
  }

  if (kind === 'alert') {
    textPaddingTop = to(6, cssUnit);
    textPaddingBottom = to(6, cssUnit);
  }

  if (kind === 'flat-combo') {
    if (active) {
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

  if (empty) {
    border = `${to(2, cssUnit)} dotted #ccc`;
    boxHeight = Unit.sub(to(theme.shapes.lineHeight, cssUnit), to(2, cssUnit));
    boxSizing = 'border-box';
    boxMarginTop = to(2, cssUnit);
  }

  if (!kind) {
    borderRadius = to(theme.shapes.smoothRadius, cssUnit);
    if (active) {
      backgroundColorFromKind = activeColor
        ? activeColor
        : theme.palette.boxActiveBackground;
    }
  }

  if (vpos === 'top') {
    boxAlignSelf = 'flex-start';
  } else if (vpos === 'first-line') {
    boxAlignSelf = 'flex-start';
    boxMarginTop = to(3, cssUnit);
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
    textAlign = 'start';
    textDirection = 'rtl';
  } else if (textWrap === 'no-strict') {
    linesOverflow = 'hidden';
    textOverflow = 'hidden';
    textTextOverflow = 'ellipsis';
    textWhiteSpace = 'nowrap';
    boxWidth = to(0, cssUnit);
    if (!boxFlexGrow) {
      boxFlexGrow = '1';
    }
  } else if (textWrap === 'yes-permissive') {
    // Intentionally empty.
  } else if (textWrap === 'yes') {
    textWordBreak = 'break-word';
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
  if (insideButton) {
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
    if (insideButton) {
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
    minWidth: boxWidth ? boxWidth : to(0, cssUnit),
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
    boxShadow: boxShadow,
    backgroundColor: backgroundColor,
    opacity: boxOpacity,
    zIndex: boxZIndex,
    userSelect: userSelect || 'none',
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
      glyphMargin = `${to(0, cssUnit)} ` + mm + ` ${to(0, cssUnit)} ` + mm;
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
    userSelect: userSelect || 'none',
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
    fontFamily: fontFamily,
    color: textColor,
    textTransform: textTransform,
    overflow: textOverflow,
    textOverflow: textTextOverflow,
    whiteSpace: textWhiteSpace,
    wordWrap: 'break-word',
    wordBreak: textWordBreak,
    textAlign: textAlign,
    direction: textDirection,
    userSelect: userSelect || 'none',
  };

  const normalFragmentStyle = {
    color: textColor,
  };

  const hilitedFragmentStyle = {
    color: theme.palette.highlightedText,
    backgroundColor: theme.palette.highlightedTextBackground,
    padding: to(1, cssUnit),
  };

  if (!disabled && insideButton && boxOpacity !== 0) {
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
