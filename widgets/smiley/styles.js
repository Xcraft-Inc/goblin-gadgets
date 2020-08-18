import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

import {ColorHelpers} from 'goblin-theme';
import {color as ColorConverters} from 'xcraft-core-converters';
import geom from '../helpers/geom-helpers';

/******************************************************************************/

function adjust(satisfaction, happyValue, unhappyValue) {
  return (happyValue - unhappyValue) * (satisfaction / 100) + unhappyValue;
}

function changeColor(color, hueShift, saturationFactor = 1, lightFactor = 1) {
  const analysis = ColorConverters.analysisFromCanonical(color);

  const hue = geom.clipAngleDeg(analysis.h + hueShift);

  const newAnalysis = {
    mode: 'HSL',
    h: hue,
    s: analysis.s * saturationFactor,
    l: analysis.l * lightFactor,
  };

  return ColorConverters.toRGB(
    ColorConverters.analysisToCanonical(newAnalysis)
  );
}

/******************************************************************************/

export const propNames = [
  'size',
  'mainColor',
  'topColor',
  'satisfaction',
  'transition',
];

export default function styles(theme, props) {
  let {
    size = '100px',
    mainColor = '#ff0',
    topColor,
    satisfaction = 100,
    transition = '1.0s ease-out',
  } = props;

  const s = n(size);
  satisfaction = Math.min(Math.max(0, satisfaction), 100);
  const happy = satisfaction >= 50;

  mainColor = ColorHelpers.getMarkColor(theme, mainColor);

  /******************************************************************************/

  // Main circle.
  if (!topColor) {
    topColor = changeColor(mainColor, -30);
  }

  const borderColor = changeColor(mainColor, 0, 1, 0.5);

  const smiley = {
    position: 'relative',
    width: px(s),
    height: px(s),
    borderRadius: px(s),
    border: `${px(s * 0.05)} solid ${borderColor}`,
    background: `linear-gradient(180deg, ${topColor}, ${mainColor})`,
    transition,
  };

  /******************************************************************************/

  // Eyes.
  const _eye = {
    position: 'absolute',
    top: px(s * 0.3),
    width: px(s * 0.1),
    height: px(s * 0.1),
    borderRadius: px(s * 0.1),
    backgroundColor: '#000',
    transform: `scaleY(${adjust(satisfaction, 2, 1)})`,
    transition,
  };

  const leftEye = {
    ..._eye,
    left: px(s * adjust(satisfaction, 0.35, 0.3)),
  };

  const rightEye = {
    ..._eye,
    right: px(s * adjust(satisfaction, 0.35, 0.3)),
  };

  /******************************************************************************/

  // Smile.
  const ss = happy ? (satisfaction - 50) * 2 : 50 - satisfaction;
  const sr1 = adjust(ss, s * 0.75, s * 1.25);
  const sr2 = adjust(ss, s * 0.75, s * 0.37);

  const smile = {
    position: 'absolute',
    bottom: px(adjust(satisfaction, s * 0.2, s * 0.3)),
    left: px(s * 0.15),
    right: px(s * 0.15),
    height: px(adjust(ss, s * 0.3, 0)),
    borderRadius: happy
      ? `0 0 ${px(sr1)} ${px(sr1)} / 0 0 ${px(sr2)} ${px(sr2)}`
      : `${px(sr1)} ${px(sr1)} 0 0 / ${px(sr2)} ${px(sr2)} 0 0`,
    border: `${px(s * 0.05)} solid #000`,
    borderTop: happy ? 0 : null,
    borderBottom: happy ? null : 0,
    transition,
  };

  const _corner = {
    position: 'absolute',
    top: px(adjust(ss, -s * 0.07, -s * 0.03)),
    width: px(s * 0.05),
    height: px(adjust(ss, s * 0.15, s * 0.075)),
    borderRadius: `${px(s * 0.05)} / ${px(s * 0.08)}`,
    backgroundColor: '#000',
    display: happy ? null : 'none',
    transition,
  };

  const a = adjust(ss, 65, 0);

  const leftCorner = {
    ..._corner,
    left: px(-s * 0.055),
    transform: `rotate(${a}deg)`,
  };

  const rightCorner = {
    ..._corner,
    right: px(-s * 0.055),
    transform: `rotate(${-a}deg)`,
  };

  /******************************************************************************/

  const reflexionColor = ColorConverters.slide(mainColor, topColor, 0.4);
  const reflexionOpacity = Math.max(adjust(satisfaction, 0.8, -0.8), 0);

  const reflexion1 = {
    position: 'absolute',
    left: px(s * 0.25),
    right: px(s * 0.25),
    top: px(s * 0.1),
    bottom: px(s * 0.4),
    borderRadius: px(s),
    background: `linear-gradient(180deg, white, ${reflexionColor})`,
    transform: 'scaleX(1.6)',
    opacity: reflexionOpacity,
  };

  const reflexion2 = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderStyle: 'solid',
    borderRadius: px(s),
    borderWidth: px(s * 0.025),
    borderColor: `transparent white white transparent`,
    transform: 'rotate(45deg)',
    opacity: reflexionOpacity,
  };

  /******************************************************************************/

  return {
    smiley,
    leftEye,
    rightEye,
    smile,
    leftCorner,
    rightCorner,
    reflexion1,
    reflexion2,
  };
}

/******************************************************************************/
