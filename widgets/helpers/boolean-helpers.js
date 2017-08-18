export function isTrue (value) {
  const type = typeof value;
  if (type === 'boolean') {
    return value;
  } else if (type === 'string') {
    return value === 'true';
  } else {
    return value;
  }
}

export function isFalse (value) {
  return !isTrue (value);
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
