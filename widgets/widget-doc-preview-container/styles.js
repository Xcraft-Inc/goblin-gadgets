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
    frameStyle.outline = '1px dashed red';
  }
  if (scale && scale !== 1) {
    frameStyle.transform = `scale(${scale})`;
    frameStyle.transformOrigin = 'top left';
    // frameStyle.width = `${100 / scale}%`;
    // frameStyle.height = `${100 / scale}%`;
  }

  const layoutFrameStyle = {};
  if (layoutFrame) {
    layoutFrameStyle.outline = '1px dashed green';
  }

  const r = container === 'resizable';
  const frameKey = r ? '& > div > div > div > *' : '& > div > *';
  const layoutFramekey = r ? '& > div > div > div' : '& > div';

  const backgroundColor = theme.palette[color + 'Background'];

  const widgetDocPreviewContainer = {
    margin: '10px 0px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor,
    color: ColorManipulator.emphasize(backgroundColor, 1),
    [frameKey]: frameStyle,
    [layoutFramekey]: layoutFrameStyle,
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
