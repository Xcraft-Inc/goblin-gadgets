import ReactDOM from 'react-dom';
import {Unit} from 'electrum-theme';

/******************************************************************************/

function getPosition (theme) {
  if (
    window.document.notificationsButtons &&
    window.document.notificationsButtons.length > 0
  ) {
    const node = ReactDOM.findDOMNode (window.document.notificationsButtons[0]);
    const rect = node.getBoundingClientRect ();
    return '200px';
  } else {
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
}

export default function styles (theme, props) {
  const width = '400px';
  const p = getPosition (theme);

  const panelStyle = {
    minWidth: width,
    maxHeight: 'calc(100vh - ' + p.hh + ')',
    position: 'fixed',
    top: p.y,
    right: '0px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: theme.palette.notificationBackground,
    transition: theme.transitions.easeOut (),
    zIndex: 4,
  };

  const panelHiddenStyle = {
    minWidth: width,
    maxHeight: 'calc(100vh - ' + p.hh + ')',
    position: 'fixed',
    top: p.y,
    right: Unit.multiply (width, -1),
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: theme.palette.notificationBackground,
    transition: theme.transitions.easeOut (),
    zIndex: 4,
  };

  return {
    panel: panelStyle,
    panelHidden: panelHiddenStyle,
  };
}

/******************************************************************************/
