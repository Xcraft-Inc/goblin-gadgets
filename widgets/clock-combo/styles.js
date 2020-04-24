/******************************************************************************/

export default function styles(theme) {
  const clockCombo = {
    height: '220px',
    width: '400px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.calendarBackground,
    boxShadow: theme.shapes.flyingShadow,
  };

  const part = {
    marginRight: '10px',
    padding: '2px',
    border: `1px solid ${theme.palette.buttonBorder}`,
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
