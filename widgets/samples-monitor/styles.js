import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'height', 'showed'];

export default function styles(theme, props) {
  const {width, height, showed} = props;

  const look = theme.look.name;

  let monitor = {};
  let tube = {};
  let channels = {};
  let sampleName = {};
  let panel = {};
  let backgroundCRT = {};
  let foregroundCRT1 = {};
  let foregroundCRT2 = {};
  let foregroundCRT3 = {};
  let screenLeft = {};
  let screenRight = {};
  let screenTop = {};
  let screenBottom = {};
  let grid = {};
  let samples = {};
  let flare = {};
  let powerOff = {};
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
      borderTopLeftRadius: '5px',
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
      stroke: 'rgba(0,255,0,0.2)',
      strokeWidth: '1px',
      fill: 'transparent',
    };

    samples = {
      position: 'absolute',
      strokeWidth: '2px',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      fill: 'transparent',
    };

    flare = {};
    powerOff = {};
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
      'boxShadow': '0px 0px 50px black',
      'overflow': 'hidden',
      ':hover .grid-hover': {
        stroke: 'rgba(0,255,0,0.4)',
      },
      ':hover .samples-hover': {
        strokeWidth: '3px',
      },
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

    const keyframesTrace = {
      '0%': {top: '-100px'},
      '60%': {top: '-100px'},
      '100%': {top: '100%'},
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

    // Horizontal trace.
    foregroundCRT2 = {
      position: 'absolute',
      top: '0px',
      height: '100px',
      left: '40px',
      right: '40px',
      background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.1))',
      animationName: keyframesTrace,
      animationDuration: '20s',
      animationIterationCount: 'infinite',
    };

    // Video flicker.
    foregroundCRT3 = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      background: 'rgba(18, 16, 16, 0.1)',
      animationName: keyframesFlicker,
      animationDuration: '0.15s',
      animationIterationCount: 'infinite',
    };

    screenLeft = {
      position: 'absolute',
      margin: '2px',
      fill: '#444',
    };

    screenRight = {
      ...screenLeft,
      fill: '#888',
    };

    screenTop = {
      ...screenLeft,
      fill: '#222',
    };

    screenBottom = {
      ...screenLeft,
      fill: '#aaa',
    };

    /******************************************************************************/

    grid = {
      position: 'absolute',
      stroke: 'rgba(0,255,0,0.2)',
      strokeWidth: '1px',
      fill: 'transparent',
      transition: '0.6s ease-out',
    };

    samples = {
      position: 'absolute',
      strokeWidth: '2px',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      fill: 'transparent',
      transition: '10s ease-out',
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

    powerOff = {
      position: 'absolute',
      margin: '40px',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
      stroke: 'white',
      opacity: showed ? 0 : 0.3,
      transform: showed ? 'scale(0)' : 'scale(1)',
      transition: '0.3s ease-out',
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
    channels,
    sampleName,
    panel,

    backgroundCRT,
    foregroundCRT1,
    foregroundCRT2,
    foregroundCRT3,
    screenLeft,
    screenRight,
    screenTop,
    screenBottom,

    grid,
    samples,
    flare,
    powerOff,
    border,
  };
}

/******************************************************************************/
