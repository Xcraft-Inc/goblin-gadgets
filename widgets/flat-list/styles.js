/******************************************************************************/

export const propNames = ['direction'];

export default function styles(theme, props) {
  const {direction} = props;

  const box = {
    display: 'flex',
    flexDirection: direction || 'column',
    backgroundColor: 'white',
    boxShadow: theme.shapes.calendarShadow,
    overflowX: 'hidden',
    overflowY: 'auto',
    cursor: 'default',
    userSelect: 'none',
  };

  return {
    box,
  };
}

/******************************************************************************/
