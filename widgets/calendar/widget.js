import T from 't';
import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import KeyTrap from 'goblin-gadgets/widgets/key-trap.js';

import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import CalendarButton from 'goblin-gadgets/widgets/calendar-button/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import ComboContainer from 'goblin-gadgets/widgets/combo-container/widget';
import FlatList from 'goblin-gadgets/widgets/flat-list/widget';
import Tips from 'goblin-gadgets/widgets/tips/widget';

import {
  date as DateConverters,
  month as MonthConverters,
  dow as DowConverters,
} from 'xcraft-core-converters';
import * as styles from './styles';

/******************************************************************************/

class Calendar extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      showComboMonths: false,
      showComboYears: false,
      visibleDate: null,
    };

    this.setRefMonths = this.setRefMonths.bind(this);
    this.setRefYears = this.setRefYears.bind(this);
    this.onPrevMonth = this.onPrevMonth.bind(this);
    this.onNextMonth = this.onNextMonth.bind(this);
    this.onOpenComboMonths = this.onOpenComboMonths.bind(this);
    this.onOpenComboYears = this.onOpenComboYears.bind(this);
    this.onCloseComboMonths = this.onCloseComboMonths.bind(this);
    this.onCloseComboYears = this.onCloseComboYears.bind(this);
    this.onComboMonthsClicked = this.onComboMonthsClicked.bind(this);
    this.onComboYearsClicked = this.onComboYearsClicked.bind(this);
    this.onVisibleDateMonth = this.onVisibleDateMonth.bind(this);
    this.onVisibleDateAddMonths = this.onVisibleDateAddMonths.bind(this);
    this.onVisibleDatePrevYear = this.onVisibleDatePrevYear.bind(this);
    this.onVisibleDateNextYear = this.onVisibleDateNextYear.bind(this);
    this.onDateClicked = this.onDateClicked.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  //#region get/set
  get showComboMonths() {
    return this.state.showComboMonths;
  }

  set showComboMonths(value) {
    this.setState({
      showComboMonths: value,
    });
  }

  get showComboYears() {
    return this.state.showComboYears;
  }

  set showComboYears(value) {
    this.setState({
      showComboYears: value,
    });
  }

  get visibleDate() {
    return this.state.visibleDate || this.props.visibleDate;
  }

  set visibleDate(value) {
    this.setState({
      visibleDate: value,
    });
  }
  //#endregion

  static get wiring() {
    return {
      id: 'id',
      msg: 'msg',
    };
  }

  /******************************************************************************/

  UNSAFE_componentWillMount() {
    if (this.props.onEscKey) {
      KeyTrap.bind('Escape', this.onEscKey);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.props.onEscKey) {
      KeyTrap.unbind('Escape', this.onEscKey);
    }
  }

  /******************************************************************************/

  setRefMonths(node) {
    this.nodeMonths = node;
  }

  setRefYears(node) {
    this.nodeYears = node;
  }

  onComboMonthsClicked(item) {
    this.onCloseComboMonths();
    this.changeDate(item.id);
    //? this.dateClicked(item.id);
  }

  onComboYearsClicked(item) {
    this.onCloseComboYears();
    this.changeDate(item.id);
    //? this.dateClicked(item.id);
  }

  get comboMonthsList() {
    const list = [];
    const year = DateConverters.getYear(this.visibleDate);
    const day = DateConverters.getDay(this.visibleDate);
    const isLast =
      this.visibleDate === DateConverters.moveAtEndingOfMonth(this.visibleDate);
    for (let month = 1; month <= 12; month++) {
      const date = DateConverters.getDate(year, month, isLast ? 31 : day, true);
      list.push({
        id: date,
        text: DateConverters.getDisplayed(date, 'M'),
        isLast,
      });
    }
    return list;
  }

  get comboYearsList() {
    const list = [];
    const nowRank = DateConverters.getYear(this.visibleDate);
    const month = DateConverters.getMonth(this.visibleDate);
    const day = DateConverters.getDay(this.visibleDate);
    const startCount = Math.max(
      this.props.startDate
        ? DateConverters.getYear(this.props.startDate) - nowRank
        : -999,
      -10
    );
    const endCount = Math.min(
      this.props.endDate
        ? DateConverters.getYear(this.props.endDate) - nowRank
        : 999,
      10
    );
    for (let i = startCount; i <= endCount; i++) {
      const date = DateConverters.getDate(nowRank + i, month, day, true);
      list.push({
        id: date,
        text: DateConverters.getDisplayed(date, 'y'),
      });
    }
    return list;
  }

  getDateData(date) {
    if (!this.props.dates || this.props.dates.length === 0) {
      return null;
    } else if (typeof this.props.dates[0] === 'string') {
      return this.props.dates.indexOf(date) === -1 ? null : {type: 'base'};
    } else if (Array.isArray(this.props.dates)) {
      for (const d of this.props.dates) {
        if (d.date === date) {
          return d;
        }
      }
      return null;
    } else {
      return this.props.dates[date];
    }
  }

  getBadgeValue(date) {
    if (!this.props.badges || this.props.badges.length === 0) {
      return 0;
    } else {
      for (const badge of this.props.badges) {
        if (badge.date === date) {
          return badge.value;
        }
      }
      return 0;
    }
  }

  getBadgeColor(date) {
    if (!this.props.badges || this.props.badges.length === 0) {
      return null;
    } else {
      for (const badge of this.props.badges) {
        if (badge.date === date) {
          return badge.color;
        }
      }
      return null;
    }
  }

  get startVisibleDate() {
    const month = DateConverters.getMonth(this.visibleDate);
    const year = DateConverters.getYear(this.visibleDate);
    return DateConverters.getDate(year, month, 1);
  }

  get endVisibleDate() {
    return DateConverters.addDays(
      DateConverters.addMonths(this.startVisibleDate, this.monthCount),
      -1
    );
  }

  get monthCount() {
    const monthCount = this.props.monthCount;
    return monthCount ? Math.min(parseInt(monthCount), 12) : 1;
  }

  getDOW3Letters(dow) {
    return DowConverters.getDisplayed(dow, 'short');
  }

  changeDate(date) {
    this.visibleDate = date;

    const x = this.props.visibleDateChanged;
    if (x) {
      x(date);
    }
  }

  get startDate() {
    if (this.props.startDate) {
      return this.props.startDate;
    } else {
      return '1900-01-01';
    }
  }

  get endDate() {
    if (this.props.endDate) {
      return this.props.endDate;
    } else {
      return '9999-12-31';
    }
  }

  // Called when the '<' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onPrevMonth() {
    const newDate = DateConverters.addMonths(this.visibleDate, -1);
    this.changeDate(newDate);
  }

  // Called when the '>' button is clicked.
  // Modify internalState.visibleDate (fix visible year and month).
  onNextMonth() {
    const newDate = DateConverters.addMonths(this.visibleDate, 1);
    this.changeDate(newDate);
  }

  onOpenComboMonths() {
    this.showComboMonths = true;
  }

  onOpenComboYears() {
    this.showComboYears = true;
  }

  onCloseComboMonths() {
    this.showComboMonths = false;
  }

  onCloseComboYears() {
    this.showComboYears = false;
  }

  onVisibleDateNow() {
    const now = DateConverters.getNowCanonical();
    const year = DateConverters.getYear(now);
    const month = DateConverters.getMonth(now);
    const date = DateConverters.getDate(year, month, 1);
    this.changeDate(date);
  }

  onVisibleDateMonth(month) {
    const s = DateConverters.split(this.visibleDate);
    const date = DateConverters.getDate(s.year, month, 1);
    this.changeDate(date);
  }

  onVisibleDateAddMonths(months) {
    const date = DateConverters.addMonths(this.visibleDate, months);
    this.changeDate(date);
  }

  onVisibleDatePrevYear() {
    const s = DateConverters.split(this.visibleDate);
    const year = s.month === 1 ? s.year - 1 : s.year;
    const date = DateConverters.getDate(year, 1, 1);
    this.changeDate(date);
  }

  onVisibleDateNextYear() {
    const s = DateConverters.split(this.visibleDate);
    const date = DateConverters.getDate(s.year + 1, 1, 1);
    this.changeDate(date);
  }

  onDateClicked(date) {
    if (
      date >= this.startVisibleDate &&
      date <= this.endVisibleDate &&
      date >= this.startDate &&
      date <= this.endDate &&
      !this.props.readonly
    ) {
      this.dateClicked(date);
    }
  }

  dateClicked(date) {
    const x = this.props.dateClicked;
    if (x) {
      x(date);
    }
  }

  onEscKey() {
    if (this.props.onEscKey) {
      this.props.onEscKey();
    }
  }

  handleWheel(e) {
    const inc = e.deltaY < 0 ? -1 : 1;
    const newDate = DateConverters.addMonths(this.visibleDate, inc);
    this.changeDate(newDate);
  }

  /******************************************************************************/

  // Return the html for a [1]..[31] button.
  renderButton(
    date,
    active,
    selected,
    dimmed,
    hidden,
    weekend,
    subkind,
    badgeValue,
    badgeColor,
    data,
    index
  ) {
    if (hidden) {
      return <div key={index} className={this.styles.classNames.button} />;
    }

    const tooltip = DateConverters.getDisplayed(date, 'Wdmy');
    let d = DateConverters.getDay(date); // 1..31

    const style =
      weekend && !dimmed
        ? this.styles.classNames.buttonWeekend
        : this.styles.classNames.button;

    if (this.props.itemComponent) {
      const Component = this.props.itemComponent;
      return (
        <div key={index} className={style}>
          <Component
            width={this.props.itemWidth}
            height={this.props.itemHeight}
            text={d}
            tooltip={tooltip}
            dimmed={dimmed}
            selected={selected}
            hover={this.props.hoverDates ? this.props.hoverDates[date] : null}
            date={date}
            data={data}
            onMouseOver={
              dimmed || !this.props.dateEntered ? null : this.props.dateEntered
            }
            onMouseMove={
              dimmed || !this.props.dateMoved ? null : this.props.dateMoved
            }
            onMouseOut={
              dimmed || !this.props.dateLeaved ? null : this.props.dateLeaved
            }
            onClick={dimmed ? null : () => this.onDateClicked(date)}
          />
        </div>
      );
    } else {
      if (subkind === 'sub') {
        d = '(' + d + ')';
      }

      return (
        <div key={index} className={style}>
          <CalendarButton
            text={d}
            tooltip={tooltip}
            subkind={subkind}
            active={active}
            dimmed={dimmed}
            selected={selected}
            badgePosition="top-right"
            badgeValue={badgeValue}
            badgeColor={badgeColor}
            badgeShape="circle"
            badgeSize="0.8"
            onClick={dimmed ? null : () => this.onDateClicked(date)}
          />
        </div>
      );
    }
  }

  // Return an array of 7 buttons, for a week.
  renderButtons(startOfMonth, firstDate) {
    const line = [];
    let i = 0;
    for (i = 0; i < 7; ++i) {
      // monday..sunday
      let active = false;
      let selected = false;
      let dimmed = false;
      let hidden = false;
      let weekend = false;
      let subkind = null;

      let badgeValue = this.getBadgeValue(firstDate);
      let badgeColor = this.getBadgeColor(firstDate);

      const data = this.getDateData(firstDate);

      if (firstDate === this.props.selectedDate) {
        selected = true;
      }

      if (data) {
        active = true;
        subkind = data.type;
      }

      if (
        DateConverters.getYear(firstDate) !==
          DateConverters.getYear(startOfMonth) ||
        DateConverters.getMonth(firstDate) !==
          DateConverters.getMonth(startOfMonth)
      ) {
        dimmed = true;
        if (this.props.hideDaysOutOfMonth) {
          hidden = true;
        }
      }
      if (firstDate < this.startDate || firstDate > this.endDate) {
        dimmed = true;
      }
      if (i >= 5) {
        // saturday or sunday ?
        weekend = true;
      }

      const button = this.renderButton(
        firstDate,
        active,
        selected,
        dimmed,
        hidden,
        weekend,
        subkind,
        badgeValue,
        badgeColor,
        data,
        i
      );
      line.push(button);
      firstDate = DateConverters.addDays(firstDate, 1);
    }
    return line;
  }

  // Return the html for a line of 7 buttons (for a week).
  renderLineOfButtons(startOfMonth, firstDate, index) {
    return (
      <div className={this.styles.classNames.line} key={index}>
        {this.renderButtons(startOfMonth, firstDate)}
      </div>
    );
  }

  renderPrevMonthButton(showing) {
    if (showing) {
      return (
        <Button
          glyph="solid/chevron-left"
          kind="calendar-navigator"
          key="prevMonth"
          disabled={this.visibleDate < this.startDate}
          onClick={this.onPrevMonth}
        />
      );
    } else {
      return null;
    }
  }

  renderTitleButton(headerMonth, headerYear) {
    return (
      <>
        <div className={this.styles.classNames.headerTitleSajex} />
        <div ref={this.setRefMonths}>
          <Button
            kind="calendar-title"
            text={headerMonth}
            active={this.showComboMonths}
            onClick={this.onOpenComboMonths}
          />
        </div>
        <div ref={this.setRefYears}>
          <Button
            kind="calendar-title"
            text={headerYear}
            active={this.showComboYears}
            onClick={this.onOpenComboYears}
          />
        </div>
        <div className={this.styles.classNames.headerTitleSajex} />
      </>
    );
  }

  renderNextMonthButton(showing) {
    if (showing) {
      return (
        <Button
          glyph="solid/chevron-right"
          kind="calendar-navigator"
          key="nextMonth"
          disabled={
            DateConverters.moveAtEndingOfMonth(this.visibleDate) >= this.endDate
          }
          onClick={this.onNextMonth}
        />
      );
    } else {
      return null;
    }
  }

  // Return the html for the header, with 2 buttons next/prevMonth and the title.
  // By example: '<' mai 2016 '>'
  renderHeader(headerMonth, headerYear, isFirstMonth, isLastMonth) {
    return (
      <div className={this.styles.classNames.header} key="header">
        {this.renderPrevMonthButton(isFirstMonth)}
        {this.renderTitleButton(headerMonth, headerYear)}
        {this.renderNextMonthButton(isLastMonth)}
      </div>
    );
  }

  // Return the html for a [lun]..[dim] labels.
  renderDOW(text, index) {
    return (
      <div className={this.styles.classNames.dowText} key={index}>
        <Label insideButton={true} kind="compact" text={text} />
      </div>
    );
  }

  // Return an array of 7 days of week.
  renderDOWs() {
    const line = [];
    let i = 0;
    for (i = 0; i < 7; i++) {
      const dow = this.getDOW3Letters(i + 1);
      line.push(this.renderDOW(dow, i));
    }
    return line;
  }

  // Return the html for the 7 days of week header.
  renderLineOfDOWs() {
    return (
      <div className={this.styles.classNames.dowLine} key="dows">
        {this.renderDOWs()}
      </div>
    );
  }

  // Return an array of lines, with header then week's lines.
  // The array must have from 4 to 6 lines.
  renderColumnOfLines(
    headerMonth,
    headerYear,
    startOfMonth,
    firstDate,
    isFirstMonth,
    isLastMonth
  ) {
    const column = [];
    column.push(
      this.renderHeader(headerMonth, headerYear, isFirstMonth, isLastMonth)
    );
    column.push(this.renderLineOfDOWs());
    for (let i = 0; i < 6; ++i) {
      const line = this.renderLineOfButtons(startOfMonth, firstDate, i);
      column.push(line);
      firstDate = DateConverters.addDays(firstDate, 7);
    }
    return column;
  }

  // Return all the html content of the calendar.
  renderLines(startOfMonth, isFirstMonth, isLastMonth) {
    const firstDate = DateConverters.getCalendarStartDate(startOfMonth);
    const headerMonth = DateConverters.getDisplayed(startOfMonth, 'M'); // 'mai' by example
    const headerYear = DateConverters.getDisplayed(startOfMonth, 'y'); // '2016' by example

    return (
      <div className={this.styles.classNames.column}>
        {this.renderColumnOfLines(
          headerMonth,
          headerYear,
          startOfMonth,
          firstDate,
          isFirstMonth,
          isLastMonth
        )}
      </div>
    );
  }

  renderMonth(startOfMonth, isFirstMonth, isLastMonth, index) {
    const monthClass = isLastMonth
      ? this.styles.classNames.singleMonth
      : this.styles.classNames.month;

    return (
      <div className={monthClass} key={index}>
        {this.renderLines(startOfMonth, isFirstMonth, isLastMonth)}
      </div>
    );
  }

  renderSeparator(index) {
    return <div className={this.styles.classNames.separator} key={index} />;
  }

  renderMonths() {
    const result = [];
    const monthCount = this.monthCount;
    let index = 0;
    for (var m = 0; m < monthCount; m++) {
      const year = DateConverters.getYear(this.visibleDate);
      const month = DateConverters.getMonth(this.visibleDate);
      const startOfMonth = DateConverters.getDate(year, month + m, 1);

      const isFirstMonth = m === 0;
      const isLastMonth = m === monthCount - 1;
      result.push(
        this.renderMonth(startOfMonth, isFirstMonth, isLastMonth, index++)
      );
      if (monthCount > 1 && !isLastMonth) {
        result.push(this.renderSeparator(index++));
      }
    }
    return result;
  }

  renderQuickMonth(month, visibleMonth) {
    const firstVisibleMonth = visibleMonth;
    const lastVisibleMonth = visibleMonth + this.monthCount;
    const active = month >= firstVisibleMonth && month < lastVisibleMonth;
    return (
      <Button
        text={MonthConverters.getDisplayed(month, 'one-letter')}
        tooltip={MonthConverters.getDisplayed(month)}
        kind="calendar-navigator"
        grow="1"
        onClick={() => this.onVisibleDateMonth(month)}
        active={active}
        horizontalSpacing="tiny"
      />
    );
  }

  renderLineOfMonths(month, visibleMonth) {
    return (
      <div className={this.styles.classNames.double} key={month}>
        {this.renderQuickMonth(month + 0, visibleMonth)}
        {this.renderQuickMonth(month + 1, visibleMonth)}
        {this.renderQuickMonth(month + 2, visibleMonth)}
        {this.renderQuickMonth(month + 3, visibleMonth)}
      </div>
    );
  }

  renderMonthsOfYear() {
    const result = [];
    const visibleMonth = DateConverters.split(this.visibleDate).month;
    for (let month = 1; month <= 12; month += 4) {
      result.push(this.renderLineOfMonths(month, visibleMonth));
    }
    return result;
  }

  renderPrevNext(title, leftGlyph, rightGlyph, leftAction, rightAction) {
    return (
      <div className={this.styles.classNames.double}>
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

  renderNavigatorMonths() {
    const monthCount = this.monthCount;
    if (monthCount > 1) {
      return this.renderPrevNext(
        T(`{monthCount} mois`, '', {monthCount}),
        'solid/chevron-left',
        'solid/chevron-right',
        () => this.onVisibleDateAddMonths(-monthCount),
        () => this.onVisibleDateAddMonths(monthCount)
      );
    } else {
      return null;
    }
  }

  renderNavigator() {
    const navigator = this.props.navigator;
    if (navigator === 'standard') {
      return (
        <div className={this.styles.classNames.navigator}>
          {this.renderNavigatorMonths()}
          <Separator kind="space" height="20px" />
          {this.renderMonthsOfYear()}
          <Separator kind="space" height="20px" />
          {this.renderPrevNext(
            T('année'),
            'solid/step-backward',
            'solid/step-forward',
            this.onVisibleDatePrevYear,
            this.onVisibleDateNextYear
          )}
        </div>
      );
    } else {
      return null;
    }
  }

  renderTips() {
    if (!this.props.useTips) {
      return null;
    }

    // prettier-ignore
    const tips = [
      T("Cliquez en haut sur le nom du mois ou sur l'année pour changer rapidement le mois visible."),
      T('Utilisez la molette de la souris pour avancer ou reculer dans les mois.'),
    ];

    return (
      <div
        className={
          this.props.showTips
            ? this.styles.classNames.tipsShowed
            : this.styles.classNames.tipsHidden
        }
      >
        <Tips
          grow={1}
          height={this.props.showTips ? '55px' : '0px'}
          layout="horizontal"
          id="goblin-gadgets/calendar"
          tips={tips}
        />
      </div>
    );
  }

  renderComboMonths() {
    return (
      <ComboContainer
        show={this.showComboMonths}
        positionRef={this.nodeMonths}
        onClose={this.onCloseComboMonths}
      >
        <FlatList
          menuItemWidth="160px"
          list={this.comboMonthsList}
          selectedId={this.props.visibleDate}
          onChange={this.onComboMonthsClicked}
          onEscKey={this.onCloseComboMonths}
        />
      </ComboContainer>
    );
  }

  renderComboYears() {
    return (
      <ComboContainer
        show={this.showComboYears}
        positionRef={this.nodeYears}
        onClose={this.onCloseComboYears}
      >
        <FlatList
          menuItemWidth="120px"
          list={this.comboYearsList}
          selectedId={this.props.visibleDate}
          onChange={this.onComboYearsClicked}
          onEscKey={this.onCloseComboYears}
        />
      </ComboContainer>
    );
  }

  render() {
    if (!this.props.visibleDate) {
      return null;
    }

    return (
      <div
        className={
          this.props.showTips
            ? this.styles.classNames.calendarTips
            : this.styles.classNames.calendar
        }
        onWheel={(e) => this.handleWheel(e)}
      >
        {this.renderMonths()}
        {this.renderTips()}
        {this.renderNavigator()}
        {this.renderComboMonths()}
        {this.renderComboYears()}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const userSession = Widget.getUserSession(state);
  const data = userSession.get('tips.goblin-gadgets/calendar');
  const tipsRank = data ? data.get('rank') : 0; // show first tip if state never defined

  return {showTips: props.useTips && tipsRank !== -1};
})(Calendar);

registerWidget(Calendar, props, scenarios);
