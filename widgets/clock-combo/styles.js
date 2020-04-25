/******************************************************************************/

export default function styles(theme) {
  const clockCombo = {
    height: '240px',
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
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.9)',
  };

  const vsep = {
    height: '5px',
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
