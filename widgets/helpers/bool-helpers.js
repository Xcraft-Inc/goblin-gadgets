//T:2019-02-27
// WARNING:
// isTrue (x) !== !isFalse (x)

function isTrue(value) {
  const type = typeof value;
  if (type === 'boolean') {
    return value;
  } else if (type === 'string') {
    return value === 'true';
  } else {
    return false; // if undefined, never true
  }
}

function isFalse(value) {
  const type = typeof value;
  if (type === 'boolean') {
    return !value;
  } else if (type === 'string') {
    return value === 'false';
  } else {
    return false; // if undefined, never false
  }
}

//-----------------------------------------------------------------------------

module.exports = {
  isTrue,
  isFalse,
};
