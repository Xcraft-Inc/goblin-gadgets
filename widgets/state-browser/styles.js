/******************************************************************************/
export const propNames = ['itemHeight', 'itemWidth', 'width', 'grow'];

export default function styles(theme, props) {
  let {
    itemHeight = '32px',
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

  const back = {
    'marginBottom': '20px',
    'height': '40px',
    'padding': '0px 10px',
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'borderBottom': `1px solid ${theme.palette.buttonDisableBorder}`,
    ':hover': {
      background: theme.palette.facetBackgroundHover,
    },
  };

  const item = {
    'height': itemHeight,
    'padding': '0px 10px',
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'borderRadius': '3px',
    ':hover': {
      background: theme.palette.facetBackgroundHover,
    },
  };

  const itemName = {
    flexGrow: 1,
  };

  const itemType = {
    fontSize: '80%',
    opacity: 0.6,
  };

  return {
    container,
    overflow,

    back,

    item,
    itemName,
    itemType,
  };
}

/******************************************************************************/
