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

function getSamplesPath(ox, oy, dx, dy, samples, max, part) {
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

  if (part === 'fill') {
    lineTo(path, ox, oy + dy);
    lineTo(path, ox + dx, oy + dy);
    close(path);
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

/******************************************************************************/

module.exports = {
  getScreenPath,
  getSamplesPath,
  getGridPath,
};
