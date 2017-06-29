import React from 'react';
import Widget from 'laboratory/widget';
import * as Converters from '../helpers/converters';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class Calendar extends Widget {
  constructor (props) {
    super (props);
  }

  static get wiring () {
    return {
      id: 'id',
      msg: 'msg',
    };
  }

  componentWillMount () {
    // At first time, initialize internalState.visibleDate with current date.
    var date = this.props['visible-date'];
    if (!date) {
      const now = Converters.getNowCanonicalDate ();
      const year = Converters.getYear (now);
      const month = Converters.getMonth (now);
      date = Converters.getDate (year, month, 1);
    }
    this.visibleDate = date;
  }

  /******************************************************************************/

  get monthCount () {
    const monthCount = this.props['month-count'];
    return monthCount ? parseInt (monthCount) : 1;
  }

  getDOW3Letters (dow) {
    return Converters.getDOWDescription (dow).substring (0, 3);
  }

  changeDate (date) {
    this.visibleDate = date;
    this.forceUpdate ();
    var x = this.props['visible-date-changed'];
    if (x) {
      x (date);
    }
  }

  // Called when the '<' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onPrevMonth () {
    const visibleDate = this.visibleDate;
    this.forceUpdate ();
    const newDate = Converters.addMonths (visibleDate, -1);
    this.changeDate (newDate);
  }

  // Called when the '>' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onNextMonth () {
    const visibleDate = this.visibleDate;
    this.forceUpdate ();
    const newDate = Converters.addMonths (visibleDate, 1);
    this.changeDate (newDate);
  }

  onVisibleDateNow () {
    const now = Converters.getNowCanonicalDate ();
    const year = Converters.getYear (now);
    const month = Converters.getMonth (now);
    const date = Converters.getDate (year, month, 1);
    this.changeDate (date);
  }

  onVisibleDateMonth (month) {
    const s = Converters.splitDate (this.visibleDate);
    const date = Converters.getDate (s.year, month, 1);
    this.changeDate (date);
  }

  onVisibleDateAddMonths (months) {
    const date = Converters.addMonths (this.visibleDate, months);
    this.changeDate (date);
  }

  onVisibleDatePrevYear () {
    const s = Converters.splitDate (this.visibleDate);
    const year = s.month === 1 ? s.year - 1 : s.year;
    const date = Converters.getDate (year, 1, 1);
    this.changeDate (date);
  }

  onVisibleDateNextYear () {
    const s = Converters.splitDate (this.visibleDate);
    const date = Converters.getDate (s.year + 1, 1, 1);
    this.changeDate (date);
  }

  // Called when a [1]..[31] button is clicked.
  setDate (date) {
    const {state} = this.props;
    state.set ('date', date);

    if (this.props.onChange) {
      this.props.onChange (date);
    }
  }

  onDateClicked (date) {
    const startDate = this.props['start-date'];
    const endDate = this.props['end-date'];
    if ((!startDate || date >= startDate) && (!endDate || date <= endDate)) {
      const x = this.props['date-clicked'];
      if (x) {
        x (date);
      }
    }
  }

  /******************************************************************************/

  // Return the html for a [1]..[31] button.
  renderButton (date, active, dimmed, weekend, index) {
    const tooltip = Converters.getDisplayedDate (date, 'Wdmy');
    return (
      <Button
        key={index}
        text={Converters.getDay (date)} // 1..31
        tooltip={tooltip}
        kind="calendar"
        active={active}
        dimmed={dimmed}
        weekend={weekend}
        onClick={() => this.onDateClicked (date)}
      />
    );
  }

  // Return an array of 7 buttons, for a week.
  renderButtons (firstDate, visibleDate, selectedDate, selectedDates) {
    let line = [];
    const startDate = this.props['start-date'];
    const endDate = this.props['end-date'];
    let i = 0;
    for (i = 0; i < 7; ++i) {
      // monday..sunday
      let active = 'false';
      let dimmed = 'false';
      let weekend = 'false';
      if (
        firstDate === selectedDate ||
        (selectedDates && selectedDates.indexOf (firstDate) !== -1)
      ) {
        active = 'true';
      }
      if (
        Converters.getYear (firstDate) !== Converters.getYear (visibleDate) ||
        Converters.getMonth (firstDate) !== Converters.getMonth (visibleDate)
      ) {
        dimmed = 'true';
      }
      if (
        (startDate && firstDate < startDate) ||
        (endDate && firstDate > endDate)
      ) {
        dimmed = 'true';
      }
      if (i >= 5) {
        // saturday or sunday ?
        weekend = 'true';
      }

      const button = this.renderButton (firstDate, active, dimmed, weekend, i);
      line.push (button);
      firstDate = Converters.addDays (firstDate, 1);
    }
    return line;
  }

  // Return the html for a line of 7 buttons (for a week).
  renderLineOfButtons (
    firstDate,
    visibleDate,
    selectedDate,
    selectedDates,
    index
  ) {
    const lineClass = this.styles.classNames.line;
    return (
      <div className={lineClass} key={index}>
        {this.renderButtons (
          firstDate,
          visibleDate,
          selectedDate,
          selectedDates
        )}
      </div>
    );
  }

  renderPrevMonthButton (showing) {
    if (showing) {
      return (
        <Button
          glyph="chevron-left"
          kind="calendar-navigation"
          key="prevMonth"
          onClick={::this.onPrevMonth}
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
          kind="calendar-navigation"
          key="nextMonth"
          onClick={::this.onNextMonth}
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
    let line = [];
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
  renderColumnOfLines (
    header,
    firstDate,
    visibleDate,
    selectedDate,
    selectedDates,
    firstMonth,
    lastMonth
  ) {
    let column = [];
    column.push (this.renderHeader (header, firstMonth, lastMonth));
    column.push (this.renderLineOfDOWs ());
    for (let i = 0; i < 6; ++i) {
      const line = this.renderLineOfButtons (
        firstDate,
        visibleDate,
        selectedDate,
        selectedDates,
        i
      );
      column.push (line);
      firstDate = Converters.addDays (firstDate, 7);
    }
    return column;
  }

  // Retourne all the html content of the calendar.
  renderLines (
    selectedDate,
    selectedDates,
    visibleDate,
    firstMonth,
    lastMonth
  ) {
    const firstDate = Converters.getCalendarStartDate (visibleDate);
    const header = Converters.getDisplayedDate (visibleDate, 'My'); // 'mai 2016' by example

    const columnClass = this.styles.classNames.column;
    return (
      <div className={columnClass}>
        {this.renderColumnOfLines (
          header,
          firstDate,
          visibleDate,
          selectedDate,
          selectedDates,
          firstMonth,
          lastMonth
        )}
      </div>
    );
  }

  renderMonth (
    selectedDate,
    selectedDates,
    visibleDate,
    firstMonth,
    lastMonth,
    index
  ) {
    const monthClass = lastMonth
      ? this.styles.classNames.singleMonth
      : this.styles.classNames.month;
    return (
      <div className={monthClass} key={index}>
        {this.renderLines (
          selectedDate,
          selectedDates,
          visibleDate,
          firstMonth,
          lastMonth
        )}
      </div>
    );
  }

  renderMonths () {
    const selectedDate = this.props.date;
    const selectedDates = this.props.dates;

    const visibleDate = this.visibleDate;
    if (!visibleDate) {
      return null;
    }

    const result = [];
    const monthCount = this.monthCount;
    for (var m = 0; m < monthCount; m++) {
      const year = Converters.getYear (visibleDate);
      const month = Converters.getMonth (visibleDate);
      const date = Converters.getDate (year, month + m, 1);

      const firstMonth = m === 0;
      const lastMonth = m === monthCount - 1;
      result.push (
        this.renderMonth (
          selectedDate,
          selectedDates,
          date,
          firstMonth,
          lastMonth,
          m
        )
      );
    }
    return result;
  }

  renderQuickMonth (month, visibleMonth) {
    const firstVisibleMonth = visibleMonth;
    const lastVisibleMonth = visibleMonth + this.monthCount;
    const active = month >= firstVisibleMonth && month < lastVisibleMonth;
    return (
      <Button
        text={Converters.getMonthDescription (month - 1, '1').toUpperCase ()}
        tooltip={Converters.getMonthDescription (month - 1)}
        border="none"
        text-color="none"
        grow="1"
        onClick={() => ::this.onVisibleDateMonth (month)}
        active={active ? 'true' : 'false'}
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
    const visibleMonth = Converters.splitDate (this.visibleDate).month;
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
          border="none"
          glyph-color="none"
          onClick={leftAction}
        />
        <Label text={title} grow="1" justify="center" />
        <Button
          glyph={rightGlyph}
          border="none"
          glyph-color="none"
          onClick={rightAction}
        />
      </div>
    );
  }

  renderNavigator () {
    const navigator = this.props.navigator;
    if (navigator === 'standard') {
      const navClass = this.styles.classNames.navigator;
      return (
        <div className={navClass}>
          {this.renderPrevNext (
            '2 mois',
            'chevron-left',
            'chevron-right',
            () => ::this.onVisibleDateAddMonths (-2),
            () => ::this.onVisibleDateAddMonths (2)
          )}
          <Separator kind="space" height="20px" />
          {this.renderMonthsOfYear ()}
          <Separator kind="space" height="20px" />
          {this.renderPrevNext (
            'année',
            'step-backward',
            'step-forward',
            ::this.onVisibleDatePrevYear,
            ::this.onVisibleDateNextYear
          )}
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
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
