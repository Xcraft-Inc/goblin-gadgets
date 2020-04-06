import {ColorManipulator} from 'electrum-theme';
import svg from '../helpers/svg-helpers';

/******************************************************************************/

function _getRadius(r, toothThickness) {
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
function _getGearLightPath(cx, cy, r, toothThickness, toothCount) {
  cx = svg.toInt(cx);
  cy = svg.toInt(cy);
  r = svg.toInt(r);
  r = _getRadius(r, toothThickness);
  const rs = r.r4 + (r.r5 - r.r4) * 0.4;

  const path = svg.createPath();

  const a1 = 180 / toothCount;
  const a2 = a1 / 5;
  const a3 = a1 / 10;
  let a = 0;
  for (let i = 0; i < toothCount * 2; i++) {
    const r1 = i % 2 === 0 ? r.r5 : r.r4;
    const r2 = i % 2 !== 0 ? r.r5 : r.r4;
    const as = i % 2 === 0 ? a2 : -a2;
    const p1 = svg.rotatePointDeg({x: cx, y: cy}, a - a2, {x: cx + r1, y: cy});
    const s1 = svg.rotatePointDeg({x: cx, y: cy}, a + as, {x: cx + rs, y: cy});
    const p2 = svg.rotatePointDeg({x: cx, y: cy}, a + a2, {x: cx + r2, y: cy});
    if (i === 0) {
      svg.ma(path, p1.x, p1.y);
    } else {
      svg.la(path, p1.x, p1.y);
    }
    svg.ba(path, s1.x, s1.y, p2.x, p2.y, p2.x, p2.y);
    a += a1 + (i % 2 === 0 ? a3 : -a3);
  }
  svg.close(path);

  svg.circle(path, cx, cy, r.r3);

  svg.circle(path, cx, cy, r.r2);
  svg.circle(path, cx, cy, r.r1);

  return svg.getPath(path);
}

function _getGearDarkHolePath(path, cx, cy, r, type) {
  if (type === 'watch-gear') {
    const x1 = r.r2 + (r.r3 - r.r2) * 0.05;
    const x2 = r.r2 + (r.r3 - r.r2) * 0.9;
    const m = 13;
    for (let a = 0; a < 360; a += 72) {
      const p1 = svg.rotatePointDeg({x: cx, y: cy}, a + m, {x: cx + x1, y: cy});
      const p2 = svg.rotatePointDeg({x: cx, y: cy}, a, {x: cx + x2, y: cy});
      const p3 = svg.rotatePointDeg({x: cx, y: cy}, a + 65 - m, {
        x: cx + x1,
        y: cy,
      });
      const p4 = svg.rotatePointDeg({x: cx, y: cy}, a + 65, {
        x: cx + x2,
        y: cy,
      });
      svg.ma(path, p1.x, p1.y);
      svg.la(path, p2.x, p2.y);
      svg.aa(path, x2, p4.x, p4.y, 1);
      svg.la(path, p3.x, p3.y);
      svg.aa(path, x1, p1.x, p1.y, 0);
      svg.close(path);
    }
  } else {
    const x = (r.r2 + r.r3) / 2;
    const rr = (r.r3 - r.r2) * 0.3;
    for (let a = 0; a < 360; a += 60) {
      const c = svg.rotatePointDeg({x: cx, y: cy}, a, {x: cx + x, y: cy});
      svg.circle(path, c.x, c.y, rr);
    }
  }
}

// Openwork interior.
function _getGearDarkPath(cx, cy, r, type, toothThickness) {
  cx = svg.toInt(cx);
  cy = svg.toInt(cy);
  r = svg.toInt(r);
  r = _getRadius(r, toothThickness);

  const path = svg.createPath();

  svg.circle(path, cx, cy, r.r3);
  svg.circle(path, cx, cy, r.r2);
  svg.circle(path, cx, cy, r.r1);

  _getGearDarkHolePath(path, cx, cy, r, type);

  return svg.getPath(path);
}

/******************************************************************************/

function getElements(
  cx,
  cy,
  r,
  type,
  toothThickness = 60,
  toothCount = 36,
  color
) {
  const elements = svg.createElements();

  const path1 = _getGearDarkPath(cx, cy, r, type, toothThickness);
  const path2 = _getGearLightPath(cx, cy, r, toothThickness, toothCount);

  const props1 = {
    stroke: ColorManipulator.darken(color, 0.8),
    strokeWidth: '1px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: color,
    fillRule: 'evenodd',
  };

  const props2 = {
    ...props1,
    fill: ColorManipulator.darken(color, 0.1),
  };

  svg.pushPath(elements, path1, props1);
  svg.pushPath(elements, path2, props2);

  return elements;
}

/******************************************************************************/

module.exports = {
  getElements,
};
