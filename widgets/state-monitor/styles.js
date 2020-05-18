/******************************************************************************/

export const propNames = ['width', 'height'];

export default function styles(theme, props) {
  const {width, height} = props;

  const look = theme.look.name;

  let stateMonitor = {
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, black 3%, #222 18%)',
    color: '#0a0',
    border: '5px solid #ddd',
    borderRadius: look === 'retro' ? '20px' : '3px',
    boxShadow: '0px 0px 35px 10px rgba(0,0,0,0.8)',
    overflow: 'hidden',
  };

  const title = {
    height: '36px',
    backgroundColor: '#ddd',
    color: '#333',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    title,
    filter,
    emptyTree,
    tree,
  };
}

/******************************************************************************/
