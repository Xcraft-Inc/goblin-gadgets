/******************************************************************************/

export const propNames = ['background'];

export default function styles(theme, props) {
  const {background = 'cyan'} = props;

  const launcher = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    display: 'flex',
    flexDirection: 'column',
    background: background,
    overflow: 'hidden',
    transition: '0.5s ease-in-out',
  };

  const title = {
    margin: '20px 0px 0px 0px ',
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'uppercase',
    color: '#eee',
  };

  const rockets = {
    flexGrow: 1,
    padding: '10px 10px 0px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflowY: 'auto',
  };

  return {
    launcher,
    title,
    rockets,
  };
}

/******************************************************************************/
