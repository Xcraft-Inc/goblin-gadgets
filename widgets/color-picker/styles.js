/******************************************************************************/

export const propNames = ['width'];

export default function styles(theme, props) {
  const {width = '360px'} = props;

  const colorPicker = {
    width: width,
    minWidth: '210px',
    height: '112px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: '3px',
  };

  const composants = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const composant = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0px 0px 5px 0px',
  };

  const sample = {
    width: '112px',
    minWidth: '20px',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: '5px',
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
