import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['width', 'height', 'showed'];

export default function styles(theme, props) {
  const {width, height, showed} = props;

  const look = theme.look.name;

  let monitor;
  let tube;
  let panel;
  let screenLeft;
  let screenRight;
  let screenTop;
  let screenBottom;
  let grid;
  let samples;
  let flare;
  let powerOff;
  let border;

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

    panel = {
      margin: '0px',
      width: '47px',
      padding: '20px 0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#555',
    };

    screenLeft = {};
    screenRight = {};
    screenTop = {};
    screenBottom = {};

    grid = {
      position: 'absolute',
      stroke: 'rgba(0,255,0,0.2)',
      strokeWidth: '1px',
      fill: 'transparent',
    };

    samples = {
      position: 'absolute',
      stroke: '#0f0',
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
        strokeWidth: '5px',
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

    panel = {
      margin: '2px',
      width: '47px',
      padding: '20px 0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(-180deg, black -100%, #555)',
    };

    /******************************************************************************/

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
      stroke: '#0f0',
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
    panel,

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
