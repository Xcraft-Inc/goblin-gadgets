const {Unit} = require('electrum-theme');

function getHorizontalSpacingRightMargin(theme, horizontalSpacing) {
  let rightMargin = null;

  if (horizontalSpacing) {
    const spacingType = {
      overlap: '-1px',
      zero: '0px',
      tiny: '1px',
      compact: Unit.multiply(theme.shapes.containerMargin, 0.25),
      large: Unit.multiply(theme.shapes.containerMargin, 0.5),
      big: theme.shapes.containerMargin,
      double: Unit.multiply(theme.shapes.containerMargin, 2),
    };
    rightMargin = spacingType[horizontalSpacing];
  }

  return rightMargin;
}

//-----------------------------------------------------------------------------

module.exports = {
  getHorizontalSpacingRightMargin,
};
