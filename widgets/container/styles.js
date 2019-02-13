import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

const isWebkit = 'WebkitAppearance' in document.documentElement.style;

/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'hidden',
  'marginBottom',
  'position',
  'visibility',
  'kind',
  'subkind',
  'floatingHeight',
  'grow',
  'spacing',
  'markColor',
  'selected',
  'verticalJustify',
  'verticalSpacing',
  'isDragged',
  'isTransparentWhenDrag',
  'hasHeLeft',
  'border',
  'backgroundColor',
  'cursor',
  'triangleShift',
  'trianglePosition',
  'busyBackgroundColor',
];

export default function styles(theme, props) {
  let {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    hidden,
    marginBottom,
    position,
    visibility,
    kind,
    subkind,
    floatingHeight,
    grow,
    spacing,
    markColor,
    selected,
    verticalJustify,
    verticalSpacing,
    isDragged,
    isTransparentWhenDrag,
    hasHeLeft,
    border,
    backgroundColor: backgroundColorProp,
    cursor,
    triangleShift,
    trianglePosition,
    busyBackgroundColor,
  } = props;

  let display = null;
  let overflowX = null;
  let overflowY = null;
  let flexDirection = null;
  let flexWrap = null;
  let flexGrow = null;
  let flexShrink = null;
  let flexBasis = null;
  let justifyContent = null;
  let alignItems = null;
  let alignContent = null;
  let alignSelf = null;
  let boxSizing = null;
  let borderWidth = null;
  let borderStyle = 'none';
  let borderColor = null;
  let borderTopWidth = null;
  let borderTopStyle = null;
  let borderTopColor = null;
  let borderRightWidth = null;
  let borderRightStyle = null;
  let borderRightColor = null;
  let borderBottomWidth = null;
  let borderBottomStyle = null;
  let borderBottomColor = null;
  let borderLeftWidth = null;
  let borderLeftStyle = null;
  let borderLeftColor = null;
  let borderRadius = null;
  let boxShadow = null;
  let margin = marginBottom ? '0px 0px ' + marginBottom + ' 0px' : '0px';
  let padding = '0px';
  let backgroundColor = null;
  let color = null;
  let fontWeight = null;
  let zIndex = null;
  position = position || 'relative';
  let left = null;
  let right = null;
  let top = null;
  let bottom = null;
  let transform = null;
  let fontFamily = null;
  let transition = null;
  let opacity = null;

  const h = theme.shapes.lineHeight;
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;
  const d = Unit.multiply(m, 0.5);

  if (kind === 'root') {
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    height = '100vh';
    backgroundColor = theme.palette.rootBackground;
    color = theme.palette.text;
  }

  if (kind === 'floating') {
    position = 'fixed';
    left = '50%';
    top = '50%';
    maxHeight = '80%';
    transform = 'translate(-50%, -50%)';
    display = 'flex';
    flexDirection = 'column';
    margin = 'auto';
    padding = subkind === 'full' ? null : theme.shapes.floatingPadding;
    borderRadius = theme.shapes.floatingRadius;
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'center';
    backgroundColor = theme.palette.flyingDialogBackground;
    boxShadow = theme.shapes.floatingShadow;
    zIndex = '10';
  }

  if (kind === 'floating-header') {
    if (!floatingHeight) {
      throw new Error(
        'Container with kind=floating-header must have a floating-height'
      );
    }
    // The property floating-height must correspond to the floating Container height !
    // The calculate height of floating-header Container fill the space on top of floating Container.
    const hh = Unit.add(
      Unit.multiply(floatingHeight, 0.5),
      theme.shapes.floatingPadding
    );
    height = 'calc(50vh - ' + hh + ')';
    position = 'absolute';
    left = '0px';
    right = '0px';
    top = '0px';
    bottom = '0px';
    display = 'flex';
    flexDirection = 'column';
    margin = '0px auto auto auto';
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-end';
    alignItems = 'center';
    zIndex = '2';
  }

  if (kind === 'floating-footer') {
    position = 'absolute';
    left = '0px';
    right = '0px';
    top = '0px';
    bottom = '0px';
    display = 'flex';
    flexDirection = 'column';
    margin = 'auto auto 0px auto';
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'center';
    alignItems = 'center';
  }

  if (kind === 'mandats') {
    position = 'absolute';
    left = '0px';
    right = '0px';
    top = '0px';
    bottom = '0px';
    display = 'flex';
    flexDirection = 'column';
    margin = 'auto';
    padding = theme.shapes.floatingPadding;
    borderRadius = theme.shapes.floatingRadius;
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'center';
    backgroundColor = theme.palette.floatingBackground;
    boxShadow = theme.shapes.floatingShadow;
    zIndex = '1';
  }

  if (kind === 'left-bar') {
    zIndex = 2;
    display = 'flex';
    flexDirection = 'column';
    backgroundColor = theme.palette.taskBackground;
    boxShadow = theme.shapes.taskShadow;
  }

  if (kind === 'task-bar') {
    minWidth = theme.shapes.taskButtonWidth;
    maxWidth = theme.shapes.taskButtonWidth;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
  }

  if (kind === 'right') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    justifyContent = 'flex-end';
    overflowX = 'hidden';
    overflowY = 'hidden';
  }

  if (kind === 'content') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'hidden';
  }

  if (kind === 'top-bar') {
    display = 'flex';
    flexDirection = 'row';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (kind === 'main-tab') {
    minHeight = theme.shapes.mainTabHeight;
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    justifyContent = 'flex-start';
    alignItems = 'center';
  }

  if (kind === 'main-tab-right') {
    minHeight = theme.shapes.mainTabHeight;
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'center';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (kind === 'second-bar') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-end';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (kind === 'view-tab') {
    minHeight = theme.shapes.viewTabHeight;
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap-reverse;';
    flexGrow = 1;
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    borderStyle = 'none';
  }

  if (kind === 'view-tab-right') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'flex-end';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (kind === 'views') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    overflowX = 'auto';
  }

  if (kind === 'view') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    if (spacing === 'large') {
      margin = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    } else {
      margin = '0px';
    }
    backgroundColor = theme.palette.viewBackground;
  }

  if (kind === 'view-stretch') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    margin = '0px';
    backgroundColor = theme.palette.viewBackground;
  }

  if (kind === 'view-right') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    margin = '0px 0px 0px ' + theme.shapes.viewSpacing;
    backgroundColor = theme.palette.viewBackground;
  }

  if (kind === 'view-wedge') {
    width = 0;
  }

  if (kind === 'full-view') {
    width = '10000px';
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    margin = '0px';
  }

  if (kind === 'pane-header') {
    minHeight = height;
    flexDirection = 'row';
    justifyContent = 'space-between';
    padding = m;
    margin = '0px 0px ' + m + ' 0px';
    backgroundColor = theme.palette.paneHeaderBackground;
  }

  if (kind === 'pane-warning') {
    height = '20px';
    flexDirection = 'row';
    flexGrow = grow;
    padding = Unit.multiply(m, 0.5) + ' ' + m;
    margin = Unit.multiply(m, -1) + ' 0px ' + m + ' 0px';
    if (subkind === 'draft') {
      backgroundColor = theme.palette.markSuccess;
    } else if (subkind === 'archived') {
      backgroundColor = theme.palette.markSecondary;
    } else if (subkind === 'trashed') {
      backgroundColor = theme.palette.markPrimary;
    } else if (subkind === 'business') {
      backgroundColor = theme.palette.markBase;
    } else {
      backgroundColor = theme.palette.paneHeaderBackground;
    }
  }

  if (kind === 'pane-header-light') {
    minHeight = height;
    flexDirection = 'row';
    justifyContent = 'space-between';
    padding = m;
    margin = '0px';
  }

  if (kind === 'pane-navigator') {
    minHeight = h;
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'space-between';
    alignItems = 'center';
    padding = m + ' ' + m + ' 0px ' + m;
    margin = '0px 0px ' + m + ' 0px';
    borderWidth = '1px';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (kind === 'pane-top') {
    minHeight = h;
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    padding = m + ' ' + m + ' 0px ' + m;
    margin = '0px 0px ' + m + ' 0px';
    borderStyle = 'none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (kind === 'pane-hnavigator') {
    minHeight = h;
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    padding = m + ' ' + m + ' 0px ' + m;
    margin = '0px 0px ' + m + ' 0px';
    borderWidth = '1px';
    borderStyle = 'none none solid none';
    borderColor = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (kind === 'pane-vnavigator') {
    position = 'absolute';
    minHeight = h;
    display = 'flex';
    flexDirection = 'column';
    padding = '0px';
    margin =
      '0px 0px 0px ' + Unit.multiply(theme.shapes.vnavigatorButtonSize, -1);
    backgroundColor = theme.palette.vnavigatorButtonBackground;
    zIndex = 4;
  }

  if (kind === 'actions') {
    minHeight = theme.shapes.actionHeight;
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'center';
    padding = m;
    borderStyle = 'none';
    backgroundColor = theme.shapes.actionBackground;
    borderTopWidth = '1px';
    borderTopStyle = 'solid';
    borderTopColor = theme.palette.actionBorder;
    boxShadow = subkind === 'no-shadow' ? null : theme.shapes.actionShadow;
  }

  if (kind === 'actions-lines') {
    minHeight = Unit.add(
      Unit.add(
        theme.shapes.secondaryActionHeight,
        theme.shapes.secondaryActionSpacing
      ),
      theme.shapes.actionHeight
    );
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    padding = m;
    borderStyle = 'none';
    backgroundColor = theme.shapes.actionBackground;
    borderTopWidth = '1px';
    borderTopStyle = 'solid';
    borderTopColor = theme.palette.actionBorder;
    boxShadow = subkind === 'no-shadow' ? null : theme.shapes.actionShadow;
  }

  if (kind === 'actions-line-secondary') {
    minHeight = theme.shapes.secondaryActionHeight;
    display = 'flex';
    flexDirection = 'row';
    alignContent = 'flex-start';
    margin = '0px 0px ' + theme.shapes.secondaryActionSpacing + ' 0px';
  }

  if (kind === 'actions-line-primary') {
    minHeight = theme.shapes.actionHeight;
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
  }

  if (kind === 'panes') {
    overflowY = isWebkit ? 'overlay' : 'auto';
    flexGrow = 1;
    padding = '0px ' + m + ' 0px ' + m;
    if (subkind === 'top-margin') {
      margin = m + ' 0px 0px 0px';
    }
  }

  if (kind === 'pane') {
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    // boxShadow       = theme.shapes.paneShadow;
    margin = '0px 0px ' + m + ' 0px';
    padding = m + ' ' + m + ' ' + d + ' ' + m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (kind === 'pane-wizard') {
    display = 'flex';
    flexGrow = 1;
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    margin = '0px ' + m + ' ' + m + ' ' + m;
    padding = m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (kind === 'pane-top') {
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    // boxShadow       = theme.shapes.paneShadow;
    margin = Unit.multiply(m, -0.5) + ' 0px ' + m + ' 0px';
    padding = '0px ' + m + ' ' + d + ' ' + m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (kind === 'row-pane') {
    const halfMargin = Unit.multiply(m, 0.5);
    display = 'flex';
    flexGrow = grow || 1;
    flexDirection = 'row';
    justifyContent = 'space-between';
    alignItems = 'center';
    let topMargin = '0px';
    let rightMargin = '0px';
    let bottomMargin = s;
    let leftMargin = '0px';
    if (subkind === 'info') {
      height = theme.shapes.lineHeight;
      backgroundColor = theme.palette.infoBackground;
      borderRadius = theme.shapes.smoothRadius;
      fontWeight = 'bold';
      padding = '0px ' + halfMargin;
    } else if (subkind === 'wide-info') {
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      padding = '0px ' + m;
      backgroundColor = theme.palette.infoBackground;
      fontWeight = 'bold';
    } else if (subkind === 'box' || subkind === 'box-left') {
      if (subkind === 'box-left') {
        justifyContent = 'flex-start';
      }
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      let topPadding = halfMargin;
      let rightPadding = m;
      let bottomPadding = halfMargin;
      let leftPadding = m;
      borderTopColor = theme.palette.paneNavigatorInactiveBorder;
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderTopWidth = '1px';
      borderBottomWidth = '1px';
      borderTopStyle = 'solid';
      borderBottomStyle = 'solid';
      topMargin = halfMargin;
      bottomMargin = Unit.sub(Unit.multiply(halfMargin, -1), '1px');
      if (markColor) {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor(theme, markColor);
        leftPadding = Unit.sub(leftPadding, theme.shapes.markWidth);
      }
      padding =
        topPadding +
        ' ' +
        rightPadding +
        ' ' +
        bottomPadding +
        ' ' +
        leftPadding;
    } else if (subkind === 'light-box') {
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      topMargin = Unit.multiply(halfMargin, -1);
      bottomMargin = '0px';
    } else if (subkind === 'large-box') {
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      let topPadding = '0px';
      let rightPadding = '0px';
      let bottomPadding = '0px';
      let leftPadding = theme.shapes.markWidth;
      borderTopColor = theme.palette.paneNavigatorInactiveBorder;
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderTopWidth = '1px';
      borderBottomWidth = '1px';
      borderTopStyle = 'solid';
      borderBottomStyle = 'solid';
      topMargin = halfMargin;
      bottomMargin = Unit.sub(Unit.multiply(halfMargin, -1), '1px');
      if (Bool.isTrue(selected)) {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor(theme, 'base');
        leftPadding = '0px';
      }
      padding =
        topPadding +
        ' ' +
        rightPadding +
        ' ' +
        bottomPadding +
        ' ' +
        leftPadding;
    } else if (subkind === 'list') {
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderBottomWidth = '1px';
      borderBottomStyle = 'solid';
      padding = '0px';
      bottomMargin = '0px';
    } else if (subkind === 'footer') {
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      topMargin = halfMargin;
      bottomMargin = Unit.sub(Unit.multiply(halfMargin, -1), '1px');
      padding = '0px';
    } else if (subkind === 'wrap') {
      display = 'flex';
      flexDirection = 'row';
      flexWrap = 'wrap';
      justifyContent = 'flex-start';
      alignItems = 'center';
      leftMargin = Unit.multiply(m, -0.25);
      rightMargin = Unit.multiply(m, -0.25);
      topMargin = Unit.multiply(m, -0.25);
      bottomMargin = Unit.multiply(m, 0.25);
    } else if (subkind === 'left') {
      justifyContent = 'flex-start';
    }
    if (spacing === 'compact') {
      height = theme.shapes.lineHeight;
      bottomMargin = '0px';
    } else if (spacing === 'glued') {
      height = theme.shapes.lineHeight;
      bottomMargin = Unit.multiply(halfMargin, -1);
    } else if (spacing === 'overlap') {
      bottomMargin = '-1px';
    }
    if (Bool.isTrue(selected) && subkind !== 'large-box') {
      backgroundColor = theme.palette.paneSelectedBackground;
      color = theme.palette.paneSelectedText;
    }
    margin =
      topMargin + ' ' + rightMargin + ' ' + bottomMargin + ' ' + leftMargin;
  }

  if (kind === 'row-field') {
    const halfMargin = Unit.multiply(m, 0.5);
    let topMargin = '0px';
    let rightMargin = '0px';
    let bottomMargin = s;
    let leftMargin = '0px';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
    alignItems = verticalJustify === 'top' ? 'flex-start' : 'center';
    minHeight = Unit.add(h, '1px');
    if (subkind === 'left') {
      justifyContent = 'flex-start';
    } else if (subkind === 'light-box') {
      rightMargin = Unit.multiply(m, -1);
      leftMargin = Unit.multiply(m, -1);
      topMargin = Unit.multiply(halfMargin, -1);
      bottomMargin = '0px';
    }
    if (verticalSpacing === 'compact') {
      minHeight = '20px';
      bottomMargin = '0px';
    } else if (verticalSpacing === 'normal') {
      bottomMargin = '0px';
    } else if (verticalSpacing === 'large') {
      bottomMargin = '10px';
    } else if (verticalSpacing === 'overlap') {
      bottomMargin = '-1px';
    }
    margin =
      topMargin + ' ' + rightMargin + ' ' + bottomMargin + ' ' + leftMargin;
  }

  if (kind === 'row-pane-drag') {
    display = 'flex';
    flexDirection = 'column';
    margin =
      Unit.multiply(m, 0.5) +
      ' ' +
      Unit.multiply(m, -1) +
      ' ' +
      Unit.multiply(m, -0.5) +
      ' ' +
      Unit.multiply(m, -1);
  }

  if (kind === 'row-wrap') {
    margin = Unit.multiply(m, 0.25);
  }

  if (kind === 'compact-row') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = '0px';
    padding = '0px';
  }

  if (kind === 'backlog-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = '1';
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = Unit.multiply(m, -1);
    padding = '0px 0px ' + Unit.multiply(m, 0.5) + ' 0px';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (kind === 'roadbook-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = '1';
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = Unit.multiply(m, -1);
    padding = '0px ' + m + ' ' + m + ' ' + m;
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (kind === 'desk-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = '1';
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = Unit.multiply(m, -1);
    padding = '0px ' + m + ' ' + m + ' ' + m;
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (kind === 'full-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    margin = '0px';
    padding = '0px';
  }

  if (kind === 'scrollable-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    margin = '0px';
    padding = '0px';
    if (subkind === 'in-default-panel') {
      // In default panel (edit to left or readonly to right), the vertical
      // scrolling is globaly managed by parent pannel.
      // Width is fix (700px).
      width = Unit.sub('700px', '140px'); // 140px include margins, vertical toolbar and vertical scroller
      overflowX = 'hidden';
      overflowY = 'hidden';
    } else if (subkind === 'wrap') {
      flexWrap = 'wrap';
      alignContent = 'flex-start';
      padding = theme.shapes.containerMargin;
      overflowX = 'auto';
      overflowY = 'hidden';
    } else if (subkind === 'padding') {
      padding = theme.shapes.containerMargin;
      overflowX = 'hidden';
      overflowY = 'auto';
    } else {
      // In dedicated dispatch board-panel, the vertical scrolling is managed
      // by this container.
      // Width is variable, according to splitter.
      overflowX = 'hidden';
      overflowY = 'auto';
    }
  }

  if (kind === 'footer') {
    minHeight = theme.shapes.footerHeight;
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 0;
    justifyContent = 'flex-start';
    alignItems = 'center';
    backgroundColor = theme.palette.footerBackground;
  }

  if (kind === 'tickets') {
    const mm = Unit.multiply(m, 0.5);
    overflowY = 'auto';
    padding = '0px ' + mm + ' 0px ' + mm;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (kind === 'tickets-root') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
  }

  if (kind === 'tickets-backlog') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'hidden';
    backgroundColor = theme.palette.viewBackground;
  }

  if (kind === 'tickets-messengers') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
  }

  if (kind === 'ticket-in-codispatch') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    padding = theme.shapes.containerMargin;
    backgroundColor = theme.palette.viewBackground;
  }

  if (kind === 'scrollable-tickets-messengers-top') {
    width = 'calc(100vw - ' + theme.shapes.taskButtonWidth + ')';
    overflowX = 'auto';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
  }
  if (kind === 'scrollable-tickets-messengers-right') {
    width = '100%';
    overflowX = 'auto';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
  }

  if (kind === 'scrollable-tickets-desks') {
    overflowX = 'auto';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    padding = '0px ' + theme.shapes.containerMargin;
  }

  if (kind === 'roadbook-tickets') {
    const mm = Unit.multiply(m, 0.5);
    padding = '0px ' + mm + ' 0px ' + mm;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    margin = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (kind === 'desk-tickets') {
    const mm = Unit.multiply(m, 0.5);
    padding = '0px ' + mm + ' 0px ' + mm;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    margin = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    backgroundColor = 'transparent';
  }

  if (kind === 'tickets-trips') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'auto';
  }

  if (kind === 'tickets-desk') {
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    backgroundColor = theme.palette.ticketsBackground;
    overflowY = 'auto';
  }

  if (kind === 'tickets-tray') {
    minWidth = width ? width : theme.shapes.dispatchTicketWidth;
    maxWidth = width ? width : theme.shapes.dispatchTicketWidth;
    minHeight = height ? height : theme.shapes.dispatchTicketsHeight;
  }

  if (kind === 'ticket-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
    alignItems = 'baseline';
  }

  if (kind === 'ticket-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    overflowX = 'hidden';
    overflowY = 'hidden';
    margin = '-5px 0px';
  }

  if (kind === 'drag-too-many') {
    margin = '5px 0px 0px 0px';
    padding = '8px 12px';
    borderWidth = '1px';
    borderStyle = 'solid';
    borderRadius = '50px';
    borderColor = theme.palette.buttonBorder;
    backgroundColor = theme.palette.ticketsBackground;
    boxShadow = theme.palette.dragAndDropShadow;
  }

  if (kind === 'drag-to-delete') {
    width = '24px';
    minHeight = '24px';
    display = 'flex';
    padding = '10px';
    borderWidth = '1px';
    borderStyle = 'solid';
    borderRadius = '50px';
    borderColor = theme.palette.buttonBorder;
    backgroundColor = theme.palette.ticketsBackground;
    alignItems = 'center';
    justifyContent = 'center';
    color = theme.palette.text;
  }

  if (kind === 'chronos-events') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'auto';
    backgroundColor = theme.palette.eventBackground;
  }

  if (kind === 'column-full') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    overflowX = 'hidden';
  }

  if (kind === 'column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
  }

  if (kind === 'row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
  }

  if (kind === 'row-draggable') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
    if (Bool.isTrue(isDragged)) {
      // borderWidth = '1px';
      // borderStyle = 'solid';
      // boxSizing = 'border-box';
      // borderColor = theme.palette.buttonBorder;
      backgroundColor = Bool.isTrue(isTransparentWhenDrag)
        ? null
        : theme.palette.dragAndDropBackground;
      boxShadow = Bool.isTrue(isTransparentWhenDrag)
        ? null
        : theme.palette.dragAndDropShadow;
      opacity = 0.9;
    } else if (Bool.isTrue(hasHeLeft)) {
      visibility = 'hidden';
      opacity = 0;
    }
  }

  if (kind === 'wrap') {
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap';
    flexGrow = grow;
  }

  if (kind === 'boxes') {
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap';
    justifyContent = 'flex-start';
    alignItems = 'center';
  }

  if (kind === 'box') {
    width = '100%';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    justifyContent = 'center';
    borderWidth = subkind ? '1px' : '0px';
    borderStyle = subkind ? subkind : 'solid';
    borderRadius = theme.shapes.boxRadius;
    padding = s;
  }

  if (kind === 'ticket-mode') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    margin = '0px -20px 0px 0px';
  }

  if (kind === 'glyph-samples') {
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    height = '80px';
    overflowX = 'auto';
    overflowY = 'hidden';
    margin = '0px 20px 0px 0px';
  }

  if (kind === 'glyph-samples-note') {
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    overflowX = 'auto';
    overflowY = 'hidden';
    margin = '0px 10px 0px 0px';
  }

  if (kind && kind.startsWith('thin-')) {
    if (border) {
      if (border === 'top') {
        borderStyle = 'solid none none none';
      } else if (border === 'right') {
        borderStyle = 'none solid none none';
      } else if (border === 'bottom') {
        borderStyle = 'none none solid none';
      } else if (border === 'left') {
        borderStyle = 'none none none solid';
      }
      borderWidth = '1px';
      borderColor = theme.palette.buttonBorder;
    } else {
      borderStyle = 'none';
    }
  }

  if (kind === 'thin-main') {
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
    justifyContent = 'center';
    borderWidth = '1px';
    borderStyle = 'solid';
    borderColor = theme.palette.buttonBorder;
    borderRadius = theme.shapes.thinRadius;
    if (Bool.isTrue(selected)) {
      backgroundColor = theme.palette.paneSelectedBackground;
      color = theme.palette.paneSelectedText;
    } else {
      backgroundColor = theme.palette.paneBackground;
    }
  }

  if (kind === 'thin-center') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    justifyContent = 'center';
    alignItems = 'center';
  }

  if (kind === 'thin-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = grow;
    justifyContent = 'flex-start';
  }

  if (kind === 'thin-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = grow;
    justifyContent = 'flex-start';
    alignItems = 'center';
    padding = '0px ' + theme.shapes.thinLeftMargin;
  }

  if (kind === 'flying-combo') {
    display = 'flex';
    flexDirection = 'column';
    flexWrap = 'wrap';
    padding = theme.shapes.flyingBalloonPadding;
    backgroundColor = theme.palette.comboItemBackground;
    color = theme.palette.text;
    position = 'relative';
    boxShadow = theme.shapes.comboShadow;
    borderWidth = '1px';
    borderStyle = 'solid';
    borderColor = theme.palette.buttonBorder;
    borderRadius = theme.shapes.flyingBalloonRadius;
  }

  if (kind === 'flying-balloon') {
    const fbp = theme.shapes.flyingBalloonPadding;
    display = 'flex';
    flexDirection = 'column';
    flexWrap = 'wrap';
    padding = Unit.add(fbp, '1px') + ' ' + fbp + ' ' + fbp + ' ' + fbp;
    backgroundColor =
      subkind === 'warning'
        ? theme.palette.flyingBalloonWarningBackground
        : theme.palette.flyingBalloonBackground;
    color = theme.palette.text;
    position = 'relative';
    boxShadow = theme.shapes.flyingShadow;
    borderRadius = theme.shapes.flyingBalloonRadius;
  }

  if (kind === 'flying-chat') {
    const fbp = theme.shapes.chatPadding;
    display = 'flex';
    flexDirection = 'column';
    margin = '0px 0px ' + theme.shapes.chatVerticalSpacing + ' 0px';
    padding = fbp + ' ' + fbp + ' ' + fbp + ' ' + fbp;
    backgroundColor =
      subkind === 'me'
        ? theme.palette.chatMeBackground
        : theme.palette.chatOtherBackground;
    color = theme.palette.text;
    position = 'relative';
    borderRadius = theme.shapes.flyingBalloonRadius;
  }

  if (kind === 'flying-dialog') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    padding = theme.shapes.floatingPadding;
    backgroundColor = theme.palette.flyingDialogBackground;
    color = theme.palette.text;
    position = 'relative';
    boxShadow = theme.shapes.flyingShadow;
    borderRadius = theme.shapes.flyingDialogRadius;
  }

  if (kind === 'push-to-edge') {
    if (subkind === 'flex') {
      display = 'flex';
      flexDirection = 'column';
    }
    flexGrow = 1;
    margin =
      Unit.multiply(m, 0.5) +
      ' ' +
      Unit.multiply(m, -1) +
      ' ' +
      Unit.multiply(m, -1) +
      ' ' +
      Unit.multiply(m, -1);
  }

  if (kind === 'absolute-top-right') {
    position = 'absolute';
    top = '0px';
    right = '0px';
  }

  // WIP: This code generate problems of layout with 'row-field'.
  //? if (flexGrow) {
  //?   flexShrink = '1';
  //?   flexBasis = '0%';
  //? }

  // With flex="2 1 0%", set properties:
  //    flexGrow   = "2"
  //    flexShrink = "1"
  //    flexBasis  = "0%"
  if (
    flexGrow &&
    typeof flexGrow === 'string' &&
    flexGrow.indexOf(' ') !== -1
  ) {
    const parts = flexGrow.split(' ');
    flexGrow = parts[0];
    if (parts.length >= 3) {
      flexShrink = parts[1];
      flexBasis = parts[2];
    }
  }

  if (Bool.isTrue(hidden)) {
    display = 'none';
  }

  if (backgroundColorProp) {
    backgroundColor = ColorHelpers.getMarkColor(theme, backgroundColorProp);
  }

  const boxStyle = {
    fontFamily: fontFamily,
    width: width,
    height: height,
    minWidth: minWidth,
    minHeight: minHeight,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    display: display,
    overflowX: overflowX,
    overflowY: overflowY,
    flexDirection: flexDirection,
    flexWrap: flexWrap,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    justifyContent: justifyContent,
    alignItems: alignItems,
    alignContent: alignContent,
    alignSelf: alignSelf,
    boxSizing: boxSizing,
    borderWidth: borderWidth,
    borderStyle: borderStyle,
    borderColor: borderColor,
    borderTopWidth: borderTopWidth,
    borderTopStyle: borderTopStyle,
    borderTopColor: borderTopColor,
    borderRightWidth: borderRightWidth,
    borderRightStyle: borderRightStyle,
    borderRightColor: borderRightColor,
    borderBottomWidth: borderBottomWidth,
    borderBottomStyle: borderBottomStyle,
    borderBottomColor: borderBottomColor,
    borderLeftWidth: borderLeftWidth,
    borderLeftStyle: borderLeftStyle,
    borderLeftColor: borderLeftColor,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    margin: margin,
    padding: padding,
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: fontWeight,
    zIndex: zIndex,
    position: position,
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    transform: transform,
    transition: transition,
    visibility: visibility,
    opacity: opacity,
    cursor: cursor,
  };

  // A Container with kind='flying-balloon' has a standard behavior. It behaves like
  // a box with a small triangle which overlaps with the upper part (for example).
  let triangleStyle = null;
  if (
    kind === 'flying-combo' ||
    kind === 'flying-balloon' ||
    kind === 'flying-chat' ||
    kind === 'flying-dialog'
  ) {
    let triangleSize, triangleColor;
    if (
      kind === 'flying-combo' ||
      kind === 'flying-balloon' ||
      kind === 'flying-chat'
    ) {
      triangleSize = theme.shapes.flyingBalloonTriangleSize;
      triangleColor = backgroundColor
        ? backgroundColor
        : theme.palette.flyingBalloonBackground;
    } else {
      triangleSize = theme.shapes.flyingDialogTriangleSize;
      triangleColor = backgroundColor
        ? backgroundColor
        : theme.palette.flyingDialogBackground;
    }
    const t = Unit.add(triangleSize, '1px', 0); // round (suppress decimals)
    const tt = triangleShift ? Unit.add(t, triangleShift) : t;
    const p = triangleSize;
    if (trianglePosition === 'left') {
      triangleStyle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        left: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderRight: t + ' solid ' + triangleColor,
      };
    } else if (trianglePosition === 'right') {
      triangleStyle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        right: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderLeft: t + ' solid ' + triangleColor,
      };
    } else if (trianglePosition === 'bottom') {
      triangleStyle = {
        position: 'absolute',
        width: '0px',
        left: 'calc(50% - ' + tt + ')',
        bottom: '-' + p,
        borderLeft: t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderTop: t + ' solid ' + triangleColor,
      };
    } else if (trianglePosition === 'top') {
      triangleStyle = {
        position: 'absolute',
        width: '0px',
        left: 'calc(50% - ' + tt + ')',
        top: '-' + p,
        borderLeft: t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderBottom: t + ' solid ' + triangleColor,
      };
    } else {
      triangleStyle = {};
    }
  }

  const busyBoxStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    top: 0,
    left: 0,
    backgroundColor: busyBackgroundColor || theme.palette.busyBackground,
  };

  const busyGlyphStyle = {
    margin: 'auto',
    color: theme.palette.busyForeground,
  };

  return {
    box: boxStyle,
    triangle: triangleStyle,
    busyBox: busyBoxStyle,
    busyGlyph: busyGlyphStyle,
  };
}

/******************************************************************************/
