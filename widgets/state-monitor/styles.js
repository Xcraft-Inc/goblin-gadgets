import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'height'];

export default function styles(theme, props) {
  const {width, height} = props;

  const look = theme.look.name;

  let stateMonitor = {
    width: width,
    height: height,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#222',
    color: '#0f0',
    border: '1px solid black',
    borderRadius: look === 'retro' ? '20px' : '3px',
    boxShadow: look === 'retro' ? '0px 0px 50px 0px black' : null,
    overflow: 'hidden',
  };

  const filter = {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 0px 10px 0px',
  };

  const tree = {
    backgroundColor: '#333',
  };

  /******************************************************************************/

  return {
    stateMonitor,
    filter,
    tree,
  };
}

/******************************************************************************/
