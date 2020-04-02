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

  const keyframesFlicker = {
    '0%': {opacity: 0.87861},
    '5%': {opacity: 0.94769},
    '10%': {opacity: 0.83604},
    '15%': {opacity: 0.90626},
    '20%': {opacity: 0.98128},
    '25%': {opacity: 0.83891},
    '30%': {opacity: 0.95583},
    '35%': {opacity: 0.97807},
    '40%': {opacity: 0.86559},
    '45%': {opacity: 0.84693},
    '50%': {opacity: 0.96019},
    '55%': {opacity: 0.88594},
    '60%': {opacity: 0.90313},
    '65%': {opacity: 0.81988},
    '70%': {opacity: 0.93455},
    '75%': {opacity: 0.87288},
    '80%': {opacity: 0.91428},
    '85%': {opacity: 0.90419},
    '90%': {opacity: 0.9003},
    '95%': {opacity: 0.96108},
    '100%': {opacity: 0.94387},
  };

  const titleBox = {
    ':hover .title-hover': {
      animationName: keyframesFlicker,
      animationDuration: '0.25s',
      animationIterationCount: 'infinite',
      transform: 'scale(1.05, 1.2) translate(0px, -2px)',
      transition: '4s ease',
    },
    ':hover .subtitle-hover': {
      animationName: keyframesFlicker,
      animationDuration: '0.27s',
      animationIterationCount: 'infinite',
      transform: 'translate(166px, 0px)',
      transition: '3s ease',
    },
  };

  const title = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: Unit.multiply(margin, 1.8),
    fontSize: '800%',
    color: '#eee',
    transformOrigin: 'left',
    transition: 'cubic-bezier(0.9, -0.9, 0.3, 2) 0.8s',
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
    transition: 'cubic-bezier(0.9, -0.9, 0.3, 2) 0.6s',
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
