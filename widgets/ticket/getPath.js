import * as TicketHelpers from './ticket-helpers.js';
import svg from '../helpers/svg-helpers';

// Draw _n_n_n_n_n_n_n_n_n_n_n_n_n_
function horizontalDash(path, r, len, dx) {
  const step = parseInt(dx / len);
  const over = (dx - len * step) / 2;
  svg.lr(path, over + r, 0);
  let i = 0;
  for (i = 0; i < step - 1; i++) {
    svg.lr(path, len - r - r, 0);
    svg.ar(path, r, r + r, 0, 0);
  }
  svg.lr(path, len - r + over, 0);
}

/******************************************************************************/

function getOutlinePath(theme, shape, width, height) {
  const r = svg.toInt(theme.shapes.ticketCornerRadius);
  const s = svg.toInt(theme.shapes.ticketLineRadius);
  const w = svg.toInt(width);
  const h = svg.toInt(height);

  const hasTopSerration = TicketHelpers.hasTopSerration(shape);
  const hasBottomSerration = TicketHelpers.hasBottomSerration(shape);

  const path = svg.createPath();
  if (!hasTopSerration && hasBottomSerration) {
    // Serration only on bottom.
    svg.ma(path, 0, 0);
    svg.lr(path, w, 0);
    svg.lr(path, 0, h - r);
    svg.ar(path, r, -r, r, 0); // bottom-right corner
    horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    svg.ar(path, r, -r, -r, 0); // bottom-left corner
    svg.close(path);
  } else if (hasTopSerration && !hasBottomSerration) {
    // Serration only on top.
    svg.ma(path, 0, r);
    svg.ar(path, r, r, -r, 0); // top-left corner
    horizontalDash(path, s, s * 3.5, w - r - r);
    svg.ar(path, r, r, r, 0); // top-right corner
    svg.lr(path, 0, h - r);
    svg.lr(path, -w, 0);
    svg.close(path);
  } else if (!hasTopSerration && !hasBottomSerration) {
    // No Serration.
    svg.ma(path, 0, 0);
    svg.lr(path, w, 0);
    svg.lr(path, 0, h);
    svg.lr(path, -w, 0);
    svg.close(path);
  } else {
    // Serration on top and bottom.
    svg.ma(path, 0, r);
    svg.ar(path, r, r, -r, 0); // top-left corner
    horizontalDash(path, s, s * 3.5, w - r - r);
    svg.ar(path, r, r, r, 0); // top-right corner
    svg.lr(path, 0, h - r - r);
    svg.ar(path, r, -r, r, 0); // bottom-right corner
    horizontalDash(path, -s, -s * 3.5, -(w - r - r));
    svg.ar(path, r, -r, -r, 0); // bottom-left corner
    svg.close(path);
  }
  return svg.getPath(path);
}

/******************************************************************************/

function getCornerPath(width, height, position, size) {
  const w = svg.toInt(width);
  const h = svg.toInt(height);
  const s = svg.toInt(size);

  const path = svg.createPath();

  if (position === 'topRight') {
    if (!width) {
      console.log("Ticket: It's impossible to draw the corner without 'width'");
    } else {
      svg.ma(path, w, 0);
      svg.lr(path, -s, 0);
      svg.lr(path, s, s);
      svg.close(path);
    }
  } else if (position === 'topLeft') {
    svg.ma(path, 0, 0);
    svg.lr(path, 0, s);
    svg.lr(path, s, -s);
    svg.close(path);
  } else if (position === 'bottomRight') {
    if (!width || !height) {
      console.log(
        "Ticket: It's impossible to draw the corner without 'width' and 'height'"
      );
    } else {
      svg.ma(path, w, h);
      svg.lr(path, 0, -s);
      svg.lr(path, -s, s);
      svg.close(path);
    }
  } else if (position === 'bottomLeft') {
    if (!height) {
      console.log(
        "Ticket: It's impossible to draw the corner without 'height'"
      );
    } else {
      svg.ma(path, 0, h);
      svg.lr(path, s, 0);
      svg.lr(path, -s, -s);
      svg.close(path);
    }
  }

  return svg.getPath(path);
}

/******************************************************************************/

module.exports = {
  getOutlinePath,
  getCornerPath,
};
