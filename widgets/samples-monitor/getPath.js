// Move to absolute position.
function moveTo(path, x, y) {
  path += 'M ' + x + ' ' + y + ' ';
  return path;
}

// Line to absolute position.
function lineTo(path, x, y) {
  path += 'L ' + x + ' ' + y + ' ';
  return path;
}

function bezierTo(path, x1, y1, x2, y2, x, y) {
  path += 'C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x + ' ' + y + ' ';
  return path;
}

// Close path.
function close(path) {
  path += 'z';
  return path;
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

  let path = '';

  switch (styleName) {
    case 'screenLeft':
      path = moveTo(path, 0, 0);
      path = lineTo(path, 0, h);
      path = lineTo(path, t, h - t);
      path = bezierTo(path, 0, h - t * 2, 0, t * 2, t, t);
      path = close(path);
      break;
    case 'screenRight':
      path = moveTo(path, w, 0);
      path = lineTo(path, w, h);
      path = lineTo(path, w - t, h - t);
      path = bezierTo(path, w, h - t * 2, w, t * 2, w - t, t);
      path = close(path);
      break;
    case 'screenTop':
      path = moveTo(path, 0, 0);
      path = lineTo(path, w, 0);
      path = lineTo(path, w - t, t);
      path = bezierTo(path, w - t * 2, 0, t * 2, 0, t, t);
      path = close(path);
      break;
    case 'screenBottom':
      path = moveTo(path, 0, h);
      path = lineTo(path, w, h);
      path = lineTo(path, w - t, h - t);
      path = bezierTo(path, w - t * 2, h, t * 2, h, t, h - t);
      path = close(path);
      break;
  }

  return path;
}

function getSamplesPath(ox, oy, dx, dy, samples, max) {
  let path = '';
  const count = samples.size;

  for (let i = 0; i < count; i++) {
    const x = dx - (dx / (count - 1)) * i;
    const y = dy - (samples.get(i) / max) * dy;

    if (i === 0) {
      path = moveTo(path, ox + x, oy + y);
    } else {
      path = lineTo(path, ox + x, oy + y);
    }
  }

  return path;
}

function getGridPath(ox, oy, dx, dy, nx, ny) {
  let path = '';

  for (let x = 0; x <= dx; x += dx / nx) {
    path = moveTo(path, ox + x, oy + 0);
    path = lineTo(path, ox + x, oy + dy);
  }

  for (let y = 0; y <= dy; y += dy / ny) {
    path = moveTo(path, ox + 0, oy + y);
    path = lineTo(path, ox + dx, oy + y);
  }

  return path;
}

function getPowerOffPath(dx, dy) {
  let path = '';

  const center = {x: dx / 2, y: dy / 2};
  const e1 = {x: dx / 2 + dx * 0.2, y: dy / 2};
  const e2 = {x: dx / 2 - dx * 0.2, y: dy / 2};
  for (let a = 0; a < 180; a += 45) {
    const p1 = rotatePointDeg(center, a, e1);
    const p2 = rotatePointDeg(center, a, e2);
    path = moveTo(path, p1.x, p1.y);
    path = lineTo(path, p2.x, p2.y);
  }

  return path;
}

/******************************************************************************/

module.exports = {
  getScreenPath,
  getSamplesPath,
  getGridPath,
  getPowerOffPath,
};
