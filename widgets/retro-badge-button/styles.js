import {Unit} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'grow',
  'visibility',
  'disabled',
  'readonly',
  'border',
];

export function mapProps(props) {
  return {
    ...props,
    text: Boolean(props.text),
  };
}

export default function styles(theme, props) {
  let {
    width,
    height,
    grow,
    visibility,
    disabled,
    readonly,
    border = 'silver',
  } = props;

  const borderColor = border === 'gold' ? theme.palette.chrome : '#aaa';

  const borderTop = `5px solid ${ColorManipulator.darken(borderColor, 0.0)}`;
  const borderBottom = `5px solid ${ColorManipulator.darken(
    borderColor,
    0.15
  )}`;
  const borderLeft = `5px solid ${ColorManipulator.darken(borderColor, 0.0)}`;
  const borderRight = `5px solid ${ColorManipulator.darken(borderColor, 0.15)}`;

  const c1 = theme.palette.base;
  const c2 = ColorManipulator.darken(theme.palette.base, 0.8);
  const background = `radial-gradient(at 25% 25%, ${c1} 40%, ${c2} 80%)`;

  const c1h = ColorManipulator.lighten(theme.palette.base, 0.1);
  const c2h = ColorManipulator.darken(theme.palette.base, 0.9);
  const backgroundHover = `radial-gradient(at 25% 25%, ${c1h} 40%, ${c2h} 80%)`;

  const shadow = '3px 5px 21px 2px rgba(0,0,0,0.7)';

  const retroBadgeButton = {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 10px 8px 0px',
  };

  const button = {
    'position': 'relative',
    'width': width,
    'height': height,
    'margin': '0px 5px 0px 0px',
    'padding': '0px 40px',
    'flexGrow': grow,
    'alignItems': 'center',
    'borderRadius': '50px',
    'borderTop': borderTop,
    'borderBottom': borderBottom,
    'borderLeft': borderLeft,
    'borderRight': borderRight,
    'background': background,
    'boxShadow': shadow,
    ':hover': {background: backgroundHover},
  };

  /******************************************************************************/

  return {
    retroBadgeButton,
    button,
  };
}

/******************************************************************************/
