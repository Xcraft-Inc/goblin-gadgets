import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['frame', 'color', 'scale'];

export default function styles(theme, props) {
  const {frame, color, scale} = props;

  const frameStyle = frame
    ? {
        '& > div > *': {
          outline: '1px solid red',
        },
      }
    : null;

  const backgroundColor = theme.palette[color + 'Background'];

  const scaleStyle =
    scale !== 1
      ? {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
        }
      : null;

  const previewContainer = {
    margin: '10px 0px',
    display: 'flex',
    // flexDirection: 'column',
    flexGrow: '1',
    backgroundColor,
    color: ColorManipulator.emphasize(backgroundColor, 1),
    ...scaleStyle,
    ...frameStyle,
  };

  return {
    previewContainer,
  };
}

/******************************************************************************/
