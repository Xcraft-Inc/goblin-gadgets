// WARNING:
// isTrue (x) !== !isFalse(x)

export function isTrue (value) {
  const type = typeof value;
  if (type === 'boolean') {
    return value;
  } else if (type === 'string') {
    return value === 'true';
  } else {
    return false; // if undefined, never true
  }
}

export function isFalse (value) {
  const type = typeof value;
  if (type === 'boolean') {
    return !value;
  } else if (type === 'string') {
    return value === 'false';
  } else {
    return false; // if undefined, never false
  }
}

export function toString (value) {
  const type = typeof value;
  if (type === 'boolean') {
    return value ? 'true' : 'false';
  } else if (type === 'string') {
    return value;
  } else {
    return value ? 'true' : 'false';
  }
}
