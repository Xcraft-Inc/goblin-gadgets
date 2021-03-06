import {ColorManipulator} from 'goblin-theme';
import svg from '../helpers/svg-helpers';
import {Unit} from 'goblin-theme';

/******************************************************************************/

function _getPath(dx, dy, r, m) {
  dx = Unit.toInt(dx);
  dy = Unit.toInt(dy);
  r = Unit.toInt(r);
  m = Unit.toInt(m);

  const path = svg.createPath();

  const w = dx - m * 2;
  const h = dy - m * 2;

  svg.ma(path, m, m - h - r);
  svg.lr(path, 0, -(h - r - r));
  svg.ar(path, r, r, -r, 0); // top-left external corner
  svg.lr(path, w - r - r, 0);
  svg.ar(path, r, r, r, 0); // top-right external corner
  svg.lr(path, 0, h - r - r);
  svg.ar(path, r, -r, r, 0); // bottom-right external corner
  svg.lr(path, -(w - r - r), 0);
  svg.ar(path, r, -r, -r, 0); // bottom-left internal corner
  svg.close(path);

  return svg.getPath(path);
}

/******************************************************************************/

function getElements(dx, dy, r = 50, m = 100, color) {
  const elements = svg.createElements();

  const path = _getPath(dx, dy, r, m);

  const props = {
    stroke: ColorManipulator.darken(color, 0.8),
    strokeWidth: '1px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: color,
    fillRule: 'evenodd',
  };

  svg.pushPath(elements, path, props);

  return elements;
}

/******************************************************************************/

export default {
  getElements,
};
