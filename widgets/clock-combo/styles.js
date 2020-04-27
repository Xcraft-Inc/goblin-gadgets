import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export default function styles(theme) {
  const clockCombo = {
    height: '200px',
    width: '360px',
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
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.9)',
  };

  const button = {
    'width': '48px',
    'height': '48px',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '24px',
    'corsor': 'pointer',
    'color': theme.palette.text,
    'backgroundColor': theme.palette.buttonBackground,
    'transition': '0.2s ease-out',
    ':hover': {
      backgroundColor: ColorManipulator.emphasize(
        theme.palette.buttonBackground,
        0.1
      ),
    },
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
    button,
    clock,
  };
}

/******************************************************************************/
