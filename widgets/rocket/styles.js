import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = [
  'size',
  'kind',
  'shadow',
  'iconShadow',
  'disabled',
  'crossed',
  'background',
  'backgroundHover',
  'startedCount',
  'totalCount',
];

export default function styles(theme, props) {
  const {
    size = '200px',
    kind = 'default',
    shadow = false,
    iconShadow = false,
    disabled = false,
    crossed = false,
    background = 'red',
    backgroundHover = 'orange',
    startedCount = 0,
    totalCount = 0,
  } = props;

  const s = n(size);
  const hover =
    !disabled && !crossed && (!totalCount || startedCount < totalCount);

  const rr1 = px(s / 20);
  const rr2 = px(s / 5);
  const rs1 = px(s / 10);
  const rs2 = px(s / 40);
  const m = px(s / 20);
  const hm = px(s / 5);

  const rocket = {
    'position': 'relative',
    'width': size,
    'height': size,
    'borderRadius': kind === 'toy' ? rr2 : rr1,
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignSelf': 'center',
    'margin': `0px ${m}`,
    'boxShadow': shadow ? `0px 0px ${rs1} ${rs2} rgba(0,0,0,1)` : null,
    'background': background,
    'transformOrigin': 'bottom',
    'transition': disabled
      ? null
      : 'background 0.5s ease-in-out, margin 0.5s ease-in-out, transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
    ':hover': {
      background: hover ? backgroundHover : null,
      margin: hover ? `0px ${hm}` : null,
      transform: hover ? 'scale(1.3)' : null,
    },
    ':hover .gear-hover': {
      transition: 'cubic-bezier(0.37, 3.43, 0.55, 1) 0.4s',
      opacity: 1,
      transform: 'scale(1)',
    },
  };

  const icon = {
    position: 'absolute',
    top: px(s * 0.15),
    width: px(s * 0.5),
    height: px(s * 0.5),
    alignSelf: 'center',
    opacity: disabled ? 0.2 : 1,
  };

  const glyph = {
    ...icon,
    display: 'flex',
  };

  const iconSvg = {
    position: 'absolute',
  };

  const is1 = px(s / 4);
  const is2 = px(s / 5);

  const iconShadowStyle = {
    display: iconShadow ? null : 'none',
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '50%',
    bottom: '50%',
    boxShadow: `0px 0px ${is1} ${is2} rgba(0,0,0,0.8)`,
  };

  const title = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: px(s * 0.15),
    opacity: disabled ? 0.2 : 1,
  };

  const subtitle = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: px(s * 0.06),
    opacity: disabled ? 0.2 : 1,
  };

  const gauge = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: px(s * -0.1),
  };

  const ratio = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: px(s * -0.25),
  };

  const crossedStyle = {
    position: 'absolute',
    left: px(s * -0.15),
    right: px(s * -0.15),
    top: px(s * 0.45),
    bottom: px(s * 0.45),
    transform: 'rotate(-45deg)',
    backgroundColor: 'red',
    borderRadius: px(s * 0.05),
    boxShadow: `0px ${px(s * 0.05)} ${px(s * 0.1)} 0px black`,
  };

  const gear = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    pointerEvents: 'none',
    transition: 'cubic-bezier(0.55, 0, 0.9, 0.45) 2.0s',
    opacity: 0,
    transform: 'scale(0.5)',
  };

  return {
    rocket,
    icon,
    iconSvg,
    iconShadow: iconShadowStyle,
    glyph,
    title,
    subtitle,
    gauge,
    ratio,
    crossed: crossedStyle,
    gear,
  };
}

/******************************************************************************/
