/******************************************************************************/

export default function styles(theme) {
  const clockCombo = {
    height: '170px',
    width: '330px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.calendarBackground,
    boxShadow: theme.shapes.flyingShadow,
  };

  const part = {
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const vsep = {
    height: '2px',
  };

  const clock = {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  return {
    clockCombo,
    part,
    vsep,
    clock,
  };
}

/******************************************************************************/
