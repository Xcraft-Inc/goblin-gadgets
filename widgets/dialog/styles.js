/******************************************************************************/

export const propNames = ['width', 'height', 'backgroundColor', 'boxShadow'];

export default function styles(theme, props) {
  const {width, height, backgroundColor, boxShadow} = props;

  const box = {
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    boxShadow: boxShadow,
    zIndex: '2',
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    margin: 'auto',
  };

  return {
    box,
  };
}

/******************************************************************************/
