import React from 'react';

/******************************************************************************/

function createPath() {
  return [];
}

function getPath(path) {
  return path.join(' ');
}

/******************************************************************************/

// Convert string '123.4px' to '123.4'.
function toValue(value) {
  if (typeof value === 'string') {
    return value.replace(/px/g, '');
  } else {
    return value;
  }
}

// Convert string '123.4px' to int 123.
function toInt(value) {
  if (typeof value === 'string') {
    return parseInt(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

/******************************************************************************/

// Move to absolute position.
function ma(path, x, y) {
  path.push('M ' + x + ' ' + y);
}

// Line to absolute position.
function la(path, x, y) {
  path.push('L ' + x + ' ' + y);
}

// Line to relative position.
function lr(path, dx, dy) {
  path.push('l ' + dx + ' ' + dy);
}

function ba(path, x1, y1, x2, y2, x, y) {
  path.push('C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x + ' ' + y);
}

// Arc to absolute position.
function aa(path, r, x, y, sweepFlag) {
  // rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
  path.push('A ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + x + ' ' + y);
}

// Arc to relative position.
function ar(path, r, cx, cy, sweepFlag) {
  // rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
  path.push('a ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + cx + ' ' + cy);
}

// Circle.
// prettier-ignore
function circle(path, cx, cy, r) {
  const b = 0.552284749831; // (4/3)*tan(pi/8) = 4*(sqrt(2)-1)/3
  const rb = r * b;

  ma(path, cx+r, cy);
  ba(path, cx+r,  cy+rb, cx+rb, cy+r,  cx,   cy+r);
  ba(path, cx-rb, cy+r,  cx-r,  cy+rb, cx-r, cy  );
  ba(path, cx-r,  cy-rb, cx-rb, cy-r,  cx,   cy-r);
  ba(path, cx+rb, cy-r,  cx+r,  cy-rb, cx+r, cy  );
  close(path);
}

// Close path.
function close(path) {
  path.push('z');
}

/******************************************************************************/

function createElements() {
  return [];
}

function pushPath(elements, path, props) {
  elements.push({element: 'path', props: {d: path, ...props}});
}

function renderShadow(shadow) {
  if (!shadow) {
    return null;
  }

  return (
    <defs>
      <filter id={shadow.name} x="0" y="0" width="200%" height="200%">
        <feOffset
          result="offOut"
          in="SourceAlpha"
          dx={shadow.dx || '20'}
          dy={shadow.dy || '20'}
        />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
  );
}

function renderElements(style, elements, shadow) {
  return (
    <svg className={style}>
      {renderShadow(shadow)}
      {elements.map((e, index) => {
        e.props.key = index;
        return React.createElement(e.element, e.props);
      })}
    </svg>
  );
}

/******************************************************************************/

module.exports = {
  createPath,
  getPath,

  toValue,
  toInt,

  ma,
  la,
  lr,
  ba,
  aa,
  ar,
  circle,
  close,

  createElements,
  pushPath,
  renderElements,
};
