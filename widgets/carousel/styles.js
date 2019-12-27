/******************************************************************************/

export const propNames = ['maxWidth', 'buttonsTop', 'navigator'];

export default function styles(theme, props) {
  const {maxWidth, buttonsTop, navigator} = props;

  const bullets = navigator === 'bullets';

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
    bottom: bullets ? '40px' : '0px', // keep space for navigator
    left: '0px',
    right: '0px',
  };

  const navigatorStyle = {
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
  };

  const buttonNext = {
    position: 'absolute',
    top: buttonsTop,
    right: '0px',
  };

  /******************************************************************************/

  return {
    carousel,
    carouselShrinked,
    horizontalBand,

    touchLayer,
    navigator: navigatorStyle,

    buttonPrev,
    buttonNext,
  };
}

/******************************************************************************/
