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

// By example, with place = 'left-screw':
//                 20
//            <----------->
//    ^             +------
//    |             |
//    |             |
//    |     ^   ----+
//    |     |  /
// dy |  20 | |     o  <-- half circle, place for a screw
//    |     |  \
//    |     v   ----+
//    |             |
//    |             |
//    v             +------
//            <----> <---->
//              10    10

function getFramePath(dy, place) {
  let path = '';

  dy = toInt(dy);
  const r = 10;
  const b = 0.552284749831; // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3
  const rb = r * b;

  // prettier-ignore
  if (place === 'left-screw') {
    const dx = 20
    path = moveTo(path, dx, 0.5);
    path = lineTo(path, r,  0.5);
    path = lineTo(path, r,  dy/2-r);
    path = bezierTo(path, r-rb, dy/2-r,  0.5,  dy/2-rb, 0.5, dy/2);
    path = bezierTo(path, 0.5,  dy/2+rb, r-rb, dy/2+r,  r,   dy/2+r);
    path = lineTo(path, r,  dy-0.5);
    path = lineTo(path, dx, dy-0.5);
  } else if (place === 'right-screw') {
    const dx = 20
    path = moveTo(path, 0,    0.5);
    path = lineTo(path, dx-r, 0.5);
    path = lineTo(path, dx-r, dy/2-r);
    path = bezierTo(path, dx-r+rb, dy/2-r,  dx-0.5,  dy/2-rb, dx-0.5, dy/2);
    path = bezierTo(path, dx-0.5,  dy/2+rb, dx-r+rb, dy/2+r,  dx-r,   dy/2+r);
    path = lineTo(path, dx-r, dy-0.5);
    path = lineTo(path, 0,    dy-0.5);
  } else if (place === 'left') {
    const dx = 10
    path = moveTo(path, dx, 0.5);
    path = lineTo(path, 0,  0.5);
    path = lineTo(path, 0,  dy-0.5);
    path = lineTo(path, dx, dy-0.5);
  } else if (place === 'right') {
    const dx = 10
    path = moveTo(path, 0,  0.5);
    path = lineTo(path, dx, 0.5);
    path = lineTo(path, dx, dy-0.5);
    path = lineTo(path, 0,  dy-0.5);
  }

  return path;
}

/******************************************************************************/

function getPlace(place) {
  if (place === '1/1') {
    return 'single';
  } else if (place.indexOf('/') !== -1) {
    const n = place.split('/');
    if (n.length === 2) {
      if (n[0] === '1') {
        return 'left';
      } else if (n[0] === n[1]) {
        return 'right';
      } else {
        return 'middle';
      }
    }
  }
  return 'middle';
}

/******************************************************************************/

module.exports = {
  getFramePath,
  getPlace,
};
