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
  path += 'M ' + x + ' ' + y + ' ';
  return path;
}

// Line to relative position.
function lineTo(path, dx, dy) {
  path += 'l ' + dx + ' ' + dy + ' ';
  return path;
}

// Close path.
function close(path) {
  path += 'z';
  return path;
}

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

  let path = '';
  path = moveTo(path, b,     h+b);  // a
  path = lineTo(path, 0,    -h  );  // b
  path = lineTo(path, w-c,   0  );  // c
  path = lineTo(path, 0,     c  );  // d
  path = lineTo(path, c,     0  );  // e
  path = lineTo(path, 0,     h-c);  // f
  path = close(path);

  path = moveTo(path, w+b-c, b  );  // c
  path = lineTo(path, 0,     c  );  // d
  path = lineTo(path, c,     0  );  // e
  path = close(path);

  return path;
}
