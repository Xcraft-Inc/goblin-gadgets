/******************************************************************************/

export default function styles() {
  const colorPicker = {
    width: '360px',
    height: '112px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
  };

  const composants = {
    display: 'flex',
    flexDirection: 'column',
  };

  const composant = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0px 0px 5px 0px',
  };

  const sample = {
    margin: '0px 0px 0px 10px',
    flexGrow: 1,
    border: '1px solid black',
  };

  /******************************************************************************/

  return {
    colorPicker,
    composants,
    composant,
    sample,
  };
}

/******************************************************************************/
