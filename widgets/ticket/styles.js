const Bool = require('gadgets/helpers/bool-helpers');
import {Unit} from 'electrum-theme';

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

function getOutlinePath(theme, shape, width, height) {
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

/******************************************************************************/

export default function styles(theme, props) {
  const horizontalSpacing = props.horizontalSpacing
    ? props.horizontalSpacing
    : '0px';

  const r =
    props.kind === 'thin' || props.kind === 'event'
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

  const boxOpacity = Bool.isFalse(props.visibility) ? 0 : props.opacity;

  const box = {
    flexGrow: props.grow,
    width: props.width,
    height: props.height,
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut(),
    userSelect: 'none',
    opacity: boxOpacity,
  };

  const shadow = {
    position: 'absolute',
    top: theme.shapes.ticketShadowShift,
    fill: theme.palette.ticketShadow,
  };

  const farShadow = {
    position: 'absolute',
    width: props.width,
    height: props.height,
    borderRadius: '10px',
    boxShadow: '0px 10px 23px 4px rgba(0, 0, 0, 0.3)',
  };

  const shape = {
    position: 'absolute',
    fill: props.color,
    transition: theme.transitions.easeOut(),
  };

  const hatchDef = {
    position: 'absolute',
  };

  const hatch = {
    position: 'absolute',
    fill: 'url(#hatch)',
    transition: theme.transitions.easeOut(),
  };

  const svg = {
    path: getOutlinePath(theme, props.shape, props.width, props.height),
  };

  const vp = props.kind === 'thin' ? '0px' : theme.shapes.ticketVerticalPadding;
  const hp =
    props.kind === 'thin' ? '0px' : theme.shapes.ticketHorizontalPadding;
  const content = {
    position: 'relative',
    padding: vp + ' ' + hp,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.easeOut(),
    userSelect: 'none',
    visibility: Bool.isTrue(props.hideContent) ? 'hidden' : 'visible',
  };

  const rectShadow = {
    width: props.width,
    height: props.height,
    flexGrow: props.grow,
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    position: 'relative',
    top: theme.shapes.ticketShadowShift,
    cursor: props.cursor,
    transition: theme.transitions.easeOut(),
    borderRadius: radius,
    backgroundColor: theme.palette.ticketShadow,
    opacity: boxOpacity,
  };

  const rectFarShadow = Object.assign({}, rectShadow); // clone
  rectFarShadow.top = '0px';
  rectFarShadow.boxShadow = '0px 10px 23px 4px rgba(0, 0, 0, 0.3)';

  const rect = {
    height: props.height,
    position: 'relative',
    top: '-' + theme.shapes.ticketShadowShift,
    cursor: props.cursor,
    transition: theme.transitions.easeOut(),
    borderRadius: radius,
    backgroundColor: props.color,
  };

  const hc = 'rgba(0,0,0,' + theme.palette.ticketHatchOpacity + ')';
  const hs = theme.shapes.ticketHatchSize;
  const ht = Unit.multiply(hs, 2);
  const rectContentHatch = {
    height: props.height ? Unit.sub(props.height, Unit.multiply(vp, 2)) : null,
    position: 'relative',
    padding: vp + ' ' + hp,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.easeOut(),
    borderRadius: radius,
    background: `repeating-linear-gradient(-45deg, ${hc}, ${hc} ${hs}, rgba(0,0,0,0) 0px, rgba(0,0,0,0) ${ht})`,
  };

  const hudGlyphShadow = {
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
    transition: theme.transitions.easeOut(),
  };

  const hudGlyphShadowNone = {
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
    transition: theme.transitions.easeOut(),
  };

  const hudGlyphBox = {
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

  const cover = {
    display: 'flex',
    flexGrow: 1,
    width: props.width,
    height: '100%',
    margin: '0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut(),
    backgroundColor: props.color,
    opacity: boxOpacity,
  };

  const w = props.width ? Unit.multiply(props.width, 0.5) : null;
  const coverContent = {
    display: 'flex',
    height: props.width,
    lineHeight: props.width,
    margin: theme.shapes.ticketCoverTopMargin + ' 0px 0px 0px',
    position: 'relative',
    cursor: props.cursor,
    transition: theme.transitions.easeOut(),
    transform: 'rotate(90deg)', // 90 deg CW, from top to bottom
    transformOrigin: w + ' ' + w,
    whiteSpace: 'nowrap',
  };

  const backgroundText = {
    position: 'absolute',
    top: '-3px',
    right: theme.shapes.ticketBackgroundRightMargin,
    fontWeight: theme.shapes.ticketBackgroundFontWeight,
    fontSize: theme.shapes.ticketBackgroundFontSize,
    color: theme.palette.ticketNumberBackground,
  };

  const m = theme.shapes.containerMargin;
  const subpaneRect = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    margin: '0px ' + horizontalSpacing + ' ' + props.verticalSpacing + ' 0px',
    padding: m + ' ' + m + ' ' + Unit.multiply(m, 0.5) + ' ' + m,
    borderWidth: '2px',
    borderStyle: 'dashed none none none',
    borderColor: theme.palette.ticketSubpaneBorder,
    backgroundColor: props.color,
    opacity: boxOpacity,
  };
  const subpaneDragged = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: m + ' ' + m + ' ' + Unit.multiply(m, 0.5) + ' ' + m,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.ticketSubpaneBorder,
    backgroundColor: props.color,
    opacity: boxOpacity,
  };
  const subpaneContent = {
    visibility: Bool.isTrue(props.hideContent) ? 'hidden' : 'visible',
  };

  const ts = '20px';
  const keyframes = {
    '0%': {
      transform: `translateX(-${ts}) scale(0)`,
      opacity: 1,
    },
    '20%': {
      transform: 'translateX(0px) scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: `translateX(-${ts}) scale(0)`,
      opacity: 1,
    },
  };
  const flash = {
    position: 'absolute',
    left: '0px',
    top: `calc(50% - ${ts})`,
    width: '0px',
    height: '0px',
    borderLeft: ts + ' solid ' + theme.palette.ticketHover,
    borderTop: ts + ' solid transparent',
    borderRight: ts + ' solid transparent',
    borderBottom: ts + ' solid transparent',
    animationName: keyframes,
    animationDuration: '0.7s',
    animationIterationCount: '7',
    opacity: 0,
  };

  const identicalCount = {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
  };

  return {
    box,
    farShadow,
    shadow,
    shape,
    hatch,
    hatchDef,
    svg,
    content,
    rectShadow,
    rectFarShadow,
    rect,
    rectContentHatch,
    hudGlyphShadow,
    hudGlyphShadowNone,
    hudGlyphBox,
    cover,
    coverContent,
    backgroundText,
    subpaneRect,
    subpaneDragged,
    subpaneContent,
    flash,
    identicalCount,
  };
}

/******************************************************************************/
