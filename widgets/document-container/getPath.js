import svg from '../helpers/svg-helpers';

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
  const b = svg.toValue(borderSize) / 2;
  const w = svg.toValue(width ) - b*2;
  const h = svg.toValue(height) - b*2;
  const c = svg.toValue(cornerSize);

  const path = svg.createPath();

  svg.ma(path, b,     h+b);  // a
  svg.lr(path, 0,    -h  );  // b
  svg.lr(path, w-c,   0  );  // c
  svg.lr(path, 0,     c  );  // d
  svg.lr(path, c,     0  );  // e
  svg.lr(path, 0,     h-c);  // f
  svg.close(path);

  svg.ma(path, w+b-c, b  );  // c
  svg.lr(path, 0,     c  );  // d
  svg.lr(path, c,     0  );  // e
  svg.close(path);

  return svg.getPath(path);
}
