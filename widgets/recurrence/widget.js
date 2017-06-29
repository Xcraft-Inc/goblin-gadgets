import React from 'react';
import CronParser from 'cron-parser';
import Widget from 'laboratory/widget';
import * as Converters from '../helpers/converters';
import * as CronHelpers from '../helpers/cron-helpers';

import Calendar from 'gadgets/calendar/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextField from 'gadgets/text-field/widget';
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
  cron,
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

  if (cron) {
    pushCron (result, date, startDate, endDate, cron, deleteList);
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

class Recurrence extends Widget {
  constructor (props) {
    super (props);
    this.visibleDate = this.props.visibleDate
      ? this.props.visibleDate
      : Converters.getNowCanonicalDate ();
  }

  static get wiring () {
    return {
      id: 'id',
      StartDate: 'startDate',
      EndDate: 'endDate',
      Cron: 'cron',
      Delete: 'deleteList',
      Add: 'addList',
    };
  }

  get days () {
    return CronHelpers.getCanonicalDays (this.props.Cron);
  }

  get months () {
    return CronHelpers.getCanonicalMonths (this.props.Cron);
  }

  get periodInfo () {
    return Converters.getPeriodDescription (
      this.props.StartDate,
      this.props.EndDate
    );
  }

  get cronInfo () {
    const cron = CronHelpers.getCron (this.days, this.months);
    return CronHelpers.getDisplayedCron (
      cron,
      this.props.Delete,
      this.props.Add
    );
  }

  get dates () {
    const deleteList = this.props.Delete.toArray ();
    const addList = this.props.Add.toArray ();
    const cron = CronHelpers.getCron (this.days, this.months);
    const items = getRecurrenceItems (
      this.visibleDate,
      this.props.StartDate,
      this.props.EndDate,
      cron,
      deleteList,
      addList
    );

    const dates = [];
    for (let item of items) {
      if (item.Type === 'default' || item.Type === 'added') {
        dates.push (item.Date);
      }
    }
    return dates;
  }

  get hasExceptions () {
    return this.props.Add.length > 0 || this.props.Delete.length > 0;
  }

  onDateClicked (date) {
    this.do ('select-date', {date});
  }

  onEraseEvents () {
    this.do ('erase-events');
  }

  onVisibleDateChanged (date) {
    this.visibleDate = date;
  }

  renderInfo (extended) {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    return (
      <div className={headerInfoClass}>
        <div className={headerDragClass}>
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
      const editorClass = this.styles.classNames.editor;
      return (
        <div className={editorClass}>
          <TextField
            type="date"
            field="StartDate"
            select-all-on-focus="true"
            hint-text="Date de début"
            tooltip="Date de début"
            label-glyph="forward"
            grow="1"
            spacing="large"
            model=".StartDate"
          />
          <TextField
            type="date"
            field="EndDate"
            select-all-on-focus="true"
            hint-text="Date de fin"
            tooltip="Date de fin"
            label-glyph="backward"
            grow="1"
            spacing="large"
            model=".EndDate"
          />
          <LabelTextField
            field="Days"
            select-all-on-focus="true"
            hint-text="Jours de la semaine"
            tooltip="1..7 = lundi..dimanche   - = à   , = et"
            label-glyph="calendar"
            grow="1"
            spacing="large"
            model=".Days"
          />
          <LabelTextField
            field="Months"
            select-all-on-focus="true"
            hint-text="Mois de l´année"
            tooltip="1..12 = janvier..décembre   - = à   , = et"
            label-glyph="calendar-o"
            grow="1"
            spacing="large"
            model=".Months"
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
      const calClass = this.styles.classNames.calendar;
      return (
        <div className={calClass}>
          <Calendar
            month-count={monthCount ()}
            navigator="standard"
            visible-date={this.visibleDate}
            dates={this.dates}
            start-date={this.props.StartDate}
            end-date={this.props.EndDate}
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
    const {StartDate} = this.props;
    const extended = this.props.extended === 'true';
    const mainClass = ''; //this.styles.classNames.main;

    return (
      <div className={mainClass}>
        {this.renderInfo (extended)}
        {this.renderEditor (extended)}
        {this.renderCalendar (extended)}
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrence;
