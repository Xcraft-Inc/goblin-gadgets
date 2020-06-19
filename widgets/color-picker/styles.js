import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['grow', 'width'];

export default function styles(theme, props) {
  const {grow, width = '400px'} = props;

  const colorPicker = {
    flexGrow: grow,
    width: width,
    minWidth: '340px',
    height: '225px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '3px',
    backgroundColor: theme.palette.calendarBackground,
    boxShadow: theme.shapes.flyingShadow,
  };

  const modes = {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    backgroundColor: ColorManipulator.emphasize(
      theme.palette.calendarBackground,
      0.1
    ),
    alignItems: 'center',
    borderRadius: '3px 3px 0px 0px',
  };

  const content = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: '20px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2), transparent 12%)',
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
