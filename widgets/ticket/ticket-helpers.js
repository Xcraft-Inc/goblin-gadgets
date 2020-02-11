/******************************************************************************/

// /\/\/\/\/\/\/\
// |            |   shape = "first"
// +------------+
//
// +------------+
// |            |   shape = "continued"
// +------------+
//
// +------------+
// |            |   shape = "last"
// \/\/\/\/\/\/\/
//
// /\/\/\/\/\/\/\
// |           |   shape = "middle"
// \/\/\/\/\/\/\/

export function hasTopSerration(shape) {
  return shape === 'first' || shape === 'middle';
}

export function hasBottomSerration(shape) {
  return shape === 'last' || shape === 'middle';
}

export function getRadius(shape, radius) {
  const topRadius = hasTopSerration(shape) ? radius : '0px';
  const bottomRadius = hasBottomSerration(shape) ? radius : '0px';
  return `${topRadius} ${topRadius} ${bottomRadius} ${bottomRadius}`;
}

/******************************************************************************/
