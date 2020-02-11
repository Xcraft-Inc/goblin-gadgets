import {Unit} from 'electrum-theme';
import * as TicketHelpers from '../ticket/ticket-helpers.js';

/******************************************************************************/

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

function getHoverPath(theme, shape, hoverShape, width, height) {
  const r = toInt(theme.shapes.ticketCornerRadius);
  const t = toInt(theme.shapes.ticketHoverThickness);
  const i = toInt(
    Unit.multiply(Unit.multiply(theme.shapes.ticketCornerRadius, r), 1 / t)
  );
  const w = toInt(width);
  const h = toInt(height);

  let path = '';
  if (hoverShape === 'first') {
    // /\/\/\/\/\/\/\
    // |            |
    // +------------+
    const s = shape === 'first' ? 0 : r;
    path = moveTo(path, 0, h - s);
    path = lineTo(path, 0, -(h - s - r));
    path = arcTo(path, r, r, -r, 0); // top-left external corner
    path = lineTo(path, w - r - r, 0);
    path = arcTo(path, r, r, r, 0); // top-right external corner
    path = lineTo(path, 0, h - s - r);
    path = lineTo(path, -t, 0);
    path = lineTo(path, 0, -(h - t - s - r));
    path = arcTo(path, i, -r, -r, 1); // top-right internal corner
    path = lineTo(path, -(w - r - r - t - t), 0);
    path = arcTo(path, i, -r, r, 1); // top-left internal corner
    path = lineTo(path, 0, h - t - s - r);
    path = close(path);
  } else if (hoverShape === 'last') {
    // +------------+
    // |            |
    // \/\/\/\/\/\/\/
    const s = shape === 'last' ? 0 : r;
    path = moveTo(path, 0, s);
    path = lineTo(path, 0, h - s - r);
    path = arcTo(path, r, r, r, 1); // bottom-left external corner
    path = lineTo(path, w - r - r, 0);
    path = arcTo(path, r, r, -r, 1); // bottom-right external corner
    path = lineTo(path, 0, -(h - s - r));
    path = lineTo(path, -t, 0);
    path = lineTo(path, 0, h - t - s - r);
    path = arcTo(path, i, -r, r, 0); // bottom-right internal corner
    path = lineTo(path, -(w - r - r - t - t), 0);
    path = arcTo(path, i, -r, -r, 0); // bottom-left internal corner
    path = lineTo(path, 0, -(h - t - s - r));
    path = close(path);
  } else if (hoverShape === 'continued') {
    // +------------+
    // |            |
    // +------------+
    const st = shape === 'middle' || shape === 'first' ? r : 0;
    const sb = shape === 'middle' || shape === 'last' ? r : 0;
    path = moveTo(path, 0, st);
    path = lineTo(path, t, 0);
    path = lineTo(path, 0, h - st - sb);
    path = lineTo(path, -t, 0);
    path = lineTo(path, 0, -(h - st - sb)); // left border
    path = moveTo(path, w, st);
    path = lineTo(path, -t, 0);
    path = lineTo(path, 0, h - st - sb);
    path = lineTo(path, t, 0);
    path = lineTo(path, 0, -(h - st - sb)); // right border
    path = close(path);
  } else if (hoverShape === 'middle') {
    // /\/\/\/\/\/\/\
    // |           |
    // \/\/\/\/\/\/\/
    // External CW.
    path = moveTo(path, 0, h - r);
    path = lineTo(path, 0, -(h - r - r));
    path = arcTo(path, r, r, -r, 0); // top-left external corner
    path = lineTo(path, w - r - r, 0);
    path = arcTo(path, r, r, r, 0); // top-right external corner
    path = lineTo(path, 0, h - r - r);
    path = arcTo(path, r, -r, r, 0); // bottom-right external corner
    path = lineTo(path, -(w - r - r), 0);
    path = arcTo(path, r, -r, -r, 0); // bottom-left internal corner
    path = close(path);
    // Internal CCW.
    path = moveTo(path, t + r, h - t);
    path = lineTo(path, w - r - r - t - t, 0);
    path = arcTo(path, i, r, -r, 1); // bottom-right internal corner
    path = lineTo(path, 0, -(h - r - r - t - t));
    path = arcTo(path, i, -r, -r, 1); // top-right internal corner
    path = lineTo(path, -(w - r - r - t - t), 0);
    path = arcTo(path, i, -r, r, 1); // top-left internal corner
    path = lineTo(path, 0, h - r - r - t - t);
    path = arcTo(path, i, r, r, 1); // bottom-left internal corner
    path = close(path);
  }
  return path;
}

/******************************************************************************/

export const propNames = ['kind', 'hoverShape', 'shape', 'width', 'height'];

export default function styles(theme, props) {
  const {kind, hoverShape, shape, width, height} = props;

  const r =
    kind === 'thin' || kind === 'event'
      ? theme.shapes.ticketRectRadius
      : theme.shapes.ticketCornerRadius;

  let hoverRadius;
  if (hoverShape === 'first') {
    hoverRadius = r + ' ' + r + ' 0px 0px';
  } else if (hoverShape === 'last') {
    hoverRadius = '0px 0px ' + r + ' ' + r;
  } else {
    hoverRadius = r;
  }

  const hover = {
    position: 'absolute',
    top: '0px',
    fill: hoverShape ? theme.palette.ticketHover : 'transparent',
    transition: theme.transitions.easeOut(),
    path: getHoverPath(theme, shape, hoverShape, width, height),
    //- ':hover': {fill: theme.palette.ticketHover},
  };

  const hasTopSerration = TicketHelpers.hasTopSerration(hoverShape);
  const hasBottomSerration = TicketHelpers.hasBottomSerration(hoverShape);

  let rectHover;
  const t1 = theme.shapes.ticketHoverThickness;
  const t2 = Unit.multiply(theme.shapes.ticketHoverThickness, 2);
  if (hasTopSerration && !hasBottomSerration) {
    // nnnn
    rectHover = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ')',
      height: 'calc(100% - ' + t1 + ')',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'solid solid none solid',
      borderColor: hoverShape ? theme.palette.ticketHover : 'transparent',
    };
  } else if (!hasTopSerration && hasBottomSerration) {
    // uuuu
    rectHover = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ')',
      height: 'calc(100% - ' + t1 + ')',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'none solid solid solid',
      borderColor: hoverShape ? theme.palette.ticketHover : 'transparent',
    };
  } else if (!hasTopSerration && !hasBottomSerration) {
    // |   |
    rectHover = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ')',
      height: shape === 'continued' ? '100%' : 'calc(100% - ' + t1 + ')',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: '0px',
      borderWidth: t1,
      borderStyle: 'none solid none solid',
      borderColor: hoverShape ? theme.palette.ticketHover : 'transparent',
    };
  } else {
    // nnnn
    // uuuu
    rectHover = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ' + 1px)',
      height: 'calc(100% - ' + t2 + ' + 1px)',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'solid',
      borderColor: hoverShape ? theme.palette.ticketHover : 'transparent',
    };
  }

  return {
    hover,
    rectHover,
  };
}

/******************************************************************************/
