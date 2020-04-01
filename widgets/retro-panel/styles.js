import {Unit} from 'electrum-theme';

export const propNames = [
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
  'grow',
  'flexDirection',
  'justifyContent',
  'alignItems',
  'radius',
  'margin',
  'padding',
  'strokeColor',
  'fillColor',
];

/******************************************************************************/

export default function styles(theme, props) {
  const {
    top = '0px',
    bottom = '0px',
    left = '0px',
    right = '0px',
    width,
    height,
    grow,
    flexDirection = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    radius = '50px',
    margin = '100px',
    padding,
    strokeColor = 'black',
    fillColor = 'yellow',
  } = props;

  const _absolute = {
    position: 'absolute',
    top: Unit.add(top, margin),
    bottom: Unit.add(bottom, margin),
    left: Unit.add(left, margin),
    right: Unit.add(right, margin),
  };

  const _relative = {
    position: 'relative',
    width,
    height,
    flexGrow: grow,
    margin,
    padding,
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
  };

  const _metalPlate = {
    border: `1px solid ${strokeColor}`,
    borderRadius: radius,
    background: fillColor,
    boxShadow: `black 0px 0px ${Unit.multiply(radius, 2.5)} ${Unit.multiply(
      margin,
      0.1
    )}`,
  };

  const retroPanelMetalPlateAbsolute = {
    ..._absolute,
    ..._metalPlate,
  };

  const retroPanelMetalPlateRelative = {
    ..._relative,
    ..._metalPlate,
  };

  /******************************************************************************/

  const gear1 = {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    width: '0px',
    height: '0px',
  };

  const gear2 = {
    ...gear1,
    right: '351px',
    bottom: '562px',
  };

  const gear3 = {
    ...gear1,
    right: '784px',
    bottom: '399px',
  };

  const gear4 = {
    ...gear1,
    right: '973px',
    bottom: '764px',
  };

  /******************************************************************************/

  const titleKeyframes = {
    '0%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '8%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '10%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '18%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '20%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '28%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '30%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '38%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '40%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '48%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '50%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '58%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '60%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '68%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '70%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '78%': {
      transform: 'scale(1.05, 1.2) rotate(0deg)',
    },
    '80%': {
      transform: 'scale(1) rotate(0deg)',
    },
    '99.9999%': {
      transform: 'scale(1) rotate(360deg)',
    },
    '100%': {
      transform: 'scale(1) rotate(0deg)',
    },
  };

  const subtitleKeyframes = {
    '0%': {
      transform: 'scaleX(1)',
    },
    '9%': {
      transform: 'scaleX(1.7)',
    },
    '10%': {
      transform: 'scaleX(1)',
    },
    '19%': {
      transform: 'scaleX(1.7)',
    },
    '20%': {
      transform: 'scaleX(1)',
    },
    '29%': {
      transform: 'scaleX(1.7)',
    },
    '30%': {
      transform: 'scaleX(1)',
    },
    '39%': {
      transform: 'scaleX(1.7)',
    },
    '40%': {
      transform: 'scaleX(1)',
    },
    '49%': {
      transform: 'scaleX(1.7)',
    },
    '50%': {
      transform: 'scaleX(1)',
    },
    '59%': {
      transform: 'scaleX(1.7)',
    },
    '60%': {
      transform: 'scaleX(1)',
    },
    '69%': {
      transform: 'scaleX(1.7)',
    },
    '70%': {
      transform: 'scaleX(1)',
    },
    '79%': {
      transform: 'scaleX(1.7)',
    },
    '80%': {
      transform: 'scaleX(1)',
      opacity: 1,
    },
    '90%': {
      transform: 'scaleX(0)',
      opacity: 0,
    },
    '100%': {
      transform: 'scaleX(1)',
      opacity: 1,
    },
  };

  const titleBox = {
    ':hover .title-hover': {
      animationName: titleKeyframes,
      animationDuration: '10s',
      animationIterationCount: 'infinite',
    },
    ':hover .subtitle-hover': {
      animationName: subtitleKeyframes,
      animationDuration: '10s',
      animationIterationCount: 'infinite',
    },
  };

  const title = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: Unit.multiply(margin, 1.8),
    fontSize: '800%',
    color: '#eee',
    transform: 'scale(1) rotate(0deg)',
  };

  const subtitle = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: `calc(${Unit.multiply(margin, 1.8)} + 120px)`,
    fontSize: '150%',
    color: '#222',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transformOrigin: 'left',
    transform: 'scaleX(1)',
  };

  /******************************************************************************/

  return {
    retroPanelMetalPlateAbsolute,
    retroPanelMetalPlateRelative,

    gear1,
    gear2,
    gear3,
    gear4,

    titleBox,
    title,
    subtitle,
  };
}

/******************************************************************************/
