import T from 't';
import React from 'react';
import Props from './props';
import Widget from 'laboratory/widget';
import ComboHelpers from 'gadgets/helpers/combo-helpers';

import * as Bool from 'gadgets/helpers/bool-helpers';

import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';
import Combo from 'gadgets/combo/widget';

import {
  date as DateConverters,
  month as MonthConverters,
  dow as DowConverters,
} from 'xcraft-core-converters';

/******************************************************************************/

function getMonthsRank(date) {
  const year = DateConverters.getYear(date);
  const month = DateConverters.getMonth(date);
  return year * 12 + (month - 1);
}

function getDateFromRank(rank) {
  const year = rank / 12;
  const month = (rank % 12) + 1;
  return DateConverters.getDate(year, month, 1);
}

/******************************************************************************/

export default class Calendar extends Widget {
  constructor() {
    super(...arguments);

    this.comboButton = null; // FIXME: managed many buttons...

    this.state = {
      showCombo: false,
      visibleDate: null,
    };

    this.onPrevMonth = this.onPrevMonth.bind(this);
    this.onNextMonth = this.onNextMonth.bind(this);
    this.onOpenCombo = this.onOpenCombo.bind(this);
    this.onCloseCombo = this.onCloseCombo.bind(this);
    this.onVisibleDateMonth = this.onVisibleDateMonth.bind(this);
    this.onVisibleDateAddMonths = this.onVisibleDateAddMonths.bind(this);
    this.onVisibleDatePrevYear = this.onVisibleDatePrevYear.bind(this);
    this.onVisibleDateNextYear = this.onVisibleDateNextYear.bind(this);
    this.onDateClicked = this.onDateClicked.bind(this);
    this.onComboClicked = this.onComboClicked.bind(this);
  }

  //#region get/set
  get showCombo() {
    return this.state.showCombo;
  }

  set showCombo(value) {
    this.setState({
      showCombo: value,
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

  onComboClicked(item) {
    this.onCloseCombo();
    this.changeDate(item.date);
  }

  getComboItem(date, isActive) {
    return {
      date: date,
      text: DateConverters.getDisplayed(date, 'My'),
      glyph: isActive ? 'solid/check-circle' : 'regular/circle',
      action: this.onComboClicked,
    };
  }

  get comboList() {
    const list = [];
    const nowRank = getMonthsRank(this.visibleDate);
    const startCount = Math.max(
      this.props.startDate
        ? getMonthsRank(this.props.startDate) - nowRank
        : -999,
      -12
    );
    const endCount = Math.min(
      this.props.endDate ? getMonthsRank(this.props.endDate) - nowRank : 999,
      12
    );
    for (let i = startCount; i <= endCount; i++) {
      const date = getDateFromRank(nowRank + i);
      list.push(this.getComboItem(date, i === 0));
    }
    return list;
  }

  getDateType(date) {
    if (!this.props.dates || this.props.dates.length === 0) {
      return null;
    } else if (typeof this.props.dates[0] === 'string') {
      return this.props.dates.indexOf(date) === -1 ? null : 'base';
    } else {
      for (const d of this.props.dates) {
        if (d.date === date) {
          return d.type;
        }
      }
      return null;
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
      DateConverters.addMonths(this.startVisibleDate, 1),
      -1
    );
  }

  get monthCount() {
    const monthCount = this.props.monthCount;
    return monthCount ? parseInt(monthCount) : 1;
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

  onOpenCombo() {
    const node = this.comboButton;
    const itemCount = this.comboList.length;
    this.comboLocation = ComboHelpers.getComboLocation(
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding,
      itemCount,
      '200px',
      this.context.theme.shapes.menuButtonHeight // height of Button kind='combo-wrap-item'
    );
    this.showCombo = true;
  }

  onCloseCombo() {
    this.showCombo = false;
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
      !Bool.isTrue(this.props.readonly)
    ) {
      const x = this.props.dateClicked;
      if (x) {
        x(date);
      }
    }
  }

  /******************************************************************************/

  // Return the html for a [1]..[31] button.
  renderButton(
    date,
    active,
    dimmed,
    hidden,
    weekend,
    subkind,
    badgeValue,
    badgeColor,
    index
  ) {
    const tooltip = DateConverters.getDisplayed(date, 'Wdmy');
    let d = DateConverters.getDay(date); // 1..31
    if (subkind === 'sub') {
      d = '(' + d + ')';
    }
    if (hidden) {
      d = '';
      badgeValue = '';
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
        badgePosition="top-right"
        badgeValue={badgeValue}
        badgeShape="circle"
        badgeColor={badgeColor}
        badgeSize="0.8"
        onClick={() => this.onDateClicked(date)}
      />
    );
  }

  // Return an array of 7 buttons, for a week.
  renderButtons(startOfMonth, firstDate) {
    const line = [];
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    let i = 0;
    for (i = 0; i < 7; ++i) {
      // monday..sunday
      let active = false;
      let dimmed = false;
      let hidden = false;
      let weekend = false;
      let subkind = null;
      const type = this.getDateType(firstDate);
      if (type) {
        active = true;
        subkind = type;
      }
      if (
        DateConverters.getYear(firstDate) !==
          DateConverters.getYear(startOfMonth) ||
        DateConverters.getMonth(firstDate) !==
          DateConverters.getMonth(startOfMonth)
      ) {
        dimmed = true;
        if (Bool.isTrue(this.props.hideDaysOutOfMonth)) {
          hidden = true;
        }
      }
      if (firstDate < startDate || firstDate > endDate) {
        dimmed = true;
      }
      if (i >= 5) {
        // saturday or sunday ?
        weekend = true;
      }
      const badgeValue = this.getBadgeValue(firstDate);
      const badgeColor = this.getBadgeColor(firstDate);

      const button = this.renderButton(
        firstDate,
        active,
        dimmed,
        hidden,
        weekend,
        subkind,
        badgeValue,
        badgeColor,
        i
      );
      line.push(button);
      firstDate = DateConverters.addDays(firstDate, 1);
    }
    return line;
  }

  // Return the html for a line of 7 buttons (for a week).
  renderLineOfButtons(startOfMonth, firstDate, index) {
    const lineClass = this.styles.classNames.line;
    return (
      <div className={lineClass} key={index}>
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
          disabled={Bool.toString(this.visibleDate < this.props.startDate)}
          onClick={this.onPrevMonth}
        />
      );
    } else {
      return null;
    }
  }

  renderTitleButton(header) {
    const buttonClass = this.styles.classNames.headerTitle;
    return (
      <div ref={x => (this.comboButton = x)} className={buttonClass}>
        <Button
          kind="calendar-title"
          text={header}
          active={Bool.toString(this.showCombo)}
          onClick={this.onOpenCombo}
        />
      </div>
    );
  }

  renderNextMonthButton(showing) {
    if (showing) {
      return (
        <Button
          glyph="solid/chevron-right"
          kind="calendar-navigator"
          key="nextMonth"
          disabled={Bool.toString(
            DateConverters.moveAtEndingOfMonth(this.visibleDate) >=
              this.props.endDate
          )}
          onClick={this.onNextMonth}
        />
      );
    } else {
      return null;
    }
  }

  // Return the html for the header, with 2 buttons next/prevMonth and the title.
  // By example: '<' mai 2016 '>'
  renderHeader(header, isFirstMonth, isLastMonth) {
    const headerClass = this.styles.classNames.header;
    return (
      <div className={headerClass} key="header">
        {this.renderPrevMonthButton(isFirstMonth)}
        {this.renderTitleButton(header)}
        {this.renderNextMonthButton(isLastMonth)}
      </div>
    );
  }

  // Return the html for a [lun]..[dim] labels.
  renderDOW(text, index) {
    const textClass = this.styles.classNames.dowText;
    return (
      <div className={textClass} key={index}>
        <Label insideButton="true" kind="compact" text={text} />
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
    const dowClass = this.styles.classNames.dowLine;
    return (
      <div className={dowClass} key="dows">
        {this.renderDOWs()}
      </div>
    );
  }

  // Return an array of lines, with header then week's lines.
  // The array must have from 4 to 6 lines.
  renderColumnOfLines(
    header,
    startOfMonth,
    firstDate,
    isFirstMonth,
    isLastMonth
  ) {
    const column = [];
    column.push(this.renderHeader(header, isFirstMonth, isLastMonth));
    column.push(this.renderLineOfDOWs());
    for (let i = 0; i < 6; ++i) {
      const line = this.renderLineOfButtons(startOfMonth, firstDate, i);
      column.push(line);
      firstDate = DateConverters.addDays(firstDate, 7);
    }
    return column;
  }

  // Retourne all the html content of the calendar.
  renderLines(startOfMonth, isFirstMonth, isLastMonth) {
    const firstDate = DateConverters.getCalendarStartDate(startOfMonth);
    const header = DateConverters.getDisplayed(startOfMonth, 'My'); // 'mai 2016' by example

    const columnClass = this.styles.classNames.column;
    return (
      <div className={columnClass}>
        {this.renderColumnOfLines(
          header,
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

  renderMonths() {
    const result = [];
    const monthCount = this.monthCount;
    for (var m = 0; m < monthCount; m++) {
      const year = DateConverters.getYear(this.visibleDate);
      const month = DateConverters.getMonth(this.visibleDate);
      const startOfMonth = DateConverters.getDate(year, month + m, 1);

      const isFirstMonth = m === 0;
      const isLastMonth = m === monthCount - 1;
      result.push(this.renderMonth(startOfMonth, isFirstMonth, isLastMonth, m));
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
        active={Bool.toString(active)}
        spacing="tiny"
      />
    );
  }

  renderLineOfMonths(month, visibleMonth) {
    const doubleClass = this.styles.classNames.double;
    return (
      <div className={doubleClass} key={month}>
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
      const navClass = this.styles.classNames.navigator;
      return (
        <div className={navClass}>
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

  renderCombo() {
    if (this.showCombo && this.comboLocation) {
      return (
        <Combo
          menuType="wrap"
          menuItemWidth={this.comboLocation.menuItemWidth}
          left={this.comboLocation.center}
          top={this.comboLocation.top}
          bottom={this.comboLocation.bottom}
          maxHeight={this.comboLocation.maxHeight}
          width={this.comboLocation.width}
          list={this.comboList}
          close={this.onCloseCombo}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.visibleDate) {
      return null;
    }

    const boxClass = this.styles.classNames.box;
    return (
      <div className={boxClass}>
        {this.renderMonths()}
        {this.renderNavigator()}
        {this.renderCombo()}
      </div>
    );
  }
}

/******************************************************************************/

Calendar.propTypes = makePropTypes(Props);
Calendar.defaultProps = makeDefaultProps(Props);
