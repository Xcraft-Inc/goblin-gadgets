import svg from '../helpers/svg-helpers';

/******************************************************************************/

function _getScreenPath(w, h, styleName) {
  const t = 30;

  const path = svg.createPath();

  switch (styleName) {
    case 'left':
      svg.ma(path, 0, 0);
      svg.la(path, 0, h);
      svg.la(path, t, h - t);
      svg.ba(path, 0, h - t * 2, 0, t * 2, t, t);
      svg.close(path);
      break;
    case 'right':
      svg.ma(path, w, 0);
      svg.la(path, w, h);
      svg.la(path, w - t, h - t);
      svg.ba(path, w, h - t * 2, w, t * 2, w - t, t);
      svg.close(path);
      break;
    case 'top':
      svg.ma(path, 0, 0);
      svg.la(path, w, 0);
      svg.la(path, w - t, t);
      svg.ba(path, w - t * 2, 0, t * 2, 0, t, t);
      svg.close(path);
      break;
    case 'bottom':
      svg.ma(path, 0, h);
      svg.la(path, w, h);
      svg.la(path, w - t, h - t);
      svg.ba(path, w - t * 2, h, t * 2, h, t, h - t);
      svg.close(path);
      break;
  }

  return svg.getPath(path);
}

// prettier-ignore
function getScreenElements(w, h) {
  const elements = svg.createElements();

  svg.pushPath(elements, _getScreenPath(w, h, 'left'  ), {fill: '#444'});
  svg.pushPath(elements, _getScreenPath(w, h, 'right' ), {fill: '#888'});
  svg.pushPath(elements, _getScreenPath(w, h, 'top'   ), {fill: '#222'});
  svg.pushPath(elements, _getScreenPath(w, h, 'bottom'), {fill: '#aaa'});

  return elements;
}

/******************************************************************************/

function _getSamplesPath(ox, oy, dx, dy, samples, max, part) {
  const path = svg.createPath();
  const count = samples.size;

  for (let i = 0; i < count; i++) {
    const x = (dx / (count - 1)) * i; // from right to left <--|
    const y = dy - Math.min(samples.get(i) / max, 1) * dy;

    if (i === 0) {
      svg.ma(path, ox + x, oy + y);
    } else {
      svg.la(path, ox + x, oy + y);
    }
  }

  if (part === 'fill') {
    svg.la(path, ox + dx, oy + dy);
    svg.la(path, ox, oy + dy);
    svg.close(path);
  }

  return svg.getPath(path);
}

function getSampleElements(
  ox,
  oy,
  dx,
  dy,
  samples,
  max,
  part,
  strokeWidth,
  strokeColor,
  fillColor
) {
  const elements = svg.createElements();

  const path = _getSamplesPath(ox, oy, dx, dy, samples, max, part);
  const props = {
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: fillColor,
  };
  svg.pushPath(elements, path, props);

  return elements;
}

/******************************************************************************/

function _getGridPath(ox, oy, dx, dy, nx, ny) {
  const path = svg.createPath();

  for (let x = 0; x <= dx; x += dx / nx) {
    svg.ma(path, ox + x, oy + 0);
    svg.la(path, ox + x, oy + dy);
  }

  for (let y = 0; y <= dy; y += dy / ny) {
    svg.ma(path, ox + 0, oy + y);
    svg.la(path, ox + dx, oy + y);
  }

  return svg.getPath(path);
}

function getGridElements(ox, oy, dx, dy, nx, ny, strokeColor) {
  const elements = svg.createElements();

  const path = _getGridPath(ox, oy, dx, dy, nx, ny);
  const props = {
    stroke: strokeColor,
    strokeWidth: '1px',
    fill: 'transparent',
  };
  svg.pushPath(elements, path, props);

  return elements;
}

/******************************************************************************/

export default {
  getScreenElements,
  getSampleElements,
  getGridElements,
};
