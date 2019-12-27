/******************************************************************************/

export const propNames = ['width', 'height', 'itemMargin', 'backgroundColor'];

export default function styles(theme, props) {
  const {width, height, itemMargin, backgroundColor} = props;

  const carouselItem = {
    minWidth: width,
    height: height,
    flexBasis: 0,
    margin: itemMargin,
    backgroundColor: backgroundColor,
  };

  return {
    carouselItem,
  };
}

/******************************************************************************/
