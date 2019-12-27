/******************************************************************************/

export const propNames = ['maxWidth', 'itemMargin', 'buttonsTop'];

export default function styles(theme, props) {
  const {maxWidth, buttonsTop} = props;

  const carousel = {
    width: maxWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const carouselShrinked = {
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
    top: buttonsTop,
    left: '0px',
    // left: itemMargin,
  };

  const buttonNext = {
    position: 'absolute',
    top: buttonsTop,
    right: '0px',
    // right: itemMargin,
  };

  /******************************************************************************/

  return {
    carousel,
    carouselShrinked,
    horizontalBand,

    touchLayer,
    navigator,

    buttonPrev,
    buttonNext,
  };
}

/******************************************************************************/
