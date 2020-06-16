/******************************************************************************/

//  Compute the color of gauge.
function getColor(gradient, value, alpha) {
  if (value) {
    value /= 100; // 0..1
    let red, green, blue;
    if (gradient === 'red-yellow-green') {
      if (value < 0.5) {
        // From red to yellow.
        value = value * 2; // 0..1
        red = 255;
        green = 255 * value; // 0/1 -> 0/255
      } else {
        // From yellow to green.
        value = (value - 0.5) * 2; // 0..1
        red = 255 - 255 * value; // 0/1 -> 255/0
        green = 255;
      }
      blue = 0;
    } else if (gradient === 'yellow-green') {
      // From yellow to green.
      red = 255 - 255 * value; // 0/1 -> 255/0
      green = 255;
      blue = 0;
    } else if (gradient === 'blue-petrol-green') {
      if (value < 0.5) {
        // From blue to purple.
        value = value * 2; // 0..1
        blue = 255;
        red = 0;
        green = 255 * value; // 0/1 -> 0/255
      } else {
        // From purple to green.
        value = (value - 0.5) * 2; // 0..1
        blue = 255 - 255 * value; // 0/1 -> 255/0
        green = 255;
      }
      red = 0;
    } else {
      // From orange to red.
      red = 255;
      green = 128 - 128 * value; // 0/1 -> 128/0
      blue = 0;
    }
    return `rgba(${Math.floor(red)},${Math.floor(green)},${Math.floor(
      blue
    )},${alpha})`;
  } else {
    return '#fff';
  }
}

/******************************************************************************/

export const propNames = [
  'gradient',
  'value',
  'alpha',
  'width',
  'height',
  'grow',
  'margin',
  'padding',
  'radius',
];

export default function styles(theme, props) {
  const {
    gradient = 'red-yellow-green',
    value,
    alpha = 1,
    width,
    height,
    grow,
    margin,
    padding,
    radius,
  } = props;

  const gaugeValue = Math.max(Math.min(value, 100), 0); // 0..100

  const colorerContainer = {
    flexDirection: 'column',
    height: height,
    width: width,
    margin: margin,
    padding: padding,
    borderRadius: radius,
    display: 'flex',
    flexGrow: grow,
    backgroundColor: getColor(gradient, gaugeValue, alpha),
  };

  return {
    colorerContainer,
  };
}

/******************************************************************************/
