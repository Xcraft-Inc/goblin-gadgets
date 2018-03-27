import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme, props) {
  const tableBoxStyle = {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid ' + theme.palette.tableBorder,
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
    tableBox: tableBoxStyle,
    detailBox: detailBoxStyle,
  };
}

/******************************************************************************/
