/******************************************************************************/

export default function styles(theme) {
  const carousel = {
    position: 'relative',
    alignSelf: 'center',
    overflowX: 'hidden',
    overflowY: 'hidden',
  };

  const horizontalBand = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    transition: '0.3s ease-out',
  };

  /******************************************************************************/

  const touchLayer = {
    position: 'absolute',
    top: '0px',
    bottom: '40px', // keep space for navigator
    //? bottom: '0px',
    left: '0px',
    right: '0px',
  };

  const navigator = {
    margin: '0px 0px 20px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  /******************************************************************************/

  const buttonPrev = {
    position: 'absolute',
    top: '180px',
    left: '10px',
  };

  const buttonNext = {
    position: 'absolute',
    top: '180px',
    right: '10px',
  };

  /******************************************************************************/

  return {
    carousel,
    horizontalBand,

    touchLayer,
    navigator,

    buttonPrev,
    buttonNext,
  };
}

/******************************************************************************/
