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

function getScreenPath(width, height, part) {
  const w = toInt(width);
  const h = toInt(height);
  const t = 25;

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

function getSamplePath(width, height, samples) {
  const m = 10;
  const w = toInt(width) - m * 2;
  const h = toInt(height) - m * 2;

  const range = getRange(samples);
  let path = '';
  const count = samples.length;

  for (let i = 0; i < count; i++) {
    const x = w - (w / count) * i;
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
  const m = 10;
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

/******************************************************************************/

module.exports = {
  getScreenPath,
  getSamplePath,
  getGridPath,
};
