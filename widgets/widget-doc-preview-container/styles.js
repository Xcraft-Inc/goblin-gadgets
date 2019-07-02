import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['frame', 'layoutFrame', 'color', 'scale'];

export default function styles(theme, props) {
  const {frame, layoutFrame, color, scale} = props;

  const frameStyle = frame
    ? {
        '& > div > *': {
          outline: '1px solid red',
        },
      }
    : null;

  const layoutFrameStyle = layoutFrame
    ? {
        '& > div': {
          outline: '1px solid green',
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
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor,
    color: ColorManipulator.emphasize(backgroundColor, 1),
    ...scaleStyle,
    ...frameStyle,
    ...layoutFrameStyle,
  };

  const grow = {
    flexGrow: '1',
  };

  return {
    previewContainer,
    grow,
  };
}

/******************************************************************************/
