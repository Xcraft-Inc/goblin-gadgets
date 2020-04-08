import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

export const propNames = ['size', 'look'];

/******************************************************************************/

function px(value) {
  return value + 'px';
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

  let b, m, tx, ts, ax, as, fl15, fw15, fl5, fw5, fl1, fw1;
  let dialBorderTopColor;
  let dialBorderRightColor;
  let dialBorderBottomColor;
  let dialBorderLeftColor;
  let dialBackground1;
  let dialBackground2;
  let dialShadow1;
  let dialShadow2;
  let fixedMarkRadius15;
  let fixedMarkRadius5;
  let fixedMarkRadius1;
  let watchPointerColorX;
  let watchPointerColorS;
  let watchPointerBorder;
  let watchPointerRadius;
  let watchPointerShadow;
  let watchPointerCenterRadius;
  let watchPointerCenterColor;
  let watchPointerCenterBorder;

  if (look === 'cff') {
    //-----------//
    //    CFF    //
    //-----------//

    b = 8 * f; // thickness of border
    m = 4 * f; // margin between border and dial

    tx = 6 * f; // watch pointer (hours and minutes) thickness
    ts = 0.7 * f; // watch pointer (seconds) thickness
    ax = 15 * f; // additional length for watch pointers (hours and minutes), starting opposite
    as = 22 * f; // additional length for watch pointers (seconds), starting opposite

    fl15 = 20 * f; // length of fixed mark every 15 minutes
    fw15 = tx; // width of fixed mark every 15 minutes
    fl5 = 20 * f; // length of fixed mark every 5 minutes
    fw5 = tx; // width of fixed mark every 5 minutes
    fl1 = 5 * f; // length of fixed mark every minutes
    fw1 = 2 * f; // width of fixed mark every minutes

    dialBorderTopColor = '#ccc';
    dialBorderRightColor = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor = '#ccc';
    dialBackground1 = '#fff';
    dialBackground2 = null;
    dialShadow1 = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(
      5 * f
    )} rgba(0,0,0,0.9)`;
    dialShadow2 = `inset ${px(6 * f)} ${px(6 * f)} ${px(
      24 * f
    )} 0px rgba(0,0,0,0.9)`;
    fixedMarkRadius15 = 0;
    fixedMarkRadius5 = 0;
    fixedMarkRadius1 = 0;
    watchPointerColorX = '#333';
    watchPointerColorS = 'red';
    watchPointerBorder = null;
    watchPointerRadius = 0;
    watchPointerShadow = null;
    watchPointerCenterRadius = ts * 2;
    watchPointerCenterColor = 'red';
    watchPointerCenterBorder = null;
    //
  } else if (look === 'classic') {
    //-----------//
    //  CLASSIC  //
    //-----------//

    b = 4 * f; // thickness of border
    m = 8 * f; // margin between border and dial

    tx = 4 * f; // watch pointer (hours and minutes) thickness
    ts = 0.7 * f; // watch pointer (seconds) thickness
    ax = 15 * f; // additional length for watch pointers (hours and minutes), starting opposite
    as = 22 * f; // additional length for watch pointers (seconds), starting opposite

    fl15 = 10 * f; // length of fixed mark every 15 minutes
    fw15 = 1 * f; // width of fixed mark every 15 minutes
    fl5 = 10 * f; // length of fixed mark every 5 minutes
    fw5 = 1 * f; // width of fixed mark every 5 minutes
    fl1 = 1 * f; // length of fixed mark every minutes
    fw1 = 1 * f; // width of fixed mark every minutes

    dialBorderTopColor = '#ccc';
    dialBorderRightColor = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor = '#ccc';
    dialBackground1 = '#fff';
    dialBackground2 = null;
    dialShadow1 = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(
      5 * f
    )} rgba(0,0,0,0.9)`;
    dialShadow2 = `inset ${px(6 * f)} ${px(6 * f)} ${px(
      24 * f
    )} 0px rgba(0,0,0,0.9)`;
    fixedMarkRadius15 = 0;
    fixedMarkRadius5 = 0;
    fixedMarkRadius1 = 0;
    watchPointerColorX = '#333';
    watchPointerColorS = 'red';
    watchPointerBorder = null;
    watchPointerRadius = 0;
    watchPointerShadow = null;
    watchPointerCenterRadius = ts * 2;
    watchPointerCenterColor = 'red';
    watchPointerCenterBorder = null;
    //
  } else if (look === 'tiny') {
    //-----------//
    //   TINY    //
    //-----------//

    b = 1 * f; // thickness of border
    m = 8 * f; // margin between border and dial

    tx = 4 * f; // watch pointer (hours and minutes) thickness
    ts = 0.7 * f; // watch pointer (seconds) thickness
    ax = 15 * f; // additional length for watch pointers (hours and minutes), starting opposite
    as = 22 * f; // additional length for watch pointers (seconds), starting opposite

    fl15 = 10 * f; // length of fixed mark every 15 minutes
    fw15 = 1 * f; // width of fixed mark every 15 minutes
    fl5 = 10 * f; // length of fixed mark every 5 minutes
    fw5 = 1 * f; // width of fixed mark every 5 minutes
    fl1 = 0; // length of fixed mark every minutes
    fw1 = 0; // width of fixed mark every minutes

    dialBorderTopColor = '#333';
    dialBorderRightColor = '#333';
    dialBorderBottomColor = '#333';
    dialBorderLeftColor = '#333';
    dialBackground1 = '#fff';
    dialBackground2 = null;
    dialShadow1 = null;
    dialShadow2 = null;
    fixedMarkRadius15 = 0;
    fixedMarkRadius5 = 0;
    fixedMarkRadius1 = 0;
    watchPointerColorX = '#333';
    watchPointerColorS = 'red';
    watchPointerBorder = null;
    watchPointerRadius = 0;
    watchPointerShadow = null;
    watchPointerCenterRadius = ts * 2;
    watchPointerCenterColor = 'red';
    watchPointerCenterBorder = null;
    //
  } else if (look === 'smoothy') {
    //-----------//
    //  SMOOTHY  //
    //-----------//

    b = 5 * f; // thickness of border
    m = 10 * f; // margin between border and dial

    tx = Math.max(8 * f, 4); // watch pointer (hours and minutes) thickness
    ts = Math.max(2 * f, 4); // watch pointer (seconds) thickness
    ax = 15 * f; // additional length for watch pointers (hours and minutes), starting opposite
    as = 22 * f; // additional length for watch pointers (seconds), starting opposite

    fl15 = 20 * f; // length of fixed mark every 15 minutes
    fw15 = 20 * f; // width of fixed mark every 15 minutes
    fl5 = 10 * f; // length of fixed mark every 5 minutes
    fw5 = 10 * f; // width of fixed mark every 5 minutes
    fl1 = 0; // length of fixed mark every minutes
    fw1 = 0; // width of fixed mark every minutes

    const rc = '#eee';
    dialBorderTopColor = rc;
    dialBorderRightColor = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(
      theme.palette.chrome,
      0.7
    )}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 =
      'radial-gradient(at 30% 30%, rgba(255, 255, 255, 0.5), rgb(255, 255, 255, 0.0) 24%)';
    dialShadow1 = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(
      5 * f
    )} rgba(0,0,0,0.9)`;
    dialShadow2 = `inset ${px(6 * f)} ${px(6 * f)} ${px(
      24 * f
    )} 0px rgba(0,0,0,0.9)`;
    fixedMarkRadius15 = 10 * f;
    fixedMarkRadius5 = 5 * f;
    fixedMarkRadius1 = 0;
    watchPointerColorX = rc;
    watchPointerColorS = theme.palette.chrome;
    watchPointerBorder = '1px solid black';
    watchPointerRadius = 4 * f;
    watchPointerShadow = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  } else if (look === 'royal') {
    //-----------//
    //   ROYAL   //
    //-----------//

    b = 5 * f; // thickness of border
    m = 10 * f; // margin between border and dial

    tx = Math.max(6 * f, 4); // watch pointer (hours and minutes) thickness
    ts = Math.max(2 * f, 4); // watch pointer (seconds) thickness
    ax = 15 * f; // additional length for watch pointers (hours and minutes), starting opposite
    as = 22 * f; // additional length for watch pointers (seconds), starting opposite

    fl15 = 15 * f; // length of fixed mark every 15 minutes
    fw15 = 6 * f; // width of fixed mark every 15 minutes
    fl5 = 15 * f; // length of fixed mark every 5 minutes
    fw5 = Math.max(2 * f, 4); // width of fixed mark every 5 minutes
    fl1 = Math.max(2 * f, 4); // length of fixed mark every minutes
    fw1 = Math.max(2 * f, 4); // width of fixed mark every minutes

    const rc = ColorManipulator.darken(theme.palette.light, 0.1);
    dialBorderTopColor = rc;
    dialBorderRightColor = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(
      theme.palette.chrome,
      0.7
    )}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 =
      'radial-gradient(at 30% 30%, rgba(255, 255, 255, 0.5), rgb(255, 255, 255, 0.0) 24%)';
    dialShadow1 = `0px 0px ${px(12 * f)} 0px rgba(0,0,0,0.9)`;
    dialShadow2 = `inset ${px(6 * f)} ${px(6 * f)} ${px(
      24 * f
    )} 0px rgba(0,0,0,0.9)`;
    fixedMarkRadius15 = 1 * f;
    fixedMarkRadius5 = 1 * f;
    fixedMarkRadius1 = 2 * f;
    watchPointerColorX = rc;
    watchPointerColorS = theme.palette.chrome;
    watchPointerBorder = '1px solid black';
    watchPointerRadius = 1 * f;
    watchPointerShadow = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  }

  b = Math.max(b, 1);
  m = Math.max(m, 1);
  tx = Math.max(tx, 1);
  ts = Math.max(ts, 1);
  ax = Math.max(ax, 1);
  as = Math.max(as, 1);
  fl15 = Math.max(fl15, 1);
  fw15 = Math.max(fw15, 1);
  fl5 = fl5 ? Math.max(fl5, 1) : 0;
  fw5 = fw5 ? Math.max(fw5, 1) : 0;
  fl1 = fl1 ? Math.max(fl1, 1) : 0;
  fw1 = fw1 ? Math.max(fw1, 1) : 0;

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
    borderTop: `${px(b)} solid ${dialBorderTopColor}`,
    borderRight: `${px(b)} solid ${dialBorderRightColor}`,
    borderBottom: `${px(b)} solid ${dialBorderBottomColor}`,
    borderLeft: `${px(b)} solid ${dialBorderLeftColor}`,
    background: dialBackground2,
    boxShadow: dialShadow2,
    transition: '0.5s ease-out',
  };

  /******************************************************************************/

  // Main fixed mark (every 15 minutes).
  const fixedMark15 = {
    position: 'absolute',
    right: px(s * 0.5 - fw15 * 0.5),
    top: px(b + m),
    width: px(fw15),
    height: px(fl15),
    transformOrigin: `${px(fw15 * 0.5)} ${px(s * 0.5 - b - m)}`,
    backgroundColor: watchPointerColorX,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(fixedMarkRadius15),
    transition: '0.5s ease-out',
  };

  // Secondary fixed mark (every 5 minutes).
  const fixedMark5 = {
    position: 'absolute',
    right: px(s * 0.5 - fw5 * 0.5),
    top: px(b + m),
    width: px(fw5),
    height: px(fl5),
    transformOrigin: `${px(fw5 * 0.5)} ${px(s * 0.5 - b - m)}`,
    backgroundColor: watchPointerColorX,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(fixedMarkRadius5),
    transition: '0.5s ease-out',
  };

  // Secondary fixed mark (every minute).
  const fixedMark1 = {
    position: 'absolute',
    right: px(s * 0.5 - fw1 * 0.5),
    top: px(b + m),
    width: px(fw1),
    height: px(fl1),
    transformOrigin: `${px(fw1 * 0.5)} ${px(s * 0.5 - b - m)}`,
    backgroundColor: watchPointerColorX,
    boxSizing: 'border-box',
    border: fw1 ? watchPointerBorder : null,
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
    bottom: px(ax),
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.45 - b - m - fl15 + ax),
    transformOrigin: `${px(tx * 0.5)} ${px(ax)}`,
    animation: `${60 * 60 * 12}s infinite linear`,
    animationName: watchPointerKeyframes,
    backgroundColor: watchPointerColorX,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  const watchPointerMinute = {
    position: 'relative',
    bottom: px(ax),
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.49 - b - m + ax),
    transformOrigin: `${px(tx * 0.5)} ${px(ax)}`,
    animation: `${60 * 60}s infinite linear`,
    animationName: watchPointerKeyframes,
    backgroundColor: watchPointerColorX,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: '0.5s ease-out',
  };

  const watchPointerSecond = {
    position: 'relative',
    bottom: px(as),
    right: px(ts * 0.5),
    width: px(ts),
    height: px(s * 0.5 - b - m - fl15 + as),
    transformOrigin: `${px(ts * 0.5)} ${px(as)}`,
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
