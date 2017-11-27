import React from 'react';
import Widget from 'laboratory/widget';
import {date as DateConverters} from 'xcraft-core-converters';
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

  get startDate () {
    const month = DateConverters.getMonth (this.visibleDate);
    const year = DateConverters.getYear (this.visibleDate);
    return DateConverters.getDate (year, month, 1);
  }

  get endDate () {
    return DateConverters.addDays (
      DateConverters.addMonths (this.startDate, 1),
      -1
    );
  }

  get dates () {
    return ['2017-11-01', '2017-11-02', '2017-11-03']; //????
    if (this.props.dates) {
      return this.props.dates.toArray ();
    } else {
      return [];
    }
  }

  get addDates () {
    return ['2017-11-04', '2017-11-05', '2017-11-06']; //????
    if (this.props.addDates) {
      return this.props.addDates.toArray ();
    } else {
      return [];
    }
  }

  get subDates () {
    return ['2017-11-07', '2017-11-08', '2017-11-09']; //????
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
    const startDate = this.startDate;
    const endDate = this.endDate;
    const dates = this.dates;
    const addDates = this.addDates;
    const subDates = this.subDates;
    for (const d of dates) {
      if (d >= startDate && d <= endDate && subDates.indexOf (d) === -1) {
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
    const dates = this.dates;
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
