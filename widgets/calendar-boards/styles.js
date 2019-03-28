/******************************************************************************/

export default function styles(theme) {
  const radioBoxStyle = {
    width: '400px',
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
    overflowY: 'auto',
  };

  return {
    radioBox: radioBoxStyle,
    detailBox: detailBoxStyle,
  };
}

/******************************************************************************/
