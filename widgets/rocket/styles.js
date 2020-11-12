import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = [
  'size',
  'look',
  'kind',
  'disabled',
  'background',
  'backgroundHover',
];

export default function styles(theme, props) {
  const {
    size = '200px',
    look = 'smooth',
    kind = 'default',
    disabled = false,
    background = 'red',
    backgroundHover = 'orange',
  } = props;

  const s = n(size);
  const isSmooth = look === 'smooth';
  const isSerious = look === 'serious';

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
    'color': disabled ? '#ccc' : '#eee',
    'margin': `0px ${m}`,
    'boxShadow': isSmooth ? `0px 0px ${rs1} ${rs2} rgba(0,0,0,1)` : null,
    'background': background,
    'transformOrigin': 'bottom',
    'transition': disabled ? null : '0.5s ease-in-out',
    ':hover': {
      background: disabled ? null : backgroundHover,
      margin: disabled ? null : `0px ${hm}`,
      transform: disabled ? null : 'scale(1.3)',
    },
    ':hover .gear-hover': {
      transition: 'cubic-bezier(0.37, 3.43, 0.55, 1) 0.4s',
      opacity: 1,
      transform: 'scale(1)',
    },
  };

  const icon = {
    position: 'relative',
    width: px(s * 0.5),
    height: px(s * 0.5),
    margin: '0px 0px 10px 0px',
    alignSelf: 'center',
    opacity: disabled ? 0.2 : 1,
  };

  const im = px(s / 12);
  const is1 = px(s / 6);
  const is2 = px(s / 24);

  const iconShadow = {
    display: isSerious ? 'none' : null,
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    margin: im,
    boxShadow: `0px 0px ${is1} ${is2} rgba(0,0,0,0.8)`,
  };

  const subtitle = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    bottom: px(s * 0.06),
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

  const crossed = {
    position: 'absolute',
    left: '-30px',
    right: '-30px',
    top: '90px',
    bottom: '90px',
    transform: 'rotate(-45deg)',
    backgroundColor: 'red',
    borderRadius: '10px',
    boxShadow: '0px 10px 20px 0px black',
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
    iconShadow,
    subtitle,
    gauge,
    ratio,
    crossed,
    gear,
  };
}

/******************************************************************************/
