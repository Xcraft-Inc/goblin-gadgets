function pad (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array (width - n.length + 1).join (z) + n;
}

// value =  '1', decimals = 3  -> return '001'
// value =  'a', decimals = 3  -> return null
// value =    5, decimals = 3  -> return '005'
// value =   12, decimals = 3  -> return '012'
// value = 1234, decimals = 3  -> return null
function padding (value, decimals) {
  if (typeof value === 'string') {
    value = parseInt (value);
    if (isNaN (value)) {
      return null;
    }
  }
  const result = pad (value, decimals);
  if (result.length > decimals) {
    return null;
  } else {
    return result;
  }
}

// With price = '12', return '12.00'.
export function getDisplayed (price, format) {
  if (!price) {
    return null;
  }

  const s = price.split ('.');
  if (s.length === 1) {
    return s[0] + '.' + padding (0, 2);
  } else if (s.length === 2) {
    return s[0] + '.' + padding (s[1], 2);
  } else {
    return null;
  }
}

// With editedPrice = '12.50', return '12.5'.
export function parseEdited (editedPrice) {
  if (!editedPrice) {
    return null;
  }

  return editedPrice.replace (/:|;|,|\.|\/| /g, '.');
}
