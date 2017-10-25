// month is zero based (0 = january).
export function getMonthDescription (month, format) {
  if (month < 0 || month > 11) {
    return null;
  }
  const array = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  if (format === '1') {
    return array[month].substring (0, 1);
  } else if (format === '2') {
    return array[month].substring (0, 2);
  } else if (format === '3') {
    return array[month].substring (0, 3);
  } else if (format === '4') {
    return array[month].substring (0, 4);
  } else {
    return array[month];
  }
}

// dow is zero based (0 = monday).
export function getDOWDescription (dow, format) {
  if (dow < 0 || dow > 6) {
    return null;
  }
  const array = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ];
  if (format === '3') {
    return array[dow].substring (0, 3);
  } else {
    return array[dow];
  }
}

export function getEmptyDate () {
  return '0001-01-01';
}

export function isEmptyDate (date) {
  return !date || date === getEmptyDate ();
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

export function jsToCanonicalDate (date) {
  return (
    padding (date.getFullYear (), 4) +
    '-' +
    padding (date.getMonth () + 1, 2) +
    '-' +
    padding (date.getDate (), 2)
  );
}

export function canonicalDateToJs (date) {
  if (typeof date === 'object') {
    return new Date (date.year, date.month - 1, date.day);
  } else {
    const s = splitDate (date);
    return new Date (s.year, s.month - 1, s.day);
  }
}

export function addDays (date, n) {
  const d = canonicalDateToJs (date);
  const nd = new Date (d.getFullYear (), d.getMonth (), d.getDate () + n);
  return jsToCanonicalDate (nd);
}

export function addMonths (date, n) {
  const d = canonicalDateToJs (date);
  const nd = new Date (d.getFullYear (), d.getMonth () + n, d.getDate ());
  return jsToCanonicalDate (nd);
}

export function addYears (date, n) {
  const d = canonicalDateToJs (date);
  const nd = new Date (d.getFullYear () + n, d.getMonth (), d.getDate ());
  return jsToCanonicalDate (nd);
}

export function getYear (date) {
  const d = canonicalDateToJs (date);
  return d.getFullYear (); // 2017..
}

export function getMonth (date) {
  const d = canonicalDateToJs (date);
  return d.getMonth () + 1; // 1..12
}

export function getDay (date) {
  const d = canonicalDateToJs (date);
  return d.getDate (); // 1..31
}

export function isCanonicalDate (canonicalDate) {
  if (
    !canonicalDate ||
    canonicalDate.length !== 10 ||
    canonicalDate[4] !== '-' ||
    canonicalDate[7] !== '-'
  ) {
    return false;
  } else {
    return true;
  }
}

// With '2017-03-31', return {year: 2017, month: 03, day: 31}.
export function splitDate (canonicalDate) {
  if (
    !canonicalDate ||
    canonicalDate.length !== 10 ||
    canonicalDate[4] !== '-' ||
    canonicalDate[7] !== '-'
  ) {
    throw new Error (
      `Bad canonical date '${canonicalDate}' (must be 'yyyy-mm-dd')`
    );
  }
  let year = parseInt (canonicalDate.substring (0, 4));
  let month = parseInt (canonicalDate.substring (5, 7));
  let day = parseInt (canonicalDate.substring (8, 10));
  return {
    year: year,
    month: month,
    day: day,
  };
}

// Return actual date and time.
export function getNow () {
  const now = new Date (Date.now ());
  return {
    year: now.getFullYear (),
    month: now.getMonth () + 1,
    day: now.getDate (),
    hour: now.getHours (),
    minute: now.getMinutes (),
    second: now.getSeconds (),
  };
}

// With {year: 2017, month: 03, day: 31}, return '2017-03-31'.
export function joinDate (date) {
  return (
    padding (date.year, 4) +
    '-' +
    padding (date.month, 2) +
    '-' +
    padding (date.day, 2)
  );
}

// With ' 12/3 ', return [12, 3].
function tryParseDate (editedDate) {
  const result = [];
  if (editedDate) {
    editedDate = editedDate.trim ();
    editedDate = editedDate.replace (/:|;|-|,|\.|\/| /g, ':');
    if (editedDate) {
      const p = editedDate.split (':');
      for (var n of p) {
        result.push (tryParseInt (n));
      }
    }
  }
  return result;
}

// With date = '2017-03-31', return '31.03.2017'.
export function getDisplayedDate (canonicalDate, format) {
  if (!canonicalDate || isEmptyDate (canonicalDate)) {
    return null;
  }
  const d = splitDate (canonicalDate);
  if (d) {
    if (format === 'y') {
      return padding (d.year, 4);
    } else if (format === 'My') {
      return getMonthDescription (d.month - 1) + ' ' + padding (d.year, 4);
    } else if (format === 'M') {
      return getMonthDescription (d.month - 1);
    } else if (format === 'y') {
      return padding (d.year, 4);
    } else if (format === 'W') {
      const w = canonicalDateToJs (canonicalDate).getDay (); // 0..6 (0 = Sunday)
      return getDOWDescription ((w + 6) % 7);
    } else if (format === 'Wd') {
      const w = canonicalDateToJs (canonicalDate).getDay (); // 0..6 (0 = Sunday)
      return getDOWDescription ((w + 6) % 7, '3') + ' ' + padding (d.day, 2);
    } else if (format === 'd') {
      return padding (d.day, 2);
    } else if (format === 'Wdm') {
      const w = canonicalDateToJs (canonicalDate).getDay (); // 0..6 (0 = Sunday)
      return (
        getDOWDescription ((w + 6) % 7, '3') +
        ' ' +
        padding (d.day, 2) +
        '.' +
        padding (d.month, 2)
      );
    } else if (format === 'Wdmy') {
      const w = canonicalDateToJs (canonicalDate).getDay (); // 0..6 (0 = Sunday)
      return (
        getDOWDescription ((w + 6) % 7, '3') +
        ' ' +
        padding (d.day, 2) +
        '.' +
        padding (d.month, 2) +
        '.' +
        padding (d.year, 4)
      );
    } else {
      return (
        padding (d.day, 2) +
        '.' +
        padding (d.month, 2) +
        '.' +
        padding (d.year, 4)
      );
    }
  } else {
    return canonicalDate; // return the initial text if it's not a valid date
  }
}

// With editedDate = '31 3 2017', return '2017-03-31'.
export function parseEditedDate (editedDate, defaultCanonicalDate) {
  if (!editedDate || editedDate === '') {
    return {value: null, error: null};
  }
  if (!defaultCanonicalDate) {
    defaultCanonicalDate = getNowCanonicalDate ();
  }
  const date = splitDate (defaultCanonicalDate);
  const edited = tryParseDate (editedDate);
  let incorrectDay = false;
  let incorrectMonth = false;
  let incorrectYear = false;
  let incorrectArgs = false;
  if (edited.length > 0) {
    if (isNaN (edited[0])) {
      incorrectDay = true;
    } else {
      date.day = edited[0];
    }
  }
  if (edited.length > 1) {
    if (isNaN (edited[1])) {
      incorrectMonth = true;
    } else {
      date.month = edited[1];
    }
  }
  if (edited.length > 2) {
    if (isNaN (edited[2])) {
      incorrectYear = true;
    } else {
      if (edited[2] >= 1000 && edited[2] <= 2100) {
        date.year = edited[2];
      } else if (edited[2] >= 0 && edited[2] <= 99) {
        date.year = 2000 + edited[2];
      } else {
        incorrectYear = true;
      }
    }
  }
  if (edited.length > 3) {
    incorrectArgs = true;
  }

  const jsDate = canonicalDateToJs (date);
  if (isNaN (jsDate)) {
    return {value: null, error: 'Date invalide'};
  }
  const result = jsToCanonicalDate (jsDate);
  const r = splitDate (result);

  if (date.day !== r.day) {
    incorrectDay = true;
  } else if (date.month !== r.month) {
    incorrectMonth = true;
  } else if (date.year !== r.year) {
    incorrectYear = true;
  }

  let error = null;
  if (incorrectDay) {
    error = 'Jour incorrect';
  } else if (incorrectMonth) {
    error = 'Mois incorrect';
  } else if (incorrectYear) {
    error = 'Année incorrecte';
  } else if (incorrectArgs) {
    error = "Trop d'arguments";
  }

  return {value: result, error: error};
}

function join (list, separator) {
  var result = '';
  for (var item of list) {
    if (result !== '') {
      result += separator;
    }
    result += item;
  }
  return result;
}

function toFirstUpperCase (s) {
  if (s) {
    const f = s.substring (0, 1);
    const r = s.substring (1);
    return f.toUpperCase () + r.toLowerCase ();
  }
}

//	Return a nice description for a period. Examples:
//	"2017"
//	"2016 - 2017"
//	"Janvier - mars 2017"
//	"Octobre 2016 - février 2017"
//	"10 - 15 juillet 2017"
//	"3 mars - 10 avril 2017"
//	"12 mars 2016 - 24 juin 2017"
export function getPeriodDescription (fromDate, toDate) {
  if (!fromDate) {
    fromDate = '2000-01-01';
  }
  if (!toDate) {
    toDate = '2100-12-31';
  }

  var fd = getDay (fromDate);
  var fm = getDisplayedDate (fromDate, 'M');
  var fy = getDisplayedDate (fromDate, 'y');

  var td = getDay (toDate);
  var tm = getDisplayedDate (toDate, 'M');
  var ty = getDisplayedDate (toDate, 'y');

  if (fy <= '2000') {
    fy = '-∞';
  }
  if (ty >= '2100') {
    ty = '∞';
  }

  var nextDate = addDays (toDate, 1);
  if (
    getDay (fromDate) === 1 &&
    getDay (nextDate) === 1 &&
    getMonth (fromDate) === 1 &&
    getMonth (nextDate) === 1
  ) {
    //	Full years.
    fd = null;
    fm = null;
    td = null;
    tm = null;
  } else if (getDay (fromDate) === 1 && getDay (nextDate) === 1) {
    //	Full months.
    fd = null;
    td = null;
  }

  if (fd === td) {
    fd = null;
  }
  if (fm === tm) {
    fm = null;
  }
  if (fy === ty) {
    fy = null;
  }

  var fromList = [];
  var toList = [];

  if (fd !== null) {
    fromList.push (fd);
  }
  if (fm !== null) {
    fromList.push (fm);
  }
  if (fy !== null) {
    fromList.push (fy);
  }

  if (td !== null) {
    toList.push (td);
  }
  if (tm !== null) {
    toList.push (tm);
  }
  if (ty !== null) {
    toList.push (ty);
  }

  var f = join (fromList, ' ');
  var t = join (toList, ' ');

  if (f === '') {
    return toFirstUpperCase (t);
  } else {
    return toFirstUpperCase (f + ' — ' + t);
  }
}

export function getNowCanonicalDate () {
  return jsToCanonicalDate (new Date (Date.now ()));
}

export function getDate (year, month, day) {
  const d = new Date (year, month - 1, day);
  return jsToCanonicalDate (d);
}

export function getCalendarStartDate (date) {
  const jsDate = canonicalDateToJs (date);
  const dotw = new Date (
    jsDate.getFullYear (),
    jsDate.getMonth (),
    1
  ).getDay (); // 0..6 (0 = Sunday)
  const first = -((dotw + 5) % 7);
  const startDate = new Date (jsDate.getFullYear (), jsDate.getMonth (), first);
  return jsToCanonicalDate (startDate);
}
