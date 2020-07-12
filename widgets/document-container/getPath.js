import svg from '../helpers/svg-helpers';

import {Unit} from 'goblin-theme';
const n = Unit.toValue;

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
  const b = n(borderSize) / 2;
  const w = n(width ) - b*2;
  const h = n(height) - b*2;
  const c = n(cornerSize);

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
