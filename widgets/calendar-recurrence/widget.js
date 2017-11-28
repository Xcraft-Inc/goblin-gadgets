import React from 'react';
import Widget from 'laboratory/widget';
import CronParser from 'cron-parser';
import {
  date as DateConverters,
  cron as CronConverters,
} from 'xcraft-core-converters';
import * as Bool from 'gadgets/boolean-helpers';

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
    this.onFlushAdd = this.onFlushAdd.bind (this);
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
    if (this.props.days) {
      let startDate = this.props.startDate;
      let endDate = this.props.endDate;
      if (onlyMonth) {
        startDate = this.startVisibleDate;
        endDate = this.endVisibleDate;
      }
      return CronConverters.computeCronDates (
        startDate,
        endDate,
        this.props.days
      );
    } else {
      return [];
    }
  }

  get addDates () {
    if (this.props.addDates) {
      return this.props.addDates.toArray ();
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

  onFlushAdd () {
    const x = this.props.flushAdd;
    if (x) {
      x ();
    }
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
    for (const d of dates) {
      if (d >= startDate && d <= endDate && addDates.indexOf (d) === -1) {
        array.push ({type: 'base', date: d});
      }
    }
    for (const d of addDates) {
      if (d >= startDate && d <= endDate) {
        if (dates.indexOf (d) === -1) {
          array.push ({type: 'add', date: d});
        } else {
          array.push ({type: 'sub', date: d});
        }
      }
    }
    return array;
  }

  // Return dates for right list.
  get listDates () {
    const array = [];
    const dates = this.getDates (false);
    const addDates = this.addDates;
    for (const d of dates) {
      if (addDates.indexOf (d) === -1) {
        array.push ({type: 'base', date: d});
      }
    }
    for (const d of addDates) {
      if (dates.indexOf (d) === -1) {
        array.push ({type: 'add', date: d});
      } else {
        array.push ({type: 'sub', date: d});
      }
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
          flushAdd={this.onFlushAdd}
        />
      </Container>
    );
  }
}

/******************************************************************************/
export default CalendarRecurrence;
