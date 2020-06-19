/******************************************************************************/

export const propNames = ['grow', 'width'];

export default function styles(theme, props) {
  const {grow, width = '400px'} = props;

  const colorPicker = {
    flexGrow: grow,
    width: width,
    minWidth: '280px',
    height: '165px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: '3px',
  };

  const modes = {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    backgroundColor: '#eee',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.buttonBorder}`,
  };

  const content = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: '5px',
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
    height: '110px',
    width: '110px',
    minWidth: '20px',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: '5px',
  };

  /******************************************************************************/

  return {
    colorPicker,
    modes,
    content,
    composants,
    composant,
    sample,
  };
}

/******************************************************************************/
