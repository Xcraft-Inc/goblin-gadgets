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
    flexDirection: 'row',
    background: background,
    overflow: 'hidden',
    transition: '0.5s ease-in-out',
  };

  const title = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '5%',
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'uppercase',
    color: '#eee',
  };

  const rockets = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
    paddingTop: '5%',
  };

  return {
    launcher,
    title,
    rockets,
  };
}

/******************************************************************************/
