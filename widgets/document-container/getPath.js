// Convert string '123px' to '123'.
function toValue(value) {
  if (typeof value === 'string') {
    return value.replace(/px/g, '');
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

// Close path.
function close(path) {
  path.push('z');
}

/******************************************************************************/

//    b +---------|\ c ----> x
//      |         | \
//      |         |  \
//      |       d +---| e
//      |             |
//      |             |
//      |             |
//      |             |
//    a +-------------+ f
//      |
//    y V

// prettier-ignore
export default function getPath(width, height, cornerSize, borderSize) {
  const b = toValue(borderSize) / 2;
  const w = toValue(width ) - b*2;
  const h = toValue(height) - b*2;
  const c = toValue(cornerSize);

  const path = [];
  moveTo(path, b,     h+b);  // a
  lineTo(path, 0,    -h  );  // b
  lineTo(path, w-c,   0  );  // c
  lineTo(path, 0,     c  );  // d
  lineTo(path, c,     0  );  // e
  lineTo(path, 0,     h-c);  // f
  close(path);

  moveTo(path, w+b-c, b  );  // c
  lineTo(path, 0,     c  );  // d
  lineTo(path, c,     0  );  // e
  close(path);

  return path.join(" ");
}
