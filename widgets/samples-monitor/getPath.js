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

function getScreenPath(w, h, styleName) {
  const t = 30;

  const path = [];

  switch (styleName) {
    case 'screenLeft':
      moveTo(path, 0, 0);
      lineTo(path, 0, h);
      lineTo(path, t, h - t);
      bezierTo(path, 0, h - t * 2, 0, t * 2, t, t);
      close(path);
      break;
    case 'screenRight':
      moveTo(path, w, 0);
      lineTo(path, w, h);
      lineTo(path, w - t, h - t);
      bezierTo(path, w, h - t * 2, w, t * 2, w - t, t);
      close(path);
      break;
    case 'screenTop':
      moveTo(path, 0, 0);
      lineTo(path, w, 0);
      lineTo(path, w - t, t);
      bezierTo(path, w - t * 2, 0, t * 2, 0, t, t);
      close(path);
      break;
    case 'screenBottom':
      moveTo(path, 0, h);
      lineTo(path, w, h);
      lineTo(path, w - t, h - t);
      bezierTo(path, w - t * 2, h, t * 2, h, t, h - t);
      close(path);
      break;
  }

  return path.join(' ');
}

function getSamplesPath(ox, oy, dx, dy, samples, max) {
  const path = [];
  const count = samples.size;

  for (let i = 0; i < count; i++) {
    const x = dx - (dx / (count - 1)) * i;
    const y = dy - (samples.get(i) / max) * dy;

    if (i === 0) {
      moveTo(path, ox + x, oy + y);
    } else {
      lineTo(path, ox + x, oy + y);
    }
  }

  return path.join(' ');
}

function getGridPath(ox, oy, dx, dy, nx, ny) {
  const path = [];

  for (let x = 0; x <= dx; x += dx / nx) {
    moveTo(path, ox + x, oy + 0);
    lineTo(path, ox + x, oy + dy);
  }

  for (let y = 0; y <= dy; y += dy / ny) {
    moveTo(path, ox + 0, oy + y);
    lineTo(path, ox + dx, oy + y);
  }

  return path.join(' ');
}

function getPowerOffPath(dx, dy) {
  const path = [];

  const center = {x: dx / 2, y: dy / 2};
  const e1 = {x: dx / 2 + dx * 0.2, y: dy / 2};
  const e2 = {x: dx / 2 - dx * 0.2, y: dy / 2};
  for (let a = 0; a < 180; a += 45) {
    const p1 = rotatePointDeg(center, a, e1);
    const p2 = rotatePointDeg(center, a, e2);
    moveTo(path, p1.x, p1.y);
    lineTo(path, p2.x, p2.y);
  }

  return path.join(' ');
}

/******************************************************************************/

module.exports = {
  getScreenPath,
  getSamplesPath,
  getGridPath,
  getPowerOffPath,
};
