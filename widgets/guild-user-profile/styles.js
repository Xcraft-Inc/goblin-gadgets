import {ColorManipulator} from 'goblin-theme';
import GuildHelpers from '../guild-user-logo/guild-helpers';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

export const propNames = ['width', 'height', 'grow', 'logoShape'];

export default function styles(theme, props) {
  const {width, height, grow, logoShape = GuildHelpers.getLogoShape()} = props;

  const cornerColor = ColorManipulator.darken(theme.palette.base, 0.6);
  const centerColor = ColorManipulator.lighten(theme.palette.base, 0.1);

  const guildUserProfile = {
    width: width,
    height: height,
    flexGrow: grow,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    background: `radial-gradient(at 50% 40%, ${centerColor}, ${cornerColor} 88%)`,
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

  /******************************************************************************/

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
    marginBottom: '10px',
    fontSize: '150%',
  };

  const field = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '-1px',
  };

  /******************************************************************************/

  const logo = {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Vertical positions, relative to center:
  const topStart = -115;
  const topEnd = -50;
  const bottomStart = 115;
  const bottomEnd = logoShape === 'triangle' ? 60 : 50;

  const logoTopLine = {
    position: 'absolute',
    width: '2px',
    left: 'calc(50% - 1px)',
    top: `calc(50% - ${px(-topStart)})`,
    height: px(-topStart + topEnd),
    backgroundColor: '#000',
  };

  const logoTopCircle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    left: 'calc(50% - 6px)',
    top: `calc(50% - ${px(-topEnd)})`,
    borderRadius: '6px',
    backgroundColor: '#000',
  };

  const logoBottomLine = {
    position: 'absolute',
    width: '2px',
    left: 'calc(50% - 1px)',
    top: `calc(50% + ${px(bottomEnd)})`,
    height: px(bottomStart - bottomEnd),
    backgroundColor: '#000',
  };

  const logoBottomCircle = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    left: 'calc(50% - 6px)',
    top: `calc(50% + ${px(bottomEnd)})`,
    borderRadius: '6px',
    backgroundColor: '#000',
  };

  /******************************************************************************/

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
    logoTopLine,
    logoTopCircle,
    logoBottomLine,
    logoBottomCircle,
    footer,
    buttons,
  };
}

/******************************************************************************/
