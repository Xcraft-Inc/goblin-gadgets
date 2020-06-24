import {Unit} from 'goblin-theme';
import {ColorManipulator} from 'goblin-theme';

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

function getSecondKeyFrames() {
  const keyFrames = {};

  for (let a = 0; a < 60; a++) {
    const progress = (a * 100) / 60;
    const angle = 6 * a;
    keyFrames[progress + '%'] = {transform: `rotate(${angle}deg)`};
  }

  keyFrames['100%'] = {transform: 'rotate(359.999deg)'};

  return keyFrames;
}

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

  const fourGear1 = {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    width: '0px',
    height: '0px',
  };

  const fourGear2 = {
    ...fourGear1,
    right: '351px',
    bottom: '562px',
  };

  const fourGear3 = {
    ...fourGear1,
    right: '784px',
    bottom: '399px',
  };

  const fourGear4 = {
    ...fourGear1,
    right: '973px',
    bottom: '764px',
  };

  /******************************************************************************/

  const ccx = 404;
  const ccy = 421;

  const clockGear1 = {
    position: 'absolute',
    right: '682px',
    bottom: '1px',
    width: '0px',
    height: '0px',
  };

  const clockGear2 = {
    ...clockGear1,
    right: '0px',
    bottom: '0px',
  };

  const clockGear3 = {
    ...clockGear2,
    right: ccx + 'px',
    bottom: ccy + 'px',
  };

  const clockGear4 = {
    ...clockGear3,
  };

  const s = 400;
  const clock = {
    'position': 'absolute',
    'right': ccx - s / 2 + 'px',
    'bottom': ccy - s / 2 + 'px',
    'width': s + 'px',
    'height': s + 'px',
    'borderRadius': s / 2 + 'px',
    'transition': '0.5s cubic-bezier(0.6, 5, 0.5, 0.2)', // fun bounce
    ':hover': {
      transform: 'scale(1.1)',
    },
  };

  /******************************************************************************/

  // prettier-ignore
  const keyframesVibe = {
    '0%':   {transform: 'scale(1.0000)'},
    '5%':   {transform: 'scale(0.9990)'},
    '10%':  {transform: 'scale(0.9985)'},
    '15%':  {transform: 'scale(0.9992)'},
    '20%':  {transform: 'scale(1.0000)'},
    '25%':  {transform: 'scale(0.9990)'},
    '30%':  {transform: 'scale(0.9980)'},
    '35%':  {transform: 'scale(1.0000)'},
    '40%':  {transform: 'scale(0.9990)'},
    '45%':  {transform: 'scale(0.9995)'},
    '50%':  {transform: 'scale(1.0000)'},
    '55%':  {transform: 'scale(0.9992)'},
    '60%':  {transform: 'scale(1.0000)'},
    '65%':  {transform: 'scale(0.9990)'},
    '70%':  {transform: 'scale(0.9988)'},
    '75%':  {transform: 'scale(1.0000)'},
    '80%':  {transform: 'scale(0.9990)'},
    '85%':  {transform: 'scale(0.9985)'},
    '90%':  {transform: 'scale(0.9990)'},
    '95%':  {transform: 'scale(0.9992)'},
    '100%': {transform: 'scale(1.0000)'},
  };

  // prettier-ignore
  const keyframesFlicker = {
    '0%':   {opacity: 0.87861},
    '5%':   {opacity: 0.94769},
    '10%':  {opacity: 0.83604},
    '15%':  {opacity: 0.90626},
    '20%':  {opacity: 0.98128},
    '25%':  {opacity: 0.83891},
    '30%':  {opacity: 0.95583},
    '35%':  {opacity: 0.97807},
    '40%':  {opacity: 0.86559},
    '45%':  {opacity: 0.84693},
    '50%':  {opacity: 0.96019},
    '55%':  {opacity: 0.88594},
    '60%':  {opacity: 0.90313},
    '65%':  {opacity: 0.81988},
    '70%':  {opacity: 0.93455},
    '75%':  {opacity: 0.87288},
    '80%':  {opacity: 0.91428},
    '85%':  {opacity: 0.90419},
    '90%':  {opacity: 0.90030},
    '95%':  {opacity: 0.96108},
    '100%': {opacity: 0.94387},
  };

  const titleBox = {
    ':hover': {
      animationName: keyframesVibe,
      animationDuration: '0.31s',
      animationIterationCount: 'infinite',
    },
    ':hover .title-hover': {
      animationName: keyframesFlicker,
      animationDuration: '0.25s',
      animationIterationCount: 'infinite',
      transform: 'scale(1.05, 1.2) translate(0px, -2px)',
      transition: 'cubic-bezier(0.9, -0.9, 0.3, 8) 1.6s',
    },
    ':hover .subtitle-hover': {
      animationName: keyframesFlicker,
      animationDuration: '0.27s',
      animationIterationCount: 'infinite',
      transform: 'translate(166px, 0px)',
      transition: 'cubic-bezier(0.9, -0.9, 0.3, 2) 1.5s',
    },
  };

  const title = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: Unit.multiply(margin, 1.8),
    whiteSpace: 'nowrap',
    fontSize: '800%',
    color: '#eee',
    transformOrigin: 'left',
    transition: 'cubic-bezier(0.9, -10, 0.3, 4) 0.6s',
  };

  const subtitle = {
    position: 'absolute',
    left: Unit.multiply(margin, 2.5),
    top: `calc(${Unit.multiply(margin, 1.8)} + 120px)`,
    whiteSpace: 'nowrap',
    fontSize: '150%',
    color: '#222',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transformOrigin: 'left',
    transition: 'cubic-bezier(0.9, -3, 0.3, 4) 0.4s',
  };

  /******************************************************************************/

  return {
    retroPanelMetalPlateAbsolute,
    retroPanelMetalPlateRelative,

    fourGear1,
    fourGear2,
    fourGear3,
    fourGear4,

    clockGear1,
    clockGear2,
    clockGear3,
    clockGear4,
    clock,

    titleBox,
    title,
    subtitle,
  };
}

/******************************************************************************/
