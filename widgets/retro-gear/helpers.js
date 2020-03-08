// Convert string '123px' to int 123.
function toInt(value) {
  if (typeof value === 'string') {
    return parseInt(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

// Move to absolute position.
function moveTo(path, x, y) {
  path.push('M ' + x + ' ' + y);
}

// Line to absolute position.
function lineTo(path, x, y) {
  path.push('L ' + x + ' ' + y);
}

function bezierTo(path, x1, y1, x2, y2, x, y) {
  path.push('C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x + ' ' + y);
}

// Close path.
function close(path) {
  path.push('z');
}

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

// prettier-ignore
function getCirclePath(path, cx, cy, r) {
  const b = 0.552284749831; // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3
  const rb = r * b;

  moveTo(path, cx+r, cy);
  bezierTo(path, cx+r,  cy+rb, cx+rb, cy+r,  cx,   cy+r);
  bezierTo(path, cx-rb, cy+r,  cx-r,  cy+rb, cx-r, cy  );
  bezierTo(path, cx-r,  cy-rb, cx-rb, cy-r,  cx,   cy-r);
  bezierTo(path, cx+rb, cy-r,  cx+r,  cy-rb, cx+r, cy  );
  close(path);
}

function getRadius(r, toothThickness) {
  return {
    r1: r * 0.1, // axe
    r2: r * 0.15,
    r3: r - toothThickness,
    r4: r - toothThickness / 1.5,
    r5: r - 1, // outside
  };
}

/******************************************************************************/

// Outer teeth and axis.
function getGearLightPath(cx, cy, r, toothCount = 36, toothThickness = 60) {
  cx = toInt(cx);
  cy = toInt(cy);
  r = toInt(r);
  r = getRadius(r, toothThickness);
  const rs = r.r4 + (r.r5 - r.r4) * 0.4;

  const path = [];

  const a1 = 180 / toothCount;
  const a2 = a1 / 5;
  const a3 = a1 / 10;
  let a = 0;
  for (let i = 0; i < toothCount * 2; i++) {
    const r1 = i % 2 === 0 ? r.r5 : r.r4;
    const r2 = i % 2 !== 0 ? r.r5 : r.r4;
    const as = i % 2 === 0 ? a2 : -a2;
    const p1 = rotatePointDeg({x: cx, y: cy}, a - a2, {x: cx + r1, y: cy});
    const s1 = rotatePointDeg({x: cx, y: cy}, a + as, {x: cx + rs, y: cy});
    const p2 = rotatePointDeg({x: cx, y: cy}, a + a2, {x: cx + r2, y: cy});
    if (i === 0) {
      moveTo(path, p1.x, p1.y);
    } else {
      lineTo(path, p1.x, p1.y);
    }
    bezierTo(path, s1.x, s1.y, p2.x, p2.y, p2.x, p2.y);
    a += a1 + (i % 2 === 0 ? a3 : -a3);
  }
  close(path);

  getCirclePath(path, cx, cy, r.r3);

  getCirclePath(path, cx, cy, r.r2);
  getCirclePath(path, cx, cy, r.r1);

  return path.join(' ');
}

// Openwork interior.
function getGearDarkPath(cx, cy, r, toothCount = 36, toothThickness = 60) {
  cx = toInt(cx);
  cy = toInt(cy);
  r = toInt(r);
  r = getRadius(r, toothThickness);

  const path = [];

  getCirclePath(path, cx, cy, r.r3);
  getCirclePath(path, cx, cy, r.r2);
  getCirclePath(path, cx, cy, r.r1);

  const x = (r.r2 + r.r3) / 2;
  const rr = (r.r3 - r.r2) * 0.3;
  for (let a = 0; a < 360; a += 60) {
    const c = rotatePointDeg({x: cx, y: cy}, a, {x: cx + x, y: cy});
    getCirclePath(path, c.x, c.y, rr);
  }

  return path.join(' ');
}

/******************************************************************************/

module.exports = {
  getGearLightPath,
  getGearDarkPath,
};
