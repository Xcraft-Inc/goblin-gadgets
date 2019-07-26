/******************************************************************************/

export const propNames = [
  'type',
  'look',
  'width',
  'dateTimeColor',
  'backgroundColor',
  'textColor',
  'transition',
];

export default function styles(theme, props) {
  const {
    type,
    look = 'round',
    width,
    dateTimeColor = theme.palette.textColor,
    backgroundColor = theme.palette.rootBackground,
    textColor = theme.palette.textColor,
    transition = '0.2s ease-out',
  } = props;

  let dateTimeMargin,
    borderRadius,
    justifyContent,
    messageBoxMargin,
    balloonMargin,
    triangleLeft,
    triangleRight,
    triangleLeftColor,
    triangleRightColor,
    triangleTop,
    documentRadius;

  switch (look) {
    case 'smooth':
      dateTimeMargin = '0px 0px 3px 0px';
      triangleTop = '0px';
      documentRadius = '8px';
      break;
    case 'round':
      dateTimeMargin = '0px 0px 3px 0px';
      triangleTop = '0px';
      documentRadius = '50px';
      break;
    default:
      dateTimeMargin = '0px 30px 3px 30px';
      triangleTop = '10px';
      documentRadius = '8px';
      break;
  }

  switch (type) {
    case 'sended':
      switch (look) {
        case 'smooth':
          borderRadius = '10px 0px 10px 10px';
          break;
        case 'round':
          borderRadius = '40px 0px 40px 40px';
          break;
        default:
          borderRadius = '10px';
          break;
      }
      justifyContent = 'flex-end';
      messageBoxMargin = '0px 0px 0px 100px';
      balloonMargin = '0px 20px 0px 0px';
      triangleRight = '-40px';
      triangleLeftColor = backgroundColor;
      triangleRightColor = 'transparent';
      break;
    case 'received':
      switch (look) {
        case 'smooth':
          borderRadius = '0px 10px 10px 10px';
          break;
        case 'round':
          borderRadius = '0px 40px 40px 40px';
          break;
        default:
          borderRadius = '10px';
          break;
      }
      justifyContent = 'flex-start';
      messageBoxMargin = '0px 100px 0px 0px';
      balloonMargin = '0px 0px 0px 20px';
      triangleLeft = '-40px';
      triangleLeftColor = 'transparent';
      triangleRightColor = backgroundColor;
      break;
  }

  const chatBalloon = {
    width: width,
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  };

  const dateTime = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: justifyContent,
    color: dateTimeColor,
    fontSize: '80%',
    margin: dateTimeMargin,
  };

  const columns = {
    display: 'flex',
    flexDirection: 'row',
  };

  const boxBalloon = {
    margin: messageBoxMargin,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: justifyContent,
  };

  const balloon = {
    margin: balloonMargin,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius,
    color: textColor,
    backgroundColor: backgroundColor,
  };

  const message = {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
  };

  const magnifyingGlass = {
    'margin': '0px 5px 0px -20px',
    'padding': '0px',
    'minWidth': '50px',
    'minHeight': '50px',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': documentRadius,
    'userSelect': 'none',
    'color': '#ddd',
    'fontSize': '150%',
    'transition': transition,
    ':hover': {
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,0.2)',
      fontSize: '180%',
    },
  };

  const triangle = {
    position: 'absolute',
    width: '0px',
    height: '0px',
    top: triangleTop,
    left: triangleLeft,
    right: triangleRight,
    borderLeft: `20px solid ${triangleLeftColor}`,
    borderRight: `20px solid ${triangleRightColor}`,
    borderTop: `0px solid transparent`,
    borderBottom: `15px solid transparent`,
  };

  return {
    chatBalloon,
    dateTime,
    columns,
    boxBalloon,
    balloon,
    message,
    magnifyingGlass,
    triangle,
  };
}

/******************************************************************************/
