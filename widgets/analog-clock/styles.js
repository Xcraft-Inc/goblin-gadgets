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
  const {size} = props;

  const analogClock = {
    position: 'relative',
    width: size,
    height: size,
  };

  /******************************************************************************/

  const s = Unit.parse(size).value;
  const f = s / 150;

  const tx = f * 5; // thickness watch pointer hours and minutes
  const ts = Math.max(f * 0.7, 1); // thickness watch pointer seconds
  const add = s * 0.1; // additional length from center for watch pointers

  const b = f * 8; // thickness of border
  const m = s * 0.05; // margin between border and cadran

  const cadran1 = {
    position: 'absolute',
    width: px(s * 1 + m + b),
    height: px(s * 1 + m + b),
    left: px(-m),
    top: px(-m),
    borderRadius: px(s),
    backgroundColor: '#fff',
    boxShadow: '6px 6px 20px 4px rgba(0,0,0,0.9)',
  };

  const cadran2 = {
    position: 'absolute',
    width: px(s * 1 + m),
    height: px(s * 1 + m),
    left: px(-(b + m / 2)),
    top: px(-(b + m / 2)),
    borderRadius: px(s),
    borderTop: `${px(m)} solid #ccc`,
    borderRight: `${px(m)} solid #aaa`,
    borderBottom: `${px(m)} solid #aaa`,
    borderLeft: `${px(m)} solid #ccc`,
    boxShadow: 'inset 6px 6px 24px 0px rgba(0,0,0,0.9)',
  };

  /******************************************************************************/

  const fl1 = f * 20;
  const fw1 = tx;
  const fix1 = {
    position: 'absolute',
    right: px(s * 0.5 - fw1 * 0.5),
    top: '0px',
    width: px(fw1),
    height: px(fl1),
    transformOrigin: `${px(fw1 * 0.5)} ${px(s * 0.5)}`,
    backgroundColor: '#333',
  };

  const fl2 = f * 5;
  const fw2 = f * 2;
  const fix2 = {
    position: 'absolute',
    right: px(s * 0.5 - fw2 * 0.5),
    top: '0px',
    width: px(fw2),
    height: px(fl2),
    transformOrigin: `${px(fw2 * 0.5)} ${px(s * 0.5)}`,
    backgroundColor: '#333',
  };

  /******************************************************************************/

  const watchPointerKeyframes = {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359.999deg)',
    },
  };

  const watchPointers = {
    position: 'absolute',
    right: px(s * 0.5),
    bottom: px(s * 0.5),
    width: '0px',
    height: '0px',
  };

  const _watchPointer = {
    position: 'relative',
    bottom: px(add),
  };

  const watchPointerHour = {
    ..._watchPointer,
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.45 - fl1 + add),
    transformOrigin: `${px(tx * 0.5)} ${px(add)}`,
    animation: '86400s infinite linear',
    animationName: watchPointerKeyframes,
    backgroundColor: '#333',
  };

  const watchPointerMinute = {
    ..._watchPointer,
    right: px(tx * 0.5),
    width: px(tx),
    height: px(s * 0.49 + add),
    transformOrigin: `${px(tx * 0.5)} ${px(add)}`,
    animation: '3600s infinite linear',
    animationName: watchPointerKeyframes,
    backgroundColor: '#333',
  };

  const watchPointerSecond = {
    ..._watchPointer,
    right: px(ts * 0.5),
    width: px(ts),
    height: px(s * 0.5 - fl1 + add),
    transformOrigin: `${px(ts * 0.5)} ${px(add)}`,
    animation: '60s infinite linear',
    animationName: getSecondKeyFrames(),
    animationTimingFunction: 'cubic-bezier(0, 1, 0, 1)',
    backgroundColor: 'red',
  };

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
