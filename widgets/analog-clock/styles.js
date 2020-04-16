import {Unit} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';

export const propNames = ['look', 'size', 'limit', 'transition'];

/******************************************************************************/

function px(value) {
  return value + 'px';
}

function d(value, limit, min = 1) {
  min = Math.max(limit, min);
  if (value > 0) {
    return Math.max(value, min);
  } else if (value < 0) {
    return Math.min(value, -min);
  } else {
    return value;
  }
}

// Returns the properties for a segment that can be rotated, used for fixed marks
// and watch pointers.
//          width       s = segment
//          <--->
//        --+-+-+---------^---------^-
//      /   | s |   \     | length  |
//    /     +---+-----\---v-        | radius
//   |        |        |            |
//   +--------o--------+------------v-
//   |        |        |
//    \       |       /                      o = center of circle
//      \     |     / <-- this is a circle!
//        ----+----

function getRotatableSegment(radius, width, length) {
  return {
    right: px(-width / 2),
    top: px(-radius),
    width: px(width),
    height: px(length),
    transformOrigin: `${px(width / 2)} ${px(radius)}`,
  };
}

/******************************************************************************/

export default function styles(theme, props) {
  const {
    look = 'cff',
    size = '180px',
    limit = 1,
    transition = '1.0s ease-out',
  } = props;

  const s = Unit.parse(size).value; // width and height (square)
  const f = s / 180; // magic factor for scaling constant dimensions

  let borderThickness = 0; // thickness of border
  let marginThickness = 0; // margin between border and dial

  let dialBorderTopColor = null;
  let dialBorderRightColor = null;
  let dialBorderBottomColor = null;
  let dialBorderLeftColor = null;
  let dialBackground1 = null;
  let dialBackground2 = null;
  let dialShadow1 = null;
  let dialShadow2 = null;

  let fixedMarkLength15 = 0; // length of fixed mark every 15 minutes
  let fixedMarkWidth15 = 0; // width of fixed mark every 15 minutes
  let fixedMarkRadius15 = 0;
  let fixedMarkLength5 = 0; // length of fixed mark every 5 minutes
  let fixedMarkWidth5 = 0; // width of fixed mark every 5 minutes
  let fixedMarkRadius5 = 0;
  let fixedMarkLength1 = 0; // length of fixed mark every minutes
  let fixedMarkWidth1 = 0; // width of fixed mark every minutes
  let fixedMarkRadius1 = 0;
  let fixedMarkColor = null;
  let fixedMarkBorder = null;

  let watchPointerLengthH = 0; // watch pointer length (hours)
  let watchPointerLengthM = 0; // watch pointer length (minutes)
  let watchPointerLengthS = 0; // watch pointer length (seconds)
  let watchPointerWidthH = 0; // watch pointer (hours) thickness
  let watchPointerWidthM = 0; // watch pointer (minutes) thickness
  let watchPointerWidthS = 0; // watch pointer (seconds) thickness
  let watchPointerAdditionalH = 0; // additional length for watch pointers (hours), starting opposite
  let watchPointerAdditionalM = 0; // additional length for watch pointers (minutes), starting opposite
  let watchPointerAdditionalS = 0; // additional length for watch pointers (seconds), starting opposite
  let watchPointerColorHM = null;
  let watchPointerColorS = null;
  let watchPointerBorder = null;
  let watchPointerRadius = 0;
  let watchPointerShadow = null;
  let watchPointerCenterRadius = null;
  let watchPointerCenterColor = null;
  let watchPointerCenterBorder = null;

  // prettier-ignore
  if (look === 'cff') {
    //-----------//
    //    CFF    //
    //-----------//

    borderThickness = 8 * f;
    marginThickness = 4 * f;

    dialBorderTopColor    = '#ccc';
    dialBorderRightColor  = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor   = '#ccc';
    dialBackground1       = '#fff';
    dialShadow1           = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2           = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 20 * f;
    fixedMarkWidth15  =  6 * f;
    fixedMarkLength5  = 20 * f;
    fixedMarkWidth5   =  6 * f;
    fixedMarkLength1  =  5 * f;
    fixedMarkWidth1   =  2 * f;
    fixedMarkColor    = "#333";

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       =  6.0 * f;
    watchPointerWidthM       =  6.0 * f;
    watchPointerWidthS       =  1.4 * f;
    watchPointerAdditionalH  = 15.0 * f;
    watchPointerAdditionalM  = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;
    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'classic') {
    //-----------//
    //  CLASSIC  //
    //-----------//

    borderThickness = 4 * f;
    marginThickness = 8 * f;

    dialBorderTopColor    = '#ccc';
    dialBorderRightColor  = '#aaa';
    dialBorderBottomColor = '#aaa';
    dialBorderLeftColor   = '#ccc';
    dialBackground1       = '#fff';
    dialShadow1           = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2           = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  1 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  1 * f;
    fixedMarkLength1  =  1 * f;
    fixedMarkWidth1   =  1 * f;
    fixedMarkColor    = "#333";

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       =  4.0 * f;
    watchPointerWidthM       =  4.0 * f;
    watchPointerWidthS       =  1.4 * f;
    watchPointerAdditionalH  = 15.0 * f;
    watchPointerAdditionalM  = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;
    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'black') {
    //-----------//
    //   BLACK   //
    //-----------//

    borderThickness = 8 * f;
    marginThickness = 4 * f;

    dialBorderTopColor    = '#555';
    dialBorderRightColor  = '#333';
    dialBorderBottomColor = '#333';
    dialBorderLeftColor   = '#555';
    dialBackground1       = 'radial-gradient(at 50% 50%, rgba(0,0,0,0.7), rgba(0,0,0,1) 65%)';
    dialBackground2       = 'radial-gradient(at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0) 24%)';
    dialShadow1           = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 20 * f;
    fixedMarkWidth15  =  6 * f;
    fixedMarkLength5  = 20 * f;
    fixedMarkWidth5   =  6 * f;
    fixedMarkLength1  =  5 * f;
    fixedMarkWidth1   =  2 * f;
    fixedMarkColor    = "#eee";

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       =  6.0 * f;
    watchPointerWidthM       =  6.0 * f;
    watchPointerWidthS       =  1.4 * f;
    watchPointerAdditionalH  = 15.0 * f;
    watchPointerAdditionalM  = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;
    watchPointerColorHM      = '#eee';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'simple') {
    //-----------//
    //  SIMPLE   //
    //-----------//

    borderThickness = 1 * f;
    marginThickness = 8 * f;

    dialBorderTopColor    = '#333';
    dialBorderRightColor  = '#333';
    dialBorderBottomColor = '#333';
    dialBorderLeftColor   = '#333';
    dialBackground1       = '#fff';

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  1 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  1 * f;
    fixedMarkColor    = "#333";

    watchPointerLengthH      = s * 0.40 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness;
    watchPointerWidthH       =  4.0 * f;
    watchPointerWidthM       =  4.0 * f;
    watchPointerWidthS       =  1.4 * f;
    watchPointerAdditionalH  = 15.0 * f;
    watchPointerAdditionalM  = 15.0 * f;
    watchPointerAdditionalS  = 22.0 * f;
    watchPointerColorHM      = '#333';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'smoothy') {
    //-----------//
    //  SMOOTHY  //
    //-----------//

    borderThickness = 5 * f;
    marginThickness = 10 * f;

    const rc = '#eee';
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(theme.palette.chrome, 0.7)}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 = 'radial-gradient(at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.0) 24%)';
    dialShadow1     = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2     = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 20 * f;
    fixedMarkWidth15  = 20 * f;
    fixedMarkRadius15 = 10 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   = 10 * f;
    fixedMarkRadius5  =  5 * f;
    fixedMarkColor    = rc;
    fixedMarkBorder   = '1px solid black';

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness;
    watchPointerWidthH       = d( 8 * f, limit, 4);
    watchPointerWidthM       = d( 8 * f, limit, 4);
    watchPointerWidthS       = d( 2 * f, limit, 4);
    watchPointerAdditionalH  =   15 * f;
    watchPointerAdditionalM  =   15 * f;
    watchPointerAdditionalS  =   22 * f;
    watchPointerColorHM      = rc;
    watchPointerColorS       = theme.palette.chrome;
    watchPointerBorder       = '1px solid black';
    watchPointerRadius       = 4 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  } else if (look === 'transparent') {
    //-------------//
    // TRANSPARENT //
    //-------------//

    marginThickness = 10 * f;
    dialBackground1 = "rgba(0,0,0,0.2)"
    
    fixedMarkLength15 = 15 * f;
    fixedMarkWidth15  =  3 * f;
    fixedMarkLength5  =  6 * f;
    fixedMarkWidth5   =  3 * f;
    fixedMarkLength1  =  1 * f;
    fixedMarkWidth1   =  1 * f;
    fixedMarkColor    = "#eee";

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       =  3 * f;
    watchPointerWidthM       =  3 * f;
    watchPointerWidthS       =  1 * f;
    watchPointerAdditionalH  = 15 * f;
    watchPointerAdditionalM  = 15 * f;
    watchPointerAdditionalS  = 22 * f;
    watchPointerColorHM      = '#eee';
    watchPointerColorS       = 'red';
    watchPointerCenterRadius = watchPointerWidthS * 2;
    watchPointerCenterColor  = 'red';
    //
  } else if (look === 'light') {
    //-----------//
    //   LIGHT   //
    //-----------//

    marginThickness          = 10 * f;
    dialBackground1          = "rgba(0,0,0,0.2)"
    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - 15 * f;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerWidthH       =  8 * f;
    watchPointerWidthM       =  8 * f;
    watchPointerColorHM      = '#eee';
    watchPointerCenterRadius = 10 * f;
    watchPointerCenterColor  = '#eee';
    //
  } else if (look === 'royal') {
    //-----------//
    //   ROYAL   //
    //-----------//

    borderThickness =  5 * f;
    marginThickness = 10 * f;

    const rc = ColorManipulator.darken(theme.palette.light, 0.1);
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(theme.palette.chrome, 0.7)}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 65%)`;
    dialBackground2 = 'radial-gradient(at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.0) 24%)';
    dialShadow1     = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2     = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 =   15 * f;
    fixedMarkWidth15  =    6 * f;
    fixedMarkLength5  =   15 * f;
    fixedMarkRadius15 =    1 * f;
    fixedMarkWidth5   = d( 2 * f, limit, 4);
    fixedMarkRadius5  =    1 * f;
    fixedMarkLength1  = d( 2 * f, limit, 4);
    fixedMarkWidth1   = d( 2 * f, limit, 4);
    fixedMarkRadius1  =    2 * f;
    fixedMarkColor    = rc;
    fixedMarkBorder   = '1px solid black';

    watchPointerLengthH      = s * 0.45 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthM      = s * 0.49 - borderThickness - marginThickness;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       = d( 6 * f, limit, 4);
    watchPointerWidthM       = d( 6 * f, limit, 4);
    watchPointerWidthS       = d( 2 * f, limit, 4);
    watchPointerAdditionalH  =   15 * f;
    watchPointerAdditionalM  =   15 * f;
    watchPointerAdditionalS  =   22 * f;
    watchPointerColorHM      = rc;
    watchPointerColorS       = theme.palette.chrome;
    watchPointerBorder       = '1px solid black';
    watchPointerRadius       = 1 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = rc;
    watchPointerCenterBorder = `${px(0.3 * f)} solid black`;
    //
  } else if (look === 'ring') {
    //-----------//
    //   RING    //
    //-----------//

    borderThickness = 5 * f;

    const rc = '#eee';
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialShadow1     = `0px 0px ${px(20 * f)} ${px(2 * f)} rgba(0,0,0,0.9)`;
    dialShadow2     = `inset 0px 0px ${px(12 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  3 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  3 * f;
    fixedMarkColor    = rc;

    watchPointerLengthH      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15 * 3;
    watchPointerLengthM      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       = d( 8 * f, limit, 4);
    watchPointerWidthM       = d( 8 * f, limit, 4);
    watchPointerWidthS       = d( 2 * f, limit, 4);
    watchPointerAdditionalH  =   15 * f;
    watchPointerAdditionalM  =   15 * f;
    watchPointerAdditionalS  =   22 * f;
    watchPointerColorHM      = rc;
    watchPointerColorS       = "red";
    watchPointerRadius       = 4 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = rc;
    //
  } else if (look === 'discreet') {
    //-----------//
    // DISCREET  //
    //-----------//

    borderThickness       =  1 * f;
    dialBorderTopColor    = "#bbb";
    dialBorderRightColor  = "#bbb";
    dialBorderBottomColor = "#bbb";
    dialBorderLeftColor   = "#bbb";

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  3 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  3 * f;
    fixedMarkColor    = '#bbb';

    watchPointerLengthH      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15 * 3;
    watchPointerLengthM      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness - fixedMarkLength15;
    watchPointerWidthH       = d( 4 * f, limit, 4);
    watchPointerWidthM       = d( 4 * f, limit, 4);
    watchPointerWidthS       = d( 1 * f, limit);
    watchPointerAdditionalH  =   15 * f;
    watchPointerAdditionalM  =   15 * f;
    watchPointerAdditionalS  =   22 * f;
    watchPointerColorHM      = '#eee';
    watchPointerColorS       = "red";
    watchPointerRadius       = 4 * f;
    watchPointerShadow       = `0px 0px ${px(2 * f)} ${px(1 * f)} rgba(0,0,0,0.5)`;
    watchPointerCenterRadius = 6 * f;
    watchPointerCenterColor  = '#eee';
    //
  } else if (look === 'dots') {
    //-----------//
    //   DOTS    //
    //-----------//

    borderThickness = 5 * f;

    const rc = '#eee';
    dialBorderTopColor    = rc;
    dialBorderRightColor  = rc;
    dialBorderBottomColor = rc;
    dialBorderLeftColor   = rc;
    dialBackground1 = `radial-gradient(at 50% 50%, ${ColorManipulator.fade(theme.palette.chrome, 0.8)}, ${ColorManipulator.darken(theme.palette.base, 0.2)} 100%)`;
    dialBackground2 = 'radial-gradient(at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.0) 24%)';
    dialShadow1     = `${px(6 * f)} ${px(6 * f)} ${px(20 * f)} ${px(5 * f)} rgba(0,0,0,0.9)`;
    dialShadow2     = `inset ${px(6 * f)} ${px(6 * f)} ${px(24 * f)} 0px rgba(0,0,0,0.9)`;

    fixedMarkLength15 = 10 * f;
    fixedMarkWidth15  =  3 * f;
    fixedMarkLength5  = 10 * f;
    fixedMarkWidth5   =  3 * f;
    fixedMarkColor    = "#ccc";

    watchPointerWidthH       = 20 * f;
    watchPointerWidthM       = 20 * f;
    watchPointerWidthS       = 10 * f;
    watchPointerLengthH      = s * 0.50 - borderThickness - marginThickness + 2.5 * f + watchPointerWidthH / 2 - 30 * f;
    watchPointerLengthM      = s * 0.50 - borderThickness - marginThickness + 2.5 * f + watchPointerWidthM / 2;
    watchPointerLengthS      = s * 0.50 - borderThickness - marginThickness + 2.5 * f + watchPointerWidthS / 2;
    watchPointerAdditionalH  = -(watchPointerLengthH - watchPointerWidthH);
    watchPointerAdditionalM  = -(watchPointerLengthM - watchPointerWidthM);
    watchPointerAdditionalS  = -(watchPointerLengthS - watchPointerWidthS);
    watchPointerColorHM      = rc;
    watchPointerColorS       = "red";
    watchPointerBorder       = '1px solid black';
    watchPointerRadius       = 10 * f;
    watchPointerShadow       = `0px 0px ${px(5 * f)} ${px(2 * f)} rgba(0,0,0,0.5)`;
    //
  }

  // prettier-ignore
  {
    borderThickness         = d(borderThickness, limit);
    marginThickness         = d(marginThickness, limit);
    watchPointerWidthH      = d(watchPointerWidthH, limit);
    watchPointerWidthM      = d(watchPointerWidthM, limit);
    watchPointerWidthS      = d(watchPointerWidthS, limit);
    watchPointerAdditionalH = d(watchPointerAdditionalH, limit);
    watchPointerAdditionalM = d(watchPointerAdditionalM, limit);
    watchPointerAdditionalS = d(watchPointerAdditionalS, limit);
    fixedMarkLength15       = d(fixedMarkLength15, limit);
    fixedMarkWidth15        = d(fixedMarkWidth15, limit);
    fixedMarkLength5        = d(fixedMarkLength5, limit);
    fixedMarkWidth5         = d(fixedMarkWidth5, limit);
    fixedMarkLength1        = d(fixedMarkLength1, limit);
    fixedMarkWidth1         = d(fixedMarkWidth1, limit);
  }

  /******************************************************************************/

  const analogClock = {
    position: 'relative',
    width: px(s),
    height: px(s),
    borderRadius: px(s / 2),
  };

  // Center of clock, used for all dials, fixed marks and watch pointers.
  const center = {
    position: 'absolute',
    width: '0px',
    height: '0px',
    left: px(s / 2),
    right: px(s / 2),
    top: px(s / 2),
    bottom: px(s / 2),
    transition,
  };

  // White dial, with an outer shadow.
  const dial1 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: px(-s / 2),
    top: px(-s / 2),
    borderRadius: px(s),
    background: dialBackground1,
    boxShadow: dialShadow1,
    transition,
  };

  // Silver dial, with an inner shadow.
  const dial2 = {
    position: 'absolute',
    width: px(s),
    height: px(s),
    left: px(-s / 2),
    top: px(-s / 2),
    boxSizing: 'border-box',
    borderRadius: px(s),
    borderTop: `${px(borderThickness)} solid ${dialBorderTopColor}`,
    borderRight: `${px(borderThickness)} solid ${dialBorderRightColor}`,
    borderBottom: `${px(borderThickness)} solid ${dialBorderBottomColor}`,
    borderLeft: `${px(borderThickness)} solid ${dialBorderLeftColor}`,
    background: dialBackground2,
    boxShadow: dialShadow2,
    transition,
  };

  /******************************************************************************/

  // Main fixed mark (every 15 minutes).
  const fixedMark15 = {
    position: 'absolute',
    ...getRotatableSegment(
      s * 0.5 - borderThickness - marginThickness,
      fixedMarkWidth15,
      fixedMarkLength15
    ),
    backgroundColor: fixedMarkColor,
    boxSizing: 'border-box',
    border: fixedMarkBorder,
    borderRadius: px(fixedMarkRadius15),
    transition,
  };

  // Secondary fixed mark (every 5 minutes).
  const fixedMark5 = {
    position: 'absolute',
    ...getRotatableSegment(
      s * 0.5 - borderThickness - marginThickness,
      fixedMarkWidth5,
      fixedMarkLength5
    ),
    backgroundColor: fixedMarkColor,
    boxSizing: 'border-box',
    border: fixedMarkBorder,
    borderRadius: px(fixedMarkRadius5),
    transition,
  };

  // Secondary fixed mark (every minute).
  const fixedMark1 = {
    position: 'absolute',
    ...getRotatableSegment(
      s * 0.5 - borderThickness - marginThickness,
      fixedMarkWidth1,
      fixedMarkLength1
    ),
    backgroundColor: fixedMarkColor,
    boxSizing: 'border-box',
    border: fixedMarkWidth1 ? fixedMarkBorder : null,
    borderRadius: px(fixedMarkRadius1),
    transition,
  };

  /******************************************************************************/

  // Transition for all properties, except "transform: rotate(angle)".
  const transitionWatchPointer = [
    'right',
    'top',
    'width',
    'height',
    'transform-origin',
    'background-color',
    'border',
    'border-radius',
    'box-shadow',
  ]
    .map((p) => `${p} ${transition}`)
    .join(',');

  const watchPointerHour = {
    position: 'absolute',
    ...getRotatableSegment(
      watchPointerLengthH,
      watchPointerWidthH,
      watchPointerLengthH + watchPointerAdditionalH
    ),
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: transitionWatchPointer,
  };

  const watchPointerMinute = {
    position: 'absolute',
    ...getRotatableSegment(
      watchPointerLengthM,
      watchPointerWidthM,
      watchPointerLengthM + watchPointerAdditionalM
    ),
    backgroundColor: watchPointerColorHM,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: transitionWatchPointer,
  };

  const watchPointerSecond = {
    position: 'absolute',
    ...getRotatableSegment(
      watchPointerLengthS,
      watchPointerWidthS,
      watchPointerLengthS + watchPointerAdditionalS
    ),
    backgroundColor: watchPointerColorS,
    boxSizing: 'border-box',
    border: watchPointerBorder,
    borderRadius: px(watchPointerRadius),
    boxShadow: watchPointerShadow,
    transition: transitionWatchPointer,
  };

  // Small red dot centered.
  const watchPointerCenter = {
    position: 'absolute',
    left: px(-watchPointerCenterRadius),
    top: px(-watchPointerCenterRadius),
    width: px(watchPointerCenterRadius * 2),
    height: px(watchPointerCenterRadius * 2),
    backgroundColor: watchPointerCenterColor,
    boxSizing: 'border-box',
    border: watchPointerCenterBorder,
    borderRadius: px(watchPointerCenterRadius),
    boxShadow: watchPointerCenterRadius ? watchPointerShadow : null,
    transition,
  };

  /******************************************************************************/

  return {
    analogClock,
    center,

    dial1,
    dial2,

    fixedMark15,
    fixedMark5,
    fixedMark1,

    watchPointerHour,
    watchPointerMinute,
    watchPointerSecond,
    watchPointerCenter,
  };
}

/******************************************************************************/
