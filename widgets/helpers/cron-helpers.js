import CronParser from 'cron-parser';
import {date as DateConverters} from 'xcraft-core-converters';

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
        result.push (DateConverters.getDOWDescription (c - 1, '3'));
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
  if (
    canonicalMonths &&
    canonicalMonths !== '*' &&
    canonicalMonths !== '1-12'
  ) {
    let m = 0;
    for (let c of canonicalMonths) {
      if (c >= '0' && c <= '9') {
        m *= 10;
        m += c - '0';
      } else {
        if (m !== 0) {
          let d = DateConverters.getMonthDescription (m - 1, '4');
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
      let d = DateConverters.getMonthDescription (m - 1, '4');
      if (d) {
        result.push (d.toLowerCase ());
      } else {
        result.push ('?');
      }
    }
  }
  return join (result, ' ');
}

// Return a full description of recurrence. By example:
// lun et jeu, mars à sept, -4, +5
export function getDisplayedCron (days, months, deleteList, addList) {
  let result = [];

  let d = getDisplayedDays (days);
  if (d && d !== '') {
    result.push (d);
  }

  let m = getDisplayedMonths (months);
  if (m && m !== '') {
    result.push (m);
  }

  if (deleteList && deleteList.size > 0) {
    result.push ('-' + deleteList.size);
  }

  if (addList && addList.size > 0) {
    result.push ('+' + addList.size);
  }

  return join (result, ', ');
}

// Return a cron expression. By example:
// 0 0 0 * * 1,4
// 0 0 0 * * 2
// 0 0 0 * * 1-5
function getCron (canonicalDays) {
  let days = [];
  for (let d of canonicalDays.split (',')) {
    if (d === '7') {
      d = 0; // sunday
    }
    days.push (d);
  }
  canonicalDays = days.join (',');
  return `0 0 0 * * ${canonicalDays}`;
}

export function computeCronDates (startDate, endDate, days) {
  const result = [];
  if (days) {
    const cron = getCron (days);
    const options = {
      currentDate: DateConverters.canonicalToJs (
        DateConverters.addDays (startDate, -1) // -1 because first step
      ),
      endDate: DateConverters.canonicalToJs (
        DateConverters.addDays (endDate, 10) // little more (cron bug ?)
      ),
      iterator: true,
    };
    try {
      const interval = CronParser.parseExpression (cron, options);
      /* eslint no-constant-condition: 0 */
      while (true) {
        const next = interval.next ();
        if (next.done) {
          break;
        }
        const date = DateConverters.jsToCanonical (next.value);
        if (date >= startDate && date <= endDate) {
          result.push (date);
        }
      }
    } catch (e) {}
  }
  return result;
}
