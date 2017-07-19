import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  const m = theme.shapes.containerMargin;

  const panesStyle = {
    overflow: 'hidden',
    padding: '0px ' + m + ' 0px ' + m,
  };

  const soloStyle = {
    display: 'flex',
    flexDirection: 'row',
    transform: 'scale(3)',
    transformOrigin: 'top left',
    width: '33%',
    height: '200px',
  };

  return {
    solo: soloStyle,
    panes: panesStyle,
  };
}

/******************************************************************************/
