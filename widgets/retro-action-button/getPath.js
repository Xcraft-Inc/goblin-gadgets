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

/******************************************************************************/

function getFramePath(dy, place) {
  let path = '';

  dy = toInt(dy);
  const r = 10;
  const b = 0.55;

  // prettier-ignore
  if (place === 'left-screw') {
    const dx = 20
    path = moveTo(path, dx, 0.5);
    path = lineTo(path, r, 0.5);
    path = lineTo(path, r, dy/2-r);
    path = bezierTo(path, r-r*b, dy/2-r, 0.5, dy/2-r*b, 0.5, dy/2);
    path = bezierTo(path, 0.5, dy/2+r*b, r-r*b, dy/2+r, r, dy/2+r);
    path = lineTo(path, r, dy-0.5);
    path = lineTo(path, dx, dy-0.5);
  } else if (place === 'right-screw') {
    const dx = 20
    path = moveTo(path, 0, 0.5);
    path = lineTo(path, dx-r, 0.5);
    path = lineTo(path, dx-r, dy/2-r);
    path = bezierTo(path, dx-r+r*b, dy/2-r, dx-0.5, dy/2-r*b, dx-0.5, dy/2);
    path = bezierTo(path, dx-0.5, dy/2+r*b, dx-r+r*b, dy/2+r, dx-r, dy/2+r);
    path = lineTo(path, dx-r, dy-0.5);
    path = lineTo(path, 0, dy-0.5);
  } else if (place === 'left') {
    const dx = 10
    path = moveTo(path, dx, 0.5);
    path = lineTo(path, 0, 0.5);
    path = lineTo(path, 0, dy-0.5);
    path = lineTo(path, dx, dy-0.5);
  } else if (place === 'right') {
    const dx = 10
    path = moveTo(path, 0, 0.5);
    path = lineTo(path, dx, 0.5);
    path = lineTo(path, dx, dy-0.5);
    path = lineTo(path, 0, dy-0.5);
  }

  return path;
}

/******************************************************************************/

module.exports = {
  getFramePath,
};
