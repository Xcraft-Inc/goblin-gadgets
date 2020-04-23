import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'frame',
  'layoutFrame',
  'color',
  'scale',
  'container',
];

export default function styles(theme, props) {
  const {frame, layoutFrame, color, scale, container} = props;

  const frameStyle = {};
  if (frame) {
    if (container === 'resizable') {
      // Skip on move <div>, according to ResizableContainer.
      frameStyle['& > div > div > div > *'] = {
        outline: '1px dashed red',
      };
    } else {
      frameStyle['& > div > *'] = {
        outline: '1px dashed red',
      };
    }
  }

  const layoutFrameStyle = {};
  if (layoutFrame) {
    if (container === 'resizable') {
      // Skip on move <div>, according to ResizableContainer.
      layoutFrameStyle['& > div > div > div'] = {
        outline: '1px dashed green',
      };
    } else {
      layoutFrameStyle['& > div'] = {
        outline: '1px dashed green',
      };
    }
  }

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

  const grow = {
    flexGrow: 1,
  };

  return {
    widgetDocPreviewContainer,
    grow,
  };
}

/******************************************************************************/
