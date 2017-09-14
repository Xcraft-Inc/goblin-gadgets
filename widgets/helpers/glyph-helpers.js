import Enumerable from 'linq';

// If glyph='warning-base', return glyph='warning' and color='base'.
// If glyph='warning-#123', return glyph='warning' and color='#123'.
// If glyph='air-plane', return glyph='air-plane' and color=undefined.
export function getGlyph (glyph, color) {
  if (!glyph) {
    return {};
  }
  if (color) {
    return {
      glyph: glyph,
      color: color,
    };
  }
  const postfixes = [
    // according with ColorHelpers.getMarkColor
    'base',
    'primary',
    'secondary',
    'success',
    'pick',
    'drop',
    'task',
  ];
  const i = glyph.lastIndexOf ('-');
  if (i !== -1) {
    console.log (`getGlyph error: ${glyph}`);
    const postfix = glyph.substring (i + 1);
    if (
      postfix.startsWith ('#') || // '#f00' or '#123456'
      postfix.startsWith ('rgb') || // 'rgb(100,100,100)' or 'rgba(0,0,0,0.5)'
      Enumerable.from (postfixes).where (x => x === postfix).any ()
    ) {
      return {
        glyph: glyph.substring (0, i),
        color: postfix,
      };
    }
  }
  return {
    glyph: glyph,
  };
}
