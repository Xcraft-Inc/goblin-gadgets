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

function getRange(samples) {
  let min = 0;
  let max = 1;
  for (let i = 0; i < samples.length; i++) {
    min = Math.min(min, samples[i]);
    max = Math.max(max, samples[i]);
  }
  return {min, max};
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

function getScreenPath(width, height, part) {
  const w = toInt(width);
  const h = toInt(height);
  const t = 30;

  let path = '';

  switch (part) {
    case 'left':
      path = moveTo(path, 0, 0);
      path = lineTo(path, 0, h);
      path = lineTo(path, t, h - t);
      path = bezierTo(path, 0, h - t * 2, 0, t * 2, t, t);
      path = close(path);
      break;
    case 'right':
      path = moveTo(path, w, 0);
      path = lineTo(path, w, h);
      path = lineTo(path, w - t, h - t);
      path = bezierTo(path, w, h - t * 2, w, t * 2, w - t, t);
      path = close(path);
      break;
    case 'top':
      path = moveTo(path, 0, 0);
      path = lineTo(path, w, 0);
      path = lineTo(path, w - t, t);
      path = bezierTo(path, w - t * 2, 0, t * 2, 0, t, t);
      path = close(path);
      break;
    case 'bottom':
      path = moveTo(path, 0, h);
      path = lineTo(path, w, h);
      path = lineTo(path, w - t, h - t);
      path = bezierTo(path, w - t * 2, h, t * 2, h, t, h - t);
      path = close(path);
      break;
  }

  return path;
}

function getSamplesPath(width, height, samples) {
  const m = 40;
  const w = toInt(width) - m * 2;
  const h = toInt(height) - m * 2;

  const range = getRange(samples);
  let path = '';
  const count = samples.length;

  for (let i = 0; i < count; i++) {
    const x = w - (w / (count - 1)) * i;
    const y = h - ((samples[i] - range.min) / (range.max - range.min)) * h;

    if (i === 0) {
      path = moveTo(path, m + x, m + y);
    } else {
      path = lineTo(path, m + x, m + y);
    }
  }

  return path;
}

function getGridPath(width, height, nx, ny) {
  const m = 40;
  const w = toInt(width) - m * 2;
  const h = toInt(height) - m * 2;

  let path = '';

  for (let x = 0; x <= w; x += w / nx) {
    path = moveTo(path, m + x, m + 0);
    path = lineTo(path, m + x, m + h);
  }

  for (let y = 0; y <= h; y += h / ny) {
    path = moveTo(path, m + 0, m + y);
    path = lineTo(path, m + w, m + y);
  }

  return path;
}

function getPowerOffPath(width, height) {
  const w = toInt(width);
  const h = toInt(height);

  let path = '';

  const center = {x: w / 2, y: h / 2};
  const e1 = {x: w / 2 + w * 0.2, y: h / 2};
  const e2 = {x: w / 2 - w * 0.2, y: h / 2};
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
