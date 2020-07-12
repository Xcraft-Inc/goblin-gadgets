import * as TicketHelpers from '../ticket/ticket-helpers.js';
import svg from '../helpers/svg-helpers';
import {Unit} from 'goblin-theme';
const n = Unit.toValue;

/******************************************************************************/

function getHoverPath(theme, shape, hoverShape, width, height) {
  const r = n(theme.shapes.ticketCornerRadius);
  const t = n(theme.shapes.ticketHoverThickness);
  const i = n(r * r * (1 / t));
  const w = n(width);
  const h = n(height);

  const path = svg.createPath();
  if (hoverShape === 'first') {
    // /\/\/\/\/\/\/\
    // |            |
    // +------------+
    const s = shape === 'first' ? 0 : r;
    svg.ma(path, 0, h - s);
    svg.lr(path, 0, -(h - s - r));
    svg.ar(path, r, r, -r, 0); // top-left external corner
    svg.lr(path, w - r - r, 0);
    svg.ar(path, r, r, r, 0); // top-right external corner
    svg.lr(path, 0, h - s - r);
    svg.lr(path, -t, 0);
    svg.lr(path, 0, -(h - t - s - r));
    svg.ar(path, i, -r, -r, 1); // top-right internal corner
    svg.lr(path, -(w - r - r - t - t), 0);
    svg.ar(path, i, -r, r, 1); // top-left internal corner
    svg.lr(path, 0, h - t - s - r);
    svg.close(path);
  } else if (hoverShape === 'last') {
    // +------------+
    // |            |
    // \/\/\/\/\/\/\/
    const s = shape === 'last' ? 0 : r;
    svg.ma(path, 0, s);
    svg.lr(path, 0, h - s - r);
    svg.ar(path, r, r, r, 1); // bottom-left external corner
    svg.lr(path, w - r - r, 0);
    svg.ar(path, r, r, -r, 1); // bottom-right external corner
    svg.lr(path, 0, -(h - s - r));
    svg.lr(path, -t, 0);
    svg.lr(path, 0, h - t - s - r);
    svg.ar(path, i, -r, r, 0); // bottom-right internal corner
    svg.lr(path, -(w - r - r - t - t), 0);
    svg.ar(path, i, -r, -r, 0); // bottom-left internal corner
    svg.lr(path, 0, -(h - t - s - r));
    svg.close(path);
  } else if (hoverShape === 'continued') {
    // +------------+
    // |            |
    // +------------+
    const st = shape === 'middle' || shape === 'first' ? r : 0;
    const sb = shape === 'middle' || shape === 'last' ? r : 0;
    svg.ma(path, 0, st);
    svg.lr(path, t, 0);
    svg.lr(path, 0, h - st - sb);
    svg.lr(path, -t, 0);
    svg.lr(path, 0, -(h - st - sb)); // left border
    svg.ma(path, w, st);
    svg.lr(path, -t, 0);
    svg.lr(path, 0, h - st - sb);
    svg.lr(path, t, 0);
    svg.lr(path, 0, -(h - st - sb)); // right border
    svg.close(path);
  } else if (hoverShape === 'middle') {
    // /\/\/\/\/\/\/\
    // |            |
    // \/\/\/\/\/\/\/
    // External CW.
    svg.ma(path, 0, h - r);
    svg.lr(path, 0, -(h - r - r));
    svg.ar(path, r, r, -r, 0); // top-left external corner
    svg.lr(path, w - r - r, 0);
    svg.ar(path, r, r, r, 0); // top-right external corner
    svg.lr(path, 0, h - r - r);
    svg.ar(path, r, -r, r, 0); // bottom-right external corner
    svg.lr(path, -(w - r - r), 0);
    svg.ar(path, r, -r, -r, 0); // bottom-left internal corner
    svg.close(path);
    // Internal CCW.
    svg.ma(path, t + r, h - t);
    svg.lr(path, w - r - r - t - t, 0);
    svg.ar(path, i, r, -r, 1); // bottom-right internal corner
    svg.lr(path, 0, -(h - r - r - t - t));
    svg.ar(path, i, -r, -r, 1); // top-right internal corner
    svg.lr(path, -(w - r - r - t - t), 0);
    svg.ar(path, i, -r, r, 1); // top-left internal corner
    svg.lr(path, 0, h - r - r - t - t);
    svg.ar(path, i, r, r, 1); // bottom-left internal corner
    svg.close(path);
  }
  return svg.getPath(path);
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
    // /\/\/\/\/\/\/\
    // |            |
    // +------------+
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
    // +------------+
    // |            |
    // \/\/\/\/\/\/\/
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
    // +------------+
    // |            |
    // +------------+
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
    // /\/\/\/\/\/\/\
    // |            |
    // \/\/\/\/\/\/\/
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
