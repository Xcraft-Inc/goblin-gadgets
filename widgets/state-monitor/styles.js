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
    backgroundColor: '#222',
    color: '#0a0',
    border: '5px solid #aaa',
    borderRadius: look === 'retro' ? '20px' : '3px',
    boxShadow:
      look === 'retro' ? '0px 0px 50px 0px black' : '0px 0px 25px 0px black',
    overflow: 'hidden',
  };

  const title = {
    height: '36px',
    backgroundColor: '#ccc',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
  };

  const tree = {
    padding: '0px',
    flexGrow: 1,
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
