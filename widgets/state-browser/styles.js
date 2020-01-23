/******************************************************************************/
export const propNames = ['itemHeight', 'itemWidth', 'width', 'grow'];

export default function styles(theme, props) {
  let {
    itemHeight = '35px',
    itemWidth = '300px',
    width = '100%',
    grow = '1',
  } = props;
  if (!itemHeight.endsWith('px')) {
    itemHeight += 'px';
  }
  if (!itemWidth.endsWith('px')) {
    itemWidth += 'px';
  }

  const container = {
    display: 'flex',
    width,
    grow,
  };

  const overflow = {
    overflow: 'auto',
  };

  return {
    container,
    overflow,
  };
}

/******************************************************************************/
