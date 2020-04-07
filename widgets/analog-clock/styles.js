import {Unit} from 'electrum-theme';

export const propNames = ['size'];

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
  const {size = '180px'} = props;

  const s = Unit.parse(size).value; // width and height (square)
  const f = s / 180; // magic factor

  const tx = 6 * f; // thickness watch pointer hours and minutes
  const ts = Math.max(0.7 * f, 1); // thickness watch pointer seconds
  const add = 15 * f; // additional reverse length from center for watch pointers

  const b = 8 * f; // thickness of border
  const m = 4 * f; // margin between border and cadran

  /******************************************************************************/

  const analogClock = {
    position: 'relative',
    width: px(s),
    height: px(s),
  };

  // White cadran, with outside shadow.
  const cadran1 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: '0px',
    top: '0px',
    borderRadius: px(s),
    backgroundColor: '#fff',
    boxShadow: `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(
      5 * f
    )} rgba(0,0,0,0.9)`,
  };

  // Silver border, with inside shadow.
  const cadran2 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: '0px',
    top: '0px',
    boxSizing: 'border-box',
    borderRadius: px(s),
    borderTop: `${px(b)} solid #ccc`,
    borderRight: `${px(b)} solid #aaa`,
    borderBottom: `${px(b)} solid #aaa`,
    borderLeft: `${px(b)} solid #ccc`,
    boxShadow: `inset ${px(6 * f)} ${px(6 * f)} ${px(
      24 * f
    )} 0px rgba(0,0,0,0.9)`,
  };

  /******************************************************************************/

  // Main fix mark (each 5 minutes).
  const fl1 = 20 * f; // length
  const fw1 = tx; // width
  const fix1 = {
    position: 'absolute',
    right: px(s * 0.5 - fw1 * 0.5),
    top: px(b + m),
    width: px(fw1),
    height: px(fl1),
    transformOrigin: `${px(fw1 * 0.5)} ${px(s * 0.5 - b - m)}`,
    backgroundColor: '#333',
  };

  // Secondary fix mark (each minute).
  const fl2 = 5 * f; // length
  const fw2 = 2 * f; // width
  const fix2 = {
    position: 'absolute',
    right: px(s * 0.5 - fw2 * 0.5),
    top: px(b + m),
    width: px(fw2),
    height: px(fl2),
    transformOrigin: `${px(fw2 * 0.5)} ${px(s * 0.5 - b - m)}`,
    backgroundColor: '#333',
  };

  /******************************************************************************/

  // Parent for watch pointer, with initial rotate according to Date.now().
  const watchPointers = {
    position: 'absolute',
    right: px(s * 0.5),
    bottom: px(s * 0.5),
    width: '0px',
    height: '0px',
  };

  const watchPointerKeyframes = {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359.999deg)',
    },
  };

  const _watchPointer = {
    position: 'relative',
    bottom: px(add),
  };

  const watchPointerHour = {
    ..._watchPointer,
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.45 - b - m - fl1 + add),
    transformOrigin: `${px(tx * 0.5)} ${px(add)}`,
    animation: '86400s infinite linear',
    animationName: watchPointerKeyframes,
    backgroundColor: '#333',
  };

  const watchPointerMinute = {
    ..._watchPointer,
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.49 - b - m + add),
    transformOrigin: `${px(tx * 0.5)} ${px(add)}`,
    animation: '3600s infinite linear',
    animationName: watchPointerKeyframes,
    backgroundColor: '#333',
  };

  const watchPointerSecond = {
    ..._watchPointer,
    bottom: px(add * 1.5),
    right: px(ts * 0.5),
    width: px(ts),
    height: px(s * 0.5 - b - m - fl1 + add * 1.5),
    transformOrigin: `${px(ts * 0.5)} ${px(add * 1.5)}`,
    animation: '60s infinite linear',
    animationName: getSecondKeyFrames(),
    animationTimingFunction: 'cubic-bezier(1, 0, 1, 0.1)',
    backgroundColor: 'red',
  };

  // Little centered red dot.
  const watchPointerCenter = {
    position: 'absolute',
    right: px(s * 0.5 - ts * 2),
    bottom: px(s * 0.5 - ts * 2),
    width: px(ts * 4),
    height: px(ts * 4),
    backgroundColor: 'red',
    borderRadius: px(tx * 2),
  };

  /******************************************************************************/

  return {
    analogClock,

    cadran1,
    cadran2,

    fix1,
    fix2,

    watchPointers,
    watchPointerHour,
    watchPointerMinute,
    watchPointerSecond,
    watchPointerCenter,
  };
}

/******************************************************************************/
