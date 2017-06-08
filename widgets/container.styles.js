import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const inputWidth            = props.width;
  const inputHeight           = props.height;
  const inputMinWidth         = props.minWidth;
  const inputMinHeight        = props.minHeight;
  const inputMaxWidth         = props.maxWidth;
  const inputMaxHeight        = props.maxHeight;
  const inputMarginBottom     = props.marginBottom;
  const inputFloatingHeight   = props.floatingHeight;
  const inputKind             = props.kind;
  const inputSubkind          = props.subkind;
  const inputMarkColor        = props.markColor;
  const inputSpacing          = props.spacing;
  const inputTrianglePosition = props.trianglePosition;
  const inputGrow             = props.grow;
  const inputSelected         = props.selected;
  const inputBorder           = props.border;
  const inputCursor           = props.cursor;
  const inputPosition         = props.position;

  let width             = inputWidth;
  let height            = inputHeight;
  let minWidth          = inputMinWidth;
  let minHeight         = inputMinHeight;
  let maxWidth          = inputMaxWidth;
  let maxHeight         = inputMaxHeight;
  let display           = null;
  let overflowX         = null;
  let overflowY         = null;
  let flexDirection     = null;
  let flexWrap          = null;
  let flexGrow          = null;
  let flexShrink        = null;
  let flexBasis         = null;
  let justifyContent    = null;
  let alignItems        = null;
  let alignContent      = null;
  let alignSelf         = null;
  let boxSizing         = null;
  let borderWidth       = null;
  let borderStyle       = 'none';
  let borderColor       = null;
  let borderTopWidth    = null;
  let borderTopStyle    = null;
  let borderTopColor    = null;
  let borderRightWidth  = null;
  let borderRightStyle  = null;
  let borderRightColor  = null;
  let borderBottomWidth = null;
  let borderBottomStyle = null;
  let borderBottomColor = null;
  let borderLeftWidth   = null;
  let borderLeftStyle   = null;
  let borderLeftColor   = null;
  let borderRadius      = null;
  let boxShadow         = null;
  let margin            = inputMarginBottom ? '0px 0px ' + inputMarginBottom + ' 0px' : '0px';
  let padding           = '0px';
  let backgroundColor   = null;
  let color             = null;
  let fontWeight        = null;
  let zIndex            = null;
  let position          = inputPosition;
  let left              = null;
  let right             = null;
  let top               = null;
  let bottom            = null;
  let transform         = null;
  let fontFamily        = null;
  let transition        = null;

  const h = theme.shapes.lineHeight;
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;
  const d = Unit.multiply (m, 0.5);

  if (inputKind === 'root') {
    fontFamily      = theme.typo.font;
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'row';
    height          = '100vh';
    backgroundColor = theme.palette.rootBackground;
    color           = theme.palette.text;
  }

  if (inputKind === 'floating') {
    position        = 'fixed';
    left            = '50%';
    top             = '50%';
    transform       = 'translate(-50%, -50%)';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = 'auto';
    padding         = theme.shapes.floatingPadding;
    borderRadius    = theme.shapes.floatingRadius;
    display         = 'flex';
    flexDirection   = 'column';
    justifyContent  = 'center';
    backgroundColor = theme.palette.floatingBackground;
    boxShadow       = theme.shapes.floatingShadow;
    zIndex          = '10';
  }

  if (inputKind === 'floating-header') {
    if (!inputFloatingHeight) {
      throw new Error ('Container with kind=floating-header must have a floating-height');
    }
    // The property floating-height must correspond to the floating Container height !
    // The calculate height of floating-header Container fill the space on top of floating Container.
    const hh = Unit.add (Unit.multiply (inputFloatingHeight, 0.5), theme.shapes.floatingPadding);
    height          = 'calc(50vh - ' + hh + ')';
    position        = 'absolute';
    left            = '0px';
    right           = '0px';
    top             = '0px';
    bottom          = '0px';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = '0px auto auto auto';
    display         = 'flex';
    flexDirection   = 'column';
    justifyContent  = 'flex-end';
    alignItems      = 'center';
    zIndex          = '2';
  }

  if (inputKind === 'floating-footer') {
    position        = 'absolute';
    left            = '0px';
    right           = '0px';
    top             = '0px';
    bottom          = '0px';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = 'auto auto 0px auto';
    display         = 'flex';
    flexDirection   = 'column';
    justifyContent  = 'center';
    alignItems      = 'center';
  }

  if (inputKind === 'mandats') {
    position        = 'absolute';
    left            = '0px';
    right           = '0px';
    top             = '0px';
    bottom          = '0px';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = 'auto';
    padding         = theme.shapes.floatingPadding;
    borderRadius    = theme.shapes.floatingRadius;
    display         = 'flex';
    flexDirection   = 'column';
    justifyContent  = 'center';
    backgroundColor = theme.palette.floatingBackground;
    boxShadow       = theme.shapes.floatingShadow;
    zIndex          = '1';
  }

  if (inputKind === 'left-bar') {
    zIndex          = 2;
    display         = 'flex';
    flexDirection   = 'column';
    backgroundColor = theme.palette.taskBackground;
    boxShadow       = theme.shapes.taskShadow;
  }

  if (inputKind === 'task-bar') {
    minWidth        = theme.shapes.taskButtonWidth;
    display         = 'flex';
    flexDirection   = 'column';
  }

  if (inputKind === 'right') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    justifyContent  = 'flex-end';
    overflowX       = 'hidden';
  }

  if (inputKind === 'content') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    overflowX       = 'hidden';
  }

  if (inputKind === 'top-bar') {
    display         = 'flex';
    flexDirection   = 'row';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (inputKind === 'main-tab') {
    minHeight       = theme.shapes.mainTabHeight;
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 1;
    justifyContent  = 'flex-start';
    alignItems      = 'center';
  }

  if (inputKind === 'main-tab-right') {
    minHeight       = theme.shapes.mainTabHeight;
    display         = 'flex';
    flexDirection   = 'row';
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    backgroundColor = theme.palette.mainTabBackground;
  }

  if (inputKind === 'second-bar') {
    display         = 'flex';
    flexDirection   = 'row';
    justifyContent  = 'flex-end';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (inputKind === 'view-tab') {
    minHeight       = theme.shapes.viewTabHeight;
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 1;
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    padding         = m + ' 0px 0px 0px';
    borderStyle     = 'none';
  }

  if (inputKind === 'view-tab-right') {
    display         = 'flex';
    flexDirection   = 'row';
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    backgroundColor = theme.palette.viewTabBackground;
  }

  if (inputKind === 'views') {
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 1;
    overflowX       = 'auto';
  }

  if (inputKind === 'view') {
    minWidth        = width;
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    margin          = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    backgroundColor = theme.palette.viewBackground;
  }

  if (inputKind === 'view-stretch') {
    minWidth        = width;
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    margin          = '0px';
    backgroundColor = theme.palette.viewBackground;
  }

  if (inputKind === 'view-short') {
    minWidth        = width;
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    margin          = '0px';
    backgroundColor = theme.palette.viewBackground;
    alignSelf       = 'flex-start';
  }

  if (inputKind === 'view-right') {
    minWidth        = width;
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = '0px';
    backgroundColor = theme.palette.viewBackground;
  }

  if (inputKind === 'view-wedge') {
    flexGrow        = 1;
  }

  if (inputKind === 'full-view') {
    width           = '10000px';
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'column';
    margin          = '0px';
  }

  if (inputKind === 'pane-header') {
    minHeight       = height;
    flexDirection   = 'row';
    justifyContent  = 'space-between';
    padding         = m;
    margin          = '0px 0px ' + m + ' 0px';
    backgroundColor = theme.palette.paneHeaderBackground;
  }

  if (inputKind === 'pane-navigator') {
    minHeight       = h;
    display         = 'flex';
    flexDirection   = 'row';
    justifyContent  = 'space-between';
    alignItems      = 'center';
    padding         = m + ' ' + m + ' 0px ' + m;
    margin          = '0px 0px ' + m + ' 0px';
    borderWidth     = '1px';
    borderStyle     = 'none none solid none';
    borderColor     = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (inputKind === 'pane-top') {
    minHeight       = h;
    display         = 'flex';
    flexDirection   = 'row';
    alignItems      = 'center';
    padding         = m + ' ' + m + ' 0px ' + m;
    margin          = '0px 0px ' + m + ' 0px';
    borderStyle     = 'none';
    borderColor     = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (inputKind === 'pane-hnavigator') {
    minHeight       = h;
    display         = 'flex';
    flexDirection   = 'row';
    alignItems      = 'center';
    padding         = m + ' ' + m + ' 0px ' + m;
    margin          = '0px 0px ' + m + ' 0px';
    borderWidth     = '1px';
    borderStyle     = 'none none solid none';
    borderColor     = theme.palette.paneNavigatorInactiveBorder;
    backgroundColor = theme.palette.paneNavigatorBackground;
  }

  if (inputKind === 'pane-vnavigator') {
    position        = 'absolute';
    minHeight       = h;
    display         = 'flex';
    flexDirection   = 'column';
    padding         = '0px';
    margin          = '0px 0px 0px ' + Unit.multiply (theme.shapes.vnavigatorButtonSize, -1);
    backgroundColor = theme.palette.vnavigatorButtonBackground;
    zIndex          = 4;
  }

  if (inputKind === 'actions') {
    minHeight       = theme.shapes.actionHeight;
    display         = 'flex';
    flexDirection   = 'row';
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    padding         = m;
    borderStyle     = 'none';
    backgroundColor = theme.shapes.actionBackground;
    borderTopWidth  = '1px';
    borderTopStyle  = 'solid';
    borderTopColor  = theme.palette.actionBorder;
    boxShadow       = (inputSubkind === 'no-shadow') ? null : theme.shapes.actionShadow;
    // zIndex          = 2;
  }

  if (inputKind === 'panes') {
    overflowY       = 'auto';
    flexGrow        = 1;
    padding         = '0px ' + m + ' 0px ' + m;
    if (inputSubkind === 'top-margin') {
      margin        = m + ' 0px 0px 0px';
    }
  }

  if (inputKind === 'panes-short') {
    overflowY       = 'auto';
    padding         = '0px ' + m + ' 0px ' + m;
    if (inputSubkind === 'top-margin') {
      margin        = m + ' 0px 0px 0px';
    }
  }

  if (inputKind === 'pane') {
    display         = 'flex';
    flexDirection   = 'column';
    justifyContent  = 'flex-start';
    alignItems      = 'stretch';
    // boxShadow       = theme.shapes.paneShadow;
    margin          = '0px 0px ' + m + ' 0px';
    padding         = m + ' ' + m + ' ' + d + ' ' + m;
    backgroundColor = theme.palette.paneBackground;
  }

  if (inputKind === 'row-pane') {
    const halfMargin     = Unit.multiply (m, 0.5);
    display              = 'flex';
    flexDirection        = 'row';
    justifyContent       = 'space-between';
    alignItems           = 'center';
    let topMargin        = '0px';
    let rightMargin      = '0px';
    let bottomMargin     = s;
    let leftMargin       = '0px';
    if (inputSubkind === 'info') {
      height           = theme.shapes.lineHeight;
      backgroundColor  = theme.palette.infoBackground;
      borderRadius     = theme.shapes.smoothRadius;
      fontWeight       = 'bold';
      padding          = '0px ' + halfMargin;
    } else if (inputSubkind === 'wide-info') {
      rightMargin      = Unit.multiply (m, -1);
      leftMargin       = Unit.multiply (m, -1);
      padding          = '0px ' + m;
      backgroundColor  = theme.palette.infoBackground;
      fontWeight       = 'bold';
    } else if (inputSubkind === 'box') {
      rightMargin       = Unit.multiply (m, -1);
      leftMargin        = Unit.multiply (m, -1);
      let topPadding    = halfMargin;
      let rightPadding  = m;
      let bottomPadding = halfMargin;
      let leftPadding   = m;
      borderTopColor    = theme.palette.paneNavigatorInactiveBorder;
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderTopWidth    = '1px';
      borderBottomWidth = '1px';
      borderTopStyle    = 'solid';
      borderBottomStyle = 'solid';
      topMargin         = halfMargin;
      bottomMargin      = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      if (inputMarkColor) {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor (theme, inputMarkColor);
        leftPadding     = Unit.sub (leftPadding, theme.shapes.markWidth);
      }
      padding = topPadding + ' ' + rightPadding + ' ' + bottomPadding + ' ' + leftPadding;
    } else if (inputSubkind === 'light-box') {
      rightMargin       = Unit.multiply (m, -1);
      leftMargin        = Unit.multiply (m, -1);
      topMargin         = Unit.multiply (halfMargin, -1);
      bottomMargin      = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
    } else if (inputSubkind === 'large-box') {
      rightMargin       = Unit.multiply (m, -1);
      leftMargin        = Unit.multiply (m, -1);
      let topPadding    = '0px';
      let rightPadding  = '0px';
      let bottomPadding = '0px';
      let leftPadding   = theme.shapes.markWidth;
      borderTopColor    = theme.palette.paneNavigatorInactiveBorder;
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderTopWidth    = '1px';
      borderBottomWidth = '1px';
      borderTopStyle    = 'solid';
      borderBottomStyle = 'solid';
      topMargin         = halfMargin;
      bottomMargin      = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      if (inputSelected === 'true') {
        borderLeftWidth = theme.shapes.markWidth;
        borderLeftStyle = 'solid';
        borderLeftColor = ColorHelpers.getMarkColor (theme, 'base');
        leftPadding     = '0px';
      }
      padding = topPadding + ' ' + rightPadding + ' ' + bottomPadding + ' ' + leftPadding;
    } else if (inputSubkind === 'list') {
      borderBottomColor = theme.palette.paneNavigatorInactiveBorder;
      borderBottomWidth = '1px';
      borderBottomStyle = 'solid';
      padding           = '0px';
      bottomMargin      = '0px';
    } else if (inputSubkind === 'footer') {
      rightMargin       = Unit.multiply (m, -1);
      leftMargin        = Unit.multiply (m, -1);
      topMargin         = halfMargin;
      bottomMargin      = Unit.sub (Unit.multiply (halfMargin, -1), '1px');
      padding           = '0px';
    } else if (inputSubkind === 'wrap') {
      display         = 'flex';
      flexDirection   = 'row';
      flexWrap        = 'wrap';
      justifyContent  = 'flex-start';
      alignItems      = 'center';
      leftMargin      = Unit.multiply (m, -0.25);
      rightMargin     = Unit.multiply (m, -0.25);
      topMargin       = Unit.multiply (m, -0.25);
      bottomMargin    = Unit.multiply (m,  0.25);
    }
    if (inputSpacing === 'compact') {
      height           = theme.shapes.lineHeight;
      bottomMargin     = '0px';
    } else if (inputSpacing === 'glued') {
      height           = theme.shapes.lineHeight;
      bottomMargin     = Unit.multiply (halfMargin, -1);
    }
    if (inputSelected === 'true' && inputSubkind !== 'large-box') {
      backgroundColor = theme.palette.paneSelectedBackground;
      color           = theme.palette.paneSelectedText;
    }
    margin = topMargin + ' ' + rightMargin + ' ' + bottomMargin + ' ' + leftMargin;
  }

  if (inputKind === 'row-pane-drag') {
    display         = 'flex';
    flexDirection   = 'column';
    margin          = Unit.multiply (m, 0.5) + ' ' +
      Unit.multiply (m, -1) + ' ' +
      Unit.multiply (m, -0.5) + ' ' +
      Unit.multiply (m, -1);
  }

  if (inputKind === 'row-wrap') {
    margin = Unit.multiply (m, 0.25);
  }

  if (inputKind === 'compact-row') {
    display        = 'flex';
    flexDirection  = 'row';
    justifyContent = 'flex-start';
    alignItems     = 'flex-start';
    margin         = '0px';
    padding        = '0px';
  }

  if (inputKind === 'footer') {
    minHeight       = theme.shapes.footerHeight;
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 0;
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    backgroundColor = theme.palette.footerBackground;
  }

  if (inputKind === 'tickets') {
    const mm        = Unit.multiply (m, 0.5);
    overflowY       = 'auto';
    padding         = '0px ' + mm + ' 0px ' + mm;
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = '1';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (inputKind === 'tickets-root') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    overflowX       = 'hidden';
  }

  if (inputKind === 'tickets-messengers') {
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 1;
    overflowX       = 'auto';
  }

  if (inputKind === 'tickets-messenger') {
    const mm        = Unit.multiply (m, 0.5);
    padding         = '0px ' + mm + ' 0px ' + mm;
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 0;
    margin          = '0px ' + theme.shapes.viewSpacing + ' 0px 0px';
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (inputKind === 'tickets-trips') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    overflowX       = 'hidden';
    overflowY       = 'auto';
  }

  if (inputKind === 'tickets-desk') {
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = 1;
    backgroundColor = theme.palette.ticketsBackground;
    overflowY       = 'auto';
  }

  if (inputKind === 'tickets-tray') {
    minWidth        = inputWidth  ? inputWidth  : theme.shapes.dispatchTicketWidth;
    maxWidth        = inputWidth  ? inputWidth  : theme.shapes.dispatchTicketWidth;
    minHeight       = inputHeight ? inputHeight : theme.shapes.dispatchTicketsHeight;
  }

  if (inputKind === 'ticket-row') {
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = inputGrow;
    alignItems      = 'baseline';
  }

  if (inputKind === 'ticket-column') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    overflowX       = 'hidden';
    overflowY       = 'hidden';
    margin          = '-5px 0px';
  }

  if (inputKind === 'drag-too-many') {
    margin          = '5px 0px 0px 0px';
    padding         = '8px 12px';
    borderWidth     = '1px';
    borderStyle     = 'solid';
    borderRadius    = '50px';
    borderColor     = theme.palette.buttonBorder;
    backgroundColor = theme.palette.ticketsBackground;
  }

  if (inputKind === 'notifications-panel') {
    // TODO: improve this code !
    // Subtracting the current items supposed to be present at the total height
    // (main-tab, view-tab and footer).
    let hh = '0px';
    hh = Unit.add (hh, theme.shapes.mainTabHeight);
    hh = Unit.add (hh, theme.shapes.containerMargin);
    hh = Unit.add (hh, theme.shapes.viewTabHeight);
    const y = hh;
    hh = Unit.add (hh, theme.shapes.footerHeight);
    minWidth          = width;
    maxHeight         = 'calc(100vh - ' + hh + ')';
    position          = 'fixed';
    top               = y;
    right             = (inputSubkind === 'hidden') ? Unit.multiply (width, -1) : '0px';
    display           = 'flex';
    flexDirection     = 'column';
    margin            = '0px';
    backgroundColor   = theme.palette.notificationBackground;
    transition        = theme.transitions.easeOut ();
    zIndex            = 4;
  }

  if (inputKind === 'notification-header') {
    display         = 'inline';
    padding         = Unit.multiply (m, 0.5) + ' ' + m;
    margin          = '0px 0px ' + Unit.multiply (s, 0.4) + ' 0px';
    backgroundColor = theme.palette.notificationBackgroundHeader;
    color           = theme.palette.notificationText;
  }

  if (inputKind === 'notification-header-row') {
    minHeight       = '32px';
    display         = 'flex';
    flexDirection   = 'row';
  }

  if (inputKind === 'notifications') {
    display           = 'flex';
    flexDirection     = 'column';
    margin            = '0px';
    backgroundColor   = null;
    overflowY         = 'auto';
  }

  if (inputKind === 'notification-box') {
    let topPadding    = m;
    let rightPadding  = '0px';
    let bottomPadding = m;
    let leftPadding   = m;
    minHeight         = '32px';
    display           = 'flex';
    flexDirection     = 'row';
    color             = theme.palette.notificationText;
    if (inputSubkind === 'not-read') {
      margin          = '0px 0px ' + Unit.multiply (s, 0.4) + ' 0px';
      leftPadding     = Unit.sub (leftPadding, theme.shapes.notificationMarkWidth);
      borderLeftWidth = theme.shapes.notificationMarkWidth;
      borderLeftStyle = 'solid';
      borderLeftColor = ColorHelpers.getMarkColor (theme, 'primary');
      backgroundColor = theme.palette.notificationBackgroundNotRead;
    } else {
      margin          = '0px 0px 1px 0px';
      backgroundColor = theme.palette.notificationBackgroundRead;
    }
    padding = topPadding + ' ' + rightPadding + ' ' + bottomPadding + ' ' + leftPadding;
  }

  if (inputKind === 'chronos-events') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = 1;
    overflowX       = 'hidden';
    overflowY       = 'auto';
    backgroundColor = theme.palette.eventBackground;
  }

  if (inputKind === 'column-full') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = '1';
    overflowX       = 'hidden';
  }

  if (inputKind === 'column') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
  }

  if (inputKind === 'row') {
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = inputGrow;
  }

  if (inputKind === 'wrap') {
    display         = 'flex';
    flexDirection   = 'row';
    flexWrap        = 'wrap';
    flexGrow        = inputGrow;
  }

  if (inputKind === 'boxes') {
    display         = 'flex';
    flexDirection   = 'row';
    flexWrap        = 'wrap';
    justifyContent  = 'flex-start';
    alignItems      = 'center';
  }

  if (inputKind === 'box') {
    width           = '100%';
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    justifyContent  = 'center';
    borderWidth     = '1px';
    borderStyle     = inputSubkind ? inputSubkind : 'solid';
    borderRadius    = theme.shapes.boxRadius;
    padding         = s;
  }

  if (inputKind === 'ticket-mode') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    margin          = '0px -20px 0px 0px';
  }

  if (inputKind === 'glyph-samples') {
    display       = 'flex';
    flexDirection = 'row';
    alignItems    = 'center';
    height        = '80px';
    overflowX     = 'auto';
    overflowY     = 'hidden';
    margin        = '0px 20px 0px 0px';
  }

  if (inputKind && inputKind.startsWith ('thin-')) {
    if (inputBorder) {
      if (inputBorder === 'top') {
        borderStyle = 'solid none none none';
      } else if (inputBorder === 'right') {
        borderStyle = 'none solid none none';
      } else if (inputBorder === 'bottom') {
        borderStyle = 'none none solid none';
      } else if (inputBorder === 'left') {
        borderStyle = 'none none none solid';
      }
      borderWidth = '1px';
      borderColor = theme.palette.buttonBorder;
    } else {
      borderStyle = 'none';
    }
  }

  if (inputKind === 'thin-main') {
    position        = 'relative';
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = inputGrow;
    justifyContent  = 'center';
    borderWidth     = '1px';
    borderStyle     = 'solid';
    borderColor     = theme.palette.buttonBorder;
    borderRadius    = theme.shapes.thinRadius;
    if (inputSelected === 'true') {
      backgroundColor = theme.palette.paneSelectedBackground;
      color           = theme.palette.paneSelectedText;
    } else {
      backgroundColor = theme.palette.paneBackground;
    }
  }

  if (inputKind === 'thin-center') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    justifyContent  = 'center';
    alignItems      = 'center';
  }

  if (inputKind === 'thin-column') {
    display         = 'flex';
    flexDirection   = 'column';
    flexGrow        = inputGrow;
    justifyContent  = 'center';
  }

  if (inputKind === 'thin-row') {
    display         = 'flex';
    flexDirection   = 'row';
    flexGrow        = inputGrow;
    justifyContent  = 'flex-start';
    alignItems      = 'center';
    padding         = '0px ' + theme.shapes.thinLeftMargin;
  }

  if (inputKind === 'flying-balloon') {
    const fbp = theme.shapes.flyingBalloonPadding;
    display         = 'flex';
    flexDirection   = 'column';
    flexWrap        = 'wrap';
    padding         = Unit.add (fbp, '1px') + ' ' + fbp + ' ' + fbp + ' ' + fbp;
    backgroundColor = theme.palette.flyingBalloonBackground;
    color           = theme.palette.text;
    position        = 'relative';
    boxShadow       = theme.shapes.flyingShadow;
    borderRadius    = theme.shapes.flyingBalloonRadius;
  }

  if (inputKind === 'flying-dialog') {
    display         = 'flex';
    flexDirection   = 'column';
    flexWrap        = 'wrap';
    padding         = theme.shapes.floatingPadding;
    backgroundColor = theme.palette.flyingDialogBackground;
    color           = theme.palette.text;
    position        = 'relative';
    boxShadow       = theme.shapes.flyingShadow;
    borderRadius    = theme.shapes.flyingDialogRadius;
  }

  if (flexGrow) {
    flexShrink = '1';
    flexBasis  = '0%';
  }

  const boxStyle = {
    fontFamily:        fontFamily,
    width:             width,
    height:            height,
    minWidth:          minWidth,
    minHeight:         minHeight,
    maxWidth:          maxWidth,
    maxHeight:         maxHeight,
    display:           display,
    overflowX:         overflowX,
    overflowY:         overflowY,
    flexDirection:     flexDirection,
    flexWrap:          flexWrap,
    flexGrow:          flexGrow,
    flexShrink:        flexShrink,
    flexBasis:         flexBasis,
    justifyContent:    justifyContent,
    alignItems:        alignItems,
    alignContent:      alignContent,
    alignSelf:         alignSelf,
    boxSizing:         boxSizing,
    borderWidth:       borderWidth,
    borderStyle:       borderStyle,
    borderColor:       borderColor,
    borderTopWidth:    borderTopWidth,
    borderTopStyle:    borderTopStyle,
    borderTopColor:    borderTopColor,
    borderRightWidth:  borderRightWidth,
    borderRightStyle:  borderRightStyle,
    borderRightColor:  borderRightColor,
    borderBottomWidth: borderBottomWidth,
    borderBottomStyle: borderBottomStyle,
    borderBottomColor: borderBottomColor,
    borderLeftWidth:   borderLeftWidth,
    borderLeftStyle:   borderLeftStyle,
    borderLeftColor:   borderLeftColor,
    borderRadius:      borderRadius,
    boxShadow:         boxShadow,
    margin:            margin,
    padding:           padding,
    backgroundColor:   backgroundColor,
    color:             color,
    fontWeight:        fontWeight,
    zIndex:            zIndex,
    position:          position,
    left:              left,
    right:             right,
    top:               top,
    bottom:            bottom,
    transform:         transform,
    transition:        transition,
    cursor:            inputCursor,
  };

  // A Container with kind='flying-balloon' has a standard behavior. It behaves like
  // a box with a small triangle which overlaps with the upper part (for example).
  let triangleStyle = null;
  if (inputKind === 'flying-balloon' || inputKind === 'flying-dialog') {
    let triangleSize, triangleColor;
    if (inputKind === 'flying-balloon') {
      triangleSize  = theme.shapes.flyingBalloonTriangleSize;
      triangleColor = theme.palette.flyingBalloonBackground;
    } else {
      triangleSize  = theme.shapes.flyingDialogTriangleSize;
      triangleColor = theme.palette.flyingDialogBackground;
    }
    const t = Unit.add (triangleSize, '1px', 0);  // round (suppress decimals)
    const p = triangleSize;
    if (inputTrianglePosition === 'left') {
      triangleStyle = {
        position:     'absolute',
        height:       '0px',
        bottom:       'calc(50% - ' + t + ')',
        left:         '-' + p,
        borderTop:    t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderRight:  t + ' solid ' + triangleColor,
      };
    } else if (inputTrianglePosition === 'right') {
      triangleStyle = {
        position:     'absolute',
        height:       '0px',
        bottom:       'calc(50% - ' + t + ')',
        right:        '-' + p,
        borderTop:    t + ' solid transparent',
        borderBottom: t + ' solid transparent',
        borderLeft:   t + ' solid ' + triangleColor,
      };
    } else if (inputTrianglePosition === 'bottom') {
      triangleStyle = {
        position:    'absolute',
        width:       '0px',
        left:        'calc(50% - ' + t + ')',
        bottom:      '-' + p,
        borderLeft:  t + ' solid transparent',
        borderRight: t + ' solid transparent',
        borderTop:   t + ' solid ' + triangleColor,
      };
    } else {
      triangleStyle = {
        position:     'absolute',
        width:        '0px',
        left:         'calc(50% - ' + t + ')',
        top:          '-' + p,
        borderLeft:   t + ' solid transparent',
        borderRight:  t + ' solid transparent',
        borderBottom: t + ' solid ' + triangleColor,
      };
    }
  }

  return {
    box:      boxStyle,
    triangle: triangleStyle,
  };
}

/******************************************************************************/
