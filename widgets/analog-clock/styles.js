import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

export const propNames = ['size', 'look'];

/******************************************************************************/

function px(value) {
  return value + 'px';
}

function d(value, min = 1) {
  return value ? Math.max(value, min) : 0;
}

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
  const {size = '180px', look = 'cff'} = props;

  const s = Unit.parse(size).value; // width and height (square)
  const f = s / 180; // magic factor for scaling constant dimensions

  let borderThickness = 0; // thickness of border
  let marginThickness = 0; // margin between border and dial

  let watchPointerWidthHM = 0; // watch pointer (hours and minutes) thickness
  let watchPointerWidthS = 0; // watch pointer (seconds) thickness
  let watchPointerAdditionalHM = 0; // additional length for watch pointers (hours and minutes), starting opposite
  let watchPointerAdditionalS = 0; // additional length for watch pointers (seconds), starting opposite

  let fixedMarkLength15 = 0; // length of fixed mark every 15 minutes
  let fixedMarkWidth15 = 0; // width of fixed mark every 15 minutes
  let fixedMarkRadius15 = 0;
  let fixedMarkLength5 = 0; // length of fixed mark every 5 minutes
  let fixedMarkWidth5 = 0; // width of fixed mark every 5 minutes
  let fixedMarkRadius5 = 0;
  let fixedMarkLength1 = 0; // length of fixed mark every minutes
  let fixedMarkWidth1 = 0; // width of fixed mark every minutes
  let fixedMarkRadius1 = 0;

  let dialBorderTopColor = null;
  let dialBorderRightColor = null;
  let dialBorderBottomColor = null;
  let dialBorderLeftColor = null;
  let dialBackground1 = null;
  let dialBackground2 = null;
  let dialShadow1 = null;
  let dialShadow2 = null;

  let watchPointerColorHM = null;
  let watchPointerColorS = null;
  let watchPointerBorder = null;
  let watchPointerRadius = 0;
  let watchPointerShadow = null;
  let watchPointerCenterRadius = null;
  let watchPointerCenterColor = null;
  let watchPointerCenterBorder = null;

  // prettier-ignore
  if (look === 'cff') {
    //-----------//
    //    CFF    //
    //-----------//

    borderThickness = 8 * f;
    marginThickness = 4 * f;

    watchPointerWidthHM      =  6.0 * f;
    watchPointerWidthS       =  0.7 * f;
    watchPointerAdditionalHM = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;

    fixedMarkLength15 = 20 * f;
    fixedMarkWidth15  =  6 * f;
    fixedMarkLength5  = 20 * f;
    fixedMarkWidth5   =  6 * f;
    fixedMarkLength1  =  5 * f;
    fixedMarkWidth1   =  2 * f;

    dialBorderTopColor    = '#ccc';
    dialBorderRightColor  = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor   = '#ccc';
    dialBackground1       = '#fff';
    dialShadow1           = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2           = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'classic') {
    //-----------//
    //  CLASSIC  //
    //-----------//

    borderThickness = 4 * f;
    marginThickness = 8 * f;

    watchPointerWidthHM      =  4.0 * f;
    watchPointerWidthS       =  0.7 * f;
    watchPointerAdditionalHM = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  1 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  1 * f;
    fixedMarkLength1  =  1 * f;
    fixedMarkWidth1   =  1 * f;

    dialBorderTopColor    = '#ccc';
    dialBorderRightColor  = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor   = '#ccc';
    dialBackground1       = '#fff';
    dialShadow1           = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2           = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'tiny') {
    //-----------//
    //   TINY    //
    //-----------//

    borderThickness = 1 * f;
    marginThickness = 8 * f;

    watchPointerWidthHM      =  4.0 * f;
    watchPointerWidthS       =  0.7 * f;
    watchPointerAdditionalHM = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  1 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  1 * f;

    dialBorderTopColor    = '#333';
    dialBorderRightColor  = '#333';
    dialBorderBottomColor = '#333';
    dialBorderLeftColor   = '#333';
    dialBackground1       = '#fff';

    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'smoothy') {
    //-----------//
    //  SMOOTHY  //
    //-----------//

    borderThickness = 5 * f;
    marginThickness = 10 * f;

    watchPointerWidthHM      = d( 8 * f, 4);
    watchPointerWidthS       = d( 2 * f, 4);
    watchPointerAdditionalHM =   15 * f;
    watchPointerAdditionalS  =   22 * f;

    fixedMarkLength15 = 20 * f;
    fixedMarkWidth15  = 20 * f;
    fixedMarkRadius15 = 10 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   = 10 * f;
    fixedMarkRadius5  =  5 * f;

    const rc = '#eee';
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(theme.palette.chrome, 0.7)}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 = 'radial-gradient(at 30% 30%, rgba(255, 255, 255, 0.5), rgb(255, 255, 255, 0.0) 24%)';
    dialShadow1     = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2     = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    watchPointerColorHM      = rc;
    watchPointerColorS       = theme.palette.chrome;
    watchPointerBorder       = '1px solid black';
    watchPointerRadius       = 4 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  } else if (look === 'transparent') {
    //-------------//
    // TRANSPARENT //
    //-------------//

    watchPointerWidthHM      =  3 * f;
    watchPointerWidthS       =  1 * f;
    watchPointerAdditionalHM = 15 * f;
    watchPointerAdditionalS  = 22 * f;

    fixedMarkLength15 = 15 * f;
    fixedMarkWidth15  =  3 * f;
    fixedMarkLength5  =  6 * f;
    fixedMarkWidth5   =  3 * f;
    fixedMarkLength1  =  1 * f;
    fixedMarkWidth1   =  1 * f;

    watchPointerColorHM      = '#eee';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'light') {
    //-----------//
    //   LIGHT   //
    //-----------//

    marginThickness          = 10 * f;
    watchPointerWidthHM      =  8 * f;
    fixedMarkLength15        = 15 * f;
    dialBackground1          = "rgba(255,255,255,0.1)";
    watchPointerColorHM      = '#eee';
    watchPointerCenterRadius = 10 * f;
    watchPointerCenterColor  = '#eee';
    //
  } else if (look === 'royal') {
    //-----------//
    //   ROYAL   //
    //-----------//

    borderThickness =  5 * f;
    marginThickness = 10 * f;

    watchPointerWidthHM      = d( 6 * f, 4);
    watchPointerWidthS       = d( 2 * f, 4);
    watchPointerAdditionalHM =   15 * f;
    watchPointerAdditionalS  =   22 * f;

    fixedMarkLength15 =   15 * f;
    fixedMarkWidth15  =    6 * f;
    fixedMarkLength5  =   15 * f;
    fixedMarkRadius15 =    1 * f;
    fixedMarkWidth5   = d( 2 * f, 4);
    fixedMarkRadius5  =    1 * f;
    fixedMarkLength1  = d( 2 * f, 4);
    fixedMarkWidth1   = d( 2 * f, 4);
    fixedMarkRadius1  =    2 * f;

    const rc = ColorManipulator.darken(theme.palette.light, 0.1);
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(theme.palette.chrome, 0.7)}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 = 'radial-gradient(at 30% 30%, rgba(255, 255, 255, 0.5), rgb(255, 255, 255, 0.0) 24%)';
    dialShadow1     = `0px 0px ${px(12 * f)} 0px rgba(0,0,0,0.9)`;
    dialShadow2     = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    watchPointerColorHM      = rc;
    watchPointerColorS       = theme.palette.chrome;
    watchPointerBorder       = '1px solid black';
    watchPointerRadius       = 1 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  }

  // prettier-ignore
  {
    borderThickness          = d(borderThickness);
    marginThickness          = d(marginThickness);
    watchPointerWidthHM      = d(watchPointerWidthHM);
    watchPointerWidthS       = d(watchPointerWidthS);
    watchPointerAdditionalHM = d(watchPointerAdditionalHM);
    watchPointerAdditionalS  = d(watchPointerAdditionalS);
    fixedMarkLength15        = d(fixedMarkLength15);
    fixedMarkWidth15         = d(fixedMarkWidth15);
    fixedMarkLength5         = d(fixedMarkLength5);
    fixedMarkWidth5          = d(fixedMarkWidth5);
    fixedMarkLength1         = d(fixedMarkLength1);
    fixedMarkWidth1          = d(fixedMarkWidth1);
  }

  /******************************************************************************/

  const analogClock = {
    position: 'relative',
    width: px(s),
    height: px(s),
  };

  // White dial, with an outer shadow.
  const dial1 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: px(0),
    top: px(0),
    borderRadius: px(s),
    background: dialBackground1,
    boxShadow: dialShadow1,
    transition: '0.5s ease-out',
  };

  // Silver dial, with an inner shadow.
  const dial2 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: px(0),
    top: px(0),
    boxSizing: 'border-box',
    borderRadius: px(s),
    borderTop: `${px(borderThickness)} solid ${dialBorderTopColor}`,
    borderRight: `${px(borderThickness)} solid ${dialBorderRightColor}`,
    borderBottom: `${px(borderThickness)} solid ${dialBorderBottomColor}`,
    borderLeft: `${px(borderThickness)} solid ${dialBorderLeftColor}`,
    background: dialBackground2,
    boxShadow: dialShadow2,
    transition: '0.5s ease-out',
  };

  /******************************************************************************/

  // Main fixed mark (every 15 minutes).
  const fixedMark15 = {
    position: 'absolute',
    right: px(s * 0.5 - fixedMarkWidth15 * 0.5),
    top: px(borderThickness + marginThickness),
    width: px(fixedMarkWidth15),
    height: px(fixedMarkLength15),
    transformOrigin: `${px(fixedMarkWidth15 * 0.5)} ${px(
      s * 0.5 - borderThickness - marginThickness
    )}`,
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(fixedMarkRadius15),
    transition: '0.5s ease-out',
  };

  // Secondary fixed mark (every 5 minutes).
  const fixedMark5 = {
    position: 'absolute',
    right: px(s * 0.5 - fixedMarkWidth5 * 0.5),
    top: px(borderThickness + marginThickness),
    width: px(fixedMarkWidth5),
    height: px(fixedMarkLength5),
    transformOrigin: `${px(fixedMarkWidth5 * 0.5)} ${px(
      s * 0.5 - borderThickness - marginThickness
    )}`,
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(fixedMarkRadius5),
    transition: '0.5s ease-out',
  };

  // Secondary fixed mark (every minute).
  const fixedMark1 = {
    position: 'absolute',
    right: px(s * 0.5 - fixedMarkWidth1 * 0.5),
    top: px(borderThickness + marginThickness),
    width: px(fixedMarkWidth1),
    height: px(fixedMarkLength1),
    transformOrigin: `${px(fixedMarkWidth1 * 0.5)} ${px(
      s * 0.5 - borderThickness - marginThickness
    )}`,
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: fixedMarkWidth1 ? watchPointerBorder : null,
    borderRadius: px(fixedMarkRadius1),
    transition: '0.5s ease-out',
  };

  /******************************************************************************/

  // Parent of watch pointer, with an initial rotation according to Date.now().
  const watchPointers = {
    position: 'absolute',
    right: px(s * 0.5),
    bottom: px(s * 0.5),
    width: px(0),
    height: px(0),
  };

  const watchPointerKeyframes = {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359.999deg)',
    },
  };

  const watchPointerHour = {
    position: 'relative',
    bottom: px(watchPointerAdditionalHM),
    right: px(watchPointerWidthHM * 0.5),
    width: px(watchPointerWidthHM),
    height: px(
      s * 0.45 -
        borderThickness -
        marginThickness -
        fixedMarkLength15 +
        watchPointerAdditionalHM
    ),
    transformOrigin: `${px(watchPointerWidthHM * 0.5)} ${px(
      watchPointerAdditionalHM
    )}`,
    animation: `${60 * 60 * 12}s infinite linear`,
    animationName: watchPointerKeyframes,
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  const watchPointerMinute = {
    position: 'relative',
    bottom: px(watchPointerAdditionalHM),
    right: px(watchPointerWidthHM * 0.5),
    width: px(watchPointerWidthHM),
    height: px(
      s * 0.49 - borderThickness - marginThickness + watchPointerAdditionalHM
    ),
    transformOrigin: `${px(watchPointerWidthHM * 0.5)} ${px(
      watchPointerAdditionalHM
    )}`,
    animation: `${60 * 60}s infinite linear`,
    animationName: watchPointerKeyframes,
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  const watchPointerSecond = {
    position: 'relative',
    bottom: px(watchPointerAdditionalS),
    right: px(watchPointerWidthS * 0.5),
    width: px(watchPointerWidthS),
    height: px(
      s * 0.5 -
        borderThickness -
        marginThickness -
        fixedMarkLength15 +
        watchPointerAdditionalS
    ),
    transformOrigin: `${px(watchPointerWidthS * 0.5)} ${px(
      watchPointerAdditionalS
    )}`,
    animation: `${60}s infinite linear`,
    animationName: getSecondKeyFrames(),
    animationTimingFunction: 'cubic-bezier(1, 0, 1, 0.1)',
    backgroundColor: watchPointerColorS,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  // Small red dot centered.
  const watchPointerCenter = {
    position: 'absolute',
    right: px(s * 0.5 - watchPointerCenterRadius),
    bottom: px(s * 0.5 - watchPointerCenterRadius),
    width: px(watchPointerCenterRadius * 2),
    height: px(watchPointerCenterRadius * 2),
    backgroundColor: watchPointerCenterColor,
    boxSizing: 'border-box',
    border: watchPointerCenterBorder,
    borderRadius: px(watchPointerCenterRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  /******************************************************************************/

  return {
    analogClock,

    dial1,
    dial2,

    fixedMark15,
    fixedMark5,
    fixedMark1,

    watchPointers,
    watchPointerHour,
    watchPointerMinute,
    watchPointerSecond,
    watchPointerCenter,
  };
}

/******************************************************************************/
