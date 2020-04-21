import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['layout', 'frame', 'layoutFrame', 'color', 'scale'];

export default function styles(theme, props) {
  const {layout, frame, layoutFrame, color, scale} = props;

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

  const widgetDocPreviewContainer = {
    margin: '10px 0px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor,
    color: ColorManipulator.emphasize(backgroundColor, 1),
    ...scaleStyle,
    ...frameStyle,
    ...layoutFrameStyle,
  };

  if (layout === 'fix') {
    widgetDocPreviewContainer.minWidth = '500px';
    widgetDocPreviewContainer.maxWidth = '500px';
    widgetDocPreviewContainer.minHeight = '500px';
    widgetDocPreviewContainer.maxHeight = '500px';
    widgetDocPreviewContainer.border = '2px dashed #888';
  }

  const grow = {
    flexGrow: 1,
  };

  return {
    widgetDocPreviewContainer,
    grow,
  };
}

/******************************************************************************/
