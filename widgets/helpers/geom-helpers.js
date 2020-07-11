/******************************************************************************/

function clipAngleDeg(angle) {
  // Retourne un angle normalisé, c'est-à-dire compris entre 0 et 360°.
  angle = angle % 360.0;
  return angle < 0.0 ? 360.0 + angle : angle;
}

function degToRad(angle) {
  return (angle * Math.PI) / 180.0;
}

function radToDeg(angle) {
  return (angle * 180.0) / Math.PI;
}

function rotatePointDeg(center, angle, p) {
  return rotatePointRad(center, degToRad(angle), p);
}

function rotatePointRad(center, angle, p) {
  //	Fait tourner un point autour d'un centre.
  //	L'angle est exprimé en radians.
  //	Un angle positif est horaire (CW), puisque Y va de haut en bas.

  const a = {x: 0, y: 0};
  const b = {x: 0, y: 0};

  a.x = p.x - center.x;
  a.y = p.y - center.y;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  b.x = a.x * cos - a.y * sin;
  b.y = a.x * sin + a.y * cos;

  b.x += center.x;
  b.y += center.y;

  return b;
}

function computeAngleDegFromPoints(c, a) {
  return radToDeg(computeAngleRadFromXY(a.x - c.x, a.y - c.y));
}

function computeAngleRadFromPoints(c, a) {
  return computeAngleRadFromXY(a.x - c.x, a.y - c.y);
}

//	Calcule l'angle d'un triangle rectangle.
//	L'angle est anti-horaire (CCW), compris entre 0 et 2*PI.
//	Pour obtenir un angle horaire (CW), il suffit de passer -y.
//
//	    ^
//	    |
//	  y o----o
//	    |  / |
//	    |/)a |
//	----o----o-->
//	    |    x
//	    |
function computeAngleRadFromXY(x, y) {
  if (x === 0.0 && y === 0.0) {
    return 0.0;
  }

  return Math.atan2(y, x);
}

/******************************************************************************/

module.exports = {
  clipAngleDeg,
  degToRad,
  radToDeg,
  rotatePointDeg,
  computeAngleDegFromPoints,
};
