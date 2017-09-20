import * as Bool from '../helpers/boolean-helpers.js';
import {Unit} from 'electrum-theme';

/******************************************************************************/

// Convert string '123px' to int 123.
function toInt (value) {
  if (typeof value === 'string') {
    return parseInt (value.replace (/px/g, ''));
  } else {
    return value;
  }
}

// Move to absolute position.
function moveTo (path, x, y) {
  path += 'M ' + x + ' ' + y + ' ';
  return path;
}

// Line to relative position.
function lineTo (path, dx, dy) {
  path += 'l ' + dx + ' ' + dy + ' ';
  return path;
}

// Arc to relative position.
function arcTo (path, r, cx, cy, sweepFlag) {
  // rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
  path += 'a ' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + cx + ' ' + cy + ' ';
  // path += 'a ' + r + ' '  + r + ' 0 0 0 ' + cx + ' ' + cy + ' ';
  return path;
}

// Close path.
function close (path) {
  path += 'z';
  return path;
}

// Draw _n_n_n_n_n_n_n_n_n_n_n_n_n_
function horizontalDash (path, r, len, dx) {
  const step = parseInt (dx / len);
  const over = (dx - len * step) / 2;
  path = lineTo (path, over + r, 0);
  let i = 0;
  for (i = 0; i < step - 1; i++) {
    path = lineTo (path, len - r - r, 0);
    path = arcTo (path, r, r + r, 0, 0);
  }
  path = lineTo (path, len - r + over, 0);
  return path;
}

function getOutlinePath (theme, shape, width, height) {
  const r = toInt (theme.shapes.ticketCornerRadius);
  const s = toInt (theme.shapes.ticketLineRadius);
  const w = toInt (width);
  const h = toInt (height);

  let path = '';
  if (shape === 'last') {
    // Dash line only on bottom.
    path = moveTo (path, 0, 0);
    path = lineTo (path, w, 0);
    path = lineTo (path, 0, h - r);
    path = arcTo (path, r, -r, r, 0); // bottom-right corner
    path = horizontalDash (path, -s, -s * 3.5, -(w - r - r));
    path = arcTo (path, r, -r, -r, 0); // bottom-left corner
    path = close (path);
  } else if (shape === 'first') {
    // Dash line only on top.
    path = moveTo (path, 0, r);
    path = arcTo (path, r, r, -r, 0); // top-left corner
    path = horizontalDash (path, s, s * 3.5, w - r - r);
    path = arcTo (path, r, r, r, 0); // top-right corner
    path = lineTo (path, 0, h - r);
    path = lineTo (path, -w, 0);
    path = close (path);
  } else {
    // Dash line on top and bottom.
    path = moveTo (path, 0, r);
    path = arcTo (path, r, r, -r, 0); // top-left corner
    path = horizontalDash (path, s, s * 3.5, w - r - r);
    path = arcTo (path, r, r, r, 0); // top-right corner
    path = lineTo (path, 0, h - r - r);
    path = arcTo (path, r, -r, r, 0); // bottom-right corner
    path = horizontalDash (path, -s, -s * 3.5, -(w - r - r));
    path = arcTo (path, r, -r, -r, 0); // bottom-left corner
    path = close (path);
  }
  return path;
}

function getHoverPath (theme, shape, hoverShape, width, height) {
  const r = toInt (theme.shapes.ticketCornerRadius);
  const t = toInt (theme.shapes.ticketHoverThickness);
  const i = toInt (
    Unit.multiply (Unit.multiply (theme.shapes.ticketCornerRadius, r), 1 / t)
  );
  const w = toInt (width);
  const h = toInt (height);

  let path = '';
  if (hoverShape === 'first') {
    // n.
    const s = shape === 'first' ? 0 : r;
    path = moveTo (path, 0, h - s);
    path = lineTo (path, 0, -(h - s - r));
    path = arcTo (path, r, r, -r, 0); // top-left external corner
    path = lineTo (path, w - r - r, 0);
    path = arcTo (path, r, r, r, 0); // top-right external corner
    path = lineTo (path, 0, h - s - r);
    path = lineTo (path, -t, 0);
    path = lineTo (path, 0, -(h - t - s - r));
    path = arcTo (path, i, -r, -r, 1); // top-right internal corner
    path = lineTo (path, -(w - r - r - t - t), 0);
    path = arcTo (path, i, -r, r, 1); // top-left internal corner
    path = lineTo (path, 0, h - t - s - r);
    path = close (path);
  } else if (hoverShape === 'last') {
    // u.
    const s = shape === 'last' ? 0 : r;
    path = moveTo (path, 0, s);
    path = lineTo (path, 0, h - s - r);
    path = arcTo (path, r, r, r, 1); // bottom-left external corner
    path = lineTo (path, w - r - r, 0);
    path = arcTo (path, r, r, -r, 1); // bottom-right external corner
    path = lineTo (path, 0, -(h - s - r));
    path = lineTo (path, -t, 0);
    path = lineTo (path, 0, h - t - s - r);
    path = arcTo (path, i, -r, r, 0); // bottom-right internal corner
    path = lineTo (path, -(w - r - r - t - t), 0);
    path = arcTo (path, i, -r, -r, 0); // bottom-left internal corner
    path = lineTo (path, 0, -(h - t - s - r));
    path = close (path);
  } else {
    // External CW.
    path = moveTo (path, 0, h - r);
    path = lineTo (path, 0, -(h - r - r));
    path = arcTo (path, r, r, -r, 0); // top-left external corner
    path = lineTo (path, w - r - r, 0);
    path = arcTo (path, r, r, r, 0); // top-right external corner
    path = lineTo (path, 0, h - r - r);
    path = arcTo (path, r, -r, r, 0); // bottom-right external corner
    path = lineTo (path, -(w - r - r), 0);
    path = arcTo (path, r, -r, -r, 0); // bottom-left internal corner
    path = close (path);
    // Internal CCW.
    path = moveTo (path, t + r, h - t);
    path = lineTo (path, w - r - r - t - t, 0);
    path = arcTo (path, i, r, -r, 1); // bottom-right internal corner
    path = lineTo (path, 0, -(h - r - r - t - t));
    path = arcTo (path, i, -r, -r, 1); // top-right internal corner
    path = lineTo (path, -(w - r - r - t - t), 0);
    path = arcTo (path, i, -r, r, 1); // top-left internal corner
    path = lineTo (path, 0, h - r - r - t - t);
    path = arcTo (path, i, r, r, 1); // bottom-left internal corner
    path = close (path);
  }
  return path;
}

export default function styles (theme, props) {
  const horizontalSpacing = props.horizontalSpacing
    ? props.horizontalSpacing
    : '0px';

  const r = props.kind === 'thin' || props.kind === 'event'
    ? theme.shapes.ticketRectRadius
    : theme.shapes.ticketCornerRadius;
  let radius;
  if (props.shape === 'first') {
    radius = r + ' ' + r + ' 0px 0px';
  } else if (props.shape === 'last') {
    radius = '0px 0px ' + r + ' ' + r;
  } else {
    radius = r;
  }
  let hoverRadius;
  if (props.hoverShape === 'first') {
    hoverRadius = r + ' ' + r + ' 0px 0px';
  } else if (props.hoverShape === 'last') {
    hoverRadius = '0px 0px ' + r + ' ' + r;
  } else {
    hoverRadius = r;
  }

  let boxOpacity = Bool.isFalse (props.visibility) ? 0 : null;

  const boxStyle = {
    width: props.width,
    height: props.height,
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut (),
    userSelect: 'none',
    opacity: boxOpacity,
  };

  const shadowStyle = {
    position: 'absolute',
    top: theme.shapes.ticketShadowShift,
    fill: theme.palette.ticketShadow,
  };

  const shapeStyle = {
    position: 'absolute',
    fill: props.color,
    transition: theme.transitions.easeOut (),
  };

  const hatchStyle = {
    position: 'absolute',
    fill: 'url(#hatch)',
    transition: theme.transitions.easeOut (),
  };

  const svgStyle = {
    path: getOutlinePath (theme, props.shape, props.width, props.height),
  };

  const hoverStyle = {
    position: 'absolute',
    top: '0px',
    fill: Bool.isTrue (props.forceHover)
      ? theme.palette.ticketHover
      : 'transparent',
    transition: theme.transitions.easeOut (),
    path: getHoverPath (
      theme,
      props.shape,
      props.hoverShape,
      props.width,
      props.height
    ),
    ':hover': {fill: theme.palette.ticketHover},
  };

  const vp = props.kind === 'thin' ? '0px' : theme.shapes.ticketVerticalPadding;
  const hp = props.kind === 'thin'
    ? '0px'
    : theme.shapes.ticketHorizontalPadding;
  const contentStyle = {
    position: 'relative',
    padding: vp + ' ' + hp,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.easeOut (),
    userSelect: 'none',
    visibility: Bool.isTrue (props.hideContent) ? 'hidden' : 'visible',
  };

  const rectShadowStyle = {
    width: props.width,
    height: props.height,
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    position: 'relative',
    top: theme.shapes.ticketShadowShift,
    cursor: props.cursor,
    transition: theme.transitions.easeOut (),
    borderRadius: radius,
    backgroundColor: theme.palette.ticketShadow,
    opacity: boxOpacity,
  };

  const rectStyle = {
    height: props.height,
    position: 'relative',
    top: '-' + theme.shapes.ticketShadowShift,
    cursor: props.cursor,
    transition: theme.transitions.easeOut (),
    borderRadius: radius,
    backgroundColor: props.color,
  };

  const hc = 'rgba(0,0,0,' + theme.palette.ticketHatchOpacity + ')';
  const hs = theme.shapes.ticketHatchSize;
  const ht = Unit.multiply (hs, 2);
  const rectContentHatchStyle = {
    height: props.height
      ? Unit.sub (props.height, Unit.multiply (vp, 2))
      : null,
    position: 'relative',
    padding: vp + ' ' + hp,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.easeOut (),
    borderRadius: radius,
    background: `repeating-linear-gradient(-45deg, ${hc}, ${hc} ${hs}, rgba(0,0,0,0) 0px, rgba(0,0,0,0) ${ht})`,
  };

  let rectHoverStyle;
  const t1 = theme.shapes.ticketHoverThickness;
  const t2 = Unit.multiply (theme.shapes.ticketHoverThickness, 2);
  if (props.hoverShape === 'first') {
    // n.
    rectHoverStyle = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ')',
      height: 'calc(100% - ' + t1 + ')',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'solid solid none solid',
      borderColor: Bool.isTrue (props.forceHover)
        ? theme.palette.ticketHover
        : 'transparent',
    };
  } else if (props.hoverShape === 'last') {
    // u.
    rectHoverStyle = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ')',
      height: 'calc(100% - ' + t1 + ')',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'none solid solid solid',
      borderColor: Bool.isTrue (props.forceHover)
        ? theme.palette.ticketHover
        : 'transparent',
    };
  } else {
    rectHoverStyle = {
      position: 'absolute',
      width: 'calc(100% - ' + t2 + ' + 1px)',
      height: 'calc(100% - ' + t2 + ' + 1px)',
      top: '-' + theme.shapes.ticketShadowShift,
      left: '0px',
      borderRadius: hoverRadius,
      borderWidth: t1,
      borderStyle: 'solid',
      borderColor: Bool.isTrue (props.forceHover)
        ? theme.palette.ticketHover
        : 'transparent',
    };
  }
  rectHoverStyle[':hover'] = {
    borderColor: theme.palette.ticketHover,
  };

  const hudGlyphShadowStyle = {
    position: 'absolute',
    width: '34px',
    height: '34px',
    top: '8px',
    right: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '17px',
    boxShadow: theme.shapes.ticketHudShadow,
    backgroundColor: theme.palette.ticketHudShadow,
    opacity: 1,
    transition: theme.transitions.easeOut (),
  };

  const hudGlyphShadowNoneStyle = {
    position: 'absolute',
    width: '34px',
    height: '34px',
    top: '8px',
    right: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '17px',
    boxShadow: theme.shapes.ticketHudShadow,
    backgroundColor: theme.palette.ticketHudShadow,
    opacity: 0,
    transition: theme.transitions.easeOut (),
  };

  const hudGlyphBoxStyle = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: '-1px',
    right: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderRadius: '15px',
    backgroundColor: theme.palette.ticketHudBackground,
  };

  const hudGlyphStyleContent = {
    transform: 'scale(1.2)',
    color: theme.palette.ticketHudContent,
    fontWeight: 'bold',
  };

  const coverStyle = {
    display: 'flex',
    flexGrow: 1,
    width: props.width,
    height: '100%',
    margin: '0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut (),
    backgroundColor: props.color,
    opacity: boxOpacity,
  };

  const w = props.width ? Unit.multiply (props.width, 0.5) : null;
  const coverContentStyle = {
    display: 'flex',
    height: props.width,
    lineHeight: props.width,
    margin: theme.shapes.ticketCoverTopMargin + ' 0px 0px 0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut (),
    transform: 'rotate(90deg)', // 90 deg CW, from top to bottom
    transformOrigin: w + ' ' + w,
    whiteSpace: 'nowrap',
  };

  const backgroundTextStyle = {
    position: 'absolute',
    right: theme.shapes.ticketBackgroundRightMargin,
    fontWeight: theme.shapes.ticketBackgroundFontWeight,
    fontSize: theme.shapes.ticketBackgroundFontSize,
    color: theme.palette.ticketNumberBackground,
  };

  const m = theme.shapes.containerMargin;
  const subpaneRectStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    padding: m + ' ' + m + ' ' + Unit.multiply (m, 0.5) + ' ' + m,
    borderWidth: '2px',
    borderStyle: 'dashed none none none',
    borderColor: theme.palette.ticketSubpaneBorder,
    backgroundColor: props.color,
    opacity: boxOpacity,
  };
  const subpaneDraggedStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: m + ' ' + m + ' ' + Unit.multiply (m, 0.5) + ' ' + m,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.ticketSubpaneBorder,
    backgroundColor: props.color,
    opacity: boxOpacity,
  };
  const subpaneContentStyle = {
    visibility: Bool.isTrue (props.hideContent) ? 'hidden' : 'visible',
  };

  return {
    box: boxStyle,
    shadow: shadowStyle,
    shape: shapeStyle,
    hatch: hatchStyle,
    svg: svgStyle,
    hover: hoverStyle,
    content: contentStyle,
    rectShadow: rectShadowStyle,
    rect: rectStyle,
    rectContentHatch: rectContentHatchStyle,
    rectHover: rectHoverStyle,
    hudGlyphShadow: hudGlyphShadowStyle,
    hudGlyphShadowNone: hudGlyphShadowNoneStyle,
    hudGlyphBox: hudGlyphBoxStyle,
    hudGlyphContent: hudGlyphStyleContent,
    cover: coverStyle,
    coverContent: coverContentStyle,
    backgroundText: backgroundTextStyle,
    subpaneRect: subpaneRectStyle,
    subpaneDragged: subpaneDraggedStyle,
    subpaneContent: subpaneContentStyle,
  };
}

/******************************************************************************/
