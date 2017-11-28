import React from 'react';
import Widget from 'laboratory/widget';
import CronParser from 'cron-parser';
import {date as DateConverters} from 'xcraft-core-converters';
import * as Bool from 'gadgets/boolean-helpers';
import * as CronHelpers from '../helpers/cron-helpers';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Calendar from 'gadgets/calendar/widget';
import CalendarList from 'gadgets/calendar-list/widget';

/******************************************************************************/

class CalendarRecurrence extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      visibleDate: DateConverters.getNowCanonical (),
    };

    this.onDateClicked = this.onDateClicked.bind (this);
    this.onVisibleDateChanged = this.onVisibleDateChanged.bind (this);
  }

  //#region get/set
  get visibleDate () {
    return this.state.visibleDate;
  }

  set visibleDate (value) {
    this.setState ({
      visibleDate: value,
    });
  }
  //#endregion

  get startVisibleDate () {
    const month = DateConverters.getMonth (this.visibleDate);
    const year = DateConverters.getYear (this.visibleDate);
    return DateConverters.getDate (year, month, 1);
  }

  get endVisibleDate () {
    return DateConverters.addDays (
      DateConverters.addMonths (this.startVisibleDate, 1),
      -1
    );
  }

  getDates (onlyMonth) {
    const result = [];
    if (this.props.days) {
      const cron = CronHelpers.getCron (this.props.days);
      let startDate = this.props.startDate;
      let endDate = this.props.endDate;
      if (onlyMonth) {
        startDate = this.startVisibleDate;
        endDate = this.endVisibleDate;
      }
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

  get addDates () {
    if (this.props.addDates) {
      return this.props.addDates.toArray ();
    } else {
      return [];
    }
  }

  get subDates () {
    if (this.props.subDates) {
      return this.props.subDates.toArray ();
    } else {
      return [];
    }
  }

  //#region handlers
  onDateClicked (date) {
    const x = this.props.dateClicked;
    if (x) {
      x (date);
    }
  }

  onVisibleDateChanged (date) {
    this.visibleDate = date;
  }
  //#endregion

  // Return dates for left calendar.
  // Filter dates to current month.
  get calendarDates () {
    const array = [];
    const startDate = this.startVisibleDate;
    const endDate = this.endVisibleDate;
    const dates = this.getDates (true);
    const addDates = this.addDates;
    const subDates = this.subDates;
    for (const d of dates) {
      if (
        d >= startDate &&
        d <= endDate &&
        addDates.indexOf (d) === -1 &&
        subDates.indexOf (d) === -1
      ) {
        array.push ({type: 'base', date: d});
      }
    }
    for (const d of addDates) {
      if (d >= startDate && d <= endDate) {
        array.push ({type: 'add', date: d});
      }
    }
    for (const d of subDates) {
      if (d >= startDate && d <= endDate) {
        array.push ({type: 'sub', date: d});
      }
    }
    return array;
  }

  // Return dates for right list.
  get listDates () {
    const array = [];
    const dates = this.getDates (false);
    const addDates = this.addDates;
    const subDates = this.subDates;
    for (const d of dates) {
      if (subDates.indexOf (d) === -1) {
        array.push ({type: 'base', date: d});
      }
    }
    for (const d of addDates) {
      array.push ({type: 'add', date: d});
    }
    for (const d of subDates) {
      array.push ({type: 'sub', date: d});
    }
    return array;
  }

  render () {
    return (
      <Container kind="row">
        <Calendar
          monthCount="1"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          visibleDate={this.visibleDate}
          dates={this.calendarDates}
          dateClicked={this.onDateClicked}
          visibleDateChanged={this.onVisibleDateChanged}
        />
        <CalendarList
          dates={this.listDates}
          dateClicked={this.onVisibleDateChanged}
        />
      </Container>
    );
  }
}

/******************************************************************************/
export default CalendarRecurrence;
