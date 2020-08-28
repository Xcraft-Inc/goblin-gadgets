//-----------------------------------------------------------------------------

// With "Xavier", return "X".
// With "Jean-Claude", return "JC".
// With "Jean le Petit", return "JLP".
// With "Jean-Bernard-Henri-Louis", return "JBHL".
function _extractFirstLetters(text) {
  if (!text) {
    return '';
  }

  const p = text.replace(/ /gi, '-').split('-');
  return p.map((x) => x.substring(0, 1)).join('');
}

function getLogoInitials(initials, pseudo, firstName, lastName) {
  let text = initials;

  if (!text) {
    const c1 = _extractFirstLetters(firstName);
    const c2 = _extractFirstLetters(lastName);
    text = c1 + c2;
  }

  if (!text) {
    text = pseudo;
  }

  if (!text) {
    text = ' ';
  }

  return text.toUpperCase();
}

//-----------------------------------------------------------------------------

function getLogoShape(shape) {
  return shape || 'hexagon'; // default shape
}

function getLogoColor(color) {
  return color || '#7abd24'; // nice green, default color
}

//-----------------------------------------------------------------------------

module.exports = {
  getLogoInitials,
  getLogoShape,
  getLogoColor,
};
