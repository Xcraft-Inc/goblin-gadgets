import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'height', 'showed', 'aging'];

export default function styles(theme, props) {
  const {width, height, showed, aging = 'old'} = props;

  const look = theme.look.name;

  let monitor = {};
  let tube = {};
  let crt = {};
  let channels = {};
  let sampleName = {};
  let panel = {};
  let backgroundCRT = {};
  let foregroundCRT1 = {};
  let foregroundCRT2 = {};
  let foregroundCRT3 = {};
  let screen = {};
  let grid = {};
  let samples = {};
  let flare = {};
  let border = {};

  /******************************************************************************/

  //---------\
  //  MODERN  >
  //---------/
  if (look === 'modern') {
    monitor = {
      width: width,
      height: height,
      display: 'flex',
      flexDirection: 'row',
      borderTopLeftRadius: '20px',
      backgroundColor: '#333',
      overflow: 'hidden',
    };

    tube = {
      position: 'relative',
      flexGrow: 1,
    };

    channels = {
      position: 'absolute',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    };

    sampleName = {
      position: 'absolute',
      fontSize: '75%',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    panel = {
      margin: '0px',
      width: '47px',
      padding: '33px 0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#888',
    };

    grid = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    samples = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    flare = {};
    border = {};
  }

  /******************************************************************************/

  //--------\
  //  RETRO  >
  //--------/
  if (look === 'retro') {
    monitor = {
      'width': width,
      'height': height,
      'display': 'flex',
      'flexDirection': 'row',
      'borderRadius': '30px',
      'borderTop': `10px solid ${ColorManipulator.lighten(
        theme.palette.actionButtonBackground,
        0.4
      )}`,
      'borderBottom': `10px solid ${ColorManipulator.darken(
        theme.palette.actionButtonBackground,
        0.5
      )}`,
      'borderLeft': `10px solid ${ColorManipulator.lighten(
        theme.palette.actionButtonBackground,
        0.2
      )}`,
      'borderRight': `10px solid ${ColorManipulator.darken(
        theme.palette.actionButtonBackground,
        0.3
      )}`,
      'background': 'radial-gradient(ellipse at top left, #000, #333)',
      'boxShadow': '0px 0px 29px 22px black',
      'overflow': 'hidden',
      ':hover .flare-hover': {
        right: '-300px',
        bottom: '-300px',
        width: '700px',
        height: '700px',
        opacity: 0.2,
      },
    };

    tube = {
      position: 'relative',
      flexGrow: 1,
    };

    const keyframesPowerOn = {
      'new': null,
      'old': {
        '0%': {transform: 'scale(1)'},
        '10.0%': {transform: 'scale(1)'},
        '10.1%': {transform: 'scale(0.99)'},
        '10.2%': {transform: 'scale(1)'},
        '20.0%': {transform: 'skewX(0deg)'},
        '20.1%': {transform: 'skewX(-5deg)'},
        '20.2%': {transform: 'skewX(0deg)'},
        '50.0%': {transform: 'scale(1)'},
        '50.1%': {transform: 'scale(0.97)'},
        '50.2%': {transform: 'scale(1)'},
        '50.5%': {transform: 'scale(1)'},
        '50.6%': {transform: 'scale(0.96)'},
        '50.7%': {transform: 'scale(1)'},
        '60.0%': {transform: 'scale(1)'},
        '60.1%': {transform: 'scale(0.97)'},
        '60.2%': {transform: 'scale(1)'},
        '70.0%': {transform: 'skewX(0deg)'},
        '70.2%': {transform: 'skewX(-6deg)'},
        '70.4%': {transform: 'skewX(0deg)'},
        '80.5%': {transform: 'skewX(0deg)'},
        '80.6%': {transform: 'skewX(-5deg)'},
        '80.7%': {transform: 'skewX(0deg)'},
        '80.8%': {transform: 'skewX(-5deg)'},
        '80.9%': {transform: 'skewX(0deg)'},
        '90.2%': {transform: 'scale(1)'},
        '90.4%': {transform: 'scale(0.93)'},
        '90.6%': {transform: 'scale(1)'},
        '100%': {transform: 'scale(1)'},
      },
      'very-old': {
        '0%': {transform: 'scale(1)'},
        '10.0%': {transform: 'scale(1)'},
        '10.1%': {transform: 'scale(0.98)'},
        '10.2%': {transform: 'scale(1)'},
        '10.6%': {transform: 'scale(0.97)'},
        '10.7%': {transform: 'scale(1)'},
        '12.6%': {transform: 'scale(0.96)'},
        '12.7%': {transform: 'scale(1)'},
        '15.1%': {transform: 'scale(0.97)'},
        '15.3%': {transform: 'scale(1)'},
        '20.0%': {transform: 'skewX(0deg)'},
        '20.1%': {transform: 'skewX(-8deg)'},
        '20.2%': {transform: 'skewX(0deg)'},
        '30.0%': {transform: 'scale(1)'},
        '30.1%': {transform: 'scale(0.97)'},
        '30.2%': {transform: 'scale(1)'},
        '30.4%': {transform: 'scale(0.99)'},
        '30.6%': {transform: 'scale(1)'},
        '33.0%': {transform: 'skewX(0deg)'},
        '33.2%': {transform: 'skewX(-8deg)'},
        '33.4%': {transform: 'skewX(0deg)'},
        '40.3%': {transform: 'scale(0.98)'},
        '40.4%': {transform: 'scale(1)'},
        '40.7%': {transform: 'scale(0.98)'},
        '40.8%': {transform: 'scale(1)'},
        '40.9%': {transform: 'scale(0.97)'},
        '41.0%': {transform: 'scale(1)'},
        '44.3%': {transform: 'skewX(0deg)'},
        '44.4%': {transform: 'skewX(-6deg)'},
        '44.6%': {transform: 'skewX(0deg)'},
        '44.7%': {transform: 'skewX(-8deg)'},
        '44.9%': {transform: 'skewX(0deg)'},
        '46.1%': {transform: 'skewX(-5deg)'},
        '46.2%': {transform: 'skewX(0deg)'},
        '50.0%': {transform: 'scale(1)'},
        '50.1%': {transform: 'scale(0.94)'},
        '50.2%': {transform: 'scale(1)'},
        '50.3%': {transform: 'skewX(0deg)'},
        '50.4%': {transform: 'skewX(-6deg)'},
        '50.6%': {transform: 'skewX(0deg)'},
        '50.8%': {transform: 'scale(1)'},
        '50.9%': {transform: 'scale(0.92)'},
        '51.0%': {transform: 'scale(1)'},
        '56.0%': {transform: 'skewX(0deg)'},
        '56.2%': {transform: 'skewX(-8deg)'},
        '56.4%': {transform: 'skewX(0deg)'},
        '60.0%': {transform: 'scale(1)'},
        '60.1%': {transform: 'scale(0.97)'},
        '60.2%': {transform: 'scale(1)'},
        '60.3%': {transform: 'scale(0.94)'},
        '60.4%': {transform: 'scale(1)'},
        '60.6%': {transform: 'scale(0.97)'},
        '60.7%': {transform: 'scale(1)'},
        '70.0%': {transform: 'skewX(0deg)'},
        '70.2%': {transform: 'skewX(-8deg)'},
        '70.4%': {transform: 'skewX(0deg)'},
        '75.3%': {transform: 'scale(1)'},
        '75.4%': {transform: 'scale(0.95)'},
        '75.5%': {transform: 'scale(1)'},
        '77.0%': {transform: 'scale(1)'},
        '77.1%': {transform: 'scale(0.97)'},
        '77.3%': {transform: 'scale(1)'},
        '80.0%': {transform: 'scale(1)'},
        '80.1%': {transform: 'scale(0.97)'},
        '80.2%': {transform: 'scale(1)'},
        '80.3%': {transform: 'scale(0.94)'},
        '80.4%': {transform: 'scale(1)'},
        '80.5%': {transform: 'skewX(0deg)'},
        '80.6%': {transform: 'skewX(-7deg)'},
        '80.7%': {transform: 'skewX(0deg)'},
        '80.8%': {transform: 'skewX(-7deg)'},
        '80.9%': {transform: 'skewX(0deg)'},
        '82.0%': {transform: 'scale(1)'},
        '82.1%': {transform: 'scale(0.98)'},
        '82.2%': {transform: 'scale(1)'},
        '82.5%': {transform: 'scale(0.93)'},
        '82.7%': {transform: 'scale(1)'},
        '90.2%': {transform: 'scale(1)'},
        '90.4%': {transform: 'scale(0.95)'},
        '90.6%': {transform: 'scale(1)'},
        '90.8%': {transform: 'scale(0.94)'},
        '90.9%': {transform: 'scale(1)'},
        '93.1%': {transform: 'scale(0.97)'},
        '93.2%': {transform: 'scale(1)'},
        '98.1%': {transform: 'scale(0.96)'},
        '98.2%': {transform: 'scale(1)'},
        '100%': {transform: 'scale(1)'},
      },
    };

    const keyframesPowerOff = {
      '0%': {transform: 'scale(1)'},
      '60%': {transform: 'scale(0.5, 0)'},
      '100%': {transform: 'scale(0.5, 0)'},
    };

    crt = {
      position: 'absolute',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
      flexGrow: 1,
      animationName: showed ? keyframesPowerOn[aging] : keyframesPowerOff,
      animationDuration: showed ? '27s' : '0.6s',
      animationIterationCount: showed ? 'infinite' : 1,
    };

    channels = {
      position: 'absolute',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
    };

    sampleName = {
      position: 'absolute',
      fontSize: '75%',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    panel = {
      margin: '2px',
      width: '47px',
      padding: '33px 0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: 'linear-gradient(-180deg, black -100%, #555)',
    };

    /******************************************************************************/

    // Enforced shadow.
    const keyframesCRTOff = {
      '20%': {
        border: '0px solid',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
      },
      '60%': {
        backgroundColor: '#0cff72',
        borderRadius: width,
      },
      '100%': {
        backgroundColor: '#0cff72',
        borderRadius: width,
      },
    };

    backgroundCRT = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      backgroundColor: '#07401f',
      border: '40px solid',
      borderBottomColor: '#121212',
      borderLeftColor: '#080808',
      borderRightColor: '#080808',
      borderTopColor: '#020202',
      boxShadow: 'inset 0 0 90px black, inset 0 0 15px black, 0 0 50px black',
      animationName: showed ? null : keyframesCRTOff,
      animationDuration: showed ? null : '0.6s',
      animationIterationCount: showed ? null : 1,
    };

    // Scan lines.
    foregroundCRT1 = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      background:
        'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.6)) 0% 0% / 100% 5px',
      borderRadius: '50px',
    };

    // Horizontal spot trace, from top to bottom.
    const keyframesTrace = {
      'new': null,
      'old': {
        '0%': {top: '-100px'},
        '75%': {top: '-100px'},
        '100%': {top: '100%'},
      },
      'very-old': {
        '0%': {top: '-100px'},
        '100%': {top: '100%'},
      },
    };

    const durationTrace = {
      'new': null,
      'old': '20s',
      'very-old': '5s',
    };

    foregroundCRT2 = {
      position: 'absolute',
      top: '0px',
      height: '100px',
      left: '40px',
      right: '40px',
      background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.1))',
      animationName: keyframesTrace[aging],
      animationDuration: durationTrace[aging],
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      opacity: aging === 'new' ? 0 : 1,
    };

    // Video flicker.
    const keyframesFlicker = {
      '0%': {opacity: 0.27861},
      '5%': {opacity: 0.34769},
      '10%': {opacity: 0.23604},
      '15%': {opacity: 0.90626},
      '20%': {opacity: 0.18128},
      '25%': {opacity: 0.83891},
      '30%': {opacity: 0.65583},
      '35%': {opacity: 0.67807},
      '40%': {opacity: 0.26559},
      '45%': {opacity: 0.84693},
      '50%': {opacity: 0.96019},
      '55%': {opacity: 0.08594},
      '60%': {opacity: 0.20313},
      '65%': {opacity: 0.71988},
      '70%': {opacity: 0.53455},
      '75%': {opacity: 0.37288},
      '80%': {opacity: 0.71428},
      '85%': {opacity: 0.70419},
      '90%': {opacity: 0.7003},
      '95%': {opacity: 0.36108},
      '100%': {opacity: 0.24387},
    };

    const durationFlicker = {
      'new': null,
      'old': '0.15s',
      'very-old': '0.6s',
    };

    foregroundCRT3 = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      background: 'rgba(18, 16, 16, 0.15)',
      animationName: keyframesFlicker,
      animationDuration: durationFlicker[aging],
      animationIterationCount: 'infinite',
    };

    screen = {
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: 'calc(100% - 4px)',
      height: 'calc(100% - 4px)',
    };

    /******************************************************************************/

    grid = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    samples = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };

    flare = {
      position: 'absolute',
      margin: '20px',
      right: '0px',
      bottom: '0px',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle closest-side, white, transparent)',
      opacity: 0.1,
      transition: '10s ease-out',
    };

    border = {
      position: 'absolute',
      left: '0px',
      right: '-50px',
      top: '0px',
      bottom: '0px',
      borderRadius: '20px',
      borderTop: '2px solid #ddd',
      borderBottom: '2px solid #333',
      borderLeft: '2px solid #ddd',
      borderRight: '2px solid #222',
    };
  }

  /******************************************************************************/

  return {
    monitor,
    tube,
    crt,
    channels,
    sampleName,
    panel,

    backgroundCRT,
    foregroundCRT1,
    foregroundCRT2,
    foregroundCRT3,
    screen,

    grid,
    samples,
    flare,
    border,
  };
}

/******************************************************************************/
