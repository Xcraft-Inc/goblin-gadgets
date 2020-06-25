import {Unit, ColorManipulator} from 'goblin-theme';
import {ColorHelpers} from 'goblin-theme';

/******************************************************************************/

function degToRad(angle) {
  return (angle * Math.PI) / 180.0;
}

function rotatePointDeg(center, angle, p) {
  return rotatePointRad(center, degToRad(angle), p);
}

function rotatePointRad(center, angle, p) {
  //	Fait tourner un point autour d'un centre.
  //	L'angle est exprimé en radians.
  //	Un angle positif est horaire (CW), puisque Y va de haut en bas.

  const a = {x: 0, y: 0};
  const b = {x: 0, y: 0};

  a.x = p.x - center.x;
  a.y = p.y - center.y;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  b.x = a.x * cos - a.y * sin;
  b.y = a.x * sin + a.y * cos;

  b.x += center.x;
  b.y += center.y;

  return b;
}

/******************************************************************************/

function px(n) {
  return n + 'px';
}

function pc(n) {
  return n + '%';
}

function n(n) {
  if (typeof n === 'string' && n.endsWith('px')) {
    return parseInt(n.substring(0, n.length - 2));
  }
  return n;
}

/******************************************************************************/

export const propNames = [
  'value',
  'disabled',
  'grow',
  'width',
  'height',
  'cabSize',
];

export default function styles(theme, props) {
  const {value, disabled, grow, width, height, cabSize = 'default'} = props;

  const w = n(width);
  const h = n(height);
  const isDark = theme.colors.isDarkTheme;
  const hasCab = value !== null && value !== undefined;
  const thickness = 20;

  const cabValue = Math.max(Math.min(value, 360), 0); // 0..360
  const p = rotatePointDeg({x: w / 2, y: h / 2}, 360 - cabValue, {
    x: 0,
    y: -h / 2 + thickness / 2,
  });

  let cabThickness = {
    small: 8,
    default: 14,
    large: 18,
  }[cabSize];

  const sliderCircle = {
    position: 'relative',
    flexGrow: grow,
    width: width,
    height: height,
    opacity: disabled ? 0.4 : 1,
    borderRadius: '100%',
    background: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
    cursor: disabled ? null : 'pointer',
  };

  const inside = {
    position: 'absolute',
    left: px(thickness),
    right: px(thickness),
    bottom: px(thickness),
    top: px(thickness),
    borderRadius: '100%',
    backgroundColor: theme.palette.calendarBackground,
    display: 'flex',
    flexDirection: 'row',
  };

  const cab = {
    position: 'absolute',
    left: `calc(${pc(p.x)} - ${px(cabThickness / 2)})`,
    bottom: `calc(${pc(p.y)} - ${px(cabThickness / 2)})`,
    width: px(cabThickness),
    height: px(cabThickness),
    borderRadius: px(cabThickness / 2),
    background: 'white',
    boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.6)',
    display: hasCab ? null : 'none',
  };

  const fullscreen = {
    zIndex: 999,
    position: 'fixed',
    display: 'flex',
    visibility: 'visible',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(255,0,0,0.5)',
  };

  /******************************************************************************/

  return {
    sliderCircle,
    inside,
    cab,
    fullscreen,
  };
}

/******************************************************************************/
