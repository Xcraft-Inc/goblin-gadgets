import * as Converters from './converters';

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, optional)

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

// Return a recurrence of days. By example:
// lun
// mar à jeu
// mer et ven
export function getDisplayedDays (canonicalDays) {
  let result = [];
  if (canonicalDays && canonicalDays !== '*') {
    for (let c of canonicalDays) {
      if (c >= '1' && c <= '7') {
        result.push (Converters.getDOWDescription (c - 1, '3'));
      } else if (c === '-') {
        result.push ('à');
      } else if (c === ',') {
        result.push ('et');
      } else {
        result.push ('?');
      }
    }
  }
  return join (result, ' ');
}

// Return a recurrence of months. By example:
// janv
// févr à sept
// mars et juin
export function getDisplayedMonths (canonicalMonths) {
  let result = [];
  if (canonicalMonths && canonicalMonths !== '*') {
    let m = 0;
    for (let c of canonicalMonths) {
      if (c >= '0' && c <= '9') {
        m *= 10;
        m += c - '0';
      } else {
        if (m !== 0) {
          const d = Converters.getMonthDescription (m - 1, '4');
          if (d) {
            result.push (d.toLowerCase ());
          } else {
            result.push ('?');
          }
        }
        m = 0;
        if (c === '-') {
          result.push ('à');
        } else if (c === ',') {
          result.push ('et');
        } else {
          result.push ('?');
        }
      }
    }
    if (m !== 0) {
      const d = Converters.getMonthDescription (m - 1, '4');
      if (d) {
        result.push (d.toLowerCase ());
      } else {
        result.push ('?');
      }
    }
  }
  return join (result, ' ');
}

// Return a recurrence of days. By example:
// 1
// 2-4
// 3,5
export function getCanonicalDays (cron) {
  if (cron) {
    const a = cron.split (' ');
    if (a.length > 5) {
      const f = a[5];
      if (f === '*') {
        return null;
      }
      return f;
    }
  }
  return null;
}

// Return a recurrence of months. By example:
// 1
// 2-9
// 3,6
export function getCanonicalMonths (cron) {
  if (cron) {
    const a = cron.split (' ');
    if (a.length > 4) {
      const f = a[4];
      if (f === '*') {
        return null;
      }
      return f;
    }
  }
  return null;
}

// Return a full description of recurrence. By example:
// lun et jeu, mars à sept, -4, +5
export function getDisplayedCron (cron, deleteList, addList) {
  const result = [];

  const d = getDisplayedDays (getCanonicalDays (cron));
  if (d && d !== '') {
    result.push (d);
  }

  const m = getDisplayedMonths (getCanonicalMonths (cron));
  if (m && m !== '') {
    result.push (m);
  }

  if (deleteList && deleteList.length > 0) {
    result.push ('-' + deleteList.length);
  }

  if (addList && addList.length > 0) {
    result.push ('+' + addList.length);
  }

  return join (result, ', ');
}

// Return a cron expression. By example:
// 0 0 0 * * 1,4
// 0 0 0 * * 2
// 0 0 0 * 3-6 2
export function getCron (canonicalDays, canonicalMonths) {
  if (!canonicalDays || canonicalDays === '') {
    canonicalDays = '*';
  }
  if (!canonicalMonths || canonicalMonths === '') {
    canonicalMonths = '*';
  }
  return `0 0 0 * ${canonicalMonths} ${canonicalDays}`;
}
