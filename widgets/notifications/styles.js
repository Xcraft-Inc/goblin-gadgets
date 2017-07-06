import ReactDOM from 'react-dom';
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
  const width = '400px';
  const p = getPosition (theme);

  const panelStyle = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    minWidth: width,
    maxHeight: 'calc(100vh - ' + p.hh + ')',
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
    minWidth: width,
    maxHeight: 'calc(100vh - ' + p.hh + ')',
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    backgroundColor: theme.palette.notificationBackground,
    transition: theme.transitions.easeOut (),
  };

  return {
    panel: panelStyle,
    panelHidden: panelHiddenStyle,
  };
}

/******************************************************************************/
