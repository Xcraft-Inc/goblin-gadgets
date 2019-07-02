/******************************************************************************/

export default function styles() {
  const childrenDiv = {
    position: 'absolute',
  };
  const safeArea = {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  };

  const horizontalPosition = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  return {
    childrenDiv,
    safeArea,
    horizontalPosition,
  };
}

/******************************************************************************/
