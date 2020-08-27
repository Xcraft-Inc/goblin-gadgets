import {ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

export const propNames = ['width', 'height', 'grow', 'status'];

export default function styles(theme, props) {
  const {width, height, grow, status} = props;

  const locked = status === 'locked';

  const cornerColor = locked
    ? ColorManipulator.darken(theme.palette.base, 0.8)
    : ColorManipulator.lighten(theme.palette.base, 0.2);

  const centerColor = locked
    ? ColorManipulator.darken(theme.palette.base, 0.2)
    : ColorManipulator.lighten(theme.palette.base, 0.4);

  const guildEntry = {
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
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const title = {
    margin: '0px 15% 20px 15%',
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    textAlign: 'center',
  };

  const leds = {
    margin: '50px 0px 0px 0px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    transform: 'scale(1.5)',
  };

  const footer = {
    width: '100%',
    height: '150px',
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
    transform: 'scale(1.5)',
  };

  /******************************************************************************/

  return {
    guildEntry,
    header,
    content,
    title,
    leds,
    footer,
    buttons,
  };
}

/******************************************************************************/
