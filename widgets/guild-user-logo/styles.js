import {ColorHelpers} from 'goblin-theme';
import {Unit} from 'goblin-theme';
import GuildHelpers from '../guild-user-logo/guild-helpers';

/******************************************************************************/

export const propNames = ['size', 'color', 'shape', 'initials', 'onClick'];

export default function styles(theme, props) {
  let {size = '50px', color, shape, initials = '?', onClick} = props;

  color = GuildHelpers.getLogoColor(color);
  shape = GuildHelpers.getLogoShape(shape);

  const guildUserLogo = {
    'position': 'relative',
    'width': size,
    'height': size,
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'transition': theme.transitions.hover,
    ':hover': {
      transform: onClick ? 'scale(1.1)' : null,
    },
  };

  const glyph = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: ColorHelpers.getMarkColor(theme, color),
    fontSize: size,
  };

  const top =
    {
      triangle: Unit.multiply(size, 0.3),
      heart: Unit.multiply(size, -0.1),
      star: Unit.multiply(size, 0.1),
    }[shape] || 0;

  const fontFactor =
    {
      1: 0.6,
      2: 0.5,
      3: 0.3,
    }[initials.length] || 0.3;

  const text = {
    position: 'absolute',
    left: 0,
    right: 0,
    top,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: Unit.multiply(size, fontFactor),
    textShadow:
      '-1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000, -1px 0px 0px #000, 0px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000, 1px 1px 0px #000',
  };

  const photo = {
    margin: '0px',
    width: '100%',
    transition: theme.transitions.hover,
  };

  /******************************************************************************/

  return {
    guildUserLogo,
    glyph,
    text,
    photo,
  };
}

/******************************************************************************/
