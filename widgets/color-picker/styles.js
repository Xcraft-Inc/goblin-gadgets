import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['grow', 'width'];

export default function styles(theme, props) {
  const {grow, width = '400px'} = props;

  const isDark = theme.colors.isDarkTheme;
  const r = theme.shapes.smoothRadius;

  const colorPicker = {
    flexGrow: grow,
    width: width,
    minWidth: '340px',
    height: '282px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: r,
    backgroundColor: theme.palette.calendarBackground,
    boxShadow: theme.shapes.flyingShadow,
  };

  const modes = {
    padding: '20px 5px 20px 20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: `${r} ${r} 0px 0px`,
  };

  const content = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-end',
    background: isDark
      ? 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent 12%)'
      : 'linear-gradient(180deg, rgba(0,0,0,0.2), transparent 12%)',
  };

  const composants = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const composantFirst = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const composantNext = {
    ...composantFirst,
    margin: '10px 0px 0px 0px',
  };

  const composantHsl = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  };

  const rs = Unit.multiply(r, 3);
  const samples = {
    height: '100%',
    width: '110px',
    minWidth: '20px',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: rs,
    display: 'flex',
    flexDirection: 'column',
  };

  const sampleUp = {
    flexGrow: 1,
    borderRadius: `${rs} ${rs} 0px 0px`,
  };

  const sampleDown = {
    flexGrow: 1,
    borderRadius: `0px 0px ${rs} ${rs}`,
  };

  /******************************************************************************/

  return {
    colorPicker,
    modes,
    content,
    composants,
    composantFirst,
    composantNext,
    composantHsl,
    samples,
    sampleUp,
    sampleDown,
  };
}

/******************************************************************************/
