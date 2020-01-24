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

  const content = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    display: 'flex',
    flexDirection: 'column',
  };

  const header = {
    position: 'relative',
    height: '50px',
    minHeight: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '3px 3px 0px 0px',
    backgroundColor: theme.palette.stateBrowserHeaderBackground,
  };

  const back = {
    'position': 'absolute',
    'top': '5px',
    'left': '5px',
    'width': '40px',
    'height': '40px',
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '3px',
    'fontSize': '120%',
    'color': theme.palette.stateBrowserBackText,
    'background': theme.palette.stateBrowserBackBackground,
    ':hover': {
      background: theme.palette.stateBrowserBackBackgroundHover,
    },
  };

  const headerPath = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '120%',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.stateBrowserBackText,
  };

  const scrollable = {
    padding: '20px',
    overflowY: 'auto',
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
    content,
    header,
    back,
    headerPath,
    scrollable,

    item,
    itemName,
    itemType,
  };
}

/******************************************************************************/
