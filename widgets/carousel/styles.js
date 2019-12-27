import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'maxWidth',
  'itemMargin',
  'buttonsSize',
  'buttonsTop',
  'buttonsBottom',
  'buttonsCenter',
  'buttonsShift',
  'navigator',
];

export default function styles(theme, props) {
  const {
    maxWidth,
    itemMargin = '0px',
    buttonsSize = '40px',
    buttonsTop,
    buttonsBottom,
    buttonsShift = '0px',
    buttonsCenter,
    navigator,
  } = props;

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

  let top = buttonsTop;
  if (buttonsCenter) {
    top = `calc(50% - ${Unit.multiply(buttonsSize, 0.5)} - ${Unit.multiply(
      itemMargin,
      2
    )} + ${buttonsCenter})`;
  }

  const buttonPrev = {
    position: 'absolute',
    top: top,
    bottom: buttonsBottom,
    left: buttonsShift,
  };

  const buttonNext = {
    position: 'absolute',
    top: top,
    bottom: buttonsBottom,
    right: buttonsShift,
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
