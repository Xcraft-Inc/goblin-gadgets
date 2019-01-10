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

// Line to relative position.
function lineTo(path, dx, dy) {
  path += 'l ' + dx + ' ' + dy + ' ';
  return path;
}

// Arc to relative position.
function arcTo(path, r, cx, cy, sweepFlag) {
  // rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
  path += 'a ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + cx + ' ' + cy + ' ';
  // path += 'a ' + r + ' '  + r + ' 0 0 0 ' + cx + ' ' + cy + ' ';
  return path;
}

// Close path.
function close(path) {
  path += 'z';
  return path;
}

// Draw _n_n_n_n_n_n_n_n_n_n_n_n_n_
function horizontalDash(path, r, len, dx) {
  const step = parseInt(dx / len);
  const over = (dx - len * step) / 2;
  path = lineTo(path, over + r, 0);
  let i = 0;
  for (i = 0; i < step - 1; i++) {
    path = lineTo(path, len - r - r, 0);
    path = arcTo(path, r, r + r, 0, 0);
  }
  path = lineTo(path, len - r + over, 0);
  return path;
}

export default function getOutlinePath(theme, shape, width, height) {
  const r = toInt(theme.shapes.ticketCornerRadius);
  const s = toInt(theme.shapes.ticketLineRadius);
  const w = toInt(width);
  const h = toInt(height);

  let path = '';
  if (shape === 'last') {
    // Dash line only on bottom.
    path = moveTo(path, 0, 0);
    path = lineTo(path, w, 0);
    path = lineTo(path, 0, h - r);
    path = arcTo(path, r, -r, r, 0); // bottom-right corner
    path = horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    path = arcTo(path, r, -r, -r, 0); // bottom-left corner
    path = close(path);
  } else if (shape === 'first') {
    // Dash line only on top.
    path = moveTo(path, 0, r);
    path = arcTo(path, r, r, -r, 0); // top-left corner
    path = horizontalDash(path, s, s * 3.5, w - r - r);
    path = arcTo(path, r, r, r, 0); // top-right corner
    path = lineTo(path, 0, h - r);
    path = lineTo(path, -w, 0);
    path = close(path);
  } else {
    // Dash line on top and bottom.
    path = moveTo(path, 0, r);
    path = arcTo(path, r, r, -r, 0); // top-left corner
    path = horizontalDash(path, s, s * 3.5, w - r - r);
    path = arcTo(path, r, r, r, 0); // top-right corner
    path = lineTo(path, 0, h - r - r);
    path = arcTo(path, r, -r, r, 0); // bottom-right corner
    path = horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    path = arcTo(path, r, -r, -r, 0); // bottom-left corner
    path = close(path);
  }
  return path;
}
