import * as TicketHelpers from '../ticket/ticket-helpers.js';

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

// Line to relative position.
function lineTo(path, dx, dy) {
  path.push('l ' + dx + ' ' + dy);
}

// Arc to relative position.
function arcTo(path, r, cx, cy, sweepFlag) {
  // rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
  path.push('a ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + cx + ' ' + cy);
}

// Close path.
function close(path) {
  path.push('z');
}

// Draw _n_n_n_n_n_n_n_n_n_n_n_n_n_
function horizontalDash(path, r, len, dx) {
  const step = parseInt(dx / len);
  const over = (dx - len * step) / 2;
  lineTo(path, over + r, 0);
  let i = 0;
  for (i = 0; i < step - 1; i++) {
    lineTo(path, len - r - r, 0);
    arcTo(path, r, r + r, 0, 0);
  }
  lineTo(path, len - r + over, 0);
}

/******************************************************************************/

export default function getOutlinePath(theme, shape, width, height) {
  const r = toInt(theme.shapes.ticketCornerRadius);
  const s = toInt(theme.shapes.ticketLineRadius);
  const w = toInt(width);
  const h = toInt(height);

  const hasTopSerration = TicketHelpers.hasTopSerration(shape);
  const hasBottomSerration = TicketHelpers.hasBottomSerration(shape);

  const path = [];
  if (!hasTopSerration && hasBottomSerration) {
    // Serration only on bottom.
    moveTo(path, 0, 0);
    lineTo(path, w, 0);
    lineTo(path, 0, h - r);
    arcTo(path, r, -r, r, 0); // bottom-right corner
    horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    arcTo(path, r, -r, -r, 0); // bottom-left corner
    close(path);
  } else if (hasTopSerration && !hasBottomSerration) {
    // Serration only on top.
    moveTo(path, 0, r);
    arcTo(path, r, r, -r, 0); // top-left corner
    horizontalDash(path, s, s * 3.5, w - r - r);
    arcTo(path, r, r, r, 0); // top-right corner
    lineTo(path, 0, h - r);
    lineTo(path, -w, 0);
    close(path);
  } else if (!hasTopSerration && !hasBottomSerration) {
    // No Serration.
    moveTo(path, 0, 0);
    lineTo(path, w, 0);
    lineTo(path, 0, h);
    lineTo(path, -w, 0);
    close(path);
  } else {
    // Serration on top and bottom.
    moveTo(path, 0, r);
    arcTo(path, r, r, -r, 0); // top-left corner
    horizontalDash(path, s, s * 3.5, w - r - r);
    arcTo(path, r, r, r, 0); // top-right corner
    lineTo(path, 0, h - r - r);
    arcTo(path, r, -r, r, 0); // bottom-right corner
    horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    arcTo(path, r, -r, -r, 0); // bottom-left corner
    close(path);
  }
  return path.join(' ');
}
