//T:2019-02-27
// WARNING:
// isTrue (x) !== !isFalse (x)

function isTrue(value) {
  const type = typeof value;
  if (type === 'boolean') {
    return value;
  } else if (type === 'string') {
    console.warn(`Bool.isTrue use string value='${value}'`);
    return value === 'true';
  } else {
    //? console.warn(`Bool.isTrue use undefined value='${value}'`);
    return false; // if undefined, never true
  }
}

function isFalse(value) {
  const type = typeof value;
  if (type === 'boolean') {
    return !value;
  } else if (type === 'string') {
    console.warn(`Bool.isFalse use string value='${value}'`);
    return value === 'false';
  } else {
    //? console.warn(`Bool.isFalse use undefined value='${value}'`);
    return false; // if undefined, never false
  }
}

//-----------------------------------------------------------------------------

module.exports = {
  isTrue,
  isFalse,
};
