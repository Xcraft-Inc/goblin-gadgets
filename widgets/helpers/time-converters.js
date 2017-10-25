function getEmpty () {
  return '00:00:00';
}

function isEmpty (time) {
  return !time || time === getEmpty ();
}

function tryParseInt (text) {
  if (typeof text === 'string') {
    text = text.trim ();
    let result = 0;
    for (var c of text) {
      if (c >= '0' && c <= '9') {
        result *= 10;
        result += c - '0';
      } else {
        return NaN;
      }
    }
    return result;
  } else {
    return NaN;
  }
}

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

export function jsToCanonical (time) {
  return (
    padding (time.getHours (), 2) +
    ':' +
    padding (time.getMinutes (), 2) +
    ':' +
    padding (time.getSeconds (), 2)
  );
}

function canonicalToJs (time) {
  if (typeof time === 'object') {
    return new Date (2000, 1, 1, time.hour, time.minute, time.second);
  } else {
    const s = split (time);
    return new Date (2000, 1, 1, s.hour, s.minute, s.second);
  }
}

export function addHours (time, n) {
  const d = canonicalToJs (time);
  const nd = new Date (
    2000,
    1,
    1,
    d.getHours () + n,
    d.getMinutes (),
    d.getSeconds ()
  );
  return jsToCanonical (nd);
}

export function addMinutes (time, n) {
  const d = canonicalToJs (time);
  const nd = new Date (
    2000,
    1,
    1,
    d.getHours (),
    d.getMinutes () + n,
    d.getSeconds ()
  );
  return jsToCanonical (nd);
}

export function addSeconds (time, n) {
  const d = canonicalToJs (time);
  const nd = new Date (
    2000,
    1,
    1,
    d.getHours (),
    d.getMinutes (),
    d.getSeconds () + n
  );
  return jsToCanonical (nd);
}

export function getHours (time) {
  const d = canonicalToJs (time);
  return d.getHours (); // 0..23
}

export function getMinutes (time) {
  const d = canonicalToJs (time);
  return d.getMinutes (); // 0..59
}

export function getSeconds (time) {
  const d = canonicalToJs (time);
  return d.getSeconds (); // 0..59
}

// With '12:34:56', return {hour: 12, minute: 34, second: 56}.
export function split (canonicalTime) {
  if (
    !canonicalTime ||
    canonicalTime.length !== 8 ||
    canonicalTime[2] !== ':' ||
    canonicalTime[5] !== ':'
  ) {
    throw new Error (
      `Bad canonical time '${canonicalTime}' (must be 'hh:mm:ss')`
    );
  }
  let hour = parseInt (canonicalTime.substring (0, 2));
  let minute = parseInt (canonicalTime.substring (3, 5));
  let second = parseInt (canonicalTime.substring (6, 8));
  return {
    hour: hour,
    minute: minute,
    second: second,
  };
}

// With {hour: 12, minute: 34, second: 56}, return '12:34:56'.
function joinTime (time) {
  return (
    padding (time.hour, 2) +
    ':' +
    padding (time.minute, 2) +
    ':' +
    padding (time.second, 2)
  );
}

// With ' 12/3 ', return [12, 3].
function tryParseTime (editedTime) {
  const result = [];
  if (editedTime) {
    editedTime = editedTime.trim ();
    editedTime = editedTime.replace (/:|;|-|,|\.|\/| /g, ':');
    if (editedTime) {
      const p = editedTime.split (':');
      for (var n of p) {
        result.push (tryParseInt (n));
      }
    }
  }
  return result;
}

export function getTimeFromMinutes (minutes) {
  const hour = Math.floor (minutes / 60);
  const minute = minutes % 60;
  return joinTime ({hour: hour, minute: minute, second: 0});
}

export function getTotalMinutes (time) {
  const s = split (time);
  return s.hour * 60 + s.minute;
}

// With time = '12:34:56', return '12:34'.
export function getDisplayed (time, format) {
  if (!time || isEmpty (time)) {
    return null;
  }
  const d = split (time);
  if (d) {
    if (format === 'hms') {
      return (
        padding (d.hour, 2) +
        ':' +
        padding (d.minute, 2) +
        ':' +
        padding (d.second, 2)
      );
    } else if (format === 'h') {
      return padding (d.hour, 2);
    } else {
      return padding (d.hour, 2) + ':' + padding (d.minute, 2);
    }
  } else {
    return null;
  }
}

// With editedTime = '12', return '12:00:00'.
export function parseEdited (editedTime, defaultCanonicalTime) {
  if (!editedTime || editedTime === '') {
    return {value: null, error: null};
  }
  if (!defaultCanonicalTime) {
    defaultCanonicalTime = getNowCanonical ();
  }
  const time = split (defaultCanonicalTime);
  const edited = tryParseTime (editedTime);
  let incorrectHour = false;
  let incorrectMinute = false;
  let incorrectSecond = false;
  let incorrectArgs = false;
  if (edited.length > 0) {
    if (isNaN (edited[0])) {
      incorrectHour = true;
    } else {
      time.hour = edited[0];
    }
  }
  if (edited.length > 1) {
    if (isNaN (edited[1])) {
      incorrectMinute = true;
    } else {
      time.minute = edited[1];
    }
  }
  if (edited.length > 2) {
    if (isNaN (edited[2])) {
      incorrectSecond = true;
    } else {
      time.second = edited[2];
    }
  }
  if (edited.length > 3) {
    incorrectArgs = true;
  }

  const jsTime = canonicalToJs (time);
  if (isNaN (jsTime)) {
    return {value: null, error: 'Heure invalide'};
  }
  const result = jsToCanonical (jsTime);
  const r = split (result);

  if (time.hour !== r.hour) {
    incorrectHour = true;
  } else if (time.minute !== r.minute) {
    incorrectMinute = true;
  } else if (time.second !== r.second) {
    incorrectSecond = true;
  }

  let error = null;
  if (incorrectHour) {
    error = 'Heure incorrecte';
  } else if (incorrectMinute) {
    error = 'Minutes incorrectes';
  } else if (incorrectSecond) {
    error = 'Secondes incorrectes';
  } else if (incorrectArgs) {
    error = "Trop d'arguments";
  }

  return {value: result, error: error};
}

export function getNowCanonical () {
  return jsToCanonical (new Date (Date.now ()));
}
