import {Unit} from 'goblin-theme';

/******************************************************************************/

export default function styles(theme) {
  const m = theme.shapes.containerMargin;

  const panesStyle = {
    overflow: 'hidden',
    padding: '0px ' + m + ' 0px ' + m,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  };

  return {
    panes: panesStyle,
  };
}

/******************************************************************************/
