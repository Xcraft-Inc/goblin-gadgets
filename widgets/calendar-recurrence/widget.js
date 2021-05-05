//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {date as DateConverters} from 'xcraft-core-converters';
import {CronHelpers} from 'goblin-toolbox';
import Container from 'goblin-gadgets/widgets/container/widget';
import Calendar from 'goblin-gadgets/widgets/calendar/widget';
import CalendarList from 'goblin-gadgets/widgets/calendar-list/widget';

/******************************************************************************/

const getCronDates = (props) => {
  const from = props.startDate || DateConverters.getNowCanonical();
  return CronHelpers.computeCronDates(
    from,
    DateConverters.addMonths(DateConverters.getNowCanonical(), 24),
    props.days
  );
};

//Build a cache of checked days for 24 month;
//This is only for displaying stuff
/*const memo = (func) => {
  let cache = {};
  return function (props) {
    const cacheKey = `${props.startDate || ''}|${props.days}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    } else {
      let result = func(props);
      cache[cacheKey] = result;
      return result;
    }
  };
};*/
const rememberDates = getCronDates; //memo(getCronDates);

class CalendarRecurrence extends Widget {
  constructor() {
    super(...arguments);

    let now = DateConverters.getNowCanonical();
    if (now < this.props.startDate) {
      now = this.props.startDate;
    }
    if (now > this.props.endDate) {
      now = this.props.endDate;
    }

    this.state = {
      visibleDate: DateConverters.moveAtBeginningOfMonth(now),
    };

    this.onDateClicked = this.onDateClicked.bind(this);
    this.onVisibleDateChanged = this.onVisibleDateChanged.bind(this);
    this.onFlushAdd = this.onFlushAdd.bind(this);
  }

  //#region get/set
  get visibleDate() {
    return this.state.visibleDate;
  }

  set visibleDate(value) {
    this.setState({
      visibleDate: value,
    });
  }
  //#endregion

  get addDates() {
    if (this.props.addDates) {
      return this.props.addDates.valueSeq().toArray();
    } else {
      return [];
    }
  }

  //#region handlers
  onDateClicked(date) {
    const x = this.props.dateClicked;
    if (x) {
      x(date);
    }
  }

  onVisibleDateChanged(date) {
    this.visibleDate = DateConverters.moveAtBeginningOfMonth(date);
  }

  onFlushAdd() {
    const x = this.props.flushAdd;
    if (x) {
      x();
    }
  }
  //#endregion

  // Return dates for left calendar.
  // Filter dates to current month.
  get calendarDates() {
    const array = [];
    const startDate = DateConverters.moveAtBeginningOfMonth(this.visibleDate);
    const endDate = DateConverters.moveAtEndingOfMonth(this.visibleDate);
    const addDates = this.addDates;
    const cronDates = rememberDates(this.props);
    const datesOfMonth = [];
    for (const d of cronDates) {
      if (d >= startDate && d <= endDate) {
        datesOfMonth.push(d);
        if (addDates.indexOf(d) === -1) {
          array.push({type: 'base', date: d});
        }
      }
    }
    for (const d of addDates) {
      if (d >= startDate && d <= endDate) {
        if (datesOfMonth.indexOf(d) === -1) {
          array.push({type: 'add', date: d});
        } else {
          array.push({type: 'sub', date: d});
        }
      }
    }
    return array;
  }

  // Return dates for right list.
  get listDates() {
    const array = [];
    const addDates = this.addDates;
    const cronDates = rememberDates(this.props);
    for (const d of cronDates) {
      if (d >= this.props.startDate) {
        if (this.props.endDate && d > this.props.endDate) {
          continue;
        }
        if (addDates.indexOf(d) === -1) {
          array.push({type: 'base', date: d});
        }
      }
    }
    for (const d of addDates) {
      if (cronDates.indexOf(d) === -1) {
        array.push({type: 'add', date: d});
      } else {
        array.push({type: 'sub', date: d});
      }
    }
    return array;
  }

  render() {
    return (
      <Container kind="row">
        <Calendar
          monthCount={1}
          startDate={this.props.startDate || DateConverters.getNowCanonical()}
          endDate={
            this.props.endDate ||
            DateConverters.addMonths(DateConverters.getNowCanonical(), 24)
          }
          visibleDate={this.visibleDate}
          dates={this.calendarDates}
          readonly={this.props.readonly}
          dateClicked={this.onDateClicked}
          visibleDateChanged={this.onVisibleDateChanged}
        />
        <CalendarList
          dates={this.listDates}
          readonly={this.props.readonly}
          dateClicked={this.onVisibleDateChanged}
          flushAdd={this.onFlushAdd}
        />
      </Container>
    );
  }
}

/******************************************************************************/

export default CalendarRecurrence;
