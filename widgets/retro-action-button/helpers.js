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
  const path = [];

  dy = toInt(dy);
  const r = 10;
  const b = 0.552284749831; // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3
  const rb = r * b;

  // prettier-ignore
  if (place === 'left-screw') {
    const dx = 20
    moveTo(path, dx, 0.5);
    lineTo(path, r,  0.5);
    lineTo(path, r,  dy/2-r);
    bezierTo(path, r-rb, dy/2-r,  0.5,  dy/2-rb, 0.5, dy/2);
    bezierTo(path, 0.5,  dy/2+rb, r-rb, dy/2+r,  r,   dy/2+r);
    lineTo(path, r,  dy-0.5);
    lineTo(path, dx, dy-0.5);
  } else if (place === 'right-screw') {
    const dx = 20
    moveTo(path, 0,    0.5);
    lineTo(path, dx-r, 0.5);
    lineTo(path, dx-r, dy/2-r);
    bezierTo(path, dx-r+rb, dy/2-r,  dx-0.5,  dy/2-rb, dx-0.5, dy/2);
    bezierTo(path, dx-0.5,  dy/2+rb, dx-r+rb, dy/2+r,  dx-r,   dy/2+r);
    lineTo(path, dx-r, dy-0.5);
    lineTo(path, 0,    dy-0.5);
  } else if (place === 'left') {
    const dx = 10
    moveTo(path, dx, 0.5);
    lineTo(path, 0,  0.5);
    lineTo(path, 0,  dy-0.5);
    lineTo(path, dx, dy-0.5);
  } else if (place === 'right') {
    const dx = 10
    moveTo(path, 0,  0.5);
    lineTo(path, dx, 0.5);
    lineTo(path, dx, dy-0.5);
    lineTo(path, 0,  dy-0.5);
  }

  return path.join(' ');
}

/******************************************************************************/

function getPlace(place) {
  if (place === '1/1') {
    return 'single';
  } else if (place && place.indexOf('/') !== -1) {
    const n = place.split('/');
    if (n.length === 2) {
      if (n[0] === '1') {
        return 'left';
      } else if (n[0] === n[1]) {
        return 'right';
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
