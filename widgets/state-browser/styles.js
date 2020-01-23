/******************************************************************************/
export const propNames = ['itemHeight', 'itemWidth'];

export default function styles(theme, props) {
  let {itemHeight = '35px', itemWidth = '300px'} = props;
  if (!itemHeight.endsWith('px')) {
    itemHeight += 'px';
  }
  if (!itemWidth.endsWith('px')) {
    itemWidth += 'px';
  }

  const container = {
    display: 'flex',
    flexGrow: 'none',
  };

  const overflow = {
    overflow: 'auto',
  };

  const item = {
    display: 'flex',
    minHeight: itemHeight,
    minWidth: itemWidth,
    justifyContent: 'center',
  };

  return {
    container,
    overflow,
    item,
  };
}

/******************************************************************************/
