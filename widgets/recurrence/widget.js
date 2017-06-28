import React from 'react';
import CronParser from 'cron-parser';
import Form from 'laboratory/form';
import * as Converters from '../helpers/converters';
import * as CronHelpers from '../helpers/cron-helpers';

import Calendar from 'gadgets/calendar/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldTyped from 'gadgets/text-field-typed/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

function monthCount () {
  return 2; // display 2 months simultaneously
}

function pushCron (result, date, startDate, endDate, cron, deleteList) {
  const year = Converters.getYear (date);
  const month = Converters.getMonth (date);
  var options = {
    currentDate: new Date (year, month - 2, 1),
    endDate: new Date (year, month + monthCount (), 1),
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
      const itemDate = Converters.jsToCanonicalDate (next.value);
      if (itemDate >= startDate && itemDate <= endDate) {
        const deleted = deleteList.indexOf (itemDate) !== -1;
        const item = {
          Date: itemDate,
          Type: deleted ? 'deleted' : 'default',
        };
        result.push (item);
      }
    }
  } catch (e) {}
}

function getRecurrenceItems (
  date,
  startDate,
  endDate,
  days,
  months,
  deleteList,
  addList
) {
  const result = [];
  if (!startDate) {
    startDate = '2000-01-01';
  }
  if (!endDate) {
    endDate = '2100-12-31';
  }

  if (days && days !== '' && months && months !== '') {
    const cron = CronHelpers.getCron (days, months);
    if (cron) {
      pushCron (result, date, startDate, endDate, cron, deleteList);
    }
  }

  for (var a of addList) {
    if (a >= startDate && a <= endDate) {
      const item = {
        Date: a,
        Type: 'added',
      };
      result.push (item);
    }
  }
  return result;
}

function getRecurrenceItem (date, recurrenceList) {
  for (var item of recurrenceList) {
    if (item.Date === date) {
      return item;
    }
  }
  return {
    Date: date,
    Type: 'none',
  };
}

/******************************************************************************/

class Recurrence extends Form {
  constructor (props) {
    super (props);
    this.visibleDate = this.props.visibleDate
      ? this.props.visibleDate
      : Converters.getNowCanonicalDate ();
  }

  static get wiring () {
    return {
      id: 'id',
      startDate: 'startDate',
      endDate: 'endDate',
      days: 'days',
      months: 'months',
      deleteList: 'deleteList',
      addList: 'addList',
    };
  }

  get periodInfo () {
    return Converters.getPeriodDescription (
      this.props.startDate,
      this.props.endDate
    );
  }

  get cronInfo () {
    return CronHelpers.getDisplayedCron (
      this.props.days,
      this.props.months,
      this.props.deleteList,
      this.props.addList
    );
  }

  get dates () {
    const deleteList = this.props.deleteList.toArray ();
    const addList = this.props.addList.toArray ();
    const items = getRecurrenceItems (
      this.visibleDate,
      this.props.startDate,
      this.props.endDate,
      this.props.days,
      this.props.months,
      deleteList,
      addList
    );
    this.recurrenceDates = items;

    const dates = [];
    for (let item of items) {
      if (item.Type === 'default' || item.Type === 'added') {
        dates.push (item.Date);
      }
    }
    return dates;
  }

  get hasExceptions () {
    return this.props.addList.length > 0 || this.props.deleteList.length > 0;
  }

  onDateClicked (date) {
    const item = getRecurrenceItem (date, this.recurrenceDates);
    this.do ('select-date', {date: date, type: item.Type});
  }

  onEraseEvents () {
    this.do ('erase-events');
  }

  onVisibleDateChanged (date) {
    this.visibleDate = date;
  }

  renderInfo (extended) {
    const headerInfoStyle = this.styles.headerInfo;
    const headerDragStyle = this.styles.headerDrag;
    return (
      <div style={headerInfoStyle}>
        <div style={headerDragStyle}>
          <Label text={this.periodInfo} kind="title-recurrence" grow="2" />
          <Label text={this.cronInfo} kind="title-recurrence" grow="2" />
        </div>
        <Button
          kind="recurrence"
          glyph={extended ? 'caret-up' : 'caret-down'}
          tooltip={
            extended
              ? 'Compacte la récurrence'
              : 'Etend la récurrence pour la modifier'
          }
          active={extended ? 'true' : 'false'}
          active-color={
            this.context.theme.palette.recurrenceExtendedBoxBackground
          }
        />
      </div>
    );
  }

  renderEditor (extended) {
    if (extended) {
      const style = this.styles.editor;

      return (
        <div style={style}>
          <TextFieldTyped
            type="date"
            field="startDate"
            select-all-on-focus="true"
            hint-text="Date de début"
            tooltip="Date de début"
            label-glyph="forward"
            grow="1"
            spacing="large"
            model=".startDate"
          />
          <TextFieldTyped
            type="date"
            field="endDate"
            select-all-on-focus="true"
            hint-text="Date de fin"
            tooltip="Date de fin"
            label-glyph="backward"
            grow="1"
            spacing="large"
            model=".endDate"
          />
          <LabelTextField
            field="days"
            select-all-on-focus="true"
            hint-text="Jours de la semaine"
            tooltip="1..7 = lundi..dimanche   - = à   , = et"
            label-glyph="calendar"
            grow="1"
            spacing="large"
            model=".days"
          />
          <LabelTextField
            field="months"
            select-all-on-focus="true"
            hint-text="Mois de l´année"
            tooltip="1..12 = janvier..décembre   - = à   , = et"
            label-glyph="calendar-o"
            grow="1"
            spacing="large"
            model=".months"
          />
          <Button
            glyph="eraser"
            tooltip="Supprime toutes les exceptions"
            spacing="overlap"
            visibility={this.hasExceptions ? 'true' : 'false'}
            onClick={::this.onEraseEvents}
          />
          <Button
            glyph="trash"
            tooltip="Supprime la récurrence"
            onClick={this.props.onDeleteRecurrence}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  renderCalendar (extended) {
    if (extended) {
      const style = this.styles.calendar;
      return (
        <div style={style}>
          <Calendar
            month-count={monthCount ()}
            navigator="standard"
            visible-date={this.visibleDate}
            dates={this.dates}
            start-date={this.props.startDate}
            end-date={this.props.endDate}
            date-clicked={::this.onDateClicked}
            visible-date-changed={::this.onVisibleDateChanged}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    const extended = this.props.extended === 'true';
    const mainStyle = {}; //this.styles.main;
    const Form = this.getForm (this.props.id);
    return (
      <div style={mainStyle}>
        <Form>
          {this.renderInfo (extended)}
          {this.renderEditor (extended)}
          {this.renderCalendar (extended)}
        </Form>
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrence;
