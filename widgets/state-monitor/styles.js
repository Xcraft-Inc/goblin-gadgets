/******************************************************************************/

export const propNames = ['width', 'height'];

export default function styles(theme, props) {
  const {width, height} = props;

  let stateMonitor = {
    width: width,
    height: height,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, black 0px, #222 15px)',
    color: '#0a0',
    overflow: 'hidden',
  };

  const filter = {
    padding: '20px 20px 0px 20px',
    display: 'flex',
    flexDirection: 'row',
  };

  const emptyTree = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const tree = {
    padding: '0px',
    height: 0,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  /******************************************************************************/

  return {
    stateMonitor,
    filter,
    emptyTree,
    tree,
  };
}

/******************************************************************************/
