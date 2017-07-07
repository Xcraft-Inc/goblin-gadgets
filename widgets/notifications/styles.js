import {Unit} from 'electrum-theme';

/******************************************************************************/

function getPosition (theme) {
  // TODO: improve this code !
  // Subtracting the current items supposed to be present at the total height
  // (main-tab, view-tab and footer).
  let hh = '0px';
  hh = Unit.add (hh, theme.shapes.mainTabHeight);
  hh = Unit.add (hh, theme.shapes.containerMargin);
  hh = Unit.add (hh, theme.shapes.viewTabHeight);
  const y = hh;
  hh = Unit.add (hh, theme.shapes.footerHeight);
  return {y: y, hh: hh};
}

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;
  const s = theme.shapes.lineSpacing;
  const width = '400px';

  let hh = '0px';
  hh = Unit.add (hh, theme.shapes.mainTabHeight);
  hh = Unit.add (hh, theme.shapes.containerMargin);
  hh = Unit.add (hh, theme.shapes.viewTabHeight);
  hh = Unit.add (hh, theme.shapes.footerHeight);
  hh = Unit.add (hh, '50px'); // security margin if view-tabs has many lines
  const mh = 'calc(100vh - ' + hh + ')';

  const panelStyle = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    overflowY: 'hidden',
    maxHeight: mh,
    minWidth: width,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: theme.palette.notificationBackground,
    transition: theme.transitions.easeOut (),
  };

  const panelHiddenStyle = {
    position: 'absolute',
    top: '0px',
    right: Unit.multiply (width, -1),
    overflowY: 'hidden',
    maxHeight: mh,
    minWidth: width,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: theme.palette.notificationBackground,
    transition: theme.transitions.easeOut (),
  };

  const headerStyle = {
    display: 'inline',
    flexGrow: '1',
    padding: Unit.multiply (m, 0.5) + ' ' + m,
    margin: '0px 0px ' + Unit.multiply (s, 0.4) + ' 0px',
    backgroundColor: theme.palette.notificationBackgroundHeader,
    color: theme.palette.notificationText,
  };

  const headerRowStyle = {
    minHeight: '32px',
    display: 'flex',
    flexDirection: 'row',
  };

  const notificationsStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: null,
    overflowY: 'auto',
  };

  return {
    panel: panelStyle,
    panelHidden: panelHiddenStyle,
    header: headerStyle,
    headerRow: headerRowStyle,
    notifications: notificationsStyle,
  };
}

/******************************************************************************/
