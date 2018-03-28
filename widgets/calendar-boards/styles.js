import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const radioBoxStyle = {
    width: '200px',
    display: 'flex',
    padding: '0px 10px',
    flexDirection: 'column',
  };

  const detailBoxStyle = {
    height: '240px',
    maxHeight: '240px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    border: '1px solid ' + theme.palette.tableBorder,
  };

  return {
    radioBox: radioBoxStyle,
    detailBox: detailBoxStyle,
  };
}

/******************************************************************************/
