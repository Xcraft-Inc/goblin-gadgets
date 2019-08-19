import {ColorHelpers} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'type',
  'look',
  'width',
  'dateTimeColor',
  'backgroundColor',
  'textColor',
];

export default function styles(theme, props) {
  let {
    type = 'sended',
    look = 'round',
    width,
    dateTimeColor = '#888',
    backgroundColor = theme.palette.rootBackground,
    textColor = theme.palette.textColor,
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
    triangleTop;

  switch (look) {
    case 'smooth':
      dateTimeMargin = '0px 0px 3px 0px';
      triangleTop = '0px';
      break;
    case 'round':
      dateTimeMargin = '0px 0px 3px 0px';
      triangleTop = '0px';
      break;
    default:
      dateTimeMargin = '0px 30px 3px 30px';
      triangleTop = '10px';
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

  dateTimeColor = ColorHelpers.getMarkColor(theme, dateTimeColor);
  backgroundColor = ColorHelpers.getMarkColor(theme, backgroundColor);
  textColor = ColorHelpers.getMarkColor(theme, textColor);

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
    padding: '10px 20px',
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
    triangle,
  };
}

/******************************************************************************/
