/******************************************************************************/
export const propNames = ['itemHeight', 'itemWidth'];

export default function styles(theme, props) {
  let {itemHeight, itemWidth} = props;

  itemHeight = itemHeight
    ? itemHeight.endsWith('px')
      ? itemHeight
      : itemHeight + 'px'
    : '35px';
  itemWidth = itemWidth
    ? itemWidth.endsWith('px')
      ? itemWidth
      : itemWidth + 'px'
    : '300px';

  const container = {
    display: 'flex',
    flexGrow: 'none',
  };

  const item = {
    display: 'flex',
    height: itemHeight,
    width: itemWidth,
    justifyContent: 'center',
  };

  return {
    container,
    item,
  };
}

/******************************************************************************/
