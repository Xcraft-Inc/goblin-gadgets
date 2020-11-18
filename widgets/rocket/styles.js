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
  'additionalAnimation',
];

export default function styles(theme, props) {
  const {
    size = '200px',
    kind = 'default',
    shadow = 'none',
    iconShadow = 'none',
    disabled = false,
    crossed = false,
    background = 'red',
    backgroundHover = 'orange',
    startedCount = 0,
    totalCount = 0,
    additionalAnimation = 'none',
  } = props;

  const s = n(size);
  const hover =
    !disabled && !crossed && (!totalCount || startedCount < totalCount);

  const rr1 = px(s / 20);
  const rr2 = px(s / 5);
  const m = px(s / 20);
  const hm = px(s / 5);

  const rs1 = {
    none: px(0),
    light: px(s / 13),
    deep: px(s / 10),
    strong: px(0),
  }[shadow];

  const rs2 = {
    none: px(0),
    light: px(s / 7.7),
    deep: px(s / 6.2),
    strong: px(s / 10),
  }[shadow];

  const rs3 = {
    none: px(0),
    light: px(0),
    deep: px(s / 100),
    strong: px(s / 40),
  }[shadow];

  const rs4 = {
    none: 0,
    light: 0.5,
    deep: 1,
    strong: 1,
  }[shadow];

  const rocket = {
    'position': 'relative',
    'width': size,
    'height': size,
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignSelf': 'center',
    'margin': `0px ${m}`,
    'transformOrigin': 'bottom',
    'transition': disabled
      ? null
      : 'background 0.5s ease-in-out, margin 0.5s ease-in-out, transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
    ':hover': {
      margin: hover ? `0px ${hm}` : null,
      transform: hover ? 'scale(1.3)' : null,
    },
    ':hover .box-hover': {
      background: hover ? backgroundHover : null,
    },
    ':hover .gear-hover': {
      transition: 'cubic-bezier(0.37, 3.43, 0.55, 1) 0.4s',
      opacity: 1,
      transform: 'scale(1)',
    },
  };

  const box = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: kind === 'toy' ? rr2 : rr1,
    boxShadow: shadow ? `0px ${rs1} ${rs2} ${rs3} rgba(0,0,0,${rs4})` : null,
    background: background,
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
  const is3 = iconShadow === 'light' ? 0.4 : 0.8;

  const iconShadowStyle = {
    display: iconShadow === 'none' ? 'none' : null,
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '50%',
    bottom: '50%',
    boxShadow: `0px 0px ${is1} ${is2} rgba(0,0,0,${is3})`,
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

  let transition, animation, animationName;
  if (additionalAnimation === 'parkinson') {
    const keyframes = {
      '0%': {transform: 'translate(0%, 0%) rotate(0deg)'},
      '5%': {transform: 'translate(-0.5%, 0.2%) rotate(1deg)'},
      '10%': {transform: 'translate(1%, -0.5%) rotate(0deg)'},
      '15%': {transform: 'translate(0.3%, 0%) rotate(-0.5deg)'},
      '20%': {transform: 'translate(-1.2%, 0.8%) rotate(0.2deg)'},
      '25%': {transform: 'translate(0.4%, -0.2%) rotate(-0.7deg)'},
      '30%': {transform: 'translate(1.2%, 0.2%) rotate(0deg)'},
      '35%': {transform: 'translate(-0.2%, 0%) rotate(0.3deg)'},
      '40%': {transform: 'translate(0.9%, 0%) rotate(1deg)'},
      '45%': {transform: 'translate(1.2%, 0.5%) rotate(0.4deg)'},
      '50%': {transform: 'translate(-1%, 0%) rotate(-0.6deg)'},
      '55%': {transform: 'translate(0%, 0.4%) rotate(0deg)'},
      '60%': {transform: 'translate(0.6%, 0%) rotate(-0.5deg)'},
      '65%': {transform: 'translate(1.2%, -0.3%) rotate(0.3deg)'},
      '70%': {transform: 'translate(0.7%, 0.6%) rotate(0.7deg)'},
      '75%': {transform: 'translate(-0.4%, -0.2%) rotate(-0.2deg)'},
      '80%': {transform: 'translate(1%, 0%) rotate(-1deg)'},
      '85%': {transform: 'translate(-0.6%, 0%) rotate(0.7deg)'},
      '90%': {transform: 'translate(0%, 0.4%) rotate(0.2deg)'},
      '95%': {transform: 'translate(1%, 0.2%) rotate(0.5deg)'},
      '100%': {transform: 'translate(-0.5%, -0.6%) rotate(0deg)'},
    };
    animation = '1s ease-in-out infinite reverse';
    animationName = keyframes;
  } else if (additionalAnimation === 'zoom') {
    const keyframes = {
      '0%': {transform: 'scale(1)'},
      '90%': {transform: 'scale(1.2)'},
      '100%': {transform: 'scale(1)'},
    };
    transition = '0.1 ease-out';
    animation = '0.6s ease-in-out infinite';
    animationName = keyframes;
  } else if (additionalAnimation === 'shift') {
    const keyframes = {
      '0%': {transform: 'translateX(0%)'},
      '25%': {transform: 'translateX(-5%)'},
      '50%': {transform: 'translateX(0%)'},
      '75%': {transform: 'translateX(5%)'},
      '100%': {transform: 'translateX(0%)'},
    };
    transition = '0.1 ease-out';
    animation = '0.4s ease-in-out infinite';
    animationName = keyframes;
  }

  const additional = {
    'position': 'absolute',
    'left': '0px',
    'right': '0px',
    'top': px(s * -0.45),
    'height': px(s * 0.4),
    'borderRadius': kind === 'toy' ? rr2 : rr1,
    'boxShadow': shadow ? `0px ${rs1} ${rs2} ${rs3} rgba(0,0,0,${rs4})` : null,
    'background': background,
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'center',
    'alignSelf': 'center',
    'transition': transition,
    ':hover': {
      animation,
      animationName,
    },
  };

  /******************************************************************************/

  return {
    rocket,
    box,
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
    additional,
  };
}

/******************************************************************************/
