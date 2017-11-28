import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

import {date as DateConverters} from 'xcraft-core-converters';

/******************************************************************************/

class Calendar extends Widget {
  constructor () {
    super (...arguments);

    this.onPrevMonth = this.onPrevMonth.bind (this);
    this.onNextMonth = this.onNextMonth.bind (this);
    this.onVisibleDateMonth = this.onVisibleDateMonth.bind (this);
    this.onVisibleDateAddMonths = this.onVisibleDateAddMonths.bind (this);
    this.onVisibleDatePrevYear = this.onVisibleDatePrevYear.bind (this);
    this.onVisibleDateNextYear = this.onVisibleDateNextYear.bind (this);
    this.onDateClicked = this.onDateClicked.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      msg: 'msg',
    };
  }

  /******************************************************************************/

  getDateType (date) {
    if (!this.props.dates || this.props.dates.length == 0) {
      return null;
    } else if (typeof this.props.dates[0] === 'string') {
      return this.props.dates.indexOf (date) === -1 ? null : 'base';
    } else {
      for (const d of this.props.dates) {
        if (d.date === date) {
          return d.type;
        }
      }
      return null;
    }
  }

  get startVisibleDate () {
    const month = DateConverters.getMonth (this.props.visibleDate);
    const year = DateConverters.getYear (this.props.visibleDate);
    return DateConverters.getDate (year, month, 1);
  }

  get endVisibleDate () {
    return DateConverters.addDays (
      DateConverters.addMonths (this.startVisibleDate, 1),
      -1
    );
  }

  get monthCount () {
    const monthCount = this.props.monthCount;
    return monthCount ? parseInt (monthCount) : 1;
  }

  getDOW3Letters (dow) {
    return DateConverters.getDOWDescription (dow).substring (0, 3);
  }

  changeDate (date) {
    var x = this.props.visibleDateChanged;
    if (x) {
      x (date);
    }
  }

  // Called when the '<' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onPrevMonth () {
    const newDate = DateConverters.addMonths (this.props.visibleDate, -1);
    this.changeDate (newDate);
  }

  // Called when the '>' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onNextMonth () {
    const newDate = DateConverters.addMonths (this.props.visibleDate, 1);
    this.changeDate (newDate);
  }

  onVisibleDateNow () {
    const now = DateConverters.getNowCanonical ();
    const year = DateConverters.getYear (now);
    const month = DateConverters.getMonth (now);
    const date = DateConverters.getDate (year, month, 1);
    this.changeDate (date);
  }

  onVisibleDateMonth (month) {
    const s = DateConverters.split (this.props.visibleDate);
    const date = DateConverters.getDate (s.year, month, 1);
    this.changeDate (date);
  }

  onVisibleDateAddMonths (months) {
    const date = DateConverters.addMonths (this.props.visibleDate, months);
    this.changeDate (date);
  }

  onVisibleDatePrevYear () {
    const s = DateConverters.split (this.props.visibleDate);
    const year = s.month === 1 ? s.year - 1 : s.year;
    const date = DateConverters.getDate (year, 1, 1);
    this.changeDate (date);
  }

  onVisibleDateNextYear () {
    const s = DateConverters.split (this.props.visibleDate);
    const date = DateConverters.getDate (s.year + 1, 1, 1);
    this.changeDate (date);
  }

  onDateClicked (date) {
    if (date >= this.startVisibleDate && date <= this.endVisibleDate) {
      const x = this.props.dateClicked;
      if (x) {
        x (date);
      }
    }
  }

  /******************************************************************************/

  // Return the html for a [1]..[31] button.
  renderButton (date, active, dimmed, weekend, subkind, index) {
    const tooltip = DateConverters.getDisplayed (date, 'Wdmy');
    let d = DateConverters.getDay (date); // 1..31
    if (subkind === 'sub') {
      d = '(' + d + ')';
    }
    return (
      <Button
        key={index}
        text={d}
        tooltip={tooltip}
        kind="calendar"
        subkind={subkind}
        active={active}
        calendarDimmed={dimmed}
        calendarWeekend={weekend}
        onClick={() => this.onDateClicked (date)}
      />
    );
  }

  // Return an array of 7 buttons, for a week.
  renderButtons (firstDate) {
    const line = [];
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    let i = 0;
    for (i = 0; i < 7; ++i) {
      // monday..sunday
      let active = 'false';
      let dimmed = 'false';
      let weekend = 'false';
      let subkind = null;
      const type = this.getDateType (firstDate);
      if (type) {
        active = 'true';
        subkind = type;
      }
      if (
        DateConverters.getYear (firstDate) !==
          DateConverters.getYear (this.props.visibleDate) ||
        DateConverters.getMonth (firstDate) !==
          DateConverters.getMonth (this.props.visibleDate)
      ) {
        dimmed = 'true';
      }
      if (firstDate < startDate || firstDate > endDate) {
        dimmed = 'true';
      }
      if (i >= 5) {
        // saturday or sunday ?
        weekend = 'true';
      }

      const button = this.renderButton (
        firstDate,
        active,
        dimmed,
        weekend,
        subkind,
        i
      );
      line.push (button);
      firstDate = DateConverters.addDays (firstDate, 1);
    }
    return line;
  }

  // Return the html for a line of 7 buttons (for a week).
  renderLineOfButtons (firstDate, index) {
    const lineClass = this.styles.classNames.line;
    return (
      <div className={lineClass} key={index}>
        {this.renderButtons (firstDate)}
      </div>
    );
  }

  renderPrevMonthButton (showing) {
    if (showing) {
      return (
        <Button
          glyph="chevron-left"
          kind="calendar-navigator"
          key="prevMonth"
          onClick={this.onPrevMonth}
        />
      );
    } else {
      return null;
    }
  }

  renderNextMonthButton (showing) {
    if (showing) {
      return (
        <Button
          glyph="chevron-right"
          kind="calendar-navigator"
          key="nextMonth"
          onClick={this.onNextMonth}
        />
      );
    } else {
      return null;
    }
  }

  // Return the html for the header, with 2 buttons next/prevMonth and the title.
  // By example: '<' mai 2016 '>'
  renderHeader (header, firstMonth, lastMonth) {
    const headerClass = this.styles.classNames.header;
    const textClass = this.styles.classNames.headerText;
    return (
      <div className={headerClass} key="header">
        {this.renderPrevMonthButton (firstMonth)}
        <div className={textClass}>
          {header}
        </div>
        {this.renderNextMonthButton (lastMonth)}
      </div>
    );
  }

  // Return the html for a [lun]..[dim] labels.
  renderDOW (text, index) {
    const textClass = this.styles.classNames.dowText;
    return (
      <div className={textClass} key={index}>
        {text}
      </div>
    );
  }

  // Return an array of 7 days of week.
  renderDOWs () {
    const line = [];
    let i = 0;
    for (i = 0; i < 7; ++i) {
      const dow = this.getDOW3Letters (i);
      line.push (this.renderDOW (dow, i));
    }
    return line;
  }

  // Return the html for the 7 days of week header.
  renderLineOfDOWs () {
    const dowClass = this.styles.classNames.dowLine;
    return (
      <div className={dowClass} key="dows">
        {this.renderDOWs ()}
      </div>
    );
  }

  // Return an array of lines, with header then week's lines.
  // The array must have from 4 to 6 lines.
  renderColumnOfLines (header, firstDate, firstMonth, lastMonth) {
    const column = [];
    column.push (this.renderHeader (header, firstMonth, lastMonth));
    column.push (this.renderLineOfDOWs ());
    for (let i = 0; i < 6; ++i) {
      const line = this.renderLineOfButtons (firstDate, i);
      column.push (line);
      firstDate = DateConverters.addDays (firstDate, 7);
    }
    return column;
  }

  // Retourne all the html content of the calendar.
  renderLines (firstMonth, lastMonth) {
    const firstDate = DateConverters.getCalendarStartDate (
      this.props.visibleDate
    );
    const header = DateConverters.getDisplayed (this.props.visibleDate, 'My'); // 'mai 2016' by example

    const columnClass = this.styles.classNames.column;
    return (
      <div className={columnClass}>
        {this.renderColumnOfLines (header, firstDate, firstMonth, lastMonth)}
      </div>
    );
  }

  renderMonth (firstMonth, lastMonth, index) {
    const monthClass = lastMonth
      ? this.styles.classNames.singleMonth
      : this.styles.classNames.month;
    return (
      <div className={monthClass} key={index}>
        {this.renderLines (firstMonth, lastMonth)}
      </div>
    );
  }

  renderMonths () {
    const result = [];
    const monthCount = this.monthCount;
    for (var m = 0; m < monthCount; m++) {
      const year = DateConverters.getYear (this.props.visibleDate);
      const month = DateConverters.getMonth (this.props.visibleDate);
      const date = DateConverters.getDate (year, month + m, 1);

      const firstMonth = m === 0;
      const lastMonth = m === monthCount - 1;
      result.push (this.renderMonth (date, firstMonth, lastMonth, m));
    }
    return result;
  }

  renderQuickMonth (month, visibleMonth) {
    const firstVisibleMonth = visibleMonth;
    const lastVisibleMonth = visibleMonth + this.monthCount;
    const active = month >= firstVisibleMonth && month < lastVisibleMonth;
    return (
      <Button
        text={DateConverters.getMonthDescription (
          month - 1,
          '1'
        ).toUpperCase ()}
        tooltip={DateConverters.getMonthDescription (month - 1)}
        kind="calendar-navigator"
        grow="1"
        onClick={() => this.onVisibleDateMonth (month)}
        active={Bool.toString (active)}
        spacing="tiny"
      />
    );
  }

  renderLineOfMonths (month, visibleMonth) {
    const doubleClass = this.styles.classNames.double;
    return (
      <div className={doubleClass} key={month}>
        {this.renderQuickMonth (month + 0, visibleMonth)}
        {this.renderQuickMonth (month + 1, visibleMonth)}
        {this.renderQuickMonth (month + 2, visibleMonth)}
        {this.renderQuickMonth (month + 3, visibleMonth)}
      </div>
    );
  }

  renderMonthsOfYear () {
    const result = [];
    const visibleMonth = DateConverters.split (this.props.visibleDate).month;
    for (let month = 1; month <= 12; month += 4) {
      result.push (this.renderLineOfMonths (month, visibleMonth));
    }
    return result;
  }

  renderPrevNext (title, leftGlyph, rightGlyph, leftAction, rightAction) {
    const doubleClass = this.styles.classNames.double;
    return (
      <div className={doubleClass}>
        <Button
          glyph={leftGlyph}
          kind="calendar-navigator"
          onClick={leftAction}
        />
        <Label text={title} grow="1" justify="center" />
        <Button
          glyph={rightGlyph}
          kind="calendar-navigator"
          onClick={rightAction}
        />
      </div>
    );
  }

  renderNavigatorMonths () {
    const monthCount = this.monthCount;
    if (monthCount > 1) {
      return this.renderPrevNext (
        `${monthCount} mois`,
        'chevron-left',
        'chevron-right',
        () => this.onVisibleDateAddMonths (-monthCount),
        () => this.onVisibleDateAddMonths (monthCount)
      );
    } else {
      return null;
    }
  }

  renderNavigator () {
    const navigator = this.props.navigator;
    if (navigator === 'standard') {
      const navClass = this.styles.classNames.navigator;
      return (
        <div className={navClass}>
          {this.renderNavigatorMonths ()}
          <Separator kind="space" height="20px" />
          {this.renderMonthsOfYear ()}
          <Separator kind="space" height="20px" />
          {this.renderPrevNext (
            'année',
            'step-backward',
            'step-forward',
            this.onVisibleDatePrevYear,
            this.onVisibleDateNextYear
          )}
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    if (!this.props.visibleDate) {
      return null;
    }

    const boxClass = this.styles.classNames.box;
    return (
      <div className={boxClass}>
        {this.renderMonths ()}
        {this.renderNavigator ()}
      </div>
    );
  }
}

/******************************************************************************/
export default Calendar;
