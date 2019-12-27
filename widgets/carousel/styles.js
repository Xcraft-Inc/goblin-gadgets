import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'maxWidth',
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
    bottom: bullets ? '30px' : '0px', // keep space for navigator
    left: '0px',
    right: '0px',
  };

  const navigatorStyle = {
    height: '20px',
    margin: '10px 0px 0px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  /******************************************************************************/

  let top = buttonsTop;
  if (buttonsCenter) {
    top = `calc(50% - 15px - ${Unit.multiply(
      buttonsSize,
      0.5
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
