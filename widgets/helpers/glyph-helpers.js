import Enumerable from 'linq';

export function getGlyph (glyph) {
  if (!glyph) {
    return {};
  }
  const prefixes = [
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
    const prefix = glyph.substring (i + 1);
    if (
      prefix.startsWith ('#') || // '#f00' or '#123456'
      prefix.startsWith ('rgb') || // 'rgb(100,100,100)' or 'rgba(0,0,0,0.5)'
      Enumerable.from (prefixes).where (x => x === prefix).any ()
    ) {
      return {
        glyph: glyph.substring (0, i),
        color: prefix,
      };
    }
  }
  return {
    glyph: glyph,
  };
}
