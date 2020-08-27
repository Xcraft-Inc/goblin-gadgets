import {ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

export const propNames = ['width', 'height', 'grow'];

export default function styles(theme, props) {
  const {width, height, grow} = props;

  const cornerColor = ColorManipulator.darken(theme.palette.base, 0.3);
  const centerColor = ColorManipulator.lighten(theme.palette.base, 0.2);

  const guildUserProfile = {
    width: width,
    height: height,
    flexGrow: grow,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(at 50% 50%, ${centerColor}, ${cornerColor} 88%)`,
    transition: 'all 2s ease-out',
  };

  const header = {
    width: '100%',
    height: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    background: '#000',
    color: '#ccc',
  };

  const content = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const fields = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'white',
  };

  const title = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '40px',
    marginBottom: '10px',
    fontSize: '150%',
  };

  const field = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
  };

  const logo = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const footer = {
    width: '100%',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  };

  const buttons = {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  };

  /******************************************************************************/

  return {
    guildUserProfile,
    header,
    content,
    fields,
    title,
    field,
    logo,
    footer,
    buttons,
  };
}

/******************************************************************************/
