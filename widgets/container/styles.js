import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';
/******************************************************************************/

export default function styles (theme, props) {
  let width = props.width;
  let height = props.height;
  let minWidth = props.minWidth;
  let minHeight = props.minHeight;
  let maxWidth = props.maxWidth;
  let maxHeight = props.maxHeight;
  let hidden = props.hidden;
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
  let margin = props.marginBottom
    ? '0px 0px ' + props.marginBottom + ' 0px'
    : '0px';
  let padding = '0px';
  let backgroundColor = null;
  let color = null;
  let fontWeight = null;
  let zIndex = null;
  let position = props.position ? props.position : 'relative';
  let left = null;
  let right = null;
  let top = null;
  let bottom = null;
  let transform = null;
  let fontFamily = null;
  let transition = null;
  let visibility = null;
  let opacity = null;

  const h = theme.shapes.lineHeight;
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;
  const d = Unit.multiply (m, 0.5);

  if (props.kind === 'root') {
    fontFamily = theme.typo.font;
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    height = '100vh';
    backgroundColor = theme.palette.rootBackground;
    color = theme.palette.text;
  }

  if (props.kind === 'floating') {
    position = 'fixed';
    left = '50%';
    top = '50%';
    transform = 'translate(-50%, -50%)';
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
    zIndex = '10';
  }

  if (props.kind === 'floating-header') {
    if (!props.floatingHeight) {
      throw new Error (
        'Container with kind=floating-header must have a floating-height'
      );
    }
    // The property floating-height must correspond to the floating Container height !
    // The calculate height of floating-header Container fill the space on top of floating Container.
    const hh = Unit.add (
      Unit.multiply (props.floatingHeight, 0.5),
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

  if (props.kind === 'floating-footer') {
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

  if (props.kind === 'mandats') {
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

  if (props.kind === 'left-bar') {
    zIndex = 2;
    display = 'flex';
    flexDirection = 'column';
    backgroundColor = theme.palette.taskBackground;
    boxShadow = theme.shapes.taskShadow;
  }

  if (props.kind === 'task-bar') {
    minWidth = theme.shapes.taskButtonWidth;
    maxWidth = theme.shapes.taskButtonWidth;
    display = 'flex';
    flexDirection = 'column';
  }

  if (props.kind === 'right') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    justifyContent = 'flex-end';
    overflowX = 'hidden';
    overflowY = 'hidden';
  }

  if (props.kind === 'content') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'hidden';
  }

  if (props.kind === 'top-bar') {
    display = 'flex';
    flexDirection = 'row';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (props.kind === 'main-tab') {
    minHeight = theme.shapes.mainTabHeight;
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    justifyContent = 'flex-start';
    alignItems = 'center';
  }

  if (props.kind === 'main-tab-right') {
    minHeight = theme.shapes.mainTabHeight;
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'center';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (props.kind === 'second-bar') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-end';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (props.kind === 'view-tab') {
    minHeight = theme.shapes.viewTabHeight;
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap-reverse;';
    flexGrow = 1;
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    borderStyle = 'none';
  }

  if (props.kind === 'view-tab-right') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'flex-end';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (props.kind === 'views') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    overflowX = 'auto';
  }

  if (props.kind === 'view') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    if (props.spacing === 'large') {
      margin = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    } else {
      margin = '0px';
    }
    backgroundColor = theme.palette.viewBackground;
  }

  if (props.kind === 'view-stretch') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    margin = '0px';
    backgroundColor = theme.palette.viewBackground;
  }

  if (props.kind === 'view-right') {
    minWidth = width;
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    margin = '0px 0px 0px ' + theme.shapes.viewSpacing;
    backgroundColor = theme.palette.viewBackground;
  }

  if (props.kind === 'view-wedge') {
    width = 0;
  }

  if (props.kind === 'full-view') {
    width = '10000px';
    position = 'relative';
    display = 'flex';
    flexDirection = 'column';
    margin = '0px';
  }

  if (props.kind === 'pane-header') {
    minHeight = height;
    flexDirection = 'row';
    justifyContent = 'space-between';
    padding = m;
    margin = '0px 0px ' + m + ' 0px';
    backgroundColor = theme.palette.paneHeaderBackground;
  }

  if (props.kind === 'pane-header-light') {
    minHeight = height;
    flexDirection = 'row';
    justifyContent = 'space-between';
    padding = m;
    margin = '0px';
  }

  if (props.kind === 'pane-navigator') {
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

  if (props.kind === 'pane-top') {
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

  if (props.kind === 'pane-hnavigator') {
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

  if (props.kind === 'pane-vnavigator') {
    position = 'absolute';
    minHeight = h;
    display = 'flex';
    flexDirection = 'column';
    padding = '0px';
    margin =
      '0px 0px 0px ' + Unit.multiply (theme.shapes.vnavigatorButtonSize, -1);
    backgroundColor = theme.palette.vnavigatorButtonBackground;
    zIndex = 4;
  }

  if (props.kind === 'actions') {
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
    boxShadow = props.subkind === 'no-shadow'
      ? null
      : theme.shapes.actionShadow;
    // zIndex          = 2;
  }

  if (props.kind === 'panes') {
    overflowY = 'auto';
    flexGrow = 1;
    padding = '0px ' + m + ' 0px ' + m;
    if (props.subkind === 'top-margin') {
      margin = m + ' 0px 0px 0px';
    }
  }

  if (props.kind === 'pane') {
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    // boxShadow       = theme.shapes.paneShadow;
    margin = '0px 0px ' + m + ' 0px';
    padding = m + ' ' + m + ' ' + d + ' ' + m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (props.kind === 'pane-top') {
    display = 'flex';
    flexDirection = 'column';
    justifyContent = 'flex-start';
    alignItems = 'stretch';
    // boxShadow       = theme.shapes.paneShadow;
    margin = Unit.multiply (m, -0.5) + ' 0px ' + m + ' 0px';
    padding = '0px ' + m + ' ' + d + ' ' + m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (props.kind === 'row-pane') {
    const halfMargin = Unit.multiply (m, 0.5);
    display = 'flex';
    flexGrow = props.grow || 1;
    flexDirection = 'row';
    justifyContent = 'space-between';
    alignItems = 'center';
    let topMargin = '0px';
    let rightMargin = '0px';
    let bottomMargin = s;
    let leftMargin = '0px';
    if (props.subkind === 'info') {
      height = theme.shapes.lineHeight;
      backgroundColor = theme.palette.infoBackground;
      borderRadius = theme.shapes.smoothRadius;
      fontWeight = 'bold';
      padding = '0px ' + halfMargin;
    } else if (props.subkind === 'wide-info') {
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
      padding = '0px ' + m;
      backgroundColor = theme.palette.infoBackground;
      fontWeight = 'bold';
    } else if (props.subkind === 'box' || props.subkind === 'box-left') {
      if (props.subkind === 'box-left') {
        justifyContent = 'flex-start';
      }
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
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
      bottomMargin = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      if (props.markColor) {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor (theme, props.markColor);
        leftPadding = Unit.sub (leftPadding, theme.shapes.markWidth);
      }
      padding =
        topPadding +
        ' ' +
        rightPadding +
        ' ' +
        bottomPadding +
        ' ' +
        leftPadding;
    } else if (props.subkind === 'light-box') {
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
      topMargin = Unit.multiply (halfMargin, -1);
      bottomMargin = '0px';
    } else if (props.subkind === 'large-box') {
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
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
      bottomMargin = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      if (Bool.isTrue (props.selected)) {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor (theme, 'base');
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
    } else if (props.subkind === 'list') {
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderBottomWidth = '1px';
      borderBottomStyle = 'solid';
      padding = '0px';
      bottomMargin = '0px';
    } else if (props.subkind === 'footer') {
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
      topMargin = halfMargin;
      bottomMargin = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      padding = '0px';
    } else if (props.subkind === 'wrap') {
      display = 'flex';
      flexDirection = 'row';
      flexWrap = 'wrap';
      justifyContent = 'flex-start';
      alignItems = 'center';
      leftMargin = Unit.multiply (m, -0.25);
      rightMargin = Unit.multiply (m, -0.25);
      topMargin = Unit.multiply (m, -0.25);
      bottomMargin = Unit.multiply (m, 0.25);
    } else if (props.subkind === 'left') {
      justifyContent = 'flex-start';
    }
    if (props.spacing === 'compact') {
      height = theme.shapes.lineHeight;
      bottomMargin = '0px';
    } else if (props.spacing === 'glued') {
      height = theme.shapes.lineHeight;
      bottomMargin = Unit.multiply (halfMargin, -1);
    } else if (props.spacing === 'overlap') {
      bottomMargin = '-1px';
    }
    if (Bool.isTrue (props.selected) && props.subkind !== 'large-box') {
      backgroundColor = theme.palette.paneSelectedBackground;
      color = theme.palette.paneSelectedText;
    }
    margin =
      topMargin + ' ' + rightMargin + ' ' + bottomMargin + ' ' + leftMargin;
  }

  if (props.kind === 'row-field') {
    const halfMargin = Unit.multiply (m, 0.5);
    let topMargin = '0px';
    let rightMargin = '0px';
    let bottomMargin = s;
    let leftMargin = '0px';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    alignItems = props.verticalJustify === 'top' ? 'flex-start' : 'center';
    minHeight = Unit.add (h, '1px');
    if (props.subkind === 'left') {
      justifyContent = 'flex-start';
    } else if (props.subkind === 'light-box') {
      rightMargin = Unit.multiply (m, -1);
      leftMargin = Unit.multiply (m, -1);
      topMargin = Unit.multiply (halfMargin, -1);
      bottomMargin = '0px';
    }
    if (props.verticalSpacing === 'compact') {
      minHeight = '20px';
      bottomMargin = '0px';
    } else if (props.verticalSpacing === 'normal') {
      bottomMargin = '0px';
    } else if (props.verticalSpacing === 'large') {
      bottomMargin = '10px';
    } else if (props.verticalSpacing === 'overlap') {
      bottomMargin = '-1px';
    }
    margin =
      topMargin + ' ' + rightMargin + ' ' + bottomMargin + ' ' + leftMargin;
  }

  if (props.kind === 'row-pane-drag') {
    display = 'flex';
    flexDirection = 'column';
    margin =
      Unit.multiply (m, 0.5) +
      ' ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -0.5) +
      ' ' +
      Unit.multiply (m, -1);
  }

  if (props.kind === 'row-wrap') {
    margin = Unit.multiply (m, 0.25);
  }

  if (props.kind === 'compact-row') {
    display = 'flex';
    flexDirection = 'row';
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = '0px';
    padding = '0px';
  }

  if (props.kind === 'scrollable-row') {
    const minusMargin = Unit.multiply (m, -1);
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    justifyContent = 'flex-start';
    alignItems = 'flex-start';
    margin = '0px ' + minusMargin + ' 0px ' + minusMargin;
    padding = '0px';
  }

  if (props.kind === 'footer') {
    minHeight = theme.shapes.footerHeight;
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 0;
    justifyContent = 'flex-start';
    alignItems = 'center';
    backgroundColor = theme.palette.footerBackground;
  }

  if (props.kind === 'tickets') {
    const mm = Unit.multiply (m, 0.5);
    overflowY = 'auto';
    padding = '0px ' + mm + ' 0px ' + mm;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (props.kind === 'tickets-root') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
  }

  if (props.kind === 'tickets-messengers') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    overflowX = 'auto';
  }

  if (props.kind === 'tickets-messenger') {
    const mm = Unit.multiply (m, 0.5);
    padding = '0px ' + mm + ' 0px ' + mm;
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 0;
    margin = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (props.kind === 'tickets-trips') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'auto';
  }

  if (props.kind === 'tickets-desk') {
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = 1;
    backgroundColor = theme.palette.ticketsBackground;
    overflowY = 'auto';
  }

  if (props.kind === 'tickets-tray') {
    minWidth = props.width ? props.width : theme.shapes.dispatchTicketWidth;
    maxWidth = props.width ? props.width : theme.shapes.dispatchTicketWidth;
    minHeight = props.height
      ? props.height
      : theme.shapes.dispatchTicketsHeight;
  }

  if (props.kind === 'ticket-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    alignItems = 'baseline';
  }

  if (props.kind === 'ticket-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    overflowX = 'hidden';
    overflowY = 'hidden';
    margin = '-5px 0px';
  }

  if (props.kind === 'drag-too-many') {
    margin = '5px 0px 0px 0px';
    padding = '8px 12px';
    borderWidth = '1px';
    borderStyle = 'solid';
    borderRadius = '50px';
    borderColor = theme.palette.buttonBorder;
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (props.kind === 'drag-to-delete') {
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

  if (props.kind === 'chronos-events') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = 1;
    overflowX = 'hidden';
    overflowY = 'auto';
    backgroundColor = theme.palette.eventBackground;
  }

  if (props.kind === 'column-full') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = '1';
    overflowX = 'hidden';
  }

  if (props.kind === 'column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
  }

  if (props.kind === 'row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
  }

  if (props.kind === 'row-draggable') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    if (Bool.isTrue (props.isDragged)) {
      // borderWidth = '1px';
      // borderStyle = 'solid';
      // boxSizing = 'border-box';
      // borderColor = theme.palette.buttonBorder;
      backgroundColor = '#fff';
      boxShadow = '0px 10px 50px rgba(0, 0, 0, 0.50)';
      opacity = 0.95;
    } else if (Bool.isTrue (props.hasHeLeft)) {
      visibility = 'hidden';
    }
  }

  if (props.kind === 'wrap') {
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap';
    flexGrow = props.grow;
  }

  if (props.kind === 'boxes') {
    display = 'flex';
    flexDirection = 'row';
    flexWrap = 'wrap';
    justifyContent = 'flex-start';
    alignItems = 'center';
  }

  if (props.kind === 'box') {
    width = '100%';
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    justifyContent = 'center';
    borderWidth = props.subkind ? '1px' : '0px';
    borderStyle = props.subkind ? props.subkind : 'solid';
    borderRadius = theme.shapes.boxRadius;
    padding = s;
  }

  if (props.kind === 'ticket-mode') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    margin = '0px -20px 0px 0px';
  }

  if (props.kind === 'glyph-samples') {
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    height = '80px';
    overflowX = 'auto';
    overflowY = 'hidden';
    margin = '0px 20px 0px 0px';
  }

  if (props.kind === 'glyph-samples-note') {
    display = 'flex';
    flexDirection = 'row';
    alignItems = 'center';
    overflowX = 'auto';
    overflowY = 'hidden';
    margin = '0px 10px 0px 0px';
  }

  if (props.kind && props.kind.startsWith ('thin-')) {
    if (props.border) {
      if (props.border === 'top') {
        borderStyle = 'solid none none none';
      } else if (props.border === 'right') {
        borderStyle = 'none solid none none';
      } else if (props.border === 'bottom') {
        borderStyle = 'none none solid none';
      } else if (props.border === 'left') {
        borderStyle = 'none none none solid';
      }
      borderWidth = '1px';
      borderColor = theme.palette.buttonBorder;
    } else {
      borderStyle = 'none';
    }
  }

  if (props.kind === 'thin-main') {
    position = 'relative';
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    justifyContent = 'center';
    borderWidth = '1px';
    borderStyle = 'solid';
    borderColor = theme.palette.buttonBorder;
    borderRadius = theme.shapes.thinRadius;
    if (Bool.isTrue (props.selected)) {
      backgroundColor = theme.palette.paneSelectedBackground;
      color = theme.palette.paneSelectedText;
    } else {
      backgroundColor = theme.palette.paneBackground;
    }
  }

  if (props.kind === 'thin-center') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    justifyContent = 'center';
    alignItems = 'center';
  }

  if (props.kind === 'thin-column') {
    display = 'flex';
    flexDirection = 'column';
    flexGrow = props.grow;
    justifyContent = 'flex-start';
  }

  if (props.kind === 'thin-row') {
    display = 'flex';
    flexDirection = 'row';
    flexGrow = props.grow;
    justifyContent = 'flex-start';
    alignItems = 'center';
    padding = '0px ' + theme.shapes.thinLeftMargin;
  }

  if (props.kind === 'flying-combo') {
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

  if (props.kind === 'flying-balloon') {
    const fbp = theme.shapes.flyingBalloonPadding;
    display = 'flex';
    flexDirection = 'column';
    flexWrap = 'wrap';
    padding = Unit.add (fbp, '1px') + ' ' + fbp + ' ' + fbp + ' ' + fbp;
    backgroundColor = props.subkind === 'warning'
      ? theme.palette.flyingBalloonWarningBackground
      : theme.palette.flyingBalloonBackground;
    color = theme.palette.text;
    position = 'relative';
    boxShadow = theme.shapes.flyingShadow;
    borderRadius = theme.shapes.flyingBalloonRadius;
  }

  if (props.kind === 'flying-chat') {
    const fbp = theme.shapes.chatPadding;
    display = 'flex';
    flexDirection = 'column';
    margin = '0px 0px ' + theme.shapes.chatVerticalSpacing + ' 0px';
    padding = fbp + ' ' + fbp + ' ' + fbp + ' ' + fbp;
    backgroundColor = props.subkind === 'me'
      ? theme.palette.chatMeBackground
      : theme.palette.chatOtherBackground;
    color = theme.palette.text;
    position = 'relative';
    borderRadius = theme.shapes.flyingBalloonRadius;
  }

  if (props.kind === 'flying-dialog') {
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

  if (props.kind === 'push-to-edge') {
    flexGrow = 1;
    margin =
      '0px ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1) +
      ' ' +
      Unit.multiply (m, -1);
  }

  // WIP: This code generate problems of layout with 'row-field'.
  //? if (flexGrow) {
  //?   flexShrink = '1';
  //?   flexBasis = '0%';
  //? }

  if (Bool.isTrue (hidden)) {
    display = 'none';
  }

  if (props.backgroundColor) {
    backgroundColor = ColorHelpers.getMarkColor (theme, props.backgroundColor);
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
    cursor: props.cursor,
  };

  // A Container with kind='flying-balloon' has a standard behavior. It behaves like
  // a box with a small triangle which overlaps with the upper part (for example).
  let triangleStyle = null;
  if (
    props.kind === 'flying-combo' ||
    props.kind === 'flying-balloon' ||
    props.kind === 'flying-chat' ||
    props.kind === 'flying-dialog'
  ) {
    let triangleSize, triangleColor;
    if (
      props.kind === 'flying-combo' ||
      props.kind === 'flying-balloon' ||
      props.kind === 'flying-chat'
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
    const t = Unit.add (triangleSize, '1px', 0); // round (suppress decimals)
    const tt = props.triangleShift ? Unit.add (t, props.triangleShift) : t;
    const p = triangleSize;
    if (props.trianglePosition === 'left') {
      triangleStyle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        left: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderRight: t + ' solid ' + triangleColor,
      };
    } else if (props.trianglePosition === 'right') {
      triangleStyle = {
        position: 'absolute',
        height: '0px',
        bottom: 'calc(50% - ' + tt + ')',
        right: '-' + p,
        borderTop: t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderLeft: t + ' solid ' + triangleColor,
      };
    } else if (props.trianglePosition === 'bottom') {
      triangleStyle = {
        position: 'absolute',
        width: '0px',
        left: 'calc(50% - ' + tt + ')',
        bottom: '-' + p,
        borderLeft: t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderTop: t + ' solid ' + triangleColor,
      };
    } else if (props.trianglePosition === 'top') {
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
    backgroundColor: theme.palette.busyBackground,
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
