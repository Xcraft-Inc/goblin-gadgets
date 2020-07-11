/******************************************************************************/

// Convert string '123.4px' to '123.4'.
function toValue(value) {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

// Convert string '123.4px' to int 123.
function toInt(value) {
  if (typeof value === 'string') {
    return parseInt(value.replace(/px/g, ''));
  } else {
    return value;
  }
}

// Convert number 123 to string "123px".
function toPx(value) {
  return value + 'px';
}

// Convert number 50 to string "50%".
function toPc(n) {
  return n + '%';
}

/******************************************************************************/

module.exports = {
  toValue,
  toInt,
  toPx,
  toPc,
};
