import svg from '../helpers/svg-helpers';

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

function _getFramePath(dy, place) {
  const path = svg.createPath();

  dy = svg.toInt(dy);
  const r = 10;
  const b = 0.552284749831; // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3
  const rb = r * b;

  // prettier-ignore
  if (place === 'frameLeftScrew') {
    const dx = 20
    svg.ma(path, dx,    0.5);
    svg.la(path, r,     0.5);
    svg.la(path, r,  dy/2-r);
    svg.ba(path, r-rb, dy/2-r,  0.5,  dy/2-rb, 0.5, dy/2);
    svg.ba(path, 0.5,  dy/2+rb, r-rb, dy/2+r,  r,   dy/2+r);
    svg.la(path, r,  dy-0.5);
    svg.la(path, dx, dy-0.5);
  } else if (place === 'frameRightScrew') {
    const dx = 20
    svg.ma(path, 0,    0.5   );
    svg.la(path, dx-r, 0.5   );
    svg.la(path, dx-r, dy/2-r);
    svg.ba(path, dx-r+rb, dy/2-r,  dx-0.5,  dy/2-rb, dx-0.5, dy/2);
    svg.ba(path, dx-0.5,  dy/2+rb, dx-r+rb, dy/2+r,  dx-r,   dy/2+r);
    svg.la(path, dx-r, dy-0.5);
    svg.la(path, 0,    dy-0.5);
  } else if (place === 'frameLeft') {
    const dx = 10
    svg.ma(path, dx,    0.5);
    svg.la(path, 0,     0.5);
    svg.la(path, 0,  dy-0.5);
    svg.la(path, dx, dy-0.5);
  } else if (place === 'frameRight') {
    const dx = 10
    svg.ma(path, 0,     0.5);
    svg.la(path, dx,    0.5);
    svg.la(path, dx, dy-0.5);
    svg.la(path, 0,  dy-0.5);
  }

  return svg.getPath(path);
}

function getFrameElements(dy, place, frameBorderColor, frameBackgroundColor) {
  const elements = svg.createElements();

  const props = {
    stroke: frameBorderColor,
    strokeWidth: '1px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: frameBackgroundColor,
  };

  svg.pushPath(elements, _getFramePath(dy, place), props);

  return elements;
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
  getFrameElements,
  getPlace,
};
